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
  edimCover: { src: "/edim-cover.jpg", alt: "Modern nuclear power plant control room at dusk with advanced analytical displays." },
  edimSupport1: { src: "/edim-support-1.jpg", alt: "Glowing nuclear reactor core in blue Cherenkov radiation." },
  edimSupport2: { src: "/edim-support-2.jpg", alt: "Sophisticated data analytics software on a sleek control room monitor." },
  enadoxCover: { src: "/enadox-cover.jpg", alt: "Dark, sleek 3D visualization of secure communications and cybersecurity." },
  enadoxSupport1: { src: "/enadox-support-1.jpg", alt: "Ruggedized tactical communications device in a dark defense environment." },
  enadoxSupport2: { src: "/enadox-support-2.jpg", alt: "Glowing blue fiber optic cables representing secure network infrastructure." },
  homeEnergy: { src: "/home-energy.jpg", alt: "Modern energy infrastructure facility at night." },
  homeDefense: { src: "/home-defense.jpg", alt: "Stealthy military drone in flight over mountains." },
  homeFinance: { src: "/home-finance.jpg", alt: "Abstract digital financial data visualization." },
  homeAi: { src: "/home-ai.jpg", alt: "AI supercomputer data center with glowing lights." },
  aboutHero: { src: "/about-hero.jpg", alt: "Engineers discussing analytical data in a high-tech lab." },
} as const;
