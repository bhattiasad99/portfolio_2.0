"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

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

const CardMark = ({ item }: { item: ExpandableCardItem }) => {
  if (item.imageSrc) {
    return (
      <div
        aria-label={item.imageAlt ?? `${item.companyName} visual`}
        role="img"
        className="h-20 w-20 bg-cover bg-top md:h-14 md:w-14"
        style={{ backgroundImage: `url(${item.imageSrc})` }}
      />
    );
  }

  return (
    <div className="grid h-20 w-20 place-items-center bg-[var(--portfolio-text)] text-lg font-semibold text-white md:h-14 md:w-14 md:text-base">
      {item.companyName.slice(0, 1)}
    </div>
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
          if (!open) {
            setActive(null);
          }
        }}
        title={active?.companyName}
        description={active?.position}
        className={cn("shadow-[0_34px_100px_rgba(15,23,42,0.22)]", expandedCardClassName)}
        contentClassName="max-h-[80dvh]"
      >
        {active ? (
          <div className="flex max-h-[80dvh] flex-col">
            <div className="shrink-0 border-b border-[var(--portfolio-line)] bg-[linear-gradient(180deg,rgba(247,248,252,0.96),rgba(255,255,255,0.92))] p-6 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="shrink-0 overflow-hidden border border-[var(--portfolio-line)]">
                    <CardMark item={active} />
                  </div>

                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)]">
                      {active.yearLabel}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--portfolio-text)]">
                      {active.companyName}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-[var(--portfolio-muted)]">
                      {active.position}
                    </p>
                  </div>
                </div>

                {active.ctaText && active.ctaLink ? (
                  <a
                    href={active.ctaLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit bg-[var(--portfolio-text)] px-4 py-3 text-sm font-bold text-white"
                  >
                    {active.ctaText}
                  </a>
                ) : null}
              </div>

              {active.description ? (
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--portfolio-muted)]">
                  {active.description}
                </p>
              ) : null}
            </div>

            {active.content ? (
              <div className="min-h-0 overflow-y-auto px-6 py-6 text-sm leading-7 text-[var(--portfolio-text)]/82 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] md:px-8">
                {renderCardContent(active.content)}
              </div>
            ) : null}
          </div>
        ) : null}
      </ModalComponent>

      <ul className={cn("flex w-full flex-col gap-3", listClassName)}>
        {items.map((item) => (
          <motion.li
            key={item.id}
            onClick={() => setActive(item)}
            className={cn(
              "flex cursor-pointer flex-col gap-4 border border-[var(--portfolio-line)] bg-white/78 p-4 shadow-[0_16px_50px_rgba(15,23,42,0.07)] backdrop-blur-md transition-colors hover:bg-white md:flex-row md:items-center md:justify-between",
              cardClassName
            )}
          >
            <div className="flex min-w-0 gap-4">
              <div className="shrink-0 overflow-hidden border border-[var(--portfolio-line)]">
                <CardMark item={item} />
              </div>

              <div className="min-w-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)]">
                  {item.yearLabel}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.04em] text-[var(--portfolio-text)]">
                  {item.companyName}
                </h3>
                <p className="mt-1 text-sm font-medium text-[var(--portfolio-muted)]">
                  {item.position}
                </p>
              </div>
            </div>

            <motion.button
              className="w-fit border border-[var(--portfolio-line)] bg-[var(--portfolio-bg)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--portfolio-text)] transition-colors hover:border-[var(--portfolio-text)] hover:bg-[var(--portfolio-text)] hover:text-white"
              type="button"
            >
              View
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ExpandableCardComponent;
