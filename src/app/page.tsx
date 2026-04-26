"use client";

import { useCallback, useState } from "react";
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import LoadingScreen from "@/components/use-case/LoadingScreen";
import { cn } from "@/lib/utils";
import styles from "./page.module.css";
import Hero from "@/components/use-case/Hero";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const handleRevealContent = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <main className={styles.pageScope}>
      <LoadingScreen onRevealContent={handleRevealContent} />
      <HexagonBackground
        className={styles.portfolioShell}
        hexagonSize={96}
        hexagonMargin={4}
        hexagonProps={{
          className: styles.portfolioHexagon,
        }}
      >
        <Hero showContent={showContent} />
      </HexagonBackground>
    </main>
  );
}
