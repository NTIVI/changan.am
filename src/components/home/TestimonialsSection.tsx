"use client";

import { motion } from "framer-motion";
import { Star, MessageSquare, Quote } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Артур Варданян",
      car: "Changan UNI-V",
      rating: 5,
      text: "Автомобиль превзошел все ожидания! Спортивный режим SUPER RACE дарит невероятные эмоции, а выдвижной спойлер привлекает взгляды всего Еревана. Очень доволен покупкой.",
      date: "Апрель 2026",
      avatar: "АВ"
    },
    {
      name: "Елена Саргсян",
      car: "Changan CS75 Plus",
      rating: 5,
      text: "Прекрасный семейный внедорожник. Огромная панорамная крыша, невероятно просторный кожаный салон и очень мягкий ход. Обслуживание в салоне Исакова было на высшем уровне!",
      date: "Май 2026",
      avatar: "ЕС"
    },
    {
      name: "Давид Симонян",
      car: "Changan UNI-T",
      rating: 5,
      text: "Дизайн этой машины просто космический. Футуристичный салон, отличная динамика двигателя BlueCore и очень удобный автопарковщик. Расход по городу радует - около 7 литров.",
      date: "Май 2026",
      avatar: "ДС"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#040405] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-red-650 dark:text-red-500 font-bold text-xs uppercase tracking-widest bg-red-50 dark:bg-red-950/20 px-4 py-1.5 rounded-full inline-block mb-4">
            Отзывы Владельцев
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-5">
            Слово Клиентам CHANGAN
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed">
            Узнайте, почему автовладельцы в Армении выбирают инновационный модельный ряд CHANGAN для своих ежедневных поездок и путешествий.
          </p>
        </div>

        {/* Reviews Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-[#09090a] p-8 rounded-3xl border border-gray-150 dark:border-gray-850 hover:shadow-xl transition-all relative overflow-hidden"
            >
              {/* Quote background watermark */}
              <Quote className="absolute -top-4 -right-4 w-28 h-28 text-gray-50 dark:text-black/10 z-0 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>

                <hr className="border-gray-200 dark:border-gray-800" />

                {/* User details */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-500 font-black text-sm flex items-center justify-center shrink-0">
                    {r.avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-black dark:text-white text-sm">
                      {r.name}
                    </h4>
                    <span className="text-xs text-gray-400 block font-medium">
                      Владелец {r.car} • {r.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
