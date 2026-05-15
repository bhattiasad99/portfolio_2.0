"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { RiArrowRightUpLine, RiExternalLinkLine } from "@remixicon/react";

import { cn } from "@/lib/utils";
import ModalComponent from "@/components/custom/common/ModalComponent";

export type ExpandableCardItem = {
  id: string;
  yearLabel: string;
  companyName: string;
  position: string;
  description?: string;
  content?: React.ReactNode | (() => React.ReactNode);
  imageSrc?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
};

type ExpandableCardComponentProps = {
  items: ExpandableCardItem[];
  className?: string;
  listClassName?: string;
  cardClassName?: string;
  expandedCardClassName?: string;
  emptyState?: React.ReactNode;
};

const renderCardContent = (content: ExpandableCardItem["content"]) => {
  return typeof content === "function" ? content() : content;
};

// Animated dot marker for the timeline
const TimelineDot = ({ index, isActive }: { index: number; isActive: boolean }) => (
  <motion.div
    className="relative flex items-center justify-center"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.08 + 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Outer ring pulse on hover/active */}
    <motion.div
      className={cn(
        "absolute size-8 rounded-full border transition-colors duration-300",
        isActive
          ? "border-[var(--portfolio-primary)]/40 bg-[var(--portfolio-primary)]/8"
          : "border-[var(--portfolio-line)] bg-transparent"
      )}
      animate={isActive ? { scale: [1, 1.25, 1] } : { scale: 1 }}
      transition={{ duration: 1.4, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
    />
    {/* Inner dot */}
    <motion.div
      className={cn(
        "relative z-10 size-3 rounded-full border-2 transition-colors duration-300",
        isActive
          ? "border-[var(--portfolio-primary)] bg-[var(--portfolio-primary)]"
          : "border-[var(--portfolio-muted)]/60 bg-white"
      )}
    />
  </motion.div>
);

// Company monogram / image mark
const CardMark = ({ item, size = "sm" }: { item: ExpandableCardItem; size?: "sm" | "md" }) => {
  const sizeClasses = size === "sm"
    ? "h-10 w-10 text-sm"
    : "h-14 w-14 text-base";

  if (item.imageSrc) {
    return (
      <div
        aria-label={item.imageAlt ?? `${item.companyName} logo`}
        role="img"
        className={cn("bg-cover bg-center", sizeClasses)}
        style={{ backgroundImage: `url("${item.imageSrc}")` }}
      />
    );
  }

  // Generate a subtle color from the company name
  const hue = item.companyName
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;

  return (
    <div
      className={cn(
        "grid place-items-center font-bold text-white",
        sizeClasses
      )}
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 60%, 32%), hsl(${(hue + 40) % 360}, 70%, 22%))`,
      }}
    >
      {item.companyName.slice(0, 1)}
    </div>
  );
};

// Individual timeline card row
const TimelineCard = ({
  item,
  index,
  isLast,
  onClick,
}: {
  item: ExpandableCardItem;
  index: number;
  isLast: boolean;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline spine + dot */}
      <div className="relative flex flex-col items-center">
        <TimelineDot index={index} isActive={isHovered} />
        {!isLast && (
          <motion.div
            className="mt-2 w-px flex-1 bg-gradient-to-b from-[var(--portfolio-line)] to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>

      {/* Card content */}
      <div
        className="group mb-6 min-w-0 flex-1 cursor-pointer pb-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Period label */}
        <p className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)]">
          {item.yearLabel}
        </p>

        {/* Main card */}
        <motion.div
          className={cn(
            "relative overflow-hidden border border-[var(--portfolio-line)] bg-white/80 backdrop-blur-md",
            "shadow-[0_2px_16px_rgba(15,23,42,0.06)] transition-shadow duration-300",
            "group-hover:shadow-[0_8px_40px_rgba(15,23,42,0.12)]"
          )}
          animate={{
            borderColor: isHovered
              ? "rgba(99,102,241,0.25)"
              : "var(--portfolio-line)",
          }}
          transition={{ duration: 0.25 }}
        >
          {/* Shimmer overlay on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
          />

          <div className="flex items-start justify-between gap-4 p-5">
            <div className="flex min-w-0 gap-4">
              {/* Monogram / logo */}
              <div className="h-fit shrink-0 overflow-hidden border border-[var(--portfolio-line)]">
                <CardMark item={item} size="sm" />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3 className="text-lg font-semibold leading-tight tracking-[-0.04em] text-[var(--portfolio-text)]">
                  {item.companyName}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-[var(--portfolio-muted)]">
                  {item.position}
                </p>
                {item.description && (
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--portfolio-muted)]/80">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            {/* CTA arrow */}
            <motion.div
              className="mt-0.5 shrink-0 border border-[var(--portfolio-line)] p-1.5 text-[var(--portfolio-muted)] transition-colors"
              animate={{
                backgroundColor: isHovered ? "var(--portfolio-text)" : "rgba(0, 0, 0, 0)",
                borderColor: isHovered ? "var(--portfolio-text)" : "var(--portfolio-line)",
                color: isHovered ? "#fff" : "var(--portfolio-muted)",
              }}
              transition={{ duration: 0.2 }}
            >
              <RiExternalLinkLine size={14} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ExpandableCardComponent = ({
  items,
  className,
  listClassName,
  cardClassName,
  expandedCardClassName,
  emptyState = null,
}: ExpandableCardComponentProps) => {
  const [active, setActive] = useState<ExpandableCardItem | null>(null);

  if (items.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className={className}>
      <ModalComponent
        open={Boolean(active)}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
        title={active?.companyName}
        description={active?.position}
        className={cn("shadow-[0_34px_100px_rgba(15,23,42,0.22)]", expandedCardClassName)}
        contentClassName="max-h-[80dvh]"
      >
        {active ? (
          <div className="flex max-h-[80dvh] flex-col">
            {/* Modal header */}
            <div className="shrink-0 border-b border-[var(--portfolio-line)] bg-[linear-gradient(160deg,rgba(247,248,252,0.98),rgba(255,255,255,0.94))] p-6 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="h-fit shrink-0 overflow-hidden border border-[var(--portfolio-line)]">
                    <CardMark item={active} size="md" />
                  </div>
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)]">
                      {active.yearLabel}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--portfolio-text)]">
                      {active.companyName}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-[var(--portfolio-muted)]">
                      {active.position}
                    </p>
                  </div>
                </div>
                {active.ctaText && active.ctaLink ? (
                  <a
                    href={active.ctaLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 bg-[var(--portfolio-text)] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-80"
                  >
                    {active.ctaText}
                    <RiArrowRightUpLine size={14} />
                  </a>
                ) : null}
              </div>
              {active.description ? (
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--portfolio-muted)]">
                  {active.description}
                </p>
              ) : null}
            </div>
            {/* Modal body */}
            {active.content ? (
              <div className="min-h-0 overflow-y-auto px-6 py-6 text-sm leading-7 text-[var(--portfolio-text)]/82 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] md:px-8">
                {renderCardContent(active.content)}
              </div>
            ) : null}
          </div>
        ) : null}
      </ModalComponent>

      {/* Timeline list */}
      <div className={cn("relative", listClassName)}>
        {items.map((item, index) => (
          <TimelineCard
            key={item.id}
            item={item}
            index={index}
            isLast={index === items.length - 1}
            onClick={() => setActive(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpandableCardComponent;
