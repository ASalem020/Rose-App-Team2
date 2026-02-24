import z from 'zod';
import { checkoutSchema } from '../schemas/checkout.schema';

export type CartProduct = Omit<
  Product,
  '__v' | 'isSuperAdmin' | 'isInWishlist' | 'favoriteId'
> & {
  isInWishlist?: boolean;
  favoriteId?: string | null;
};

export interface CartItem {
  _id: string;
  product: CartProduct;
  price: number;
  quantity: number;
}

interface ApplyCouponSuccess {
  message: string;
  cart: {
    _id: string;
    user: string;
    cartItems: CartItem[];
    appliedCoupons: [
      {
        coupon: string;
        discountAmount: number;
        appliedAt: string;
        _id: string;
      },
    ];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    discount: number;
    totalPriceAfterDiscount: number;
  };
  discountAmount: number;
  totalAfterDiscount: number;
}

interface ApplyCouponError {
  error: string;
}

export type ApplyCouponResponse =
  | ApplyCouponSuccess
  | ApplyCouponError;

export type CheckoutSchemaType = z.infer<
  ReturnType<typeof checkoutSchema>
>;
