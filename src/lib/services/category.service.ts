export async function getCategoriesService() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?page=`,
  );
  const data = await res.json();
  return data;
}
