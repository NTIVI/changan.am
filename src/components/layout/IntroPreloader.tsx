"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroPreloader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0); // 0: Init, 1: Text Fade, 2: DRL Trace, 3: Headlights Turn On, 4: Transition Out

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Animation timeline
    const textTimer = setTimeout(() => setStep(1), 300); // 0.3s -> Text begins to fade in
    const traceTimer = setTimeout(() => setStep(2), 1800); // 1.8s -> Headlight outlines start tracing
    const turnOnTimer = setTimeout(() => setStep(3), 3200); // 3.2s -> Projectors flash and turn on
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
      opacity: 0.8,
      transition: {
        pathLength: { duration: 1.2, ease: "easeInOut" as const },
        opacity: { duration: 0.4 },
      },
    },
  };

  return (
    <AnimatePresence>
      {step < 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Ambient Dark Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,15,25,0.8)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />

          {/* Visual Elements Container */}
          <div className="relative w-full max-w-5xl aspect-[16/7] flex items-center justify-center px-4">
            
            {/* SVG Overlay for Lights */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Gradients Definitions */}
              <defs>
                {/* Left Headlight Projector Beam Gradient */}
                <radialGradient id="leftBeam" cx="300" cy="190" r="160" fx="300" fy="190" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="20%" stopColor="#7dd3fc" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>

                {/* Right Headlight Projector Beam Gradient */}
                <radialGradient id="rightBeam" cx="700" cy="190" r="160" fx="700" fy="190" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="20%" stopColor="#7dd3fc" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>

                {/* Logo Gradient */}
                <linearGradient id="logoGradient" x1="455" y1="120" x2="545" y2="175" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#475569" stopOpacity="0.2" />
                </linearGradient>

                {/* Headlight Outline Glow Filter */}
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                {/* Intense Projector Glow Filter */}
                <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="15" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Central Logo (Changan V Shield) */}
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={step >= 1 ? { opacity: 0.15, scale: 1 } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {/* Outer decorative ring */}
                <circle cx="500" cy="145" r="42" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                <circle cx="500" cy="145" r="50" stroke="white" strokeWidth="1.5" opacity="0.2" />
                
                {/* Brand V Shield logo */}
                <path
                  d="M 465,125 L 500,160 L 535,125 L 545,125 L 500,175 L 455,125 Z"
                  fill="url(#logoGradient)"
                />
              </motion.g>

              {/* Headlight Outlines (DRLs) - Trace during Step 2 */}
              <g filter="url(#neonGlow)">
                {/* Left LED Strip Upper */}
                <motion.path
                  d="M 380,180 L 280,180 L 160,150 L 120,130"
                  stroke="#e0f2fe"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                />
                
                {/* Left LED Strip Lower */}
                <motion.path
                  d="M 350,200 L 260,200 L 180,180 L 140,160"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                  transition={{ delay: 0.2 }}
                />

                {/* Left Side Bumper Accents (Slats) */}
                <motion.path
                  d="M 110,160 L 95,200 M 120,170 L 108,210 M 130,180 L 120,220"
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                  transition={{ delay: 0.4 }}
                />

                {/* Right LED Strip Upper */}
                <motion.path
                  d="M 620,180 L 720,180 L 840,150 L 880,130"
                  stroke="#e0f2fe"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                />

                {/* Right LED Strip Lower */}
                <motion.path
                  d="M 650,200 L 740,200 L 820,180 L 860,160"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                  transition={{ delay: 0.2 }}
                />

                {/* Right Side Bumper Accents (Slats) */}
                <motion.path
                  d="M 890,160 L 905,200 M 880,170 L 892,210 M 870,180 L 880,220"
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                  transition={{ delay: 0.4 }}
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
                      rx="160"
                      ry="80"
                      fill="url(#leftBeam)"
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{
                        opacity: [0, 1, 0.85, 0.95, 0.9],
                        scale: [0.2, 1.2, 0.95, 1.05, 1],
                      }}
                      transition={{
                        duration: 0.6,
                        times: [0, 0.2, 0.4, 0.7, 1],
                        ease: "easeOut",
                      }}
                      className="mix-blend-screen"
                    />

                    {/* Right Volumetric Light Beam */}
                    <motion.ellipse
                      cx="700"
                      cy="190"
                      rx="160"
                      ry="80"
                      fill="url(#rightBeam)"
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{
                        opacity: [0, 1, 0.85, 0.95, 0.9],
                        scale: [0.2, 1.2, 0.95, 1.05, 1],
                      }}
                      transition={{
                        duration: 0.6,
                        times: [0, 0.2, 0.4, 0.7, 1],
                        ease: "easeOut",
                      }}
                      className="mix-blend-screen"
                    />
                  </g>
                )}
              </AnimatePresence>

              {/* Projector Matrix Lenses (Bright LEDs) - Flash and Turn On in Step 3 */}
              <AnimatePresence>
                {step >= 3 && (
                  <g filter="url(#intenseGlow)">
                    {/* Left Projectors */}
                    <motion.path
                      d="M 330,195 L 350,195 L 353,185 L 333,185 Z M 295,195 L 315,195 L 318,185 L 298,185 Z M 260,195 L 280,195 L 283,185 L 263,185 Z"
                      fill="#ffffff"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.7, 1] }}
                      transition={{ duration: 0.4, times: [0, 0.15, 0.3, 1] }}
                    />
                    
                    {/* Right Projectors */}
                    <motion.path
                      d="M 670,195 L 650,195 L 647,185 L 667,185 Z M 705,195 L 685,195 L 682,185 L 702,185 Z M 740,195 L 720,195 L 717,185 L 737,185 Z"
                      fill="#ffffff"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.7, 1] }}
                      transition={{ duration: 0.4, times: [0, 0.15, 0.3, 1] }}
                    />
                  </g>
                )}
              </AnimatePresence>
            </svg>

            {/* Central Typography - CHANGAN Text Overlay */}
            <div className="relative z-10 flex flex-col items-center select-none text-center">
              <h1 className="overflow-hidden flex flex-wrap justify-center text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.45em] text-white font-syncopate uppercase">
                {"CHANGAN".split("").map((letter, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ y: 80, opacity: 0 }}
                    animate={step >= 1 ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.1,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    style={{
                      textShadow: step >= 3 
                        ? "0 0 30px rgba(255,255,255,0.7), 0 0 10px rgba(56,189,248,0.4)" 
                        : "0 0 15px rgba(255,255,255,0.2)",
                    }}
                    className="inline-block transition-all duration-700"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>

              {/* Subtitle brand tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={step >= 1 ? { opacity: 0.5, y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.8 }}
                className="mt-6 text-[10px] md:text-xs font-orbitron tracking-[0.6em] text-gray-400 font-medium pl-[0.6em]"
              >
                FUTURE IN MOTION
              </motion.div>
            </div>
          </div>

          {/* Premium styled Skip button in bottom corner */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={step >= 1 ? { opacity: 0.4 } : {}}
            whileHover={{ opacity: 0.9, scale: 1.02 }}
            onClick={handleSkip}
            className="absolute bottom-8 right-8 px-4 py-2 border border-white/20 rounded-full text-[10px] font-orbitron tracking-widest text-white/70 hover:text-white hover:border-white/50 backdrop-blur-sm transition-all duration-300 z-[999999]"
          >
            PROPUSK / SKIP &rarr;
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
