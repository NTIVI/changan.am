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
    <section className="py-28 bg-[#030303] text-white transition-colors duration-300 relative overflow-hidden border-b border-neutral-900/60">
      
      {/* Subtle background highlight */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-950/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-red-500 font-bold text-[10px] font-orbitron tracking-widest bg-red-950/20 border border-red-900/30 px-4 py-1.5 rounded-full inline-block mb-6 uppercase">
            {t("testimonials.tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-syncopate uppercase mb-6 leading-tight">
            {t("testimonials.title")}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            {t("testimonials.desc")}
          </p>
        </div>

        {/* Reviews Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="bg-[#09090c] p-8 rounded-2xl border border-neutral-900 hover:border-neutral-800 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Quote watermark */}
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-neutral-950 pointer-events-none z-0" />

              <div className="relative z-10 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  {/* Rating stars */}
                  <div className="flex gap-1">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-red-500 text-red-500 shrink-0" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-neutral-300 text-sm leading-relaxed font-light italic">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-neutral-900">
                  {/* User details */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-red-500 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {r.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm font-orbitron uppercase tracking-wider">
                        {r.name}
                      </h4>
                      <span className="text-[10px] text-neutral-500 block font-bold uppercase tracking-widest mt-0.5 font-orbitron">
                        {r.owner} • {r.date}
                      </span>
                    </div>
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
