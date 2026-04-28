"use client";

import { useCallback, useState } from "react";
import LoadingScreen from "@/components/use-case/LoadingScreen";
import Hero from "@/components/use-case/Hero";
import Experience from "@/components/use-case/Experience";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const handleRevealContent = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <main className="portfolio-page-scope min-h-dvh text-[var(--portfolio-text)]">
      <LoadingScreen onRevealContent={handleRevealContent} />
      <Hero showContent={showContent} />
      <Experience showContent={showContent} />
    </main>
  );
}
