// Careers data model per TECHNICAL-DESIGN.md §5.1. Roles mirror the current
// covertdefenses.com/careers openings (shown inline; no external redirect).
// employmentType defaults to Full-Time (not specified on source) — confirm.
export type JobListing = {
  id: string;
  title: string;
  location: string;
  employmentType: "Full-Time" | "Contract" | "Part-Time";
  department: string;
  description: string;
  applyUrl: string;
};

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeLkrtguwl4J0P9leR8Ca-GTPlPWS50pToKN6dlvk4l_HVLow/viewform";

export const jobs: JobListing[] = [
  {
    id: "data-scientist-cim",
    title: "Data Scientist — Critical Infrastructure Modeling & AI/ML",
    location: "Lexington, KY",
    employmentType: "Full-Time",
    department: "Research",
    description:
      "Develop reduced-order models and design AI/ML algorithms that identify patterns within critical infrastructure systems.",
    applyUrl: APPLY_URL,
  },
  {
    id: "fpga-design-engineer",
    title: "Embedded Design Engineer — FPGA Innovation",
    location: "Lexington, KY",
    employmentType: "Full-Time",
    department: "Hardware",
    description:
      "Architect and implement FPGA designs integral to our security devices.",
    applyUrl: APPLY_URL,
  },
  {
    id: "control-system-dev-scada",
    title: "Control System Software Developer — SCADA/PLC Integration",
    location: "Lexington, KY",
    employmentType: "Full-Time",
    department: "Software",
    description:
      "Build secure integration and management for SCADA and PLC systems.",
    applyUrl: APPLY_URL,
  },
  {
    id: "grant-writer-sbir",
    title: "Grant Writer — SBIR/STTR Specialist",
    location: "Lexington, KY",
    employmentType: "Full-Time",
    department: "Business Development",
    description:
      "Craft compelling grant proposals for DoD, NSF, and DOE funding programs.",
    applyUrl: APPLY_URL,
  },
  {
    id: "software-engineer-mobile",
    title: "Software Engineer — Mobile Solutions Architect",
    location: "Lexington, KY",
    employmentType: "Full-Time",
    department: "Software",
    description:
      "Design and deploy intuitive, secure mobile apps across iOS and Android.",
    applyUrl: APPLY_URL,
  },
  {
    id: "controls-engineer-netsec",
    title: "Controls Engineer — Network Security & SCADA Systems",
    location: "Lexington, KY",
    employmentType: "Full-Time",
    department: "Engineering",
    description:
      "Configure SCADA systems and conduct network vulnerability assessments.",
    applyUrl: APPLY_URL,
  },
  {
    id: "simulation-software-engineer",
    title: "Simulation Software Engineer — Nuclear and Beyond",
    location: "Lexington, KY",
    employmentType: "Full-Time",
    department: "Software",
    description:
      "Design, develop, and validate simulation models for nuclear infrastructure.",
    applyUrl: APPLY_URL,
  },
  {
    id: "analog-digital-circuit-designer",
    title: "Analog & Digital Circuit Designer",
    location: "Lexington, KY",
    employmentType: "Full-Time",
    department: "Hardware",
    description:
      "Design analog and digital circuits, including magnetic-induction applications.",
    applyUrl: APPLY_URL,
  },
];

export const departments = [
  "All",
  ...Array.from(new Set(jobs.map((j) => j.department))),
];
