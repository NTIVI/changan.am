"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Bookmark } from "lucide-react";
import Link from "next/link";

export function NewsSection() {
  const news = [
    {
      title: "Грандиозный запуск нового Changan UNI-V в Ереване",
      desc: "Официальный представитель CHANGAN в Армении представил футуристичный седан UNI-V с выдвижным спойлером и пакетом SUPER RACE. Запишитесь на тест-драйв уже сегодня.",
      date: "12 Мая, 2026",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop",
      category: "Презентация"
    },
    {
      title: "Специальные условия кредитования и трейд-ин в мае",
      desc: "Совместно с ведущими банками Армении мы запускаем уникальную программу кредитования с процентной ставкой от 0% годовых и выгодой по трейд-ин до 1,000,000 AMD.",
      date: "08 Мая, 2026",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
      category: "Акции"
    },
    {
      title: "CHANGAN вошел в ТОП-3 самых надежных брендов",
      desc: "По результатам независимого исследования удовлетворенности клиентов и надежности двигателей BlueCore, бренд CHANGAN занял лидирующие позиции по оценкам экспертов.",
      date: "28 Апреля, 2026",
      image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=2070&auto=format&fit=crop",
      category: "Мировые новости"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#050506] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-red-650 dark:text-red-500 font-bold text-xs uppercase tracking-widest bg-red-50 dark:bg-red-950/20 px-4 py-1.5 rounded-full inline-block mb-4">
              Новости и События
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter">
              Быть в курсе событий
            </h2>
          </div>
          
          <Link href="/cars">
            <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-500 font-bold text-sm hover:underline cursor-pointer group">
              Перейти в каталог моделей
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>

        {/* News Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex flex-col bg-gray-50 dark:bg-[#09090a] rounded-3xl overflow-hidden border border-gray-150 dark:border-gray-850 hover:shadow-xl transition-all"
            >
              {/* Cover Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={n.image}
                  alt={n.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                
                {/* Category tag inside photo */}
                <span className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white">
                  {n.category}
                </span>
              </div>

              {/* News content details */}
              <div className="p-6 grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{n.date}</span>
                  </div>

                  <h3 className="text-base font-extrabold mb-3 text-black dark:text-white group-hover:text-red-500 transition-colors leading-tight">
                    {n.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                    {n.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-650 dark:text-red-500 hover:opacity-80 transition-opacity cursor-pointer">
                    Читать полностью <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
