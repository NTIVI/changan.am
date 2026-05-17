export type CarColor = {
  name: string;
  hex: string;
};

export type Car = {
  id: string;
  name: string;
  model: string;
  price: number;
  type: string; // 'Кроссовер', 'Седан', 'Внедорожник'
  drive: string; // 'FWD', 'AWD'
  specs: {
    power: string;
    acceleration: string;
    consumption: string;
  };
  colors: CarColor[];
  images: {
    main: string;
    gallery: string[];
  };
  features: string[];
};

export const MOCK_CARS: Car[] = [
  {
    id: "uni-k",
    name: "CHANGAN UNI-K",
    model: "UNI-K",
    price: 38000000, // in AMD (example)
    type: "Кроссовер",
    drive: "AWD",
    specs: {
      power: "226 л.с.",
      acceleration: "8.1 с",
      consumption: "8.4 л/100 км",
    },
    colors: [
      { name: "Белый", hex: "#FFFFFF" },
      { name: "Черный", hex: "#000000" },
      { name: "Серый", hex: "#5E5E5E" },
      { name: "Синий", hex: "#1D3A5F" },
    ],
    images: {
      main: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
      ],
    },
    features: ["Панорамная крыша", "Адаптивный круиз-контроль", "Премиум аудиосистема"],
  },
  {
    id: "uni-t",
    name: "CHANGAN UNI-T",
    model: "UNI-T",
    price: 32000000,
    type: "Кроссовер",
    drive: "FWD",
    specs: {
      power: "167 л.с.",
      acceleration: "9.2 с",
      consumption: "6.5 л/100 км",
    },
    colors: [
      { name: "Белый", hex: "#FFFFFF" },
      { name: "Серый космос", hex: "#3A3A3C" },
    ],
    images: {
      main: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
      gallery: [],
    },
    features: ["Спортивный дизайн", "Камеры 360", "Беспроводная зарядка"],
  },
  {
    id: "cs55plus",
    name: "CHANGAN CS55 PLUS",
    model: "CS55 PLUS",
    price: 29000000,
    type: "Кроссовер",
    drive: "FWD",
    specs: {
      power: "181 л.с.",
      acceleration: "8.3 с",
      consumption: "5.9 л/100 км",
    },
    colors: [
      { name: "Красный", hex: "#8B0000" },
      { name: "Белый", hex: "#FFFFFF" },
    ],
    images: {
      main: "https://images.unsplash.com/photo-1631269550774-7d5db1241a7e?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
    },
    features: ["Компактный", "Экономичный", "Интеллектуальные системы помощи"],
  },
  {
    id: "lamore",
    name: "CHANGAN LAMORE",
    model: "LAMORE",
    price: 25000000,
    type: "Седан",
    drive: "FWD",
    specs: {
      power: "166 л.с.",
      acceleration: "7.1 с",
      consumption: "5.0 л/100 км",
    },
    colors: [
      { name: "Серебристый", hex: "#C0C0C0" },
      { name: "Черный", hex: "#000000" },
    ],
    images: {
      main: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
    },
    features: ["Элегантный дизайн", "Просторный салон", "LED оптика"],
  },
];
