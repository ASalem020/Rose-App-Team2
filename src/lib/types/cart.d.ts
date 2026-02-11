import { Product } from './product';

export interface CartItem {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
}

export interface Cart {
  _id?: string;
  user?: string;
  cartItems?: CartItem[];
  appliedCoupons?: string[];
  totalPrice?: number;
}

export interface CartResponse {
  message?: string;
  numOfCartItems?: number;
  cart?: Cart;
}
