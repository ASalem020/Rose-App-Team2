'use client';
import { useAddToWishlist } from '@/hooks/use-add-to-wishlist';
import useRemoveFromWishlist from '@/hooks/use-remove-from-wishlist';
import { localWishlist } from '@/lib/utils/local-wishlist';
import { cn } from '@/lib/utils/tailwind-merge';
import { HeartMinus, HeartPlus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type AddToWishlistBtnPropsType = {
  productId: string;
};

export default function AddToWishlistBtn({
  productId,
}: AddToWishlistBtnPropsType) {
  // Translation
  const t = useTranslations('common');

  // State
  const [added, setIsAdded] = useState<boolean>(false);

  // Mutation
  const { addToWishlist } = useAddToWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();

  // Variables
  const { status } = useSession();

  // Functions
  const toggleAdded = () => {
    const isUnauthenticated = status === 'unauthenticated';

    if (!isUnauthenticated) {
      if (added) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(productId);
      }
    }

    localWishlist({ state: added, productId, t });
    setIsAdded(prev => !prev);
  };

  // Effects
  useEffect(() => {
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist?.includes(productId)) {
      setIsAdded(true);
    }
  }, [productId]);

  return (
    <div
      className={cn(
        'add-to-wishlist-container group absolute left-2 top-2 z-20 h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-white text-maroon-600 duration-300 hover:!w-32 hover:px-2 rtl:left-0 rtl:right-2 rtl:hover:!w-36',
        added &&
          '!w-fit bg-zinc-800 px-2 text-white hover:!w-fit',
      )}
    >
      <div
        className={cn(
          'add-to-wishlist-button flex gap-1.5 ps-1.5 pt-1.5',
          added && 'ps-0',
        )}
        aria-label="add to wishlist button"
        onClick={toggleAdded}
      >
        {/* Icon */}
        <div className="icon">
          {added ? (
            <HeartMinus size={18} />
          ) : (
            <HeartPlus size={18} />
          )}
        </div>

        {/* Hovered Text */}
        <span
          className={cn(
            'text invisible whitespace-nowrap text-xs font-medium opacity-0 duration-300 group-hover:visible group-hover:opacity-100',
            added && '!visible !opacity-100',
          )}
        >
          {added ? t('wishlist.remove') : t('wishlist.add')}
        </span>
      </div>
    </div>
  );
}
