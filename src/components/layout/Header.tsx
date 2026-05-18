"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingCart, User, LogIn, LogOut, Menu, X, ShieldAlert } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();
  const cart = useAppStore((state) => state.cart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCartItems = cart.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/75 dark:bg-[#050505]/75 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tighter text-black dark:text-white transition-all duration-300 group-hover:scale-[1.03]">
            CHANGAN<span className="text-red-600 dark:text-red-500 font-light">.AM</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link 
            href="/" 
            className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
          >
            Главная
          </Link>
          <Link 
            href="/cars" 
            className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
          >
            Модели
          </Link>
          <Link 
            href="/#contacts" 
            className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
          >
            Контакты
          </Link>
          {mounted && isAdmin && (
            <Link 
              href="/admin" 
              className="flex items-center gap-1.5 text-red-600 dark:text-red-500 hover:opacity-80 transition-all font-semibold"
            >
              <ShieldAlert className="w-4 h-4" /> Панель
            </Link>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2.5 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group">
            <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
            {mounted && totalCartItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white dark:border-[#050505]"
              >
                {totalCartItems}
              </motion.span>
            )}
          </Link>

          {/* Profile Auth Button */}
          {mounted && user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="/profile" 
                className="flex items-center gap-2 px-4 h-10 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-55/10 dark:bg-gray-800/20 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-sm text-black dark:text-white font-medium"
              >
                <User className="w-4 h-4 text-red-500" />
                <span>{profile?.name ? profile.name.split(" ")[0] : "Профиль"}</span>
              </Link>
              <Button 
                variant="ghost" 
                onClick={() => signOut()} 
                className="h-10 w-10 p-0 rounded-full border border-transparent hover:border-red-200 dark:hover:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-all shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="hidden md:flex items-center gap-2 px-5 h-10 rounded-full bg-red-600 hover:bg-red-700 dark:bg-red-550 dark:hover:bg-red-600 text-white text-sm font-semibold transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/35 hover:scale-[1.02]"
            >
              <LogIn className="w-4 h-4" />
              <span>Войти</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-[#050505] overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-red-600"
              >
                Главная
              </Link>
              <Link 
                href="/cars" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-red-600"
              >
                Модели
              </Link>
              <Link 
                href="/#contacts" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-red-600"
              >
                Контакты
              </Link>
              {mounted && isAdmin && (
                <Link 
                  href="/admin" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold text-red-600"
                >
                  Админ-панель
                </Link>
              )}
              <hr className="border-gray-200 dark:border-gray-800" />
              {mounted && user ? (
                <div className="flex flex-col gap-4">
                  <Link 
                    href="/profile" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-red-600"
                  >
                    <User className="w-5 h-5 text-red-500" />
                    <span>Личный кабинет ({profile?.name})</span>
                  </Link>
                  <Button 
                    onClick={() => { signOut(); setMobileMenuOpen(false); }} 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 border-red-200 dark:border-red-900/30 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Выйти</span>
                  </Button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-red-600 text-white font-semibold"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Войти в личный кабинет</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
