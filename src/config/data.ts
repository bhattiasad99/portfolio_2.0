export type JobAchievement = {
  text: string;
};

export type JobPosition = {
  title: string;
  start: string;
  end: string;
  periodLabel: string;
  employmentType?: string;
  description?: string;
  achievements: JobAchievement[];
};

export type JobExperience = {
  company: string;
  slug: string;
  location?: string;
  positions: JobPosition[];
};

export const JOB_EXPERIENCES: JobExperience[] = [
  {
    company: "Digital Enterprises",
    slug: "digital-enterprises",
    location: "Doha, Qatar · On-site",
    positions: [
      {
        title: "Senior Full Stack AI Engineer",
        start: "2026-03",
        end: "Present",
        periodLabel: "Mar 2026 - Present · 2 mos",
        employmentType: "Contract",
        description:
          "Building an AI-driven B2B marketplace for the oil and gas industry, focused on intelligent procurement and supplier matching.",
        achievements: [
          {
            text: "Building an AI-driven B2B marketplace for the oil and gas industry, focused on intelligent procurement and supplier matching.",
          },
          {
            text: "Designing and implementing event-driven microservices architecture with async communications and decoupled systems using NestJS, FastAPI, Azure Container Apps, APIM, Entra ID, and other Azure services.",
          },
          {
            text: "Integrating SAP Event Mesh and webhook-based pipelines for real-time data ingestion, system notifications, Azure Service Bus background jobs, and Event Grid workflows.",
          },
          {
            text: "Developing high-performance search systems combining vector search, embeddings, semantic search, LLM-based analysis, and fuzzy matching across million-plus records.",
          },
          {
            text: "Architecting scalable backend systems with Azure Entra ID authentication, Static Web Apps, and cloud-native infrastructure.",
          },
          {
            text: "Implementing CI/CD pipelines with automated deployments, PR-based code reviews, agentic codebots, and environment-based workflows.",
          },
          {
            text: "Building end-to-end full-stack features across frontend and backend, ensuring performance, scalability, and maintainability.",
          },
          {
            text: "Optimizing system performance for low-latency search and high-throughput event processing.",
          },
        ],
      },
    ],
  },
  {
    company: "ZIEL GLOBAL LTD",
    slug: "ziel-global-ltd",
    positions: [
      {
        title: "Senior Software Developer",
        start: "2024-03",
        end: "Present",
        periodLabel: "Mar 2024 - Present",
        description:
          "Designed and delivered production SaaS platforms and distributed systems used by thousands of users.",
        achievements: [
          {
            text: "Built an AI-powered procurement matching platform using microservices and event-driven architecture.",
          },
          {
            text: "Designed search pipelines processing 50,000+ items daily across large datasets.",
          },
          {
            text: "Implemented Redis caching and background job processing to improve system responsiveness.",
          },
          {
            text: "Containerized services using Docker and deployed to Azure with CI/CD pipelines.",
          },
          {
            text: "Improved release reliability by 30% through structured deployment workflows.",
          },
          {
            text: "Delivered scalable APIs supporting real-time data processing and search operations.",
          },
        ],
      },
      {
        title: "Engineering Manager",
        start: "2023-07",
        end: "2024-03",
        periodLabel: "Jul 2023 - Mar 2024",
        description:
          "Led engineering delivery across multiple concurrent products.",
        achievements: [
          {
            text: "Managed delivery across 4 active software products.",
          },
          {
            text: "Introduced engineering workflows improving delivery consistency.",
          },
          {
            text: "Coordinated technical decisions across frontend and backend teams.",
          },
          {
            text: "Ensured production stability during feature releases.",
          },
        ],
      },
      {
        title: "Frontend Developer",
        start: "2022-03",
        end: "2023-07",
        periodLabel: "Mar 2022 - Jul 2023",
        description:
          "Built user-facing platforms with a focus on performance and usability.",
        achievements: [
          {
            text: "Developed an edtech platform used by O and A level students.",
          },
          {
            text: "Built responsive interfaces using React and Next.js.",
          },
          {
            text: "Reduced page load time from 6 seconds to 0.8 seconds.",
          },
          {
            text: "Led client communication for product demos and requirement clarification.",
          },
        ],
      },
    ],
  },
  {
    company: "NISA NURSING HOME",
    slug: "nisa-nursing-home",
    positions: [
      {
        title: "Technical Consultant",
        start: "2023-12",
        end: "2025-04",
        periodLabel: "Dec 2023 - Apr 2025 (Part Time)",
        employmentType: "Part Time",
        description:
          "Designed and deployed a healthcare ERP system used in clinical operations.",
        achievements: [
          {
            text: "Built an on-prem healthcare ERP system with cloud synchronization.",
          },
          {
            text: "Increased regulatory compliance from 52% to 93%.",
          },
          {
            text: "Reduced operational failures and data errors by approximately 60%.",
          },
          {
            text: "Implemented structured data workflows improving operational reliability.",
          },
        ],
      },
    ],
  },
  {
    company: "SOFTWARE APPRENTICESHIP",
    slug: "software-apprenticeship",
    positions: [
      {
        title: "Full Stack Developer",
        start: "2021-04",
        end: "2022-02",
        periodLabel: "Apr 2021 - Feb 2022",
        achievements: [
          {
            text: "Built a stock brokerage admin panel with MERN and Material UI.",
          },
          {
            text: "Developed a TypeScript Express backend for a mobile fitness app.",
          },
          {
            text: "Designed ERDs and Excel-to-plan automation for delivery workflows.",
          },
        ],
      },
    ],
  },
];
