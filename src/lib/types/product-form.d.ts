export interface ProductForm {
  title: string;
  description: string;
  quantity: string;
  price: string;
  discount: string;
  priceAfterDiscount: string;
  category: string;
  occasion: string;
  price: string;
  imgCover: File;
  images: FileList | null;
}
