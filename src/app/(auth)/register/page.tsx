"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const { signUp, user, profile, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      if (profile?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    }
  }, [user, profile, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    if (!name.trim()) {
      setAuthError("Пожалуйста, введите ваше имя.");
      setAuthLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, name, phone);
      if (error) {
        setAuthError(error.message || "Ошибка регистрации.");
      }
    } catch {
      setAuthError("Произошла неизвестная ошибка.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white flex flex-col justify-center items-center px-4 relative overflow-hidden transition-colors duration-300">
      <Header />

      {/* Decorative gradient blur background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-650/10 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mt-24"
      >
        <div className="bg-white/80 dark:bg-[#09090a]/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-150 dark:border-gray-850">
          
          {/* Tabs header */}
          <div className="flex bg-gray-100 dark:bg-black/50 p-1.5 rounded-2xl mb-8">
            <Link href="/login" className="flex-1 py-3 text-center text-sm font-bold rounded-xl text-gray-500 hover:text-black dark:hover:text-white transition-all">
              Вход
            </Link>
            <Link href="/register" className="flex-1 py-3 text-center text-sm font-bold rounded-xl bg-white dark:bg-[#1a1a1c] text-red-600 dark:text-red-500 shadow-sm transition-all">
              Регистрация
            </Link>
          </div>

          {/* Titles */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black tracking-tight text-black dark:text-white mb-2">
              Создать аккаунт
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
              Зарегистрируйтесь для заказа авто и тест-драйвов
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-550 dark:text-gray-400 uppercase tracking-wider">Имя и Фамилия</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-550 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-550 dark:text-gray-400 uppercase tracking-wider">Номер телефона</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+374 (XX) XX-XX-XX"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-550 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-550 dark:text-gray-400 uppercase tracking-wider">E-mail адрес</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-550 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-550 dark:text-gray-400 uppercase tracking-wider">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-12 pr-12 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-550 transition-all text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Errors */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold border border-red-100 dark:border-red-900/30"
              >
                {authError}
              </motion.div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={authLoading}
              className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 dark:bg-red-550 dark:hover:bg-red-600 text-white font-bold flex items-center justify-center gap-2 mt-6 shadow-lg shadow-red-500/15"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Создание...</span>
                </>
              ) : (
                <>
                  <span>Создать аккаунт</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Admin registration info */}
          <div className="mt-8 pt-6 border-t border-gray-150 dark:border-gray-850 text-center">
            <p className="text-[10px] text-gray-450 leading-relaxed">
              Регистрация с email, начинающимся на <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-850 font-mono text-[9px] text-red-550">admin@</code>, создаст аккаунт администратора.
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
