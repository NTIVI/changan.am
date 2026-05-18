import { Car } from "@/types";

export const MOCK_CARS: Car[] = [
  {
    id: "cs75plus",
    name: "Changan CS75 Plus",
    model: "CS75 Plus",
    price: 12500000,
    type: "SUV",
    drive: "AWD",
    year: 2025,
    specs: {
      power: "178 л.с.",
      acceleration: "8.9 с",
      consumption: "7.5 л/100 км",
      engine: "1.5L Turbo",
      transmission: "8-АКПП AISIN",
      weight: "1625 кг"
    },
    colors: [
      { name: "Белый перламутр", hex: "#FFFFFF" },
      { name: "Черный металлик", hex: "#0F0F10" },
      { name: "Темно-серый", hex: "#4A4D50" }
    ],
    images: {
      main: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    features: [
      "Система предотвращения столкновений",
      "Адаптивный круиз-контроль (ACC)",
      "Камеры кругового обзора 360°",
      "Панорамная крыша с люком"
    ]
  },
  {
    id: "uni-t",
    name: "Changan UNI-T",
    model: "UNI-T",
    price: 11000000,
    type: "Кроссовер",
    drive: "FWD",
    year: 2025,
    specs: {
      power: "167 л.с.",
      acceleration: "9.2 с",
      consumption: "6.5 л/100 км",
      engine: "1.5L Blue Core",
      transmission: "7-DCT (мокрое сцепление)",
      weight: "1500 кг"
    },
    colors: [
      { name: "Спортивный Серый", hex: "#3A3A3C" },
      { name: "Кристально Белый", hex: "#FAFAFA" },
      { name: "Глубокий Синий", hex: "#1A365D" }
    ],
    images: {
      main: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    features: [
      "Уникальная радиаторная решетка без рамок",
      "Выдвижные ручки дверей",
      "Интеллектуальный автопарковщик (APA 5.0)",
      "Спортивный спойлер V-образного типа"
    ]
  },
  {
    id: "uni-v",
    name: "Changan UNI-V",
    model: "UNI-V",
    price: 10500000,
    type: "Седан",
    drive: "FWD",
    year: 2025,
    specs: {
      power: "181 л.с.",
      acceleration: "7.1 с",
      consumption: "6.2 л/100 км",
      engine: "1.5L Turbo Blue Core",
      transmission: "7-DCT",
      weight: "1400 кг"
    },
    colors: [
      { name: "Матовый Серый (Shadow)", hex: "#4C515B" },
      { name: "Огненно-Красный", hex: "#C00000" },
      { name: "Иссиня-Черный", hex: "#0B0C10" }
    ],
    images: {
      main: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    features: [
      "Активный задний спойлер (выдвижной)",
      "Спортивный режим разгона SUPER RACE",
      "Интегрированная выхлопная система",
      "Скрытые дверные ручки с подсветкой"
    ]
  },
  {
    id: "alsvin",
    name: "Changan Alsvin",
    model: "Alsvin",
    price: 7900000,
    type: "Седан",
    drive: "FWD",
    year: 2025,
    specs: {
      power: "107 л.с.",
      acceleration: "11.5 с",
      consumption: "5.6 л/100 км",
      engine: "1.5L Атмосферный",
      transmission: "5-DCT",
      weight: "1100 кг"
    },
    colors: [
      { name: "Кристально-Белый", hex: "#FFFFFF" },
      { name: "Серебристый металлик", hex: "#C0C0C0" },
      { name: "Стильный Синий", hex: "#2E5E8A" }
    ],
    images: {
      main: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2070&auto=format&fit=crop",
      gallery: []
    },
    features: [
      "Камера заднего вида со статической разметкой",
      "Электронный круиз-контроль",
      "Люк в крыше с электроприводом",
      "Мультимедийная система с экраном 7\""
    ]
  },
  {
    id: "lamore",
    name: "Changan Lamore",
    model: "Lamore",
    price: 13000000,
    type: "Минивэн",
    drive: "FWD",
    year: 2025,
    specs: {
      power: "166 л.с.",
      acceleration: "8.2 с",
      consumption: "5.9 л/100 км",
      engine: "1.5L Turbo",
      transmission: "7-DCT",
      weight: "1720 кг"
    },
    colors: [
      { name: "Платиновый Серый", hex: "#7E8287" },
      { name: "Жемчужно-Белый", hex: "#F3F4F6" },
      { name: "Темно-Синий", hex: "#1C2434" }
    ],
    images: {
      main: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=2070&auto=format&fit=crop",
      gallery: []
    },
    features: [
      "Просторная 7-местная компоновка (2+2+3)",
      "Сдвижные боковые двери с электроприводом",
      "Панорамное остекление крыши",
      "Система голосового управления функциями салона"
    ]
  },
  {
    id: "hunter",
    name: "Changan Hunter",
    model: "Hunter",
    price: 14500000,
    type: "Пикап",
    drive: "AWD",
    year: 2025,
    specs: {
      power: "150 л.с.",
      acceleration: "12.5 с",
      consumption: "8.2 л/100 км",
      engine: "2.0T Дизель",
      transmission: "6-МКПП / 8-АКПП",
      weight: "2050 кг"
    },
    colors: [
      { name: "Пустынный песок", hex: "#D2B48C" },
      { name: "Военный зеленый", hex: "#556B2F" },
      { name: "Матовый черный", hex: "#1C1C1C" }
    ],
    images: {
      main: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
      gallery: []
    },
    features: [
      "Рамная конструкция повышенной прочности",
      "Подключаемый полный привод с блокировкой дифференциала",
      "Грузоподъемность до 1000 кг",
      "Защитное покрытие кузова повышенной стойкости"
    ]
  }
];
