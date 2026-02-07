import { addToWishlistAction } from "@/lib/actions/add-to-wishlist.action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export function useAddToWishlist() {
  const { mutate: addToWishlist, isPending , error } = useMutation({
    mutationKey: ['add-to-wishlist'],
    mutationFn: async (id: string) => {
      const payload = await addToWishlistAction(id);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { addToWishlist , isPending , error}
}
