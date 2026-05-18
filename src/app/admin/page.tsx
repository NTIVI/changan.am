"use client";

import { useAppStore } from "@/lib/store";
import { TrendingUp, ShoppingBag, Users, CarFront, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminOverview() {
  const globalOrders = useAppStore((state) => state.orders);

  // Dynamic calculations from Zustand Store
  const totalRevenue = globalOrders.reduce((sum, order) => {
    // Only count confirmed or processing orders
    if (order.status !== "cancelled") {
      return sum + order.price;
    }
    return sum;
  }, 0);

  const activeOrdersCount = globalOrders.filter(
    (o) => o.status === "processing" || o.status === "pending"
  ).length;

  const totalCarsSold = globalOrders.filter(
    (o) => o.status === "completed"
  ).length;

  const recentOrders = [...globalOrders]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const stats = [
    { 
      label: "Общая Выручка", 
      value: `${totalRevenue.toLocaleString()} AMD`, 
      trend: "+15.4%", 
      icon: <DollarSign className="w-5 h-5 text-red-500" /> 
    },
    { 
      label: "Продано Автомобилей", 
      value: String(totalCarsSold), 
      trend: "+3 в этом месяце", 
      icon: <CarFront className="w-5 h-5 text-red-500" /> 
    },
    { 
      label: "Зарегистрировано Клиентов", 
      value: "142", 
      trend: "+12% в мае", 
      icon: <Users className="w-5 h-5 text-red-500" /> 
    },
    { 
      label: "Активные Заказы", 
      value: String(activeOrdersCount), 
      trend: "В обработке дилером", 
      icon: <ShoppingBag className="w-5 h-5 text-red-500" /> 
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-black dark:text-white tracking-tight">
          Обзор статистики
        </h1>
        <p className="text-sm text-gray-550 dark:text-gray-400 font-medium">
          Оперативная информация о продажах и взаимодействиях CHANGAN в Армении.
        </p>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-[#09090a] p-6 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-bold text-gray-450 dark:text-gray-400 uppercase tracking-widest block mb-2">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-black dark:text-white tracking-tight mb-1">
                {stat.value}
              </h3>
              <span className="text-[10px] font-bold text-green-500 block">
                {stat.trend}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center shrink-0">
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* SVG Sales Graph section */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        
        {/* Sales Chart (60%) */}
        <div className="lg:col-span-6 bg-white dark:bg-[#09090a] p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-black dark:text-white mb-1">
              Динамика продаж моделей
            </h3>
            <p className="text-xs text-gray-550 font-semibold mb-6">
              Количество проданных единиц автомобилей за 2026 год.
            </p>
          </div>

          {/* Elegant SVG Chart representation */}
          <div className="w-full h-56 relative flex items-center justify-center">
            <svg viewBox="0 0 500 200" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f0f0f0" strokeWidth="1" className="dark:stroke-gray-850" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="#f0f0f0" strokeWidth="1" className="dark:stroke-gray-850" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#f0f0f0" strokeWidth="1" className="dark:stroke-gray-850" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="#cccccc" strokeWidth="1.5" className="dark:stroke-gray-800" />
              
              {/* Sales Curve Line path */}
              <path
                d="M 50 170 Q 140 140 230 150 T 410 40"
                fill="none"
                stroke="#C00000"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              
              {/* Chart dots */}
              <circle cx="50" cy="170" r="5.5" fill="#C00000" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="140" cy="140" r="5.5" fill="#C00000" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="230" cy="150" r="5.5" fill="#C00000" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="320" cy="90" r="5.5" fill="#C00000" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="410" cy="40" r="5.5" fill="#C00000" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Value Texts */}
              <text x="50" y="192" textAnchor="middle" fontSize="10" fill="#999" fontWeight="bold">Янв</text>
              <text x="140" y="192" textAnchor="middle" fontSize="10" fill="#999" fontWeight="bold">Фев</text>
              <text x="230" y="192" textAnchor="middle" fontSize="10" fill="#999" fontWeight="bold">Мар</text>
              <text x="320" y="192" textAnchor="middle" fontSize="10" fill="#999" fontWeight="bold">Апр</text>
              <text x="410" y="192" textAnchor="middle" fontSize="10" fill="#999" fontWeight="bold">Май</text>
              
              <text x="30" y="24" textAnchor="end" fontSize="10" fill="#999" fontWeight="bold">10</text>
              <text x="30" y="74" textAnchor="end" fontSize="10" fill="#999" fontWeight="bold">5</text>
              <text x="30" y="124" textAnchor="end" fontSize="10" fill="#999" fontWeight="bold">2</text>
              <text x="30" y="174" textAnchor="end" fontSize="10" fill="#999" fontWeight="bold">0</text>
            </svg>
          </div>
        </div>

        {/* Recent Orders Overview (40%) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#09090a] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-black dark:text-white mb-4">
              Последняя активность
            </h3>
            
            <div className="space-y-4">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex justify-between items-start text-xs border-b border-gray-150 dark:border-gray-850 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-extrabold text-black dark:text-white">{o.car_name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {o.user_name} • {o.user_email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-650 dark:text-red-500">
                      {o.price.toLocaleString()} ֏
                    </p>
                    <span className="text-[9px] font-bold text-gray-400">{o.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
