"use client";

import { Header } from "@/components/header";
import { Users, ShoppingBag, CarFront, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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
