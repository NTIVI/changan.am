export interface CarColor {
  name: string;
  hex: string;
}

export interface CarSpecs {
  power: string;
  acceleration: string;
  consumption: string;
  engine?: string;
  transmission?: string;
  weight?: string;
}

export interface Car {
  id: string;
  name: string;
  model: string;
  price: number; // in AMD
  type: 'SUV' | 'Седан' | 'Кроссовер' | 'Пикап' | 'Минивэн';
  drive: 'FWD' | 'AWD' | 'RWD';
  specs: CarSpecs;
  colors: CarColor[];
  images: {
    main: string;
    gallery: string[];
  };
  features: string[];
  year: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'client' | 'admin';
  avatar_url?: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  car_id: string;
  car_name: string;
  price: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  payment_method: 'cash' | 'card' | 'credit';
  created_at: string;
}

export interface CartItem {
  id: string;
  car: Car;
  color: CarColor;
  added_at: string;
}
