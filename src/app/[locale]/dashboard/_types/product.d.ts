export type DeleteProductSuccessResponse = {
  message: 'success';
  document: {
    _id: string;
    title: string;
    slug: string;
    description: string;
    imgCover: string;
    images: string[];
    price: number;
    priceAfterDiscount: number;
    discount: number;
    rateAvg: number;
    rateCount: number;
    quantity: number;
    category: string;
    occasion: string;
    isSuperAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
};
