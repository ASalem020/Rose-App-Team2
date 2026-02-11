export async function getCartService() {
  const res = await fetch('/api/get-cart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data;
}
