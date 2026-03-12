export interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  priceAfterDiscount: number;
  discount: number;
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

export type ProductAPIResponse = {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage: number;
  };
  products: Product[];
};

export type RecommendedProduct = {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  rateAvg: number;
  rateCount: number;
  id: string;
};

export type RecommendedProductsAPIResponse = {
  message: string;
  count: number;
  recommendations: RecommendedProduct[];
};

export interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  priceAfterDiscount: number;
  discount: number;
  quantity: number;
  sold: number;
  rateAvg: number;
  rateCount: number;
  images: FileList | null;
  imgCover: File;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  isInWishlist: boolean;
  favoriteId: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ProductAPIResponse = {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage: number;
  };
  products: Product[];
};
