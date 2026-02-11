export interface CartProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sold: number;
  isSuperAdmin: boolean;
  rateAvg: number;
  rateCount: number;
  id: string;
}

export interface CartItem {
  product: CartProduct;
  price: number;
  quantity: number;
  _id: string;
}

export interface Cart {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: string[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartResponse {
  message: string;
  numOfCartItems: number;
  cart: Cart;
}
