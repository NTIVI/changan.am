"use client";

import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation, translateText } from "@/lib/translations";

interface CarFiltersProps {
  search: string;
  setSearch: (s: string) => void;
  selectedType: string;
  setSelectedType: (t: string) => void;
  selectedDrive: string;
  setSelectedDrive: (d: string) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
}

export function CarFilters({
  search,
  setSearch,
  selectedType,
  setSelectedType,
  selectedDrive,
  setSelectedDrive,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
}: CarFiltersProps) {
  const { t, language } = useTranslation();

  const bodyTypes = ["Все", "SUV", "Седан", "Кроссовер", "Пикап", "Минивэн"];
  const drives = ["Все", "FWD", "AWD"];

  return (
    <div className="bg-white dark:bg-[#070708] rounded-3xl p-6 border border-gray-150 dark:border-gray-850 shadow-sm space-y-6">
      {/* Upper bar: Search & Sort */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t("cars.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-black/25 text-black dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm font-medium"
          />
        </div>

        {/* Sort select */}
        <div className="relative">
          <ArrowUpDown className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-12 pr-8 py-3 bg-gray-50 dark:bg-black/25 text-black dark:text-white border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm font-medium appearance-none"
          >
            <option value="none">{t("cars.sortNone")}</option>
            <option value="price-asc">{t("cars.sortPriceAsc")}</option>
            <option value="price-desc">{t("cars.sortPriceDesc")}</option>
            <option value="power-desc">{t("cars.sortPowerDesc")}</option>
          </select>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Middle row: Filters options */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        {/* Body Types selector */}
        <div className="lg:col-span-2 space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            {t("cars.filterBodyType")}
          </label>
          <div className="flex flex-wrap gap-2">
            {bodyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type === "Все" ? "" : type)}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                  (type === "Все" && !selectedType) || selectedType === type
                    ? "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500"
                    : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                {translateText(type, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Drive Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            {t("cars.filterDriveType")}
          </label>
          <div className="flex gap-2">
            {drives.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDrive(d === "Все" ? "" : d)}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all grow ${
                  (d === "Все" && !selectedDrive) || selectedDrive === d
                    ? "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500"
                    : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                {translateText(d, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>{t("cars.filterMaxPrice")}</span>
            <span className="text-red-500 normal-case">{maxPrice.toLocaleString()} AMD</span>
          </div>
          <input
            type="range"
            min={7000000}
            max={15000000}
            step={500000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-650"
          />
          <div className="flex justify-between text-[10px] text-gray-550 font-semibold">
            <span>7,000,000</span>
            <span>15,000,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
