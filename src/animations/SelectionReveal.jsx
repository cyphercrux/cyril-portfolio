import React, { useEffect, useRef, useState } from "react";

/**
 * SELECTION REVEAL COMPONENT
 * Coordinates with the Multi-Cursor Agent System:
 * When scrolled into view, an agent is dispatched to draw a bounding selection box,
 * revealing the enclosed content with a crisp digital appearance.
 */
export default function SelectionReveal({
  id,
  children,
  className = "",
  outlineColor = "lime", // "lime" | "purple"
  delay = 0,
  revealImmediately = false,
}) {
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(revealImmediately);
  const [isDrawing, setIsDrawing] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (revealImmediately) {
      setIsRevealed(true);
      return;
    }

    const checkReducedMotion = () => {
      const savedMotion = localStorage.getItem("cyril_portfolio_motion");
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return savedMotion === "off" || (prefersReduced && savedMotion !== "on");
    };

    if (checkReducedMotion()) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;

            const timer = setTimeout(() => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();

              // Dispatch request to AgentManager to allocate an agent for this reveal
              window.dispatchEvent(
                new CustomEvent("agent-request-reveal", {
                  detail: {
                    id,
                    outlineColor,
                    rect: {
                      top: rect.top,
                      left: rect.left,
                      width: rect.width,
                      height: rect.height,
                    },
                    element: containerRef.current,
                  },
                })
              );
            }, delay);

            return () => clearTimeout(timer);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Listen for agent drawing events
    const handleDrawingStart = (e) => {
      if (e.detail?.id === id) {
        setIsDrawing(true);
      }
    };

    const handleDrawingFinish = (e) => {
      if (e.detail?.id === id) {
        setIsDrawing(false);
        setIsRevealed(true);
      }
    };

    const handleMotionToggle = (e) => {
      if (!e.detail?.active) {
        setIsRevealed(true);
        setIsDrawing(false);
      }
    };

    window.addEventListener("agent-draw-start", handleDrawingStart);
    window.addEventListener("agent-draw-complete", handleDrawingFinish);
    window.addEventListener("agent-motion-toggle", handleMotionToggle);

    // Fallback safety timer: ensure content reveals even if agent is busy
    const safetyTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 4500 + delay);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
      window.removeEventListener("agent-draw-start", handleDrawingStart);
      window.removeEventListener("agent-draw-complete", handleDrawingFinish);
      window.removeEventListener("agent-motion-toggle", handleMotionToggle);
    };
  }, [id, delay, outlineColor, revealImmediately]);

  return (
    <div
      ref={containerRef}
      id={`reveal-target-${id}`}
      data-reveal-id={id}
      className={`relative selection-reveal-wrapper ${className}`}
      style={{
        opacity: isRevealed ? 1 : 0.08,
        filter: isRevealed ? "none" : "blur(2.5px)",
        transform: isRevealed ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), filter 400ms ease, transform 400ms ease",
      }}
    >
      {/* Subtle indicator tag when drawing */}
      {isDrawing && (
        <div
          className="absolute -top-3 -right-2 z-20 px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded uppercase pointer-events-none"
          style={{
            backgroundColor: outlineColor === "lime" ? "#C6FF00" : "#A855F7",
            color: outlineColor === "lime" ? "#050505" : "#FFFFFF",
            boxShadow: `0 0 10px ${outlineColor === "lime" ? "rgba(198,255,0,0.5)" : "rgba(168,85,247,0.5)"}`,
          }}
        >
          CONSTRUCTING...
        </div>
      )}
      {children}
    </div>
  );
}

