"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ModalComponentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  showCloseButton?: boolean;
  hideHeader?: boolean;
};

const ModalComponent = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  className,
  contentClassName,
  headerClassName,
  showCloseButton = true,
  hideHeader = true,
}: ModalComponentProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(
          "max-h-[80dvh] max-w-4xl gap-0 overflow-hidden rounded-none bg-white p-0 text-[var(--portfolio-text)] sm:max-w-4xl",
          className
        )}
      >
        <DialogHeader
          className={cn(
            hideHeader && "sr-only",
            headerClassName
          )}
        >
          <DialogTitle>{title ?? "Modal"}</DialogTitle>
          <DialogDescription>{description ?? "Dialog content"}</DialogDescription>
        </DialogHeader>

        <div className={cn("min-h-0", contentClassName)}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalComponent;
