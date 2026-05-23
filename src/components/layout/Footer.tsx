"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-[#030304] border-t border-gray-150 dark:border-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        {/* Main Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-left">
          
          {/* Logo & Description Column (6 cols) */}
          <div className="md:col-span-6 space-y-6">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-black tracking-tighter text-black dark:text-white transition-all group-hover:scale-[1.01]">
                CHANGAN<span className="text-red-655 dark:text-red-500 font-light">.AM</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-md font-medium">
              {t("footer.desc")}
            </p>
          </div>

          {/* Model Lineup Links Column (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-black dark:text-white tracking-widest uppercase">
              {t("footer.titleModels")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/cars" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-550 transition-colors font-medium">
                  Changan UNI-V
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-550 transition-colors font-medium">
                  Changan UNI-T
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-550 transition-colors font-medium">
                  Changan CS75 Plus
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-550 transition-colors font-medium">
                  Changan Hunter Plus
                </Link>
              </li>
            </ul>
          </div>

          {/* Customers Links Column (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-black dark:text-white tracking-widest uppercase">
              {t("footer.titleBuyers")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/cars" className="text-gray-500 dark:text-gray-400 hover:text-red-655 dark:hover:text-red-550 transition-colors font-medium flex items-center gap-1">
                  <span>{t("footer.linkTestDrive")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-gray-500 dark:text-gray-400 hover:text-red-655 dark:hover:text-red-550 transition-colors font-medium flex items-center gap-1">
                  <span>{t("footer.linkCredit")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/#contacts" className="text-gray-500 dark:text-gray-400 hover:text-red-655 dark:hover:text-red-550 transition-colors font-medium">
                  {t("footer.linkContacts")}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-500 dark:text-gray-400 hover:text-red-655 dark:hover:text-red-550 transition-colors font-medium">
                  {t("footer.linkCabinet")}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <hr className="my-10 border-gray-150 dark:border-gray-900" />

        {/* Copyright and Legal bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-400 dark:text-gray-550">
          <div>
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-red-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-600 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
