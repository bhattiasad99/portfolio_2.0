"use client";

import { useEffect, useRef, useState } from "react";
import {
  RiBriefcase4Line,
  RiSparkling2Line,
  RiTimeLine,
  RiCodeSSlashLine,
  RiArrowRightUpLine,
} from "@remixicon/react";
import { motion, useInView, type Variants } from "motion/react";

import { JOB_EXPERIENCES } from "@/config/data";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/custom/common/SectionHeading";
import ExperienceBackground from "@/components/custom/templates/ExperienceBackground";
// import ImageTrail from "@/components/custom/cursor/image-trail"; // GSAP cursor effect — uncomment to re-enable
import ExpandableCardComponent, {
  type ExpandableCardItem,
} from "@/components/custom/templates/ExpandableCardComponent";

type ExperienceProps = {
  showContent: boolean;
};

// ─────────────────────────── animation variants ───────────────────────────

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const fadeInViewport = { once: true, amount: 0.1 };

// ─────────────────────────── date helpers ───────────────────────────

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

const getMonthLabel = (value: string) => {
  if (value === "Present") return value;
  const [year, month] = value.split("-").map(Number);
  return monthFormatter.format(new Date(year, month - 1));
};

const getCompanyPeriodLabel = (
  positions: (typeof JOB_EXPERIENCES)[number]["positions"]
) => {
  const sortedByStart = [...positions].sort((a, b) =>
    a.start.localeCompare(b.start)
  );
  const sortedByEnd = [...positions].sort((a, b) =>
    b.end.localeCompare(a.end)
  );
  const start = sortedByStart[0]?.start ?? "";
  const end = positions.some((p) => p.end === "Present")
    ? "Present"
    : sortedByEnd[0]?.end ?? "";
  return `${getMonthLabel(start)} – ${getMonthLabel(end)}`;
};

// ─────────────────────────── animated counter ───────────────────────────

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
}

// ─────────────────────────── stat card ───────────────────────────

type StatCardProps = {
  label: string;
  value: number;
  suffix?: string;
  subtext: string;
  icon: React.ReactNode;
  accent?: boolean;
  delay?: number;
  textValue?: string; // override numeric counter with static text
};

const StatCard = ({
  label,
  value,
  suffix = "",
  subtext,
  icon,
  accent = false,
  delay = 0,
  textValue,
}: StatCardProps) => {
  const { count, ref } = useCountUp(textValue ? 0 : value);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden border p-5 shadow-[0_18px_54px_rgba(15,23,42,0.08)]",
        accent
          ? "border-white/18 bg-[linear-gradient(135deg,#080b12_0%,#1e3a8a_42%,#06b6d4_100%)] text-white"
          : "border-[var(--portfolio-line)] bg-white/80 backdrop-blur-md text-[var(--portfolio-text)]"
      )}
      variants={fadeInUpVariants}
      transition={{ duration: 0.66, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Decorative sheen on accent card */}
      {accent && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_38%,rgba(125,211,252,0.22)_100%)]" />
          <div className="pointer-events-none absolute -right-12 -top-16 size-40 bg-[radial-gradient(circle,rgba(255,255,255,0.28),rgba(255,255,255,0)_68%)]" />
          {/* Animated shimmer line */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
            }}
            animate={{ backgroundPositionX: ["200%", "-100%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
          />
        </>
      )}

      {/* Icon */}
      <div
        className={cn(
          "relative z-10 mb-3 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em]",
          accent ? "text-white/70" : "text-[var(--portfolio-muted)]"
        )}
      >
        {icon}
        {label}
      </div>

      {/* Number / text value */}
      {textValue ? (
        <p
          className={cn(
            "relative z-10 text-2xl font-semibold tracking-[-0.04em] leading-snug",
            accent ? "text-white" : "text-[var(--portfolio-text)]"
          )}
        >
          {textValue}
        </p>
      ) : (
        <p
          ref={ref as React.RefObject<HTMLParagraphElement>}
          className={cn(
            "relative z-10 text-4xl font-semibold tracking-[-0.06em]",
            accent ? "text-white" : "text-[var(--portfolio-text)]"
          )}
        >
          <span>{count}</span>
          {suffix}
        </p>
      )}

      {/* Subtext */}
      <p
        className={cn(
          "relative z-10 mt-2 text-sm leading-6",
          accent ? "text-white/72" : "text-[var(--portfolio-muted)]"
        )}
      >
        {subtext}
      </p>
    </motion.div>
  );
};

// ─────────────────────────── experience cards data ───────────────────────────

const experienceCards: ExpandableCardItem[] = JOB_EXPERIENCES.map((company) => {
  const latestPosition = company.positions[0];

  return {
    id: company.slug,
    yearLabel: getCompanyPeriodLabel(company.positions),
    companyName: company.company,
    position: latestPosition.title,
    imageSrc: company.logo,
    description: [latestPosition.employmentType, company.location]
      .filter(Boolean)
      .join(" · "),
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

// ─────────────────────────── main component ───────────────────────────

const Experience = ({ showContent }: ExperienceProps) => {
  return (
    <ExperienceBackground>
      {/* <ImageTrail> */} {/* GSAP cursor effect — uncomment to re-enable */}
      <section
        id="experience"
        className={cn(
          "relative px-6 py-20 opacity-0 [transform:translateY(72px)] [transition:opacity_780ms_ease,_transform_780ms_cubic-bezier(0.22,1,0.36,1)] sm:px-8 lg:px-12 lg:py-28",
          showContent && "opacity-100 [transform:translateY(0)]"
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">

          {/* ── Heading ── */}
          <div className="flex flex-col gap-6">
            <motion.div
              className="max-w-5xl"
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={fadeInViewport}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow pill */}
              <p className="inline-flex items-center gap-2 border border-[var(--portfolio-line)] bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)] shadow-[0_14px_44px_rgba(15,23,42,0.08)] backdrop-blur-md">
                <RiBriefcase4Line size={16} />
                Experience
              </p>
              <SectionHeading>
                Shipping{" "}
                <span className="text-[var(--portfolio-primary)]">reliable</span>{" "}
                software{" "}
                <span className="text-[var(--portfolio-primary)]">systems</span>
              </SectionHeading>
            </motion.div>

            {/* ── Stats row ── */}
            <motion.div
              className="grid gap-4 text-sm text-[var(--portfolio-muted)] md:grid-cols-3"
              variants={cardsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={fadeInViewport}
            >
              <StatCard
                label="Years"
                value={4}
                suffix="+"
                subtext="Delivering production systems across web applications, backend services, and enterprise workflows."
                icon={<RiTimeLine size={14} />}
              />
              <StatCard
                label="Focus"
                value={0}
                textValue="AI · SaaS · ERP"
                subtext="AI platforms · SaaS applications · Enterprise ERP workflows."
                icon={<RiCodeSSlashLine size={14} />}
                delay={0.06}
              />
              <StatCard
                label="Impact"
                value={50}
                suffix="K+"
                subtext="Records processed daily through distributed search and background processing systems."
                icon={<RiSparkling2Line size={14} />}
                accent
                delay={0.12}
              />
            </motion.div>
          </div>

          {/* ── Timeline ── */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <ExpandableCardComponent items={experienceCards} />
          </motion.div>
        </div>
      </section>
      {/* </ImageTrail> */} {/* GSAP cursor effect — uncomment to re-enable */}
    </ExperienceBackground>
  );
};

export default Experience;
