"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <Link href="/">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter uppercase text-black dark:text-white">
            CHANGAN
          </span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="#models" className="hover:text-blue-600 transition-colors">
          Модели
        </Link>
        <Link href="#benefits" className="hover:text-blue-600 transition-colors">
          Преимущества
        </Link>
        <Link href="#contacts" className="hover:text-blue-600 transition-colors">
          Контакты
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
          <ShoppingCart className="w-5 h-5 text-black dark:text-white" />
          {mounted && items.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              {items.length}
            </span>
          )}
        </Link>
        <Link href="/admin" className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
          <User className="w-5 h-5 text-black dark:text-white" />
        </Link>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
