/**
 * Represents a single product inside the order
 */
export interface OrderProduct {
  _id: string;
  title: string;
  image: string;
  price: number;
}

/**
 * Represents a single order item
 */
export interface OrderItem {
  product: OrderProduct;
  quantity: number;
  price: number;
}

/**
 * Represents a full order
 */
export interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
  status: string;
  items: OrderItem[];
}

/**
 * API response structure
 */
export interface OrdersResponse {
  orders: Order[];
}
