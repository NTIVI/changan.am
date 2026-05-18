import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car, CarColor, CartItem, Order } from "@/types";

interface AppState {
  cart: CartItem[];
  orders: Order[];
  
  // Cart Actions
  addToCart: (car: Car, color: CarColor) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  // Order Actions
  placeOrder: (
    userId: string, 
    userName: string, 
    userEmail: string, 
    car: Car, 
    color: CarColor, 
    paymentMethod: 'cash' | 'card' | 'credit'
  ) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  setOrders: (orders: Order[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      orders: [
        // Premium default mock orders for rich admin dashboard experience
        {
          id: "ORD-001",
          user_id: "usr-1",
          user_name: "Арам Григорян",
          user_email: "aram@mail.ru",
          car_id: "uni-v",
          car_name: "Changan UNI-V (Огненно-Красный)",
          price: 10500000,
          status: "completed",
          payment_method: "card",
          created_at: "2026-05-10T12:30:00Z"
        },
        {
          id: "ORD-002",
          user_id: "usr-2",
          user_name: "Ани Саргсян",
          user_email: "ani@gmail.com",
          car_id: "cs75plus",
          car_name: "Changan CS75 Plus (Белый перламутр)",
          price: 12500000,
          status: "processing",
          payment_method: "credit",
          created_at: "2026-05-14T15:45:00Z"
        },
        {
          id: "ORD-003",
          user_id: "usr-3",
          user_name: "Карен Арутюнян",
          user_email: "karen@gmail.com",
          car_id: "uni-t",
          car_name: "Changan UNI-T (Спортивный Серый)",
          price: 11000000,
          status: "pending",
          payment_method: "cash",
          created_at: "2026-05-17T09:15:00Z"
        }
      ],

      addToCart: (car, color) => set((state) => {
        // Prevent duplicate items with exact same color
        const exists = state.cart.some(
          (item) => item.car.id === car.id && item.color.hex === color.hex
        );
        if (exists) return state;

        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          car,
          color,
          added_at: new Date().toISOString()
        };
        return { cart: [...state.cart, newItem] };
      }),

      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId)
      })),

      clearCart: () => set({ cart: [] }),

      placeOrder: (userId, userName, userEmail, car, color, paymentMethod) => {
        const newOrder: Order = {
          id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          user_id: userId || "guest",
          user_name: userName || "Гость",
          user_email: userEmail || "guest@changan.am",
          car_id: car.id,
          car_name: `${car.name} (${color.name})`,
          price: car.price,
          status: "pending",
          payment_method: paymentMethod,
          created_at: new Date().toISOString()
        };

        set((state) => ({
          orders: [newOrder, ...state.orders]
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map((o) => o.id === orderId ? { ...o, status } : o)
      })),

      setOrders: (orders) => set({ orders })
    }),
    {
      name: "changan-armenia-store",
      skipHydration: false
    }
  )
);
