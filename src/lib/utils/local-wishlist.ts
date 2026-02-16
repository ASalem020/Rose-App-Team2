import { _Translator } from 'next-intl';
import { toast } from 'sonner';

type LocalWishlistProps = {
  state?: boolean;
  productId: string;
  t: _Translator;
};

export function localWishlist({
  state,
  productId,
  t,
}: LocalWishlistProps) {
  const stored = localStorage.getItem('wishlist');
  const wishlist: string[] = stored
    ? JSON.parse(stored)
    : [];

  // remove from wishlist
  if (state) {
    const updated = wishlist.filter(id => id !== productId);
    localStorage.setItem(
      'wishlist',
      JSON.stringify(updated),
    );
    return;
  }

  // prevent duplicates
  if (wishlist.includes(productId)) return;

  const updated = [...wishlist, productId];
  localStorage.setItem('wishlist', JSON.stringify(updated));
  toast.success(t('success.saved'));
}
