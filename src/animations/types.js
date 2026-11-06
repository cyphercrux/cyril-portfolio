/**
 * SIMULATED CURSOR AGENTS SPECIFICATION
 * Distinct identities, roles, colors, and motion characteristics.
 */

export const AGENT_IDENTITIES = [
  {
    id: "agent-1",
    name: "Lex",
    role: "Lead Architect",
    color: "#C6FF00", // Lime Primary
    badgeColor: "#C6FF00",
    badgeTextColor: "#050505",
    trailColor: "rgba(198, 255, 0, 0.35)",
    maxSpeed: 4.8,
    maxForce: 0.16,
    personalRadius: 45,
    leadWeight: 1.2,
  },
  {
    id: "agent-2",
    name: "Nova",
    role: "Layout Specialist",
    color: "#A855F7", // Light Purple
    badgeColor: "#A855F7",
    badgeTextColor: "#FFFFFF",
    trailColor: "rgba(168, 85, 247, 0.35)",
    maxSpeed: 4.2,
    maxForce: 0.14,
    personalRadius: 40,
    leadWeight: 1.0,
  },
  {
    id: "agent-3",
    name: "Vex",
    role: "Circuit Inspector",
    color: "#B7FF00", // Secondary Lime
    badgeColor: "#B7FF00",
    badgeTextColor: "#050505",
    trailColor: "rgba(183, 255, 0, 0.35)",
    maxSpeed: 5.2,
    maxForce: 0.18,
    personalRadius: 50,
    leadWeight: 0.9,
  },
  {
    id: "agent-4",
    name: "Pulse",
    role: "Telemetry Probe",
    color: "#7C3AED", // Primary Purple
    badgeColor: "#7C3AED",
    badgeTextColor: "#FFFFFF",
    trailColor: "rgba(124, 58, 237, 0.35)",
    maxSpeed: 4.0,
    maxForce: 0.13,
    personalRadius: 38,
    leadWeight: 1.1,
  },
  {
    id: "agent-5",
    name: "Echo",
    role: "Systems Auditor",
    color: "#C6FF00", // Lime Primary
    badgeColor: "#C6FF00",
    badgeTextColor: "#050505",
    trailColor: "rgba(198, 255, 0, 0.35)",
    maxSpeed: 4.6,
    maxForce: 0.15,
    personalRadius: 42,
    leadWeight: 0.8,
  },
  {
    id: "agent-6",
    name: "Spark",
    role: "Hardware Runner",
    color: "#8B5CF6", // Deep Violet
    badgeColor: "#8B5CF6",
    badgeTextColor: "#FFFFFF",
    trailColor: "rgba(139, 92, 246, 0.35)",
    maxSpeed: 5.4,
    maxForce: 0.20,
    personalRadius: 48,
    leadWeight: 1.0,
  },
  {
    id: "agent-7",
    name: "Flux",
    role: "Flow Analyzer",
    color: "#D4FF33", // Lime Accent
    badgeColor: "#D4FF33",
    badgeTextColor: "#050505",
    trailColor: "rgba(212, 255, 51, 0.35)",
    maxSpeed: 4.4,
    maxForce: 0.15,
    personalRadius: 40,
    leadWeight: 0.95,
  },
  {
    id: "agent-8",
    name: "Orbit",
    role: "Swarm Coordinator",
    color: "#9333EA", // Vibrant Purple
    badgeColor: "#9333EA",
    badgeTextColor: "#FFFFFF",
    trailColor: "rgba(147, 51, 234, 0.35)",
    maxSpeed: 4.9,
    maxForce: 0.17,
    personalRadius: 44,
    leadWeight: 1.3,
  },
];

export const AGENT_STATES = {
  IDLE_WANDER: "IDLE_WANDER",
  APPROACH_TARGET: "APPROACH_TARGET",
  DRAWING_BOX: "DRAWING_BOX",
  PAUSE_AT_TARGET: "PAUSE_AT_TARGET",
  SWARM_FLOCK: "SWARM_FLOCK",
};

