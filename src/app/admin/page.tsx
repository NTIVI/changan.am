"use client";

import { Header } from "@/components/header";
import { Users, ShoppingBag, CarFront, TrendingUp, ShieldAlert, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-medium">Проверка прав доступа...</p>
        </div>
      </div>
    );
  }

  // Restrict access for non-admins (clients or guests)
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
        <Header />
        
        {/* Decorative alert glow background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/10 dark:bg-red-950/5 rounded-full blur-3xl -z-10" />

        <div className="w-full max-w-lg mt-24">
          <div className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-red-200 dark:border-red-950/30 text-center">
            <div className="w-20 h-20 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center mx-auto mb-6 border border-red-100 dark:border-red-900/30">
              <ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-500" />
            </div>
            
            <h1 className="text-3xl font-black tracking-tight text-black dark:text-white mb-4">
              Доступ ограничен
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">
              У вас нет прав для просмотра этого раздела. Панель управления доступна только для администраторов и сотрудников автосалона CHANGAN Armenia.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => router.push("/")}
                variant="outline"
                className="rounded-xl h-12 px-6 font-semibold border-2 dark:border-gray-800 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                На главную страницу
              </Button>
              <Button 
                onClick={async () => {
                  await signOut();
                  router.push("/login");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-6 font-semibold"
              >
                Войти как администратор
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <Header />
      
      <div className="pt-24 flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-6 hidden md:block shrink-0 h-full overflow-y-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Админ Панель</h2>
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Обзор", icon: TrendingUp },
              { id: "users", label: "Пользователи", icon: Users },
              { id: "orders", label: "Заказы", icon: ShoppingBag },
              { id: "catalog", label: "Каталог авто", icon: CarFront },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                  activeTab === item.id 
                    ? "bg-blue-600 text-white" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-black mb-8">
              {activeTab === "overview" && "Обзор статистики"}
              {activeTab === "users" && "Управление пользователями"}
              {activeTab === "orders" && "Список заказов"}
              {activeTab === "catalog" && "Управление каталогом"}
            </h1>

            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Общая выручка", value: "145,000,000 ֏", trend: "+12.5%" },
                    { label: "Продано машин", value: "24", trend: "+4" },
                    { label: "Новых пользователей", value: "890", trend: "+15%" },
                    { label: "Активных заказов", value: "12", trend: "-2" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{stat.label}</p>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <span className={`text-sm font-bold ${stat.trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-96 flex items-center justify-center">
                  <p className="text-gray-500">График динамики продаж (В разработке)</p>
                </div>
              </div>
            )}

            {activeTab !== "overview" && (
              <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-16 text-center">
                  <p className="text-xl font-medium text-gray-500">
                    Раздел {activeTab} находится в разработке. <br />Здесь будет таблица с данными и возможностью редактирования.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
