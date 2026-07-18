// Central media manifest — all imagery is owned/optimized in /public (see
// docs/ASSETS.md). Reference by semantic key so pages never hardcode paths.
export const media = {
  heroVideo: { src: "/hero.mp4", poster: "/hero-poster.jpg" },
  nuclear: {
    src: "/hero-infrastructure.jpg",
    alt: "Nuclear power plant cooling towers releasing steam against a blue sky.",
  },
  dataCenter: {
    src: "/data-center.jpg",
    alt: "Network cabling neatly organized in a data center.",
  },
  operations: {
    src: "/operations.jpg",
    alt: "Operations center with a wall of illuminated data displays.",
  },
  controlRoom: {
    src: "/nuclear-control-room.jpg",
    alt: "Nuclear power plant control room with analyst workstations and instrumentation panels.",
  },
  comms: {
    src: "/comms.jpg",
    alt: "Satellite communications dish under an open sky.",
  },
  drone: {
    src: "/drone.jpg",
    alt: "Unmanned aerial vehicle in flight against a clear sky.",
  },
  energy: {
    src: "/energy.jpg",
    alt: "High-voltage electricity transmission towers.",
  },
  team: {
    src: "/team.jpg",
    alt: "Two engineers collaborating at a workstation.",
  },
} as const;
