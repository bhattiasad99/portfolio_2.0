import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

const SectionHeading = ({ children, className, ...props }: SectionHeadingProps) => {
  return (
    <h2
      className={cn(
        "mt-5 text-balance text-[clamp(1.5rem,4vw,3rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[var(--portfolio-text)]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export default SectionHeading;
