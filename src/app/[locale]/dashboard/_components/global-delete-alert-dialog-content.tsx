import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash, X } from 'lucide-react';
import { DialogTo } from '../_types/dialog';
import { useDeleteAccount } from '../_hooks/delete-account';
import { useDeleteProduct } from '../_hooks/delete-product';
import { useDeleteOccasion } from '../_hooks/delete-occasion';
import { useDeleteCategory } from '../_hooks/delete-category';

type GlobalDeleteAlertDialogContentProps = {
  setDialogClose: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  cancelText: string;
  confirmText: string;
  dialogTo: DialogTo;
  title: string;
  description?: string;
  // Make it required only to prevent errors in those cases product, category, and occasion
  actionId: string;
};

export default function GlobalDeleteAlertDialogContent({
  setDialogClose,
  title,
  description,
  cancelText,
  confirmText,
  dialogTo,
  actionId,
}: GlobalDeleteAlertDialogContentProps) {
  // Mutations
  const { deleteAccountMutate } = useDeleteAccount();
  const { deleteProductMutate } = useDeleteProduct();
  const { deleteCategoryMutate } = useDeleteCategory();
  const { deleteOccasionMutate } = useDeleteOccasion();

  // Handlers
  const handleConfirm = () => {
    switch (dialogTo) {
      case 'account':
        deleteAccountMutate();
        break;
      case 'product':
        deleteProductMutate(actionId!);
        break;
      case 'category':
        deleteCategoryMutate(actionId!);
        break;
      case 'occasion':
        deleteOccasionMutate(actionId!);
        break;
    }
  };

  return (
    <AlertDialogContent className="min-h-96 items-center gap-0 !rounded-2xl p-6">
      {/* Header */}
      <AlertDialogHeader>
        {/* X Icon */}
        <div
          className="header flex justify-end pb-6 pl-2.5"
          onClick={() => setDialogClose(false)}
        >
          <X
            size={25}
            className="cursor-pointer text-zinc-700/50 duration-300 hover:text-zinc-700"
          />
        </div>

        {/* Content */}
        <div className="content flex flex-col gap-6 space-y-4">
          {/* Trash Icon */}
          <div className="icon-container mx-auto">
            <div className="icon-box relative flex size-16 items-center justify-center rounded-full bg-zinc-800/15 before:absolute before:left-1/2 before:top-1/2 before:z-0 before:size-24 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-zinc-800/5">
              <Trash size={29} className="text-zinc-800" />
            </div>
          </div>

          {/* Text */}
          <div className="text text-center">
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription className="text-base text-maroon-500">
                {description}
              </AlertDialogDescription>
            )}
          </div>
        </div>
      </AlertDialogHeader>

      {/* Footer */}
      <AlertDialogFooter className="mt-14 gap-2.5">
        {/* Cancel Button */}
        <AlertDialogCancel className="w-1/2 grow">
          {cancelText}
        </AlertDialogCancel>

        {/* Confirm Button */}
        <AlertDialogAction
          className="w-1/2 grow bg-red-600"
          onClick={handleConfirm}
        >
          {confirmText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
