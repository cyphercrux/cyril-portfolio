import React from "react";

/**
 * INDIVIDUAL SIMULATED CURSOR AGENT COMPONENT
 * Renders a crisp vector pointer arrow, identification label, and activity pulse.
 * Strict pointer-events: none ensures zero interference with user actions.
 */
export default function AgentCursor({ agent }) {
  const { name, role, color, badgeColor, badgeTextColor } = agent.config;

  return (
    <div
      id={`agent-cursor-${agent.id}`}
      className="absolute top-0 left-0 pointer-events-none select-none transition-opacity duration-300 z-[9999]"
      style={{
        transform: `translate3d(${agent.x}px, ${agent.y}px, 0)`,
        willChange: "transform",
      }}
    >
      {/* Sleek Vector Arrow Pointer */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        style={{ transform: "rotate(-12deg) origin-top-left" }}
      >
        <path
          d="M3 2L10.5 21L13.8 13.8L21 10.5L3 2Z"
          fill={color}
          stroke="#050505"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>

      {/* Agent Identification Badge */}
      <div
        className="absolute left-4 top-4 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-tight whitespace-nowrap shadow-lg border border-black/20"
        style={{
          backgroundColor: badgeColor,
          color: badgeTextColor,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: badgeTextColor }}
        />
        <span className="font-bold">{name}</span>
        <span className="opacity-75 text-[9px]">// {role}</span>
      </div>
    </div>
  );
}

