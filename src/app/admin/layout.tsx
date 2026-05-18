"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  TrendingUp, Users, ShoppingBag, CarFront, ShieldAlert, ArrowLeft, Loader2, LogOut
} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-red-650 animate-spin" />
          <p className="text-gray-550 font-bold">Проверка прав доступа...</p>
        </div>
      </div>
    );
  }

  // Shield Route
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white flex flex-col justify-center items-center px-6 relative overflow-hidden transition-colors duration-300">
        <Header />
        
        {/* Decorative alarm glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-500/10 dark:bg-red-950/5 rounded-full blur-[140px] -z-10" />

        <div className="w-full max-w-lg mt-24">
          <div className="bg-white/90 dark:bg-[#09090a]/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-red-200 dark:border-red-950/30 text-center">
            <div className="w-20 h-20 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center mx-auto mb-6 border border-red-100 dark:border-red-900/30">
              <ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-500" />
            </div>
            
            <h1 className="text-3xl font-black tracking-tight text-black dark:text-white mb-4">
              Доступ ограничен
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed font-semibold">
              У вас нет прав для просмотра этого раздела. Панель управления доступна только для администраторов и сотрудников автосалона CHANGAN Armenia.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button 
                  variant="outline"
                  className="w-full rounded-xl h-11 px-6 font-bold border-gray-250 dark:border-gray-800 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>На главную</span>
                </Button>
              </Link>
              <Button 
                onClick={async () => {
                  await signOut();
                  router.push("/login");
                }}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-11 px-6 font-bold shadow-md shadow-red-500/15"
              >
                Войти как админ
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { href: "/admin", label: "Обзор", icon: TrendingUp },
    { href: "/admin/cars", label: "Каталог авто", icon: CarFront },
    { href: "/admin/orders", label: "Заказы", icon: ShoppingBag },
    { href: "/admin/users", label: "Пользователи", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050506] text-black dark:text-white flex flex-col transition-colors duration-300">
      <Header />
      
      <div className="pt-20 flex flex-1 h-[calc(100vh-80px)] overflow-hidden">
        {/* Protected Sidebar */}
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-6 hidden md:flex flex-col justify-between shrink-0 bg-white dark:bg-[#070708]">
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-550 block mb-1">
                Панель управления
              </span>
              <h2 className="text-sm font-extrabold text-gray-500 uppercase tracking-wider">
                CHANGAN Armenia
              </h2>
            </div>

            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className="block">
                    <span className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-wider cursor-pointer ${
                      isActive 
                        ? "bg-red-600 text-white shadow-md shadow-red-500/10" 
                        : "text-gray-500 hover:text-red-550 dark:hover:text-red-500 hover:bg-gray-50 dark:hover:bg-black/20"
                    }`}>
                      <item.icon className="w-4.5 h-4.5" />
                      <span>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <Button
              onClick={async () => { await signOut(); router.push("/"); }}
              variant="ghost"
              className="w-full h-11 rounded-xl text-xs font-bold text-red-500 hover:text-white hover:bg-red-600 transition-all flex items-center justify-center gap-2 border border-transparent hover:border-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </Button>
          </div>
        </aside>

        {/* Dynamic page contents wrapper */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-black/10">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
