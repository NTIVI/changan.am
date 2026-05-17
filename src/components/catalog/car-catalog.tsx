"use client";

import { useState } from "react";
import { MOCK_CARS, Car } from "@/data/cars";
import { CarCard } from "./car-card";
import { CarModal } from "../3d/car-modal";
import { Button } from "@/components/ui/button";

export function CarCatalog() {
  const [filter, setFilter] = useState<string>("Все");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const filters = ["Все", "Кроссовер", "Седан", "Внедорожник"];

  const filteredCars = filter === "Все" 
    ? MOCK_CARS 
    : MOCK_CARS.filter(car => car.type === filter);

  return (
    <section id="models" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-4">
            Модельный ряд
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
            Выберите свой идеальный CHANGAN. От элегантных седанов до мощных внедорожников.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mt-6 md:mt-0 w-full md:w-auto hide-scrollbar">
          {filters.map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "default" : "outline"}
              className="rounded-full whitespace-nowrap"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredCars.map(car => (
          <CarCard key={car.id} car={car} onClick={setSelectedCar} />
        ))}
      </div>

      {/* 3D Modal */}
      <CarModal 
        car={selectedCar} 
        isOpen={!!selectedCar} 
        onClose={() => setSelectedCar(null)} 
      />
    </section>
  );
}
