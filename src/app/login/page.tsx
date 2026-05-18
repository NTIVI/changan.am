"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { signIn, signUp, user, profile, loading } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setAuthError(error.message || "Неверный email или пароль.");
        }
      } else {
        if (!name.trim()) {
          setAuthError("Пожалуйста, введите ваше имя.");
          setAuthLoading(false);
          return;
        }
        const { error } = await signUp(email, password, name, phone);
        if (error) {
          setAuthError(error.message || "Ошибка регистрации.");
        }
      }
    } catch {
      setAuthError("Произошла неизвестная ошибка.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <Header />

      {/* Decorative gradient blur background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md mt-24"
      >
        <div className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800/80">
          
          {/* Header tabs */}
          <div className="flex bg-gray-100 dark:bg-black/50 p-1.5 rounded-2xl mb-8 relative">
            <div className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-xl bg-white dark:bg-[#1f1f1f] shadow-sm transition-transform duration-300 ease-out" 
                 style={{ transform: isLogin ? 'translateX(0%)' : 'translateX(100%)' }} />
            
            <button
              onClick={() => { setIsLogin(true); setAuthError(null); }}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl relative z-10 transition-colors duration-300 ${
                isLogin ? "text-blue-600 dark:text-white" : "text-gray-500 hover:text-black dark:hover:text-white"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => { setIsLogin(false); setAuthError(null); }}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl relative z-10 transition-colors duration-300 ${
                !isLogin ? "text-blue-600 dark:text-white" : "text-gray-500 hover:text-black dark:hover:text-white"
              }`}
            >
              Регистрация
            </button>
          </div>

          {/* Titles */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black tracking-tight text-black dark:text-white mb-2">
              {isLogin ? "С возвращением" : "Создать аккаунт"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isLogin 
                ? "Войдите в личный кабинет дилера CHANGAN" 
                : "Зарегистрируйтесь для управления заказами и тест-драйвами"
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {/* Name Field (Sign Up Only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Имя и Фамилия</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                    />
                  </div>
                </motion.div>
              )}

              {/* Phone Field (Sign Up Only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Телефон</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+374 (XX) XX-XX-XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">E-mail адрес</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Пароль</label>
                {isLogin && (
                  <Link href="#" className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Забыли пароль?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-12 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
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

            {/* Error Message */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-900/30"
              >
                {authError}
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={authLoading}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 mt-4"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  {isLogin ? "Войти в кабинет" : "Создать аккаунт"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Admin Access Hint */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isLogin ? (
                <>
                  Администратор? Войдите с email <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-[11px] text-blue-500">admin@changan.am</code>
                </>
              ) : (
                <>
                  Регистрация с email, начинающимся на <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-[11px] text-blue-500">admin@</code>, создаст аккаунт администратора.
                </>
              )}
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
