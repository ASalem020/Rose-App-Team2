'use client'
import { cn } from '@/lib/utils/tailwind-merge';
import { HeartMinus, HeartPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

type AddToWishlistBtnPropsType = {
  productId: string
}

export default function AddToWishlistBtn({ productId }: AddToWishlistBtnPropsType) {
  // State 
  const [added, setIsAdded] = useState<boolean>(localStorage.getItem('wishlist')?.includes(productId) || false);

  // Functions
  const toggleAdded = () => {
    setIsAdded((prev) => !prev);
  }

  // Effects 
  useEffect(() => {
    if (added) {
      const localeStorageWishlist = localStorage.getItem('wishlist');

      if (!localeStorageWishlist) return localStorage.setItem('wishlist', JSON.stringify([productId]));

      if (localeStorageWishlist.includes(productId)) return;

      localStorage.setItem('wishlist', JSON.stringify([...(JSON.parse(localeStorageWishlist)), productId]));
    }

  }, [added, productId]);

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
