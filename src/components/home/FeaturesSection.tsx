"use client";

import { motion } from "framer-motion";
import { Shield, Cpu, Leaf, HeadphonesIcon } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: t("features.f1Title"),
      desc: t("features.f1Desc"),
    },
    {
      icon: <Cpu className="w-6 h-6 text-red-500" />,
      title: t("features.f2Title"),
      desc: t("features.f2Desc"),
    },
    {
      icon: <Leaf className="w-6 h-6 text-red-500" />,
      title: t("features.f3Title"),
      desc: t("features.f3Desc"),
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-red-500" />,
      title: t("features.f4Title"),
      desc: t("features.f4Desc"),
    },
  ];

  return (
    <section className="py-28 bg-[#060608] text-white transition-colors duration-300 relative overflow-hidden border-b border-neutral-900/60">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-red-950/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-red-500 font-bold text-[10px] font-orbitron tracking-widest bg-red-950/20 border border-red-900/30 px-4 py-1.5 rounded-full inline-block mb-6 uppercase">
            {t("features.tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-syncopate uppercase mb-6 leading-tight">
            {t("features.title")}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            {t("features.desc")}
          </p>
        </div>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="group relative bg-[#09090c] p-8 rounded-2xl border border-neutral-900 hover:border-red-950/60 hover:bg-[#0b0b0e] transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* Feature Icon container */}
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-8 group-hover:scale-105 group-hover:border-red-950 transition-all duration-300">
                  {f.icon}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold font-orbitron uppercase tracking-wider mb-4 text-white group-hover:text-red-500 transition-colors">
                  {f.title}
                </h3>
                
                {/* Details */}
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                  {f.desc}
                </p>
              </div>

              {/* Decorative Accent Corner Lines */}
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[#ffffff08] to-transparent group-hover:from-red-650/40 transition-colors duration-300" />
              <div className="absolute top-0 right-0 h-8 w-[1px] bg-gradient-to-b from-[#ffffff08] to-transparent group-hover:from-red-650/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
