// Testimonial
export interface Testimonial {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  rating: number;
  content: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API Response
type TestimonialsAPISuccessResponse = {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  testimonials: Testimonial[];
};

declare type TestimonialsAPIResponse =
  TestimonialsAPISuccessResponse;
