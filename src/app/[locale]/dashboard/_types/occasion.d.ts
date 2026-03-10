export type DeleteOccasionSuccessResponse = {
  message: 'success';
  document: {
    _id: string;
    name: string;
    slug: string;
    image: string;
    isSuperAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
