export async function getAddressService() {
  const res = await fetch('/api/addresses');
  const data = await res.json();

  return data.addresses;
}
