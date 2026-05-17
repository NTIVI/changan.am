import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car } from "@/data/cars";

interface CartItem {
  car: Car;
  color: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (carId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (carId) =>
        set((state) => ({
          items: state.items.filter((i) => i.car.id !== carId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "changan-cart-storage",
    }
  )
);
