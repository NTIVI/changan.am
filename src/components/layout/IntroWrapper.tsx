"use client";

import { useState, useEffect } from "react";
import { IntroPreloader } from "./IntroPreloader";

export function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if session storage indicates they've already seen the intro
    const hasSeen = sessionStorage.getItem("changan-intro-seen");
    if (hasSeen === "true") {
      setShowIntro(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("changan-intro-seen", "true");
    setShowIntro(false);
  };

  // During SSR and initial mount, render preloader if showIntro is true
  if (!mounted) {
    // Return the preloader in SSR so there is no flash of content
    return (
      <>
        {showIntro && <IntroPreloader onComplete={handleComplete} />}
        <div style={{ opacity: 0 }}>{children}</div>
      </>
    );
  }

  return (
    <>
      {showIntro && <IntroPreloader onComplete={handleComplete} />}
      <div className={showIntro ? "invisible pointer-events-none h-screen overflow-hidden" : ""}>
        {children}
      </div>
    </>
  );
}
