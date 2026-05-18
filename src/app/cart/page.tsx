"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAppStore } from "@/lib/store";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft, CreditCard, BadgeCheck, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CartPage() {
  const { user, profile } = useAuth();
  
  // Zustand State hooks
  const cart = useAppStore((state) => state.cart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const clearCart = useAppStore((state) => state.clearCart);
  const placeOrder = useAppStore((state) => state.placeOrder);

  // Form states
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "credit">("cash");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  const total = cart.reduce((acc, item) => acc + item.car.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const customerName = profile?.name || "Покупатель CHANGAN";
    const customerEmail = user?.email || "anonymous@changan.am";

    // Place each car in cart as a separate order using the correct Zustand parameter signature
    let lastId = "";
    cart.forEach((item) => {
      const order = placeOrder(
        user?.id || "guest",
        customerName,
        customerEmail,
        item.car,
        item.color,
        paymentMethod
      );
      if (order) {
        lastId = order.id;
      }
    });

    setPlacedOrderId(lastId || "ORD-SUCCESS");
    setCheckoutSuccess(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050506] text-black dark:text-white flex flex-col transition-colors duration-300">
      <Header />
      
      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <Link href="/cars" className="inline-flex items-center text-red-650 hover:text-red-700 mb-8 font-bold text-xs uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Вернуться в каталог моделей</span>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-10">
          Ваша корзина
        </h1>

        {checkoutSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white dark:bg-[#09090a] rounded-3xl border border-green-200 dark:border-green-950/30 p-8 shadow-xl max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-black text-black dark:text-white mb-2">Заказ успешно оформлен!</h2>
            <p className="text-gray-555 dark:text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Ваш запрос передан официальному дилеру CHANGAN Armenia. Менеджер свяжется с вами по указанному в профиле номеру в течение 15 минут.
            </p>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-150 dark:border-gray-850 inline-block mb-8">
              <span className="text-xs text-gray-400 block mb-0.5">Номер последнего заказа</span>
              <span className="font-mono font-bold text-sm text-red-500">{placedOrderId}</span>
            </div>

            <div>
              <Link href="/profile">
                <Button className="h-11 px-6 rounded-xl bg-red-650 hover:bg-red-750 text-white font-bold text-xs uppercase tracking-wider shadow-md">
                  Перейти в личный кабинет
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : cart.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#09090a] rounded-3xl border border-gray-150 dark:border-gray-850 shadow-md">
            <h2 className="text-xl font-extrabold mb-3 text-black dark:text-white">Корзина пуста</h2>
            <p className="text-gray-550 dark:text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Вы еще не добавили ни одного автомобиля. Выберите модель из модельного ряда и нажмите кнопку «В корзину».
            </p>
            <Link href="/cars">
              <Button className="h-11 px-6 rounded-xl bg-red-650 hover:bg-red-750 text-white font-bold text-xs uppercase tracking-wider">
                Перейти в каталог
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart list (66%) */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-[#09090a] rounded-3xl border border-gray-150 dark:border-gray-850 shadow-sm items-center hover:shadow-md transition-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.car.images.main}
                    alt={item.car.name}
                    className="w-full sm:w-48 aspect-[16/10] bg-gray-50 dark:bg-black/30 rounded-2xl object-cover border border-gray-200/50 dark:border-gray-800 shrink-0"
                  />
                  
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-0.5">
                          {item.car.type}
                        </div>
                        <h3 className="text-lg font-black text-black dark:text-white tracking-tight">{item.car.name}</h3>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full transition-colors shrink-0"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-gray-400 font-medium">Цвет:</span>
                      <div className="w-4.5 h-4.5 rounded-full border border-gray-300 dark:border-gray-700 shrink-0" style={{ backgroundColor: item.color.hex }} />
                      <span className="text-xs font-bold text-gray-650 dark:text-gray-300">
                        {item.color.name}
                      </span>
                    </div>

                    <p className="text-lg font-extrabold text-red-650 dark:text-red-500 tracking-tight">
                      {item.car.price.toLocaleString()} AMD
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end pt-2">
                <Button variant="ghost" onClick={clearCart} className="text-xs font-bold text-gray-400 hover:text-red-500">
                  Очистить корзину
                </Button>
              </div>
            </div>

            {/* Checkout Options Panel (33%) */}
            <div className="bg-white dark:bg-[#09090a] p-8 rounded-3xl border border-gray-150 dark:border-gray-850 h-fit shadow-lg sticky top-28 space-y-8">
              <div>
                <h3 className="text-xl font-black text-black dark:text-white mb-1">Ваш заказ</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  CHANGAN Armenia Official Dealership
                </p>
              </div>
              
              {/* Payment Selectors */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  Способ оплаты
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentMethod("cash")}
                    className={`py-3 text-xs font-bold rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "cash"
                        ? "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500"
                        : "border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`}
                  >
                    <BadgeCheck className="w-4.5 h-4.5" />
                    <span>Наличные</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("credit")}
                    className={`py-3 text-xs font-bold rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "credit"
                        ? "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500"
                        : "border-gray-200 dark:border-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`}
                  >
                    <CreditCard className="w-4.5 h-4.5" />
                    <span>В кредит</span>
                  </button>
                </div>
              </div>

              {/* Price Details */}
              <div className="space-y-4 pt-4 border-t border-gray-150 dark:border-gray-850">
                <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <span>Автомобили ({cart.length})</span>
                  <span>{total.toLocaleString()} AMD</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <span>Доставка в Ереване</span>
                  <span className="text-green-500">Бесплатно</span>
                </div>
                
                <hr className="border-gray-150 dark:border-gray-850" />
                
                <div className="flex justify-between items-center">
                  <span className="text-base font-extrabold text-black dark:text-white">Итого</span>
                  <span className="text-2xl font-black text-red-650 dark:text-red-500 tracking-tight">
                    {total.toLocaleString()} AMD
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full h-12 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-650 hover:bg-red-750 text-white shadow-lg shadow-red-500/10 hover:shadow-red-500/25 transition-all"
                >
                  Оформить заказ
                </Button>
                <p className="text-[10px] text-center text-gray-450 leading-normal">
                  Оформляя заказ, вы подтверждаете согласие на обработку персональных данных и передачу дилеру.
                </p>
              </div>
            </div>
            
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
