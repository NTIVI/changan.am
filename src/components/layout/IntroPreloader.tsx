"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroPreloader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0); // 0: Init, 1: Text Fade, 2: DRL Trace, 3: Headlights Turn On, 4: Transition Out

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Cinematic animation timeline
    const textTimer = setTimeout(() => setStep(1), 300); // 0.3s -> Text begins to fade in
    const traceTimer = setTimeout(() => setStep(2), 1600); // 1.6s -> Headlight outlines start tracing
    const turnOnTimer = setTimeout(() => setStep(3), 3000); // 3.0s -> Projectors flash and turn on
    const fadeOutTimer = setTimeout(() => setStep(4), 4800); // 4.8s -> Preloader starts fading out
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, 5500); // 5.5s -> Completely finished

    return () => {
      clearTimeout(textTimer);
      clearTimeout(traceTimer);
      clearTimeout(turnOnTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  // Handle skip button click
  const handleSkip = () => {
    document.body.style.overflow = "";
    onComplete();
  };

  // SVG drawing properties for framer-motion path animation
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.9,
      transition: {
        pathLength: { duration: 1.4, ease: "easeInOut" as const },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <AnimatePresence>
      {step < 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.96,
            filter: "blur(8px)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Ambient Premium Dark Glow (Deep Red/Amber Brand Accent) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.06)_0%,rgba(0,0,0,1)_85%)] pointer-events-none" />

          {/* Visual Elements Container - Responsive aspect ratios for mobile compatibility */}
          <div className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-[16/7] flex items-center justify-center px-6 sm:px-4 scale-105 sm:scale-100 transition-all duration-500">
            
            {/* SVG Overlay for Lights - Scales beautifully on mobile */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 scale-[1.25] sm:scale-100 transition-transform duration-700"
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Gradients Definitions */}
              <defs>
                {/* Left Headlight Projector Beam Gradient (Ultra Cool Premium White) */}
                <radialGradient id="leftBeam" cx="300" cy="190" r="160" fx="300" fy="190" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="25%" stopColor="#f8fafc" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#cbd5e1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>

                {/* Right Headlight Projector Beam Gradient (Ultra Cool Premium White) */}
                <radialGradient id="rightBeam" cx="700" cy="190" r="160" fx="700" fy="190" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="25%" stopColor="#f8fafc" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#cbd5e1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>

                {/* Metallic Chrome Logo Gradient */}
                <linearGradient id="logoGradient" x1="455" y1="120" x2="545" y2="175" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#e2e8f0" stopOpacity="0.6" />
                  <stop offset="70%" stopColor="#94a3b8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.1" />
                </linearGradient>

                {/* Headlight Outline Glow Filter */}
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                {/* Intense Projector Glow Filter */}
                <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Central Logo (Changan V Shield) - Minimalist Metallic Appearance */}
              <motion.g
                initial={{ opacity: 0, scale: 0.85 }}
                animate={step >= 1 ? { opacity: 0.12, scale: 1 } : {}}
                transition={{ duration: 1.8, ease: "easeOut" }}
              >
                {/* Outer decorative ring */}
                <circle cx="500" cy="145" r="42" stroke="white" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.3" />
                <circle cx="500" cy="145" r="50" stroke="white" strokeWidth="1" opacity="0.15" />
                
                {/* Brand V Shield logo */}
                <path
                  d="M 465,125 L 500,160 L 535,125 L 545,125 L 500,175 L 455,125 Z"
                  fill="url(#logoGradient)"
                />
              </motion.g>

              {/* Headlight Outlines (DRLs) - Pure Ice White / Premium Silver */}
              <g filter="url(#neonGlow)">
                {/* Left LED Strip Upper */}
                <motion.path
                  d="M 380,180 L 280,180 L 160,150 L 120,130"
                  stroke="#ffffff"
                  strokeWidth="3.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                />
                
                {/* Left LED Strip Lower */}
                <motion.path
                  d="M 350,200 L 260,200 L 180,180 L 140,160"
                  stroke="#f1f5f9"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                  transition={{ delay: 0.15 }}
                />

                {/* Left Side Bumper Accents (Vertical LED Slats) */}
                <motion.path
                  d="M 110,160 L 95,200 M 120,170 L 108,210 M 130,180 L 120,220"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                  transition={{ delay: 0.3 }}
                />

                {/* Right LED Strip Upper */}
                <motion.path
                  d="M 620,180 L 720,180 L 840,150 L 880,130"
                  stroke="#ffffff"
                  strokeWidth="3.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                />

                {/* Right LED Strip Lower */}
                <motion.path
                  d="M 650,200 L 740,200 L 820,180 L 860,160"
                  stroke="#f1f5f9"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                  transition={{ delay: 0.15 }}
                />

                {/* Right Side Bumper Accents (Vertical LED Slats) */}
                <motion.path
                  d="M 890,160 L 905,200 M 880,170 L 892,210 M 870,180 L 880,220"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                  transition={{ delay: 0.3 }}
                />
              </g>

              {/* Volumetric Headlight Beams - Turn On in Step 3 */}
              <AnimatePresence>
                {step >= 3 && (
                  <g>
                    {/* Left Volumetric Light Beam */}
                    <motion.ellipse
                      cx="300"
                      cy="190"
                      rx="150"
                      ry="70"
                      fill="url(#leftBeam)"
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{
                        opacity: [0, 0.9, 0.8, 0.85],
                        scale: [0.3, 1.1, 0.98, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        times: [0, 0.25, 0.5, 1],
                        ease: "easeOut",
                      }}
                      className="mix-blend-screen"
                    />

                    {/* Right Volumetric Light Beam */}
                    <motion.ellipse
                      cx="700"
                      cy="190"
                      rx="150"
                      ry="70"
                      fill="url(#rightBeam)"
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{
                        opacity: [0, 0.9, 0.8, 0.85],
                        scale: [0.3, 1.1, 0.98, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        times: [0, 0.25, 0.5, 1],
                        ease: "easeOut",
                      }}
                      className="mix-blend-screen"
                    />
                    
                    {/* Left Anamorphic Lens Flare */}
                    <motion.ellipse
                      cx="300"
                      cy="190"
                      rx="400"
                      ry="1.5"
                      fill="#ffffff"
                      initial={{ opacity: 0, scaleX: 0.1 }}
                      animate={{ opacity: [0, 0.8, 0.5], scaleX: [0.1, 1.2, 1] }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="mix-blend-screen"
                      filter="url(#intenseGlow)"
                    />

                    {/* Right Anamorphic Lens Flare */}
                    <motion.ellipse
                      cx="700"
                      cy="190"
                      rx="400"
                      ry="1.5"
                      fill="#ffffff"
                      initial={{ opacity: 0, scaleX: 0.1 }}
                      animate={{ opacity: [0, 0.8, 0.5], scaleX: [0.1, 1.2, 1] }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="mix-blend-screen"
                      filter="url(#intenseGlow)"
                    />
                  </g>
                )}
              </AnimatePresence>

              {/* Projector Matrix Lenses - Pure Xenon White Spotlight points */}
              <AnimatePresence>
                {step >= 3 && (
                  <g filter="url(#intenseGlow)">
                    {/* Left Projectors */}
                    <motion.path
                      d="M 330,195 L 350,195 L 353,185 L 333,185 Z M 295,195 L 315,195 L 318,185 L 298,185 Z M 260,195 L 280,195 L 283,185 L 263,185 Z"
                      fill="#ffffff"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.75, 0.95] }}
                      transition={{ duration: 0.35, times: [0, 0.2, 0.4, 1] }}
                    />
                    
                    {/* Right Projectors */}
                    <motion.path
                      d="M 670,195 L 650,195 L 647,185 L 667,185 Z M 705,195 L 685,195 L 682,185 L 702,185 Z M 740,195 L 720,195 L 717,185 L 737,185 Z"
                      fill="#ffffff"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.75, 0.95] }}
                      transition={{ duration: 0.35, times: [0, 0.2, 0.4, 1] }}
                    />
                  </g>
                )}
              </AnimatePresence>
            </svg>

            {/* Central Typography - CHANGAN + ARMENIA Text Overlay (Fully Responsive Mobile-Safe Layout) */}
            <div className="relative z-10 flex flex-col items-center select-none text-center px-4 w-full">
              <h1 className="overflow-hidden flex flex-nowrap justify-center text-[1.65rem] sm:text-5xl md:text-7xl font-bold tracking-[0.38em] sm:tracking-[0.55em] text-white font-syncopate uppercase pl-[0.38em] sm:pl-[0.55em] whitespace-nowrap w-full">
                {"CHANGAN".split("").map((letter, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ y: 50, opacity: 0 }}
                    animate={step >= 1 ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.07,
                      ease: [0.16, 1, 0.3, 1], // Premium easeOutExo
                    }}
                    style={{
                      textShadow: step >= 3 
                        ? "0 0 35px rgba(255,255,255,0.45), 0 0 10px rgba(255,255,255,0.2)" 
                        : "0 0 15px rgba(255,255,255,0.05)",
                    }}
                    className="inline-block transition-all duration-750"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>

              {/* Elegant ARMENIA Subtitle - Scales cleanly on all mobile screens */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={step >= 1 ? { opacity: 0.75, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="mt-4 sm:mt-5 text-[8px] sm:text-xs md:text-sm font-orbitron tracking-[0.9em] sm:tracking-[1.4em] text-[#cccccc] font-light pl-[0.9em] sm:pl-[1.4em] select-none whitespace-nowrap"
                style={{
                  textShadow: "0 0 8px rgba(255,255,255,0.1)",
                }}
              >
                ARMENIA
              </motion.div>
            </div>
          </div>

          {/* Minimalist Skip Button in bottom corner - Styled safely for mobile screens */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={step >= 1 ? { opacity: 0.4 } : {}}
            whileHover={{ opacity: 0.8, scale: 1.01 }}
            onClick={handleSkip}
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 px-4 py-2 border border-white/10 rounded-full text-[8px] font-orbitron tracking-widest text-[#a3a3a3] hover:text-white hover:border-white/30 backdrop-blur-md transition-all duration-300 z-[999999]"
          >
            SKIP &rarr;
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
