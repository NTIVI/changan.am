"use client";

import { useState } from "react";
import { MOCK_CARS } from "@/data/cars";
import { Car } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2, Check, Sparkles, RefreshCcw, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCars() {
  const [carsList, setCarsList] = useState<Car[]>(MOCK_CARS);
  const [isAdding, setIsAdding] = useState(false);

  // New mock form states
  const [name, setName] = useState("");
  const [type, setType] = useState<Car["type"]>("SUV");
  const [drive, setDrive] = useState<Car["drive"]>("FWD");
  const [price, setPrice] = useState(10500000);
  const [year, setYear] = useState(2026);
  const [power, setPower] = useState("180 л.с.");

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCar: Car = {
      id: `car-${Date.now()}`,
      name,
      model: name.toLowerCase().replace(/\s+/g, "-"),
      type,
      drive,
      price,
      year,
      colors: [
        { name: "Кристально белый", hex: "#FFFFFF" },
        { name: "Матовый серый", hex: "#555555" },
        { name: "Огненный красный", hex: "#C00000" }
      ],
      images: {
        main: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop",
        gallery: []
      },
      specs: {
        engine: "1.5L Turbo BlueCore",
        power,
        transmission: "7-DCT",
        acceleration: "8.5 сек",
        consumption: "6.8 л/100 км",
        weight: "1480 кг"
      },
      features: ["Светодиодные LED-фары", "Панорамный люк", "Адаптивный круиз"]
    };

    setCarsList([newCar, ...carsList]);
    setIsAdding(false);
    
    // Clear state
    setName("");
    setPower("180 л.с.");
  };

  const handleDeleteCar = (id: string) => {
    setCarsList(carsList.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black dark:text-white tracking-tight">
            Каталог автомобилей
          </h1>
          <p className="text-sm text-gray-550 dark:text-gray-400 font-medium">
            Добавляйте, редактируйте или скрывайте модели CHANGAN из каталога для клиентов.
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 h-11 px-6 rounded-xl bg-red-650 hover:bg-red-750 text-white font-bold shadow-md shadow-red-500/10"
        >
          <Plus className="w-5 h-5" />
          <span>Добавить модель</span>
        </Button>
      </div>

      {/* Add New Car Dialog form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-[#09090a] p-6 rounded-3xl border border-red-200 dark:border-red-900/30 shadow-xl overflow-hidden"
          >
            <h3 className="text-lg font-black text-black dark:text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              Новый автомобиль CHANGAN
            </h3>

            <form onSubmit={handleAddCar} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Model Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Название модели</label>
                  <input
                    type="text"
                    required
                    placeholder="Например, Changan UNI-V"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-semibold"
                  />
                </div>

                {/* Body style */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Тип кузова</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as Car["type"])}
                    className="w-full h-11 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-semibold"
                  >
                    <option value="SUV">SUV (Внедорожник)</option>
                    <option value="Седан">Седан</option>
                    <option value="Кроссовер">Кроссовер</option>
                    <option value="Пикап">Пикап</option>
                    <option value="Минивэн">Минивэн</option>
                  </select>
                </div>

                {/* Drive config */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Привод</label>
                  <select
                    value={drive}
                    onChange={(e) => setDrive(e.target.value as Car["drive"])}
                    className="w-full h-11 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-semibold"
                  >
                    <option value="FWD">FWD (Передний)</option>
                    <option value="AWD">AWD (Полный 4x4)</option>
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Цена (AMD)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-11 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-semibold"
                  />
                </div>

                {/* Engine Power */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Мощность двигателя</label>
                  <input
                    type="text"
                    required
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    className="w-full h-11 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-semibold"
                  />
                </div>

                {/* Year */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Год выпуска</label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full h-11 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-150 dark:border-gray-850 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAdding(false)}
                  className="rounded-xl h-10 px-6 font-bold"
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  className="bg-red-650 hover:bg-red-750 text-white rounded-xl h-10 px-6 font-bold"
                >
                  <span>Добавить в каталог</span>
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicles list table */}
      <div className="bg-white dark:bg-[#09090a] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider bg-gray-50/50 dark:bg-black/15">
                <th className="px-6 py-4.5">Автомобиль</th>
                <th className="px-6 py-4.5">Тип кузова</th>
                <th className="px-6 py-4.5">Привод</th>
                <th className="px-6 py-4.5">Мощность</th>
                <th className="px-6 py-4.5">Базовая стоимость</th>
                <th className="px-6 py-4.5">Цвета кузова</th>
                <th className="px-6 py-4.5 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 dark:divide-gray-850">
              {carsList.map((car) => (
                <tr key={car.id} className="hover:bg-slate-50/50 dark:hover:bg-black/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={car.images.main}
                        alt={car.name}
                        className="w-12 h-8.5 rounded-lg object-cover bg-gray-100 border border-gray-200 dark:border-gray-800 shrink-0"
                      />
                      <div>
                        <span className="font-extrabold text-black dark:text-white text-sm block">
                          {car.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-semibold">{car.year} год</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-gray-650 dark:text-gray-300 font-bold">
                      {car.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-600 dark:text-gray-300">
                    {car.drive}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-600 dark:text-gray-300">
                    {car.specs.power}
                  </td>
                  <td className="px-6 py-4 font-extrabold text-red-650 dark:text-red-500 text-sm">
                    {car.price.toLocaleString()} AMD
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {car.colors.map((c) => (
                        <div
                          key={c.hex}
                          title={c.name}
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-700"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-lg text-gray-500 hover:text-red-550 dark:hover:text-red-500"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteCar(car.id)}
                        className="h-8 w-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
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
