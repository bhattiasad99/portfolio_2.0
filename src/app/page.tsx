"use client";

import { useCallback, useState } from "react";
import LoadingScreen from "@/components/use-case/LoadingScreen";
import Hero from "@/components/use-case/Hero";
import Experience from "@/components/use-case/Experience";
import { usePortfolioMedia } from "@/hooks/use-portfolio-media";

export default function Home() {
  const media = usePortfolioMedia();
  const [showContent, setShowContent] = useState(false);
  const handleRevealContent = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <main className="portfolio-page-scope min-h-dvh text-[var(--portfolio-text)]">
      <LoadingScreen
        onRevealContent={handleRevealContent}
        assetProgress={media.progress}
        ready={media.settled}
        degraded={media.degraded}
      />
      <Hero showContent={showContent} media={media} />
      <Experience showContent={showContent} />
    </main>
  );
}
