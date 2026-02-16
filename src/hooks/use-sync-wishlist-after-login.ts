import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAddToWishlist } from './use-add-to-wishlist';

export const useSyncWishlistAfterLogin = () => {
  const { status } = useSession();
  const { addToWishlist } = useAddToWishlist();

  useEffect(() => {
    if (status !== 'authenticated') return;

    const localWishlist = localStorage.getItem('wishlist');
    if (!localWishlist) return;

    let ids: string[] = [];

    try {
      ids = JSON.parse(localWishlist);
    } catch {
      return;
    }

    if (ids.length === 0) return;

    // NOTE: Promise not all not work correctly and add only first product
    // Promise.all(ids.map(id => addToWishlist(id)))
    //   .catch(console.error);
    ids.map(id => addToWishlist(id));
  }, [status, addToWishlist]);
};
