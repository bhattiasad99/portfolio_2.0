"use client";

import {
  RiArrowRightUpLine,
  RiBriefcase4Line,
  RiSparkling2Line,
} from "@remixicon/react";
import { motion, type Variants } from "motion/react";

import { JOB_EXPERIENCES } from "@/config/data";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/custom/common/SectionHeading";
import ExperienceBackground from "@/components/custom/templates/ExperienceBackground";
import ImageTrail from "@/components/custom/cursor/image-trail";
import ExpandableCardComponent, {
  type ExpandableCardItem,
} from "@/components/custom/templates/ExpandableCardComponent";

type ExperienceProps = {
  showContent: boolean;
};

const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeInViewport = {
  once: true,
  amount: 0.8,
};

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

const getMonthLabel = (value: string) => {
  if (value === "Present") {
    return value;
  }

  const [year, month] = value.split("-").map(Number);

  return monthFormatter.format(new Date(year, month - 1));
};

const getCompanyPeriodLabel = (
  positions: (typeof JOB_EXPERIENCES)[number]["positions"]
) => {
  const sortedByStart = [...positions].sort((first, second) =>
    first.start.localeCompare(second.start)
  );
  const sortedByEnd = [...positions].sort((first, second) =>
    second.end.localeCompare(first.end)
  );
  const start = sortedByStart[0]?.start ?? "";
  const end = positions.some((position) => position.end === "Present")
    ? "Present"
    : sortedByEnd[0]?.end ?? "";

  return `${getMonthLabel(start)} - ${getMonthLabel(end)}`;
};

const experienceCards: ExpandableCardItem[] = JOB_EXPERIENCES.map((company) => {
  const latestPosition = company.positions[0];

  return {
    id: company.slug,
    yearLabel: getCompanyPeriodLabel(company.positions),
    companyName: company.company,
    position: latestPosition.title,
    description: [latestPosition.employmentType, company.location].filter(Boolean).join(" · "),
    content: (
      <div className="flex flex-col gap-6">
        {company.positions.map((position) => (
          <article
            key={`${company.slug}-${position.start}-${position.title}`}
            className="border border-[var(--portfolio-line)] bg-white/76 p-5"
          >
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)]">
                {position.periodLabel}
              </p>
              <h4 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--portfolio-text)]">
                {position.title}
              </h4>
              {position.employmentType ? (
                <p className="mt-1 text-sm font-medium text-[var(--portfolio-muted)]">
                  {position.employmentType}
                </p>
              ) : null}
              {position.description ? (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--portfolio-muted)]">
                  {position.description}
                </p>
              ) : null}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {position.achievements.map((achievement) => (
                <div
                  key={achievement.text}
                  className="flex gap-3 border border-[var(--portfolio-line)]/80 bg-[linear-gradient(180deg,rgba(247,248,252,0.92),rgba(255,255,255,0.9))] px-4 py-3"
                >
                  <RiArrowRightUpLine
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--portfolio-primary)]"
                  />
                  <p className="text-sm leading-6 text-[var(--portfolio-text)]/82">
                    {achievement.text}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    ),
  };
});

const Experience = ({ showContent }: ExperienceProps) => {
  return (
    <ExperienceBackground>
      <ImageTrail>
        <section
          id="experience"
          className={cn(
            "relative px-6 py-20 opacity-0 [transform:translateY(72px)] [transition:opacity_780ms_ease,_transform_780ms_cubic-bezier(0.22,1,0.36,1)] sm:px-8 lg:px-12 lg:py-28",
            showContent && "opacity-100 [transform:translateY(0)]"
          )}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
            <div className="flex flex-col gap-8">
              <motion.div
                className="max-w-5xl"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={fadeInViewport}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="inline-flex items-center gap-2 border border-[var(--portfolio-line)] bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)] shadow-[0_14px_44px_rgba(15,23,42,0.08)] backdrop-blur-md">
                  <RiBriefcase4Line size={16} />
                  Experience
                </p>
                <SectionHeading>
                  Shipping <span className="text-[var(--portfolio-primary)]">reliable</span> software{" "}
                  <span className="text-[var(--portfolio-primary)]">systems</span>
                </SectionHeading>
              </motion.div>

              <motion.div
                className="grid gap-4 text-sm text-[var(--portfolio-muted)] md:grid-cols-3"
                variants={cardsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={fadeInViewport}
              >
                <motion.div
                  className="border border-[var(--portfolio-line)] bg-white/72 p-4 shadow-[0_18px_54px_rgba(15,23,42,0.08)] backdrop-blur-md"
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">Years</p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--portfolio-text)]">4+</p>
                  <p className="mt-2 leading-6">Delivering production systems across web applications, backend services, and enterprise workflows.</p>
                </motion.div>
                <motion.div
                  className="border border-[var(--portfolio-line)] bg-white/72 p-4 shadow-[0_18px_54px_rgba(15,23,42,0.08)] backdrop-blur-md"
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">Focus</p>
                  <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[var(--portfolio-text)]">AI, SaaS, ERP</p>
                  <p className="mt-2 leading-6">Engineering systems across AI platforms, SaaS applications, and enterprise operational workflows.</p>
                </motion.div>
                <motion.div
                  className="relative overflow-hidden border border-white/18 bg-[linear-gradient(135deg,#080b12_0%,#1e3a8a_42%,#06b6d4_100%)] p-4 text-white shadow-[0_24px_70px_rgba(14,116,144,0.26)] before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(255,255,255,0.2),rgba(255,255,255,0)_38%,rgba(125,211,252,0.22)_100%)] before:content-[''] after:absolute after:-right-12 after:-top-16 after:size-40 after:bg-[radial-gradient(circle,rgba(255,255,255,0.32),rgba(255,255,255,0)_68%)] after:content-['']"
                  variants={fadeInUpVariants}
                  transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="relative z-10 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/78">
                    <RiSparkling2Line size={14} />
                    Impact
                  </p>
                  <p className="relative z-10 mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">50K+</p>
                  <p className="relative z-10 mt-2 leading-6 text-white/78">50K+ records processed daily through distributed search and background processing systems.</p>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={fadeInViewport}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <ExpandableCardComponent items={experienceCards} />
            </motion.div>
          </div>
        </section>
      </ImageTrail>
    </ExperienceBackground>
  );
};

export default Experience;
