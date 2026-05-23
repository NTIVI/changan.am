"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export function TestimonialsSection() {
  const { t } = useTranslation();

  const reviews = [
    {
      name: t("testimonials.t1Author"),
      owner: t("testimonials.t1Owner"),
      rating: 5,
      text: t("testimonials.t1Text"),
      date: t("testimonials.t1Date"),
      avatar: "ԱՎ" // Armenian/Universal style
    },
    {
      name: t("testimonials.t2Author"),
      owner: t("testimonials.t2Owner"),
      rating: 5,
      text: t("testimonials.t2Text"),
      date: t("testimonials.t2Date"),
      avatar: "ԵՍ"
    },
    {
      name: t("testimonials.t3Author"),
      owner: t("testimonials.t3Owner"),
      rating: 5,
      text: t("testimonials.t3Text"),
      date: t("testimonials.t3Date"),
      avatar: "ԴՍ"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#040405] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-red-650 dark:text-red-500 font-bold text-xs uppercase tracking-widest bg-red-50 dark:bg-red-950/20 px-4 py-1.5 rounded-full inline-block mb-4">
            {t("testimonials.tag")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-5">
            {t("testimonials.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed">
            {t("testimonials.desc")}
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
              <Quote className="absolute -top-4 -right-4 w-28 h-28 text-gray-55/5 dark:text-black/10 z-0 pointer-events-none" />

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
                  <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/20 text-red-655 dark:text-red-500 font-black text-sm flex items-center justify-center shrink-0">
                    {r.avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-black dark:text-white text-sm">
                      {r.name}
                    </h4>
                    <span className="text-xs text-gray-400 block font-medium">
                      {r.owner} • {r.date}
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
