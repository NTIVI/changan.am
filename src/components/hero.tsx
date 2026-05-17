"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Cars moving left to right
  const xCars = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0a0a] flex items-center justify-center pt-20"
    >
      {/* Moving Background Cars */}
      <motion.div
        style={{ x: xCars }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-80 dark:opacity-40"
      >
        <motion.div
          animate={{ x: ["-20%", "10%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 20,
            ease: "linear",
          }}
          className="relative w-[150%] h-[60vh] flex gap-8 items-center"
        >
          {/* We use highly aesthetic placeholder gradient shapes to simulate cars with motion blur for now, 
              until real Changan transparent PNGs are added */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[800px] h-[300px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-[100px] blur-3xl"
            />
          ))}
          <div className="absolute inset-0 flex gap-20 items-center justify-center">
             <Image width={800} height={500} src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop" className="w-[800px] h-auto object-cover rounded-3xl shadow-2xl opacity-50 mix-blend-overlay" alt="Car 1" />
             <Image width={800} height={500} src="https://images.unsplash.com/photo-1605810730811-09d13e9a59b6?q=80&w=2070&auto=format&fit=crop" className="w-[800px] h-auto object-cover rounded-3xl shadow-2xl opacity-50 mix-blend-overlay" alt="Car 2" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Официальный дилер CHANGAN в Армении
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-black dark:text-white leading-[1.1] mb-6"
        >
          CHANGAN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Будущее в Движении
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 font-light"
        >
          Откройте для себя премиальные автомобили, сочетающие передовые технологии, безопасность и непревзойденный комфорт.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button size="lg" className="rounded-full h-14 px-8 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white border-none">
            Посмотреть каталог
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-medium border-2 hover:bg-gray-100 dark:hover:bg-white/10 dark:text-white">
            <Play className="mr-2 h-5 w-5" />
            Записаться на тест-драйв
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Вниз</span>
        <div className="w-[1px] h-12 bg-gray-300 dark:bg-gray-700 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-full bg-blue-600"
          />
        </div>
      </motion.div>
    </section>
  );
}
