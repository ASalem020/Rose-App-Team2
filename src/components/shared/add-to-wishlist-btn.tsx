'use client'
import { useAddToWishlist } from '@/hooks/use-add-to-wishlist';
import useRemoveFromWishlist from '@/hooks/use-remove-from-wishlist';
import { localWishlist } from '@/lib/utils/local-wishlist';
import { cn } from '@/lib/utils/tailwind-merge';
import { HeartMinus, HeartPlus } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { useState } from 'react'

type AddToWishlistBtnPropsType = {
  productId: string
}

export default function AddToWishlistBtn({ productId }: AddToWishlistBtnPropsType) {
  // State 
  const [added, setIsAdded] = useState<boolean>(localStorage.getItem('wishlist')?.includes(productId) || false);

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

    localWishlist({ state: added, productId });
    setIsAdded(prev => !prev);
  };



  return (
    <div className={cn(
      // Main Styles
      'cursor-pointer w-8 h-8 duration:300 hover:w-fit rounded-full flex gap-1.5 items-center justify-center absolute z-20 top-2 left-2 rtl:left-0 rtl:right-2 group hover:px-2 text-maroon-600 bg-white',
      // Conditional Styles
      added && 'bg-zinc-800 text-white !w-fit px-2'
    )}
      aria-label='add to wishlist button' onClick={toggleAdded}>
      {/* Icon */}
      <div className="icon">
        {added ? <HeartMinus size={18} /> : <HeartPlus size={18} />}
      </div>

      {/* Hovered Text */}
      <span className={cn(
        // Main Styles
        'text text-nowrap hidden group-hover:inline text-xs font-medium',
        // Conditional Styles
        added && '!inline'
      )}>
        {added ? "Remove from Wishlist" : "Add To Wishlist"}
      </span>
    </div>
  )
}
