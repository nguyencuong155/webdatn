export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  badge?: string;
}

export interface UserType {
  id: number;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

export interface Order {
  id: number;
  userId: number;
  userName: string;
  productId: number;
  productName: string;
  quantity: number;
  total: number;
  date: string;
  status: string;
  phone: string;
  address: string;
  notes: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatLog {
  id: number;
  userId: number;
  userName: string;
  messages: ChatMessage[];
  date: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  quantity: number;
  notes: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
