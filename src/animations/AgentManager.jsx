import React, { useEffect, useRef, useState, useCallback } from "react";
import { AGENT_IDENTITIES, AGENT_STATES } from "./types";
import { BoidsEngine, Vector2D } from "./BoidsEngine";

/**
 * AGENT MANAGER
 * Central orchestration engine for simulated cursor agents, selection box reveals,
 * and fish-school swarm dynamics.
 * 
 * High-performance architecture:
 * - Direct Canvas rendering for selection rectangles and agent motion trails.
 * - Hardware-accelerated translate3d transforms for cursor DOM nodes.
 * - Dedicated requestAnimationFrame physics loop without React state re-render overhead.
 */
export default function AgentManager() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const agentsRef = useRef([]);
  const revealQueueRef = useRef([]);
  const activeDrawingsRef = useRef([]);
  const boidsEngineRef = useRef(new BoidsEngine());
  const mousePosRef = useRef(new Vector2D(-1000, -1000));
  const isSwarmModeRef = useRef(false);
  const isMotionActiveRef = useRef(true);
  const animationFrameIdRef = useRef(null);

  const [agents, setAgents] = useState([]);
  const [isMotionEnabled, setIsMotionEnabled] = useState(true);

  // Initialize simulated cursor agents
  const initializeAgents = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 4 : 8; // Responsive pool size
    const identities = AGENT_IDENTITIES.slice(0, count);

    const initialized = identities.map((config, index) => {
      const angle = (index / count) * Math.PI * 2;
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;
      const startX = window.innerWidth * 0.5 + Math.cos(angle) * radius;
      const startY = window.innerHeight * 0.4 + Math.sin(angle) * radius;

      return {
        id: config.id,
        index,
        config,
        state: AGENT_STATES.IDLE_WANDER,
        pos: new Vector2D(startX, startY),
        vel: new Vector2D((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3),
        acc: new Vector2D(0, 0),
        targetPos: null,
        currentTargetId: null,
        targetRect: null,
        outlineColor: "lime",
        drawProgress: 0,
        pauseTicks: 0,
        trail: [],
        wanderAngle: Math.random() * Math.PI * 2,
        personalRadius: config.personalRadius,
        maxSpeed: config.maxSpeed,
        maxForce: config.maxForce,
      };
    });

    agentsRef.current = initialized;
    setAgents(initialized);
  }, []);

  useEffect(() => {
    // Check initial motion preference
    const checkMotionPref = () => {
      const saved = localStorage.getItem("cyril_portfolio_motion");
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (saved === "off" || (prefersReduced && saved !== "on")) {
        return false;
      }
      return true;
    };

    const initialMotion = checkMotionPref();
    setIsMotionEnabled(initialMotion);
    isMotionActiveRef.current = initialMotion;

    initializeAgents();

    // Resize listener
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse tracker (for gentle swarm attraction or avoidance)
    const handleMouseMove = (e) => {
      mousePosRef.current.set(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Reveal request listener from SelectionReveal components
    const handleRevealRequest = (e) => {
      const { id, rect, outlineColor } = e.detail;
      if (!isMotionActiveRef.current) return;

      // Avoid duplicate queuing
      if (
        !revealQueueRef.current.some((item) => item.id === id) &&
        !agentsRef.current.some((agent) => agent.currentTargetId === id)
      ) {
        revealQueueRef.current.push({ id, rect, outlineColor, requestedAt: Date.now() });
      }
    };
    window.addEventListener("agent-request-reveal", handleRevealRequest);

    // Global Motion Toggle Listener
    const handleMotionToggle = (e) => {
      const active = e.detail.active;
      setIsMotionEnabled(active);
      isMotionActiveRef.current = active;
      if (!active) {
        activeDrawingsRef.current = [];
        revealQueueRef.current = [];
      }
    };
    window.addEventListener("agent-motion-toggle", handleMotionToggle);

    // Swarm Mode trigger listener (e.g. from bottom contact or manual trigger)
    const handleSwarmTrigger = (e) => {
      isSwarmModeRef.current = !!e.detail?.active;
    };
    window.addEventListener("agent-swarm-trigger", handleSwarmTrigger);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("agent-request-reveal", handleRevealRequest);
      window.removeEventListener("agent-motion-toggle", handleMotionToggle);
      window.removeEventListener("agent-swarm-trigger", handleSwarmTrigger);
    };
  }, [initializeAgents]);

  // Main 60FPS Physics and Animation Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (isMotionActiveRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const bounds = { width: canvas.width, height: canvas.height };

        ctx.clearRect(0, 0, bounds.width, bounds.height);

        // 1. Process reveal queue: assign idle agents to queued targets
        if (revealQueueRef.current.length > 0 && !isSwarmModeRef.current) {
          const idleAgent = agentsRef.current.find(
            (a) => a.state === AGENT_STATES.IDLE_WANDER && a.pauseTicks <= 0
          );
          if (idleAgent) {
            const nextTarget = revealQueueRef.current.shift();
            // Re-sample bounding client rect dynamically in case user scrolled
            const targetEl = document.querySelector(`[data-reveal-id="${nextTarget.id}"]`);
            if (targetEl) {
              const rect = targetEl.getBoundingClientRect();
              idleAgent.state = AGENT_STATES.APPROACH_TARGET;
              idleAgent.currentTargetId = nextTarget.id;
              idleAgent.outlineColor = nextTarget.outlineColor || "lime";
              idleAgent.targetRect = {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
              };
              idleAgent.targetPos = new Vector2D(rect.left, rect.top);
              idleAgent.drawProgress = 0;
            }
          }
        }

        // 2. Update agent physics and states
        agentsRef.current.forEach((agent) => {
          // If in Swarm mode, all agents participate in fish-school flocking
          if (isSwarmModeRef.current) {
            agent.state = AGENT_STATES.SWARM_FLOCK;
          }

          switch (agent.state) {
            case AGENT_STATES.APPROACH_TARGET: {
              if (agent.targetPos) {
                // Update target rect in case of scrolling
                const el = document.querySelector(`[data-reveal-id="${agent.currentTargetId}"]`);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  agent.targetRect = rect;
                  agent.targetPos.set(rect.left, rect.top);
                }

                const dist = agent.pos.dist(agent.targetPos);
                if (dist < 18) {
                  // Reached top-left corner: start drawing selection box
                  agent.state = AGENT_STATES.DRAWING_BOX;
                  agent.drawProgress = 0;
                  window.dispatchEvent(
                    new CustomEvent("agent-draw-start", {
                      detail: { id: agent.currentTargetId, agentId: agent.id },
                    })
                  );
                } else {
                  const seekForce = boidsEngineRef.current.seek(agent, agent.targetPos);
                  agent.acc.add(seekForce.mult(1.4));
                }
              }
              break;
            }

            case AGENT_STATES.DRAWING_BOX: {
              if (agent.targetRect) {
                const el = document.querySelector(`[data-reveal-id="${agent.currentTargetId}"]`);
                if (el) {
                  agent.targetRect = el.getBoundingClientRect();
                }

                // Interpolate cursor from top-left (0,0) to bottom-right (width, height)
                agent.drawProgress += dt * 1.5; // ~700ms draw time

                const progress = Math.min(agent.drawProgress, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);

                const currentX = agent.targetRect.left + agent.targetRect.width * eased;
                const currentY = agent.targetRect.top + agent.targetRect.height * eased;
                agent.pos.set(currentX, currentY);

                // Add to active drawing render list
                activeDrawingsRef.current.push({
                  rect: agent.targetRect,
                  progress: eased,
                  color: agent.config.color,
                  agentId: agent.id,
                });

                if (progress >= 1) {
                  // Box drawing finished! Reveal content
                  window.dispatchEvent(
                    new CustomEvent("agent-draw-complete", {
                      detail: { id: agent.currentTargetId, agentId: agent.id },
                    })
                  );
                  agent.state = AGENT_STATES.PAUSE_AT_TARGET;
                  agent.pauseTicks = 18; // Brief pause
                  agent.currentTargetId = null;
                }
              }
              break;
            }

            case AGENT_STATES.PAUSE_AT_TARGET: {
              agent.pauseTicks -= 1;
              if (agent.pauseTicks <= 0) {
                agent.state = AGENT_STATES.IDLE_WANDER;
                agent.vel.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
              }
              break;
            }

            case AGENT_STATES.SWARM_FLOCK: {
              // Complete Boids Fish-School Swarm Algorithm
              const target = mousePosRef.current.x > 0 ? mousePosRef.current : null;
              const flockForce = boidsEngineRef.current.computeFlockingForce(
                agent,
                agentsRef.current,
                bounds,
                target
              );
              agent.acc.add(flockForce);
              break;
            }

            case AGENT_STATES.IDLE_WANDER:
            default: {
              // Smooth autonomous wandering
              agent.wanderAngle += (Math.random() - 0.5) * 0.4;
              const wanderForce = new Vector2D(
                Math.cos(agent.wanderAngle) * 0.8,
                Math.sin(agent.wanderAngle) * 0.8
              );
              agent.acc.add(wanderForce);

              // Viewport gentle boundary steering
              const boundForce = boidsEngineRef.current.computeBoundaries(agent, bounds);
              agent.acc.add(boundForce.mult(1.5));
              break;
            }
          }

          // Physics integration: pos += vel, vel += acc
          agent.vel.add(agent.acc);
          agent.vel.limit(agent.maxSpeed);
          agent.pos.add(agent.vel);
          agent.acc.set(0, 0);

          // Wrap edges smoothly if drifted beyond bounds
          if (agent.pos.x < -40) agent.pos.x = bounds.width + 20;
          if (agent.pos.x > bounds.width + 40) agent.pos.x = -20;
          if (agent.pos.y < -40) agent.pos.y = bounds.height + 20;
          if (agent.pos.y > bounds.height + 40) agent.pos.y = -20;

          // Record trail point
          agent.trail.push({ x: agent.pos.x, y: agent.pos.y, alpha: 1.0 });
          if (agent.trail.length > 10) {
            agent.trail.shift();
          }

          // Direct DOM transform update for smooth 60fps rendering without React re-renders
          const domEl = document.getElementById(`agent-cursor-${agent.id}`);
          if (domEl) {
            domEl.style.transform = `translate3d(${agent.pos.x.toFixed(1)}px, ${agent.pos.y.toFixed(1)}px, 0)`;
          }
        });

        // 3. Render Canvas Overlays: Motion Trails & Selection Boxes
        // Draw Motion Trails
        agentsRef.current.forEach((agent) => {
          if (agent.trail.length > 2) {
            ctx.beginPath();
            ctx.moveTo(agent.trail[0].x, agent.trail[0].y);
            for (let i = 1; i < agent.trail.length; i++) {
              ctx.lineTo(agent.trail[i].x, agent.trail[i].y);
            }
            ctx.strokeStyle = agent.config.trailColor;
            ctx.lineWidth = 1.6;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
          }
        });

        // Draw Active Selection Rectangles
        activeDrawingsRef.current.forEach((drawing) => {
          const { rect, progress, color } = drawing;
          const drawW = rect.width * progress;
          const drawH = rect.height * progress;

          ctx.save();
          // Semi-transparent highlight fill
          ctx.fillStyle = color === "#C6FF00" ? "rgba(198, 255, 0, 0.06)" : "rgba(168, 85, 247, 0.06)";
          ctx.fillRect(rect.left, rect.top, drawW, drawH);

          // Crisp Technical Selection Outline
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.8;
          ctx.setLineDash([6, 4]);
          ctx.strokeRect(rect.left, rect.top, drawW, drawH);

          // Corner Reticle Brackets (Editorial Figma / Engineering inspection markers)
          const bracketLen = 8;
          ctx.setLineDash([]);
          ctx.beginPath();
          // Top-left
          ctx.moveTo(rect.left, rect.top + bracketLen);
          ctx.lineTo(rect.left, rect.top);
          ctx.lineTo(rect.left + bracketLen, rect.top);
          // Top-right
          ctx.moveTo(rect.left + drawW - bracketLen, rect.top);
          ctx.lineTo(rect.left + drawW, rect.top);
          ctx.lineTo(rect.left + drawW, rect.top + bracketLen);
          // Bottom-left
          ctx.moveTo(rect.left, rect.top + drawH - bracketLen);
          ctx.lineTo(rect.left, rect.top + drawH);
          ctx.lineTo(rect.left + bracketLen, rect.top + drawH);
          // Bottom-right
          ctx.moveTo(rect.left + drawW - bracketLen, rect.top + drawH);
          ctx.lineTo(rect.left + drawW, rect.top + drawH);
          ctx.lineTo(rect.left + drawW, rect.top + drawH - bracketLen);
          ctx.stroke();

          ctx.restore();
        });

        // Clear active drawings for next frame
        activeDrawingsRef.current = [];
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  if (!isMotionEnabled) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 2D Canvas for High-Performance Trails and Selection Rectangles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />

      {/* DOM Elements for Crisp Vector Cursors & Identification Tags */}
      {agents.map((agent) => (
        <div
          key={agent.id}
          id={`agent-cursor-${agent.id}`}
          className="absolute top-0 left-0 pointer-events-none select-none z-[9999]"
          style={{
            transform: "translate3d(-100px, -100px, 0)",
            willChange: "transform",
          }}
        >
          {/* Vector Arrow Pointer */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            style={{ transform: "rotate(-10deg)" }}
          >
            <path
              d="M3 2L10.5 21L13.8 13.8L21 10.5L3 2Z"
              fill={agent.config.color}
              stroke="#050505"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>

          {/* Agent Identification Badge */}
          <div
            className="absolute left-4 top-4 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-tight whitespace-nowrap shadow-xl border border-black/30"
            style={{
              backgroundColor: agent.config.badgeColor,
              color: agent.config.badgeTextColor,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: agent.config.badgeTextColor }}
            />
            <span className="font-bold">{agent.config.name}</span>
            <span className="opacity-75 text-[9px]">// {agent.config.role}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

