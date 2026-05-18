"use client";

import { useState } from "react";
import { MOCK_CARS } from "@/data/cars";
import { Car } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CarGrid } from "@/components/cars/CarGrid";
import { CarFilters } from "@/components/cars/CarFilters";
import { CarModal3D } from "@/components/cars/CarModal3D";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function CarsPage() {
  // Filters and search states
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDrive, setSelectedDrive] = useState("");
  const [maxPrice, setMaxPrice] = useState(15000000);
  const [sortBy, setSortBy] = useState("none");
  
  // Interactive Modal state
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Advanced Filtering and Searching logic
  const filteredCars = MOCK_CARS.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) ||
                          car.model.toLowerCase().includes(search.toLowerCase());
    const matchesType = !selectedType || car.type === selectedType;
    const matchesDrive = !selectedDrive || car.drive === selectedDrive;
    const matchesPrice = car.price <= maxPrice;

    return matchesSearch && matchesType && matchesDrive && matchesPrice;
  });

  // Sorting
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "power-desc") {
      const getPowerNum = (powerStr: string) => parseInt(powerStr) || 0;
      return getPowerNum(b.specs.power) - getPowerNum(a.specs.power);
    }
    return 0; // none
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white flex flex-col transition-colors duration-300">
      <Header />

      {/* Main Container */}
      <main className="flex-grow pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Page Top Intro Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Compass className="w-4 h-4" />
            <span>Интерактивный Каталог CHANGAN</span>
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
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed"
          >
            Кликните на интересующий автомобиль, чтобы открыть интерактивное модальное окно. Рассматривайте 3D-модель, переключайте цвета кузова, открывайте двери и изучайте характеристики в реальном времени.
          </motion.p>
        </div>

        {/* Dynamic filter panel component */}
        <div className="mb-12">
          <CarFilters
            search={search}
            setSearch={setSearch}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedDrive={selectedDrive}
            setSelectedDrive={setSelectedDrive}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Grid display layout */}
        <div className="my-8">
          <CarGrid 
            cars={sortedCars} 
            onView3D={setSelectedCar} 
          />
        </div>

      </main>

      {/* Full-screen interactive 3D CarViewer Modal */}
      <CarModal3D
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
      />

      <Footer />
    </div>
  );
}
