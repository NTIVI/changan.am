"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/translations";

export function NewsSection() {
  const { t } = useTranslation();

  const newsItems = [
    {
      title: t("news.n1Title"),
      desc: t("news.n1Desc"),
      date: t("news.n1Date"),
      category: t("news.n1Cat"),
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: t("news.n2Title"),
      desc: t("news.n2Desc"),
      date: t("news.n2Date"),
      category: t("news.n2Cat"),
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: t("news.n3Title"),
      desc: t("news.n3Desc"),
      date: t("news.n3Date"),
      category: t("news.n3Cat"),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section className="py-28 bg-[#060608] text-white transition-colors duration-300 relative overflow-hidden border-b border-neutral-900/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-xl text-left">
            <span className="text-red-500 font-bold text-[10px] font-orbitron tracking-widest bg-red-950/20 border border-red-900/30 px-4 py-1.5 rounded-full inline-block mb-6 uppercase">
              {t("news.tag")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-syncopate uppercase leading-tight">
              {t("news.title")}
            </h2>
          </div>

          <Link href="/cars" className="text-xs font-bold uppercase tracking-widest font-orbitron text-red-500 hover:text-red-400 transition-colors flex items-center gap-2 group shrink-0 pb-1 border-b border-red-900/30 hover:border-red-500">
            <span>{t("news.catalogLink")}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* News Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((n, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="group bg-[#09090c] rounded-2xl border border-neutral-900 hover:border-neutral-800 transition-all duration-300 overflow-hidden flex flex-col h-full text-left"
            >
              {/* News Thumbnail */}
              <div className="h-52 relative overflow-hidden bg-neutral-950 shrink-0">
                <img 
                  src={n.image} 
                  alt={n.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* News Body */}
              <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                <div className="space-y-4">
                  {/* News metadata */}
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest font-orbitron text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      {n.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-red-500" />
                      {n.category}
                    </span>
                  </div>

                  {/* News Title */}
                  <h3 className="text-base font-bold font-orbitron uppercase tracking-wider text-white line-clamp-2 leading-snug group-hover:text-red-500 transition-colors">
                    {n.title}
                  </h3>

                  {/* News Summary */}
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                    {n.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-900">
                  {/* Action Link button */}
                  <button className="text-[10px] font-bold uppercase tracking-widest font-orbitron text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1.5">
                    <span>{t("news.readFull")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
