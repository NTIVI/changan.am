"use client";

import { useState } from "react";
import { Car, CarColor } from "@/types";
import { CarViewer } from "../3d/CarViewer";
import { useAppStore } from "@/lib/store";
import { X, DoorClosed, Key, Eye, HelpCircle, Check, ShoppingBag, CreditCard, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CarModal3DProps {
  car: Car | null;
  onClose: () => void;
}

type Trim = "Base" | "Comfort" | "Premium";

export function CarModal3D({ car, onClose }: CarModal3DProps) {
  const addToCart = useAppStore((state) => state.addToCart);
  
  // Interactive 3D states
  const [selectedColor, setSelectedColor] = useState<CarColor | null>(null);
  const [lightsOn, setLightsOn] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [hoodOpen, setHoodOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"exterior" | "interior">("exterior");
  
  // Trim options
  const [selectedTrim, setSelectedTrim] = useState<Trim>("Comfort");

  if (!car) return null;

  // Initialize selected color
  const activeColor = selectedColor || car.colors[0];

  // Calculate dynamic price based on trim (+0 for Comfort, -5% for Base, +10% for Premium)
  const getTrimPrice = () => {
    if (selectedTrim === "Base") return car.price * 0.95;
    if (selectedTrim === "Premium") return car.price * 1.10;
    return car.price;
  };

  const currentPrice = getTrimPrice();

  const handleAddToCart = () => {
    // Add vehicle to Zustand store
    const trimCar = {
      ...car,
      name: `${car.name} (${selectedTrim})`,
      price: currentPrice
    };
    addToCart(trimCar, activeColor);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-7xl bg-white dark:bg-[#070708] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 grid grid-cols-1 lg:grid-cols-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/70 dark:bg-black/40 hover:bg-red-550 dark:hover:bg-red-650 hover:text-white dark:text-white transition-all border border-gray-200/50 dark:border-gray-800/40"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Canvas Panel (70%) */}
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-slate-50/50 dark:bg-black/20 border-r border-gray-200 dark:border-gray-800 min-h-[480px]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-500">
                  {car.type}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Выпуск {car.year}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tight">
                {car.name}
              </h2>
            </div>

            {/* 3D Canvas Box */}
            <div className="my-6 grow flex items-center justify-center">
              <CarViewer 
                color={activeColor.hex}
                lightsOn={lightsOn}
                doorsOpen={doorsOpen}
                hoodOpen={hoodOpen}
                viewMode={viewMode}
              />
            </div>

            {/* 3D Interactive Controls Deck */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {/* Door Toggle */}
              <Button
                variant={doorsOpen ? "default" : "outline"}
                onClick={() => setDoorsOpen(!doorsOpen)}
                className={`flex items-center gap-2 rounded-xl transition-all ${doorsOpen ? 'bg-red-600 hover:bg-red-700 text-white border-transparent' : 'border-gray-200 dark:border-gray-800'}`}
              >
                <DoorClosed className="w-4 h-4" />
                <span className="text-xs font-semibold">Двери</span>
              </Button>

              {/* Hood Toggle */}
              <Button
                variant={hoodOpen ? "default" : "outline"}
                onClick={() => setHoodOpen(!hoodOpen)}
                className={`flex items-center gap-2 rounded-xl transition-all ${hoodOpen ? 'bg-red-600 hover:bg-red-700 text-white border-transparent' : 'border-gray-200 dark:border-gray-800'}`}
              >
                <Key className="w-4 h-4" />
                <span className="text-xs font-semibold">Капот</span>
              </Button>

              {/* Lights Toggle */}
              <Button
                variant={lightsOn ? "default" : "outline"}
                onClick={() => setLightsOn(!lightsOn)}
                className={`flex items-center gap-2 rounded-xl transition-all ${lightsOn ? 'bg-red-600 hover:bg-red-700 text-white border-transparent' : 'border-gray-200 dark:border-gray-800'}`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold">Фары</span>
              </Button>

              {/* View Perspective Toggle */}
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === "exterior" ? "interior" : "exterior")}
                className="flex items-center gap-2 rounded-xl border-gray-200 dark:border-gray-800"
              >
                <Eye className="w-4 h-4 text-red-500" />
                <span className="text-xs font-semibold">
                  {viewMode === "exterior" ? "Салон" : "Кузов"}
                </span>
              </Button>

              {/* Exterior Paints Selector */}
              <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black/25">
                {car.colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border transition-all ${activeColor.hex === c.hex ? 'scale-115 ring-2 ring-red-500' : 'opacity-70 hover:opacity-100'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Info Panel (30%) */}
          <div className="lg:col-span-3 p-6 md:p-8 flex flex-col justify-between max-h-[85vh] lg:max-h-none overflow-y-auto">
            <div className="space-y-6">
              {/* Price section */}
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Ориентировочная стоимость</span>
                <div className="text-3xl font-black text-red-600 dark:text-red-500 tracking-tight">
                  {currentPrice.toLocaleString()} AMD
                </div>
              </div>

              {/* Trims Selector */}
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white mb-3">Комплектация</h4>
                <div className="grid grid-cols-3 gap-2">
                  {(["Base", "Comfort", "Premium"] as Trim[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTrim(t)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${selectedTrim === t ? 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500' : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications Grid */}
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white mb-3">Технические характеристики</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-gray-150 dark:border-gray-850">
                    <span className="text-gray-500 dark:text-gray-400">Двигатель</span>
                    <span className="font-semibold text-black dark:text-white">{car.specs.engine || "2.0L Turbo"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-150 dark:border-gray-850">
                    <span className="text-gray-500 dark:text-gray-400">Мощность</span>
                    <span className="font-semibold text-black dark:text-white">{car.specs.power}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-150 dark:border-gray-850">
                    <span className="text-gray-500 dark:text-gray-400">Трансмиссия</span>
                    <span className="font-semibold text-black dark:text-white">{car.specs.transmission || "8-АКПП"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-150 dark:border-gray-850">
                    <span className="text-gray-500 dark:text-gray-400">Привод</span>
                    <span className="font-semibold text-black dark:text-white">{car.drive}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-150 dark:border-gray-850">
                    <span className="text-gray-500 dark:text-gray-400">Разгон до 100 км/ч</span>
                    <span className="font-semibold text-black dark:text-white">{car.specs.acceleration}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-150 dark:border-gray-850">
                    <span className="text-gray-500 dark:text-gray-400">Расход топлива</span>
                    <span className="font-semibold text-black dark:text-white">{car.specs.consumption}</span>
                  </div>
                </div>
              </div>

              {/* Premium Features List */}
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white mb-2.5">Особенности</h4>
                <ul className="space-y-1.5">
                  {car.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 mt-8">
              <Button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-red-600 hover:bg-red-700 dark:bg-red-550 dark:hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Добавить в корзину</span>
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <CreditCard className="w-4 h-4" />
                <span>Оформить в кредит</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
