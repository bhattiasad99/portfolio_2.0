"use client";

import Lottie from "lottie-react";
import { Component, type ReactNode, useEffect, useState } from "react";
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import { cn } from "@/lib/utils";
import styles from "./page.module.css";

const PROGRESS_DURATION_MS = 5000;
const COMPLETE_HOLD_DURATION_MS = 400;
const TOTAL_DURATION_MS = PROGRESS_DURATION_MS + COMPLETE_HOLD_DURATION_MS;
const EXIT_DURATION_MS = 700;
const TERMINAL_COMMAND = "npm load asad-zubair-bhatti";
const TERMINAL_OUTPUTS = [
  "✔ Resolving portfolio modules.",
  "✔ Scaffolding experience layers.",
  "✔ Rendering selected work.",
  "✔ Warming up interface animations.",
  "✔ Loading Asad Zubair Bhatti's portfolio.",
];
const COMMAND_START_MS = 120;
const COMMAND_END_MS = 1020;
const OUTPUT_START_MS = 1180;
const OUTPUT_END_MS = 3200;

type LoaderLottieBoundaryProps = {
  children: ReactNode;
  onError: () => void;
};

type LoaderLottieBoundaryState = {
  hasError: boolean;
};

class LoaderLottieBoundary extends Component<
  LoaderLottieBoundaryProps,
  LoaderLottieBoundaryState
> {
  state: LoaderLottieBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): LoaderLottieBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [loadingAnimation, setLoadingAnimation] = useState<object | null>(null);
  const [hasLottieError, setHasLottieError] = useState(false);

  const commandProgress = Math.min(
    Math.max((elapsedMs - COMMAND_START_MS) / (COMMAND_END_MS - COMMAND_START_MS), 0),
    1,
  );
  const typedCommand = TERMINAL_COMMAND.slice(
    0,
    Math.floor(commandProgress * TERMINAL_COMMAND.length),
  );
  const outputProgress = Math.min(
    Math.max((elapsedMs - OUTPUT_START_MS) / (OUTPUT_END_MS - OUTPUT_START_MS), 0),
    1,
  );
  const visibleOutputCount = Math.floor(outputProgress * TERMINAL_OUTPUTS.length);
  const visibleOutputs = TERMINAL_OUTPUTS.slice(0, visibleOutputCount);
  const terminalComplete = elapsedMs >= OUTPUT_END_MS;
  const showCursor = !terminalComplete;

  useEffect(() => {
    let animationFrame = 0;
    let exitTimeout: number | undefined;
    let contentTimeout: number | undefined;
    const startTime = performance.now();

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const fillElapsed = Math.min(elapsed, PROGRESS_DURATION_MS);
      const nextProgress = Math.round((fillElapsed / PROGRESS_DURATION_MS) * 100);
      setElapsedMs(Math.min(elapsed, TOTAL_DURATION_MS));
      setProgress(nextProgress);

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

  useEffect(() => {
    let isCancelled = false;

    const loadAnimation = async () => {
      try {
        const animationModule = await import("../../loading.json");

        if (!isCancelled) {
          setLoadingAnimation(animationModule.default);
        }
      } catch {
        if (!isCancelled) {
          setHasLottieError(true);
        }
      }
    };

    void loadAnimation();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <main className={styles.pageScope}>
      <HexagonBackground
        className={styles.portfolioShell}
        hexagonSize={96}
        hexagonMargin={4}
        hexagonProps={{
          className: styles.portfolioHexagon,
        }}
      >
        {!isComplete && (
          <section
            className={cn(styles.loaderScreen, isExiting && styles.loaderScreenExit)}
            aria-label="Loading portfolio"
          >
            <div className={styles.loaderScreenInner}>
              <div className={styles.loaderScreenTerminalFrame}>
                <div className={styles.loaderScreenTerminalBar}>
                  <div className={styles.loaderScreenTerminalDots} aria-hidden="true">
                    <span className={cn(styles.loaderScreenTerminalDot, styles.loaderScreenTerminalDotRed)} />
                    <span className={cn(styles.loaderScreenTerminalDot, styles.loaderScreenTerminalDotYellow)} />
                    <span className={cn(styles.loaderScreenTerminalDot, styles.loaderScreenTerminalDotGreen)} />
                  </div>
                  <span className={styles.loaderScreenTerminalTitle}>asad-zubair-bhatti — bash</span>
                </div>
                <div className={styles.loaderScreenTerminalBody}>
                  <div className={styles.loaderScreenTerminalLine}>
                    <span className={styles.loaderScreenTerminalPrompt}>
                      <span className={styles.loaderScreenTerminalPromptUser}>Asad-Zubair-Bhatti</span>
                      <span className={styles.loaderScreenTerminalPromptAccent}>:</span>
                      <span className={styles.loaderScreenTerminalPromptPath}>~</span>
                      <span className={styles.loaderScreenTerminalPromptSymbol}>$</span>{" "}
                    </span>
                    <span>{typedCommand}</span>
                    {showCursor ? <span className={styles.loaderScreenTerminalCursor} /> : null}
                  </div>

                  {visibleOutputs.map((line) => (
                    <div
                      key={line}
                      className={cn(
                        styles.loaderScreenTerminalOutput,
                        styles.loaderScreenTerminalOutputVisible,
                      )}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.loaderScreenMeta}>
                {!hasLottieError && loadingAnimation ? (
                  <LoaderLottieBoundary onError={() => setHasLottieError(true)}>
                    <div className={styles.loaderScreenAnimation} aria-hidden="true">
                      <Lottie
                        animationData={loadingAnimation}
                        autoplay
                        loop
                        onDataFailed={() => setHasLottieError(true)}
                        className={styles.loaderScreenAnimationPlayer}
                        rendererSettings={{
                          preserveAspectRatio: "xMidYMid meet",
                        }}
                      />
                    </div>
                  </LoaderLottieBoundary>
                ) : null}
                {/* <p className={styles.loaderScreenLabel}>Loading</p> */}
                <p className={styles.loaderScreenProgress}>{progress}%</p>
              </div>
            </div>
          </section>
        )}

        <section className={cn(styles.hero, showContent && styles.heroVisible)}>
          <h1 className={styles.heroTitle}>Hello world</h1>
        </section>
      </HexagonBackground>
    </main>
  );
}
