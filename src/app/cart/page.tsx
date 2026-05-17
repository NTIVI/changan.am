"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();

  const total = items.reduce((acc, item) => acc + item.car.price, 0);

  return (
    <main className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Header />
      
      <div className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Вернуться к каталогу
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-10">
          Ваша корзина
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Корзина пуста</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Вы еще не добавили ни одного автомобиля. Перейдите в каталог, чтобы выбрать свой CHANGAN.
            </p>
            <Link href="/#models">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-blue-600 text-white hover:bg-blue-700">
                Перейти в каталог
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <div key={`${item.car.id}-${index}`} className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm items-center">
                  <div className="w-full sm:w-48 h-32 relative bg-gray-50 dark:bg-black/50 rounded-2xl overflow-hidden shrink-0">
                    <Image src={item.car.images.main} alt={item.car.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          {item.car.type}
                        </div>
                        <h3 className="text-xl font-bold text-black dark:text-white">{item.car.name}</h3>
                      </div>
                      <button 
                        onClick={() => removeItem(item.car.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-500">Цвет:</span>
                      <div className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium dark:text-white">
                        {item.car.colors.find(c => c.hex === item.color)?.name || "Неизвестно"}
                      </span>
                    </div>

                    <p className="text-xl font-bold text-blue-600">
                      {item.car.price.toLocaleString("ru-RU")} ֏
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end">
                <Button variant="ghost" onClick={clearCart} className="text-gray-500 hover:text-red-500">
                  Очистить корзину
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-[#111] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 h-fit sticky top-32">
              <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Ваш заказ</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Автомобили ({items.length})</span>
                  <span>{total.toLocaleString("ru-RU")} ֏</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Доставка</span>
                  <span>Бесплатно</span>
                </div>
                <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-800 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-black dark:text-white">Итого</span>
                  <span className="text-2xl font-black text-blue-600">{total.toLocaleString("ru-RU")} ֏</span>
                </div>
              </div>

              <Button className="w-full h-14 rounded-xl text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white mb-3">
                Перейти к оформлению
              </Button>
              <p className="text-xs text-center text-gray-500">
                Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
