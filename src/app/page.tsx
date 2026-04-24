"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./page.module.css";

const TOTAL_DURATION_MS = 2300;
const HOLD_DURATION_MS = 400;
const FILL_DURATION_MS = TOTAL_DURATION_MS - HOLD_DURATION_MS;
const EXIT_DURATION_MS = 700;

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    let exitTimeout: number | undefined;
    let contentTimeout: number | undefined;
    const startTime = performance.now();

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      if (elapsed <= HOLD_DURATION_MS) {
        setProgress(0);
      } else {
        const fillElapsed = Math.min(elapsed - HOLD_DURATION_MS, FILL_DURATION_MS);
        const nextProgress = Math.round((fillElapsed / FILL_DURATION_MS) * 100);
        setProgress(nextProgress);
      }

      if (elapsed < TOTAL_DURATION_MS) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      setProgress(100);
      setIsExiting(true);
      exitTimeout = window.setTimeout(() => {
        setIsComplete(true);
      }, EXIT_DURATION_MS);
      contentTimeout = window.setTimeout(() => {
        setShowContent(true);
      }, 120);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      if (exitTimeout !== undefined) {
        window.clearTimeout(exitTimeout);
      }
      if (contentTimeout !== undefined) {
        window.clearTimeout(contentTimeout);
      }
    };
  }, []);

  return (
    <main className={styles.pageScope}>
      <div className={styles.portfolioShell}>
      {!isComplete && (
        <section
          className={cn(styles.loaderScreen, isExiting && styles.loaderScreenExit)}
          aria-label="Loading portfolio"
        >
          <div className={styles.loaderScreenInner}>
            <p className={styles.loaderScreenLabel}>Loading</p>
            <p className={styles.loaderScreenProgress}>{progress}%</p>
          </div>
        </section>
      )}

      <section className={cn(styles.hero, showContent && styles.heroVisible)}>
        <h1 className={styles.heroTitle}>Hello world</h1>
      </section>
      </div>
    </main>
  );
}
