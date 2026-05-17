"use client";

import { motion } from "framer-motion";
import { Shield, Cpu, Leaf, HeadphonesIcon } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Высочайшая безопасность",
      desc: "5 звезд C-NCAP. Интеллектуальные системы помощи водителю и усиленный кузов.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-blue-600" />,
      title: "Передовые технологии",
      desc: "Современные мультимедиа системы, автопарковка и адаптивный круиз-контроль.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-blue-600" />,
      title: "Экологичность и мощь",
      desc: "Двигатели нового поколения BlueCore: баланс динамики и низкого расхода топлива.",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-blue-600" />,
      title: "Премиальный сервис",
      desc: "Круглосуточная поддержка, гарантия 5 лет или 150 000 км пробега.",
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-gray-50 dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-4">
            Преимущества CHANGAN
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Инновации, которые меняют представление о вождении. Мы создаем автомобили для тех, кто ценит комфорт, надежность и стиль.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-[#111] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{b.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
