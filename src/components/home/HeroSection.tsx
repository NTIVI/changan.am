"use client";

import { motion, Variants } from "framer-motion";
import { HeroCar } from "../3d/HeroCar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/translations";

export function HeroSection() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 15 
      } 
    },
  };

  return (
    <section className="relative w-full min-h-[92vh] flex items-center bg-[#030303] text-white overflow-hidden py-20 border-b border-neutral-900/60">
      
      {/* Background High-End Ambient Lighting (Sleek Red Brand Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-red-950/10 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-neutral-900/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Cybernetic High-Tech Grid Floor Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />

      {/* Subtle Premium Diagonal Light Line */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-[#ffffff01] to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Side Content (6 cols) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-8 text-left"
        >
          {/* Animated Premium Micro Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-[10px] font-orbitron tracking-widest text-[#e5e5e5] uppercase font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-650 animate-pulse" />
            <span>{t("hero.tag")}</span>
          </motion.div>

          {/* Clean, Massive, Wide Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-[5.5rem] font-bold tracking-[0.02em] leading-[0.95] font-syncopate uppercase"
          >
            <span className="text-neutral-400 block text-2xl sm:text-3xl tracking-[0.2em] font-light mb-4">
              {t("hero.title1")}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f3f4f6] to-[#a3a3a3] drop-shadow-sm">
              {t("hero.titleAccent")}
            </span>
            <span className="block text-xl sm:text-2xl tracking-[0.3em] font-medium text-red-600 mt-4">
              {t("hero.title2")}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-neutral-405 text-base md:text-lg font-light leading-relaxed max-w-xl font-sans"
          >
            {t("hero.desc")}
          </motion.p>

          {/* Actions with Glassmorphism */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href="/cars">
              <Button className="h-14 px-8 rounded-full bg-red-650 hover:bg-red-700 text-white font-semibold text-sm tracking-widest font-orbitron transition-all duration-300 shadow-xl shadow-red-950/20 hover:shadow-red-600/25 flex items-center gap-3.5 hover:scale-[1.02]">
                <span>{t("hero.btnModels")}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/cars">
              <Button variant="outline" className="h-14 px-8 rounded-full border-neutral-800 bg-white/5 hover:bg-white/10 hover:border-neutral-700 text-white font-semibold text-sm tracking-widest font-orbitron transition-all duration-300">
                <span>{t("hero.btnTestDrive")}</span>
              </Button>
            </Link>
          </motion.div>

          {/* Metrics Layout with Thin Borders */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-900/80"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold font-orbitron text-white">{t("hero.metric1Val")}</div>
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1 font-orbitron">{t("hero.metric1Lbl")}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold font-orbitron text-white">{t("hero.metric2Val")}</div>
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1 font-orbitron">{t("hero.metric2Lbl")}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold font-orbitron text-white">{t("hero.metric3Val")}</div>
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1 font-orbitron">{t("hero.metric3Lbl")}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side 3D Canvas Box (6 cols) */}
        <div className="lg:col-span-6 h-[400px] md:h-[600px] relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
          
          {/* Circular Glowing Ring behind the Car */}
          <div className="absolute w-[350px] h-[350px] rounded-full border border-neutral-800/40 bg-radial-gradient from-transparent to-neutral-950/80 pointer-events-none z-0 flex items-center justify-center">
            <div className="w-[280px] h-[280px] rounded-full border border-neutral-900/30 dashed animate-spin-slow" />
          </div>

          {/* Rotate Hint Badge */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/70 border border-neutral-800 text-[10px] font-orbitron tracking-wider text-neutral-400 font-bold pointer-events-none backdrop-blur-md">
            <Star className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>{t("hero.rotateHint")}</span>
          </div>

          <div className="w-full h-full relative z-10">
            <HeroCar />
          </div>
        </div>

      </div>
    </section>
  );
}
