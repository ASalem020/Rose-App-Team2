import { removeFromWishlistAction } from "@/lib/actions/remove-form-wishlist.action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export default function useRemoveFromWishlist() {
  const { mutate: removeFromWishlist , isPending , error } = useMutation({
    mutationKey: ['remove-from-wishlist'],
    mutationFn: async (id: string) => {
      const payload = await removeFromWishlistAction(id);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },

    onError: error => {
      toast.error(error.message);
    },
    })
  
  return { removeFromWishlist , isPending , error}
}
