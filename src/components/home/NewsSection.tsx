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
    <section className="py-24 bg-white dark:bg-[#050506] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl text-left">
            <span className="text-red-655 dark:text-red-500 font-bold text-xs uppercase tracking-widest bg-red-50 dark:bg-red-950/20 px-4 py-1.5 rounded-full inline-block mb-4">
              {t("news.tag")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter">
              {t("news.title")}
            </h2>
          </div>

          <Link href="/cars" className="text-sm font-extrabold text-red-600 dark:text-red-500 hover:opacity-80 transition-opacity flex items-center gap-1.5 group shrink-0">
            <span>{t("news.catalogLink")}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* News Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((n, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-gray-50 dark:bg-[#09090a] rounded-3xl border border-gray-150 dark:border-gray-850 hover:shadow-xl transition-all overflow-hidden flex flex-col h-full text-left"
            >
              {/* News Thumbnail */}
              <div className="h-56 relative overflow-hidden bg-gray-900 shrink-0">
                <img 
                  src={n.image} 
                  alt={n.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* News Body */}
              <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                <div className="space-y-4">
                  {/* News metadata (date, category) */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 dark:text-gray-500">
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
                  <h3 className="text-lg font-black text-black dark:text-white line-clamp-2 leading-snug group-hover:text-red-500 transition-colors">
                    {n.title}
                  </h3>

                  {/* News Summary */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 font-medium">
                    {n.desc}
                  </p>
                </div>

                <div className="pt-2">
                  {/* Action Link button */}
                  <button className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-red-655 dark:hover:text-red-500 transition-colors flex items-center gap-1">
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
