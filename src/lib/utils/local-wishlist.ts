export async function localWishlist({state,productId}: {state: boolean | undefined,productId: string}){
  const localStorageWishlist = localStorage.getItem('wishlist');

  if(state) {
    const wishlist = JSON.parse(localStorageWishlist as string);
    const newWishlist = wishlist.filter((e: string) => e !== productId);

    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  }

  if (!localStorageWishlist) return localStorage.setItem('wishlist', JSON.stringify([productId]));

  if (localStorageWishlist.includes(productId)) return;

  localStorage.setItem('wishlist', JSON.stringify([...(JSON.parse(localStorageWishlist)), productId]));
}