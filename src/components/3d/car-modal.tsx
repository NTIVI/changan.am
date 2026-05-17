"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingCart, CreditCard, Droplets, Wind, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CarCanvas } from "./car-canvas";
import { Car } from "@/data/cars";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

interface CarModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CarModal({ car, isOpen, onClose }: CarModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");
  const [activeTab, setActiveTab] = useState<"exterior" | "interior">("exterior");
  const addItem = useCartStore(state => state.addItem);

  // Reset color when car changes
  useEffect(() => {
    if (car && car.colors.length > 0) {
      setSelectedColor(car.colors[0].hex);
    }
  }, [car]);

  if (!car) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-10 z-[70] bg-white dark:bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-200 dark:border-gray-800"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6 text-black dark:text-white" />
            </button>

            {/* 3D Viewer Area */}
            <div className="relative flex-1 h-[50vh] md:h-full bg-gray-100 dark:bg-black/50">
              <div className="absolute top-6 left-6 z-10 flex gap-2">
                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-black/5 dark:border-white/10">
                  {activeTab === "exterior" ? "Экстерьер 3D" : "Интерьер 3D (В разработке)"}
                </div>
              </div>

              {/* 3D Canvas */}
              <div className="w-full h-full cursor-grab active:cursor-grabbing">
                <CarCanvas color={selectedColor} />
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-800">
                <Button 
                  variant={activeTab === "exterior" ? "default" : "ghost"} 
                  size="sm" 
                  onClick={() => setActiveTab("exterior")}
                  className="rounded-full"
                >
                  Снаружи
                </Button>
                <Button 
                  variant={activeTab === "interior" ? "default" : "ghost"} 
                  size="sm" 
                  onClick={() => setActiveTab("interior")}
                  className="rounded-full"
                >
                  Внутри
                </Button>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="w-full md:w-[450px] lg:w-[500px] h-[50vh] md:h-full overflow-y-auto p-8 md:p-10 flex flex-col bg-white dark:bg-[#0a0a0a]">
              <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase rounded-full mb-4 w-fit">
                {car.type}
              </div>
              
              <h2 className="text-4xl font-black tracking-tight mb-2 text-black dark:text-white">
                {car.name}
              </h2>
              
              <p className="text-3xl font-medium text-blue-600 dark:text-blue-500 mb-8">
                от {car.price.toLocaleString("ru-RU")} ֏
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <Zap className="w-6 h-6 text-blue-500 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Мощность</span>
                  <span className="font-bold text-black dark:text-white">{car.specs.power}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <Wind className="w-6 h-6 text-blue-500 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Разгон</span>
                  <span className="font-bold text-black dark:text-white">{car.specs.acceleration}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Расход</span>
                  <span className="font-bold text-black dark:text-white">{car.specs.consumption}</span>
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Выбор цвета кузова
                </h3>
                <div className="flex items-center gap-4">
                  {car.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.hex)}
                      className={cn(
                        "relative w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-sm",
                        selectedColor === color.hex 
                          ? "border-blue-500 scale-110" 
                          : "border-transparent scale-100 hover:scale-105"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.hex && (
                        <Check className={cn(
                          "absolute inset-0 m-auto w-5 h-5",
                          color.hex === "#FFFFFF" ? "text-black" : "text-white"
                        )} />
                      )}
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {car.colors.find(c => c.hex === selectedColor)?.name}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-10 flex-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Ключевые особенности
                </h3>
                <ul className="space-y-3">
                  {car.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-auto">
                <Button 
                  onClick={() => {
                    if (car) {
                      addItem({ car, color: selectedColor });
                      onClose();
                    }
                  }}
                  className="w-full h-14 rounded-xl text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Добавить в корзину
                </Button>
                <Button variant="outline" className="w-full h-14 rounded-xl text-lg font-medium border-2 dark:border-gray-800">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Оформить в кредит
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
