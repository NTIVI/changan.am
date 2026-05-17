"use client";

import Image from "next/image";
import { Car } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

export function CarCard({ car, onClick }: CarCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white dark:bg-[#111] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
    >
      <div 
        className="relative h-[250px] w-full overflow-hidden bg-gray-50 dark:bg-black/50 cursor-pointer"
        onClick={() => onClick(car)}
      >
        <Image
          src={car.images.main}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
          <Button 
            className="bg-white text-black hover:bg-gray-100 rounded-full font-medium"
            onClick={(e) => { e.stopPropagation(); onClick(car); }}
          >
            <Eye className="w-4 h-4 mr-2" />
            Быстрый просмотр
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
              {car.type}
            </div>
            <h3 className="text-2xl font-black text-black dark:text-white">
              {car.name}
            </h3>
          </div>
        </div>

        <p className="text-xl font-medium text-blue-600 dark:text-blue-500 mb-6">
          от {car.price.toLocaleString("ru-RU")} ֏
        </p>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 text-center">
            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Мощность</span>
            <span className="block text-sm font-bold text-black dark:text-white">{car.specs.power}</span>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 text-center">
            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Разгон</span>
            <span className="block text-sm font-bold text-black dark:text-white">{car.specs.acceleration}</span>
          </div>
        </div>

        <Button className="w-full h-12 rounded-xl bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white font-medium">
          <ShoppingCart className="w-4 h-4 mr-2" />
          В корзину
        </Button>
      </div>
    </motion.div>
  );
}
