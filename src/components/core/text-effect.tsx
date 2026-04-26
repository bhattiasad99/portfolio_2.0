"use client";

import { ElementType } from "react";
import { motion, Variants } from "motion/react";

import { cn } from "@/lib/utils";

type TextEffectVariants = {
  container?: Variants;
  item?: Variants;
};

type TextEffectProps = {
  as?: ElementType;
  children: string;
  className?: string;
  per?: "word" | "char" | "line";
  preset?: "blur";
  segmentWrapperClassName?: string;
  variants?: TextEffectVariants;
};

const blurVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "0.35em",
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
  },
};

export function TextEffect({
  as: Component = "span",
  children,
  className,
  per = "word",
  preset = "blur",
  segmentWrapperClassName,
  variants: customVariants,
}: TextEffectProps) {
  const parts =
    per === "line"
      ? children.split("\n")
      : per === "word"
        ? children.split(" ")
        : Array.from(children);
  const itemVariants = customVariants?.item ?? (preset === "blur" ? blurVariants : blurVariants);
  const containerVariants = customVariants?.container;

  return (
    <Component className={className}>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        className={cn(per === "line" ? "block" : "inline-flex flex-wrap")}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={containerVariants ? undefined : { staggerChildren: 0.08, delayChildren: 0.08 }}
      >
        {parts.map((part, index) => (
          <motion.span
            key={`${part}-${index}`}
            className={cn(
              "will-change-[filter,transform,opacity]",
              per === "line" ? "block" : "inline-block",
              per === "word" && "mr-[0.18em]",
              segmentWrapperClassName,
            )}
            variants={itemVariants}
            transition={
              customVariants?.item
                ? undefined
                : {
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            {part}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
