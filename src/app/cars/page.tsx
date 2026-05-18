"use client";

import { useState } from "react";
import { MOCK_CARS, Car } from "@/data/cars";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CarCard } from "@/components/catalog/car-card";
import { CarModal } from "@/components/3d/car-modal";
import { Button } from "@/components/ui/button";
import { Search, Info, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function CarsPage() {
  const [filter, setFilter] = useState<string>("Все");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const filters = ["Все", "Кроссовер", "Седан", "Внедорожник"];

  // Filter and search logic
  const filteredCars = MOCK_CARS.filter((car) => {
    const matchesFilter = filter === "Все" || car.type === filter;
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070707] text-black dark:text-white flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Compass className="w-4 h-4" />
            Интерактивный Каталог CHANGAN
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-black dark:text-white"
          >
            Модельный Ряд CHANGAN
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 font-light"
          >
            Выберите понравившуюся модель, чтобы открыть интерактивный 3D-обзор кузова, покрутить автомобиль и ознакомиться с техническими характеристиками.
          </motion.p>
        </div>

        {/* Controls Bar: Search & Filters */}
        <div className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-200 dark:border-gray-800/80 shadow-md mb-12 flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Filters Buttons */}
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar shrink-0">
            {filters.map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                variant={filter === f ? "default" : "outline"}
                className={`rounded-xl whitespace-nowrap h-11 px-5 font-semibold text-sm ${
                  filter === f 
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-none" 
                    : "border-gray-200 dark:border-gray-800 dark:text-gray-300"
                }`}
              >
                {f}
              </Button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию модели (например, UNI-K)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-12 pr-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
            />
          </div>

        </div>

        {/* Grid Section */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onClick={setSelectedCar} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-[#111] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <Info className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-xl font-bold text-black dark:text-white mb-2">Ничего не найдено</p>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Попробуйте сбросить фильтры или ввести другое название модели.
            </p>
          </div>
        )}

      </main>

      {/* 3D Orbit Viewer Modal */}
      <CarModal 
        car={selectedCar} 
        isOpen={!!selectedCar} 
        onClose={() => setSelectedCar(null)} 
      />

      <Footer />
    </div>
  );
}
