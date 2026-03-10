export interface ProductForm {
  title: string;
  description: string;
  quantity: string;
  price: string;
  discount: string;
  priceAfterDiscount: string;
  category: string;
  occasion: string;
  imgCover: File;
  images: FileList | null;
}

export interface UpdateProductFields {
  title: string;
  description: string;
  quantity: number;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  category: string;
  occasion: string;
}
