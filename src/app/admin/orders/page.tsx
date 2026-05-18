"use client";

import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, CreditCard } from "lucide-react";

export default function AdminOrders() {
  const globalOrders = useAppStore((state) => state.orders);
  const updateOrderStatus = useAppStore((state) => state.updateOrderStatus);

  const handleConfirmOrder = (id: string) => {
    updateOrderStatus(id, "completed");
  };

  const handleCancelOrder = (id: string) => {
    updateOrderStatus(id, "cancelled");
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-black dark:text-white tracking-tight">
          Управление заказами
        </h1>
        <p className="text-sm text-gray-550 dark:text-gray-400 font-medium">
          Подтверждайте бронирование автомобилей, регулируйте статусы рассрочки/кредита и координируйте выдачу.
        </p>
      </div>

      {/* Orders table */}
      <div className="bg-white dark:bg-[#09090a] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider bg-gray-50/50 dark:bg-black/15">
                <th className="px-6 py-4.5">ID Заказа</th>
                <th className="px-6 py-4.5">Клиент</th>
                <th className="px-6 py-4.5">Автомобиль</th>
                <th className="px-6 py-4.5 font-sans">Сумма</th>
                <th className="px-6 py-4.5">Оплата</th>
                <th className="px-6 py-4.5">Статус</th>
                <th className="px-6 py-4.5 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 dark:divide-gray-850">
              {globalOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-black/20 transition-colors">
                  <td className="px-6 py-4.5 font-bold font-mono text-gray-700 dark:text-gray-300">
                    {order.id}
                  </td>
                  <td className="px-6 py-4.5">
                    <div>
                      <span className="font-extrabold text-black dark:text-white text-sm block">
                        {order.user_name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">{order.user_email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4.5 font-bold text-gray-600 dark:text-gray-300">
                    {order.car_name}
                  </td>
                  <td className="px-6 py-4.5 font-extrabold text-red-650 dark:text-red-500 text-sm">
                    {order.price.toLocaleString()} AMD
                  </td>
                  <td className="px-6 py-4.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-850 text-gray-550 dark:text-gray-300 font-bold uppercase tracking-wide">
                      <CreditCard className="w-2.5 h-2.5 text-red-500" />
                      <span>{order.payment_method === "credit" ? "Кредит" : "Наличные"}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4.5">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === "completed" 
                        ? "bg-green-50 dark:bg-green-950/20 text-green-600" 
                        : order.status === "cancelled"
                        ? "bg-red-50 dark:bg-red-950/20 text-red-650"
                        : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 animate-pulse"
                    }`}>
                      {order.status === "completed" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : order.status === "cancelled" ? (
                        <XCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      <span>
                        {order.status === "completed" 
                          ? "Подтвержден" 
                          : order.status === "cancelled" 
                          ? "Отменен" 
                          : "В обработке"}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-right">
                    <div className="flex gap-2 justify-end">
                      {(order.status === "processing" || order.status === "pending") && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleConfirmOrder(order.id)}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-8 px-3 font-bold flex items-center gap-1"
                          >
                            <span>Подтвердить</span>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleCancelOrder(order.id)}
                            className="border border-red-200 dark:border-red-950/30 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-650 rounded-lg h-8 px-3 font-bold flex items-center gap-1"
                          >
                            <span>Отменить</span>
                          </Button>
                        </>
                      )}
                      
                      {order.status !== "processing" && order.status !== "pending" && (
                        <span className="text-gray-400 font-semibold italic text-[11px] pr-2">
                          Архив
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
