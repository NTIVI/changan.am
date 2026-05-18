"use client";

import { motion, Variants } from "framer-motion";
import { HeroCar } from "../3d/HeroCar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="relative w-full min-h-[92vh] flex items-center bg-gradient-to-b from-gray-950 via-[#05050a] to-[#040405] text-white overflow-hidden py-16">
      
      {/* Background glowing accent rings and particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-650/15 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Grid Overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800b_1px,transparent_1px),linear-gradient(to_bottom,#8080800b_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Content (6 cols) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-8 text-left"
        >
          {/* Animated small label */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Премиальный дилер в Ереване</span>
          </motion.div>

          {/* Staggered big headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05]"
          >
            CHANGAN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-500">
              Будущее
            </span> в Армении
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl"
          >
            Откройте новые грани динамики, премиального технологического комфорта и интеллектуальной безопасности с автомобилями CHANGAN.
          </motion.p>

          {/* CTA actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link href="/cars">
              <Button className="h-14 px-8 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-all shadow-lg shadow-red-500/15 hover:shadow-red-500/30 flex items-center gap-2 hover:scale-[1.03]">
                <span>Смотреть модели</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/cars">
              <Button variant="outline" className="h-14 px-8 rounded-2xl border-gray-800 bg-white/5 hover:bg-white/10 hover:border-gray-700 text-white font-bold text-base transition-all">
                <span>Запись на Тест-драйв</span>
              </Button>
            </Link>
          </motion.div>

          {/* Quick Metrics display */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-900"
          >
            <div>
              <div className="text-2xl font-black text-white">5 лет</div>
              <div className="text-xs text-gray-500 font-medium">Официальной гарантии</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">0%</div>
              <div className="text-xs text-gray-500 font-medium">Выгодный кредит</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">24/7</div>
              <div className="text-xs text-gray-500 font-medium">Сервисная поддержка</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side 3D Canvas Box (6 cols) */}
        <div className="lg:col-span-6 h-[400px] md:h-[550px] relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
          {/* Subtle rotation hint */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/45 border border-gray-800 text-xs text-gray-400 font-semibold pointer-events-none backdrop-blur-sm animate-pulse">
            <Star className="w-3.5 h-3.5 text-amber-500" />
            <span>Вращайте авто мышкой</span>
          </div>

          <div className="w-full h-full relative">
            <HeroCar />
          </div>
        </div>

      </div>
    </section>
  );
}
