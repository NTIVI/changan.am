"use client";

import { motion } from "framer-motion";
import { Shield, Cpu, Leaf, HeadphonesIcon, BadgeCheck, Flame, Compass } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="w-7 h-7 text-red-500" />,
      title: "Высочайший Уровень Безопасности",
      desc: "Максимальные 5 звезд в тестах C-NCAP. Автомобили укомплектованы усиленной стальной рамой и комплексом активного предотвращения столкновений.",
    },
    {
      icon: <Cpu className="w-7 h-7 text-red-500" />,
      title: "Интеллектуальные Помощники",
      desc: "Адаптивный круиз-контроль (ACC), автоматический парковщик (APA 5.0), круговой обзор 360° с 3D-режимом и ассистенты слепых зон.",
    },
    {
      icon: <Leaf className="w-7 h-7 text-red-500" />,
      title: "Двигатели BlueCore",
      desc: "Энергоэффективные турбодвигатели нового поколения обеспечивают ураганный разгон при рекордно низком расходе топлива.",
    },
    {
      icon: <HeadphonesIcon className="w-7 h-7 text-red-500" />,
      title: "Официальный Премиум Сервис",
      desc: "Полноценная гарантия 5 лет или 150,000 км пробега в Армении, поддержка на дорогах 24/7 и оригинальные сертифицированные запчасти.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#050506] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-red-650 dark:text-red-500 font-bold text-xs uppercase tracking-widest bg-red-50 dark:bg-red-950/20 px-4 py-1.5 rounded-full inline-block mb-4">
            Превосходство Технологий
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-5">
            Преимущества CHANGAN
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed">
            Инновационные решения в каждой детали. Мы разрабатываем интеллектуальные, надежные и эффектные автомобили для тех, кто не соглашается на компромиссы.
          </p>
        </div>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-gray-50 dark:bg-[#09090a] p-8 rounded-3xl border border-gray-150 dark:border-gray-850 hover:border-red-500/30 hover:shadow-xl transition-all"
            >
              {/* Feature Icon container */}
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>

              {/* Title and details */}
              <h3 className="text-lg font-extrabold mb-3 text-black dark:text-white group-hover:text-red-500 transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
