'use client';

import { useSyncWishlistAfterLogin } from '@/hooks/use-sync-wishlist-after-login';

export default function AuthSideEffects() {
  useSyncWishlistAfterLogin();
  return null;
}
