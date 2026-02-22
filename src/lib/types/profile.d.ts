export type UserInfoResponse = {
  message: string;
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    phone: "male" | "female";
    photo: string;
    role: string;
    addresses: unknown[]; 
    wishlist: unknown[]; 
    createdAt: string;
  };
};
