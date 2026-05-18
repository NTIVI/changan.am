"use client";

import { Car } from "@/types";
import { CarCard } from "./CarCard";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface CarGridProps {
  cars: Car[];
  onView3D: (car: Car) => void;
}

export function CarGrid({ cars, onView3D }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 bg-gray-50 dark:bg-black/15 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800"
      >
        <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-extrabold text-black dark:text-white mb-2">
          Модели не найдены
        </h3>
        <p className="text-gray-550 dark:text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
          Пожалуйста, попробуйте изменить критерии поиска или сбросить активные фильтры, чтобы увидеть автомобили.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} onView3D={onView3D} />
      ))}
    </div>
  );
}
