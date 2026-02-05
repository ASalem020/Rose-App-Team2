export interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;

  price: number;
  priceAfterDiscount: number;

  quantity: number;
  sold: number;

  rateAvg: number;
  rateCount: number;

  images: string[];
  imgCover: string;

  category: string;
  occasion: string;

  isSuperAdmin: boolean;
  isInWishlist: boolean;

  favoriteId: string | null;

  createdAt: string;
  updatedAt: string;
  __v: number;
}
