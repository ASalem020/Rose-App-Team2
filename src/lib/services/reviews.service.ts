export async function getReviewsService(productId: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/reviews/`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
