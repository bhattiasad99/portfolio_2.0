"use client";

import {
  RiArrowRightUpLine,
  RiBriefcase4Line,
  RiBuilding2Line,
  RiSparkling2Line,
} from "@remixicon/react";
import { motion, type Variants } from "motion/react";

import { JOB_EXPERIENCES } from "@/config/data";
import { cn } from "@/lib/utils";
import ExperienceBackground from "@/components/custom/templates/ExperienceBackground";
import ImageTrail from "@/components/custom/cursor/image-trail";

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
                <h2 className="mt-5 text-balance text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[var(--portfolio-text)]">
                  Building products across frontend, AI systems, and delivery leadership.
                </h2>
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
                <p className="mt-2 leading-6">Professional product engineering across web, platform, and operational systems.</p>
              </motion.div>
              <motion.div
                className="border border-[var(--portfolio-line)] bg-white/72 p-4 shadow-[0_18px_54px_rgba(15,23,42,0.08)] backdrop-blur-md"
                variants={fadeInUpVariants}
                transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">Focus</p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[var(--portfolio-text)]">AI, SaaS, ERP</p>
                <p className="mt-2 leading-6">From procurement matching and search to healthcare operations and edtech platforms.</p>
              </motion.div>
              <motion.div
                className="border border-[var(--portfolio-line)] bg-[var(--portfolio-text)] p-4 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
                variants={fadeInUpVariants}
                transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/60">
                  <RiSparkling2Line size={14} />
                  Impact
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.05em]">50K+</p>
                <p className="mt-2 leading-6 text-white/70">Daily search items processed, with measurable performance and release improvements.</p>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute left-[15px] top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(69,110,255,0.28),rgba(12,20,34,0.14),transparent)] md:block" />
            <div className="flex flex-col gap-8">
              {JOB_EXPERIENCES.map((company) => (
                <article
                  key={company.slug}
                  className="relative overflow-hidden border border-[var(--portfolio-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.72))] shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(69,110,255,0.7),transparent)]" />
                  <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                    <div className="relative">
                      <div className="hidden md:absolute md:left-[-33px] md:top-2 md:block md:size-8 md:rounded-full md:border md:border-[var(--portfolio-primary)]/25 md:bg-white md:shadow-[0_0_0_6px_rgba(255,255,255,0.8)]">
                        <div className="absolute inset-2 bg-[var(--portfolio-primary)]" />
                      </div>
                      <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)]">
                        <RiBuilding2Line size={15} />
                        Company
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--portfolio-text)]">
                        {company.company}
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {company.positions.map((position, index) => (
                        <div
                          key={`${company.slug}-${position.title}-${position.start}`}
                          className={cn(
                            "grid gap-5 border border-[var(--portfolio-line)] bg-white/76 p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]",
                            index === 0 && "ring-1 ring-[var(--portfolio-primary)]/15"
                          )}
                        >
                          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                            <div>
                              <p className="text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-[var(--portfolio-text)]">
                                {position.title}
                              </p>
                              {position.description ? (
                                <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--portfolio-muted)]">
                                  {position.description}
                                </p>
                              ) : null}
                            </div>

                            <div className="w-fit border border-[var(--portfolio-line)] bg-[var(--portfolio-bg)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--portfolio-text)]">
                              {position.periodLabel}
                            </div>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
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
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          </div>
        </section>
      </ImageTrail>
    </ExperienceBackground>
  );
};

export default Experience;
