export interface OrderItem {
  _id: string;
  quantity: number;
  price: number;
  product: {
    _id: string;
    title: string;
    image: string;
  };
}

export interface Order {
  _id: string;
  orderNumber: string;
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  orderItems: OrderItem[];
}

export interface OrdersMetadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export interface OrdersResponse {
  message: string;
  metadata: OrdersMetadata;
  orders: Order[];
}