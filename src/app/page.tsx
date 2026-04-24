"use client";

import { useEffect, useState } from "react";

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
    let exitTimeout: ReturnType<typeof window.setTimeout> | undefined;
    let contentTimeout: ReturnType<typeof window.setTimeout> | undefined;
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
    <main className="portfolio-shell">
      {!isComplete && (
        <section
          className={`loader-screen${isExiting ? " loader-screen--exit" : ""}`}
          aria-label="Loading portfolio"
        >
          <div className="loader-screen__inner">
            <p className="loader-screen__label">Loading</p>
            <p className="loader-screen__progress">{progress}%</p>
          </div>
        </section>
      )}

      <section className={`hero${showContent ? " hero--visible" : ""}`}>
        <h1>Hello world</h1>
      </section>
    </main>
  );
}
