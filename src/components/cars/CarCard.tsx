"use client";

import { Car } from "@/types";
import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Eye, Zap, Gauge, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: Car;
  onView3D: (car: Car) => void;
}

export function CarCard({ car, onView3D }: CarCardProps) {
  const addToCart = useAppStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card modal click
    // Add default primary paint color to cart
    addToCart(car, car.colors[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-white dark:bg-[#09090a] rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-150 dark:border-gray-850 transition-all cursor-pointer"
      onClick={() => onView3D(car)}
    >
      {/* Visual Badge overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-md shadow-red-500/10">
          {car.type}
        </span>
        {car.drive === "AWD" && (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gray-900/80 dark:bg-black/60 text-white backdrop-blur-sm">
            4x4 AWD
          </span>
        )}
      </div>

      {/* Hero vehicle photo container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-black/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.images.main}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay hover deck */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Button
            size="sm"
            onClick={(e) => { e.stopPropagation(); onView3D(car); }}
            className="flex items-center gap-1.5 h-10 px-4 rounded-full bg-white text-black hover:bg-red-500 hover:text-white transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-xs font-bold">3D Обзор</span>
          </Button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-6 flex flex-col justify-between grow">
        <div>
          {/* Header Title */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-black text-black dark:text-white tracking-tight group-hover:text-red-500 transition-colors">
              {car.name}
            </h3>
            <span className="text-xs text-gray-400 font-medium">{car.year}</span>
          </div>

          {/* Pricing indicator */}
          <div className="text-xl font-extrabold text-red-600 dark:text-red-500 tracking-tight mb-4">
            от {car.price.toLocaleString()} AMD
          </div>

          {/* Core tech specs grid */}
          <div className="grid grid-cols-3 gap-2.5 py-4 border-t border-b border-gray-150 dark:border-gray-850 mb-6 text-center">
            {/* Spec 1: Power */}
            <div className="flex flex-col items-center">
              <Zap className="w-4 h-4 text-red-500 mb-1 shrink-0" />
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-tight block">Мощность</span>
              <span className="text-xs font-bold text-black dark:text-white">{car.specs.power}</span>
            </div>

            {/* Spec 2: Acceleration */}
            <div className="flex flex-col items-center">
              <Gauge className="w-4 h-4 text-red-500 mb-1 shrink-0" />
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-tight block">Разгон</span>
              <span className="text-xs font-bold text-black dark:text-white">{car.specs.acceleration}</span>
            </div>

            {/* Spec 3: Consumption */}
            <div className="flex flex-col items-center">
              <Compass className="w-4 h-4 text-red-500 mb-1 shrink-0" />
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-tight block">Расход</span>
              <span className="text-xs font-bold text-black dark:text-white">{car.specs.consumption}</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Button
            variant="outline"
            onClick={() => onView3D(car)}
            className="w-full flex items-center justify-center gap-1.5 h-10 rounded-xl border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <span>Детали</span>
          </Button>

          <Button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-1.5 h-10 rounded-xl bg-red-600 hover:bg-red-700 dark:bg-red-550 dark:hover:bg-red-600 text-white text-xs font-bold shadow-md shadow-red-500/5 hover:shadow-red-500/15"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>В корзину</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
