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
import { useTranslations } from 'next-intl';
import { DialogTo } from '../_types/dialog';
import { useDeleteAccount } from '../_hooks/delete-account';
import { useDeleteProduct } from '../_hooks/delete-product';
import { useDeleteOccasion } from '../_hooks/delete-occasion';
import { useDeleteCategory } from '../_hooks/delete-category';

type GlobalDeleteAlertDialogContentProps = {
  setDialogClose: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  dialogTo: DialogTo;
  // Make it required only to prevent errors in those cases product, category, and occasion
  actionId: string;
};

/**
 * Global Delete Alert Dialog Content Component
 *
 * Renders a reusable alert dialog for confirming deletion operations across different entities.
 * Supports deletion of accounts, products, categories, and occasions with localized content.
 *
 * @component
 * @example
 * ```tsx
 * <GlobalDeleteAlertDialogContent
 *   setDialogClose={setIsOpen}
 *   dialogTo="product"
 *   actionId="69a8cb48e364ef61405e80b4"
 * />
 * ```
 *
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setDialogClose - State setter to control dialog visibility
 * @param {DialogTo} dialogTo - Type of entity being deleted: 'account', 'product', 'category', or 'occasion'
 * @param {string} actionId - ID of the entity to delete (required for product, category, and occasion; not used for account) and can use "" as a placeholder for account deletion to prevent errors
 */
export default function GlobalDeleteAlertDialogContent({
  setDialogClose,
  dialogTo,
  actionId,
}: GlobalDeleteAlertDialogContentProps) {
  // Translation
  const t = useTranslations(
    'pages.global-delete-alert-dialog',
  );

  // Mutations
  const { deleteAccountMutate } = useDeleteAccount();
  const { deleteProductMutate } = useDeleteProduct();
  const { deleteCategoryMutate } = useDeleteCategory();
  const { deleteOccasionMutate } = useDeleteOccasion();

  // Variables
  const variants: Record<
    DialogTo,
    {
      title: string;
      description?: string;
      confirm?: string;
      cancel?: string;
    }
  > = {
    account: {
      title: t('account.title'),
      description: t('account.description'),
      confirm: t('account.confirm'),
      cancel: t('account.cancel'),
    },
    product: {
      title: t('product.title'),
      confirm: t('product.confirm'),
      cancel: t('product.cancel'),
    },
    category: {
      title: t('category.title'),
      confirm: t('category.confirm'),
      cancel: t('category.cancel'),
    },
    occasion: {
      title: t('occasion.title'),
      confirm: t('occasion.confirm'),
      cancel: t('occasion.cancel'),
    },
  };

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
            <AlertDialogTitle>
              {variants[dialogTo].title}
            </AlertDialogTitle>
            {dialogTo === 'account' && (
              <AlertDialogDescription className="text-base text-maroon-500">
                {variants[dialogTo].description}
              </AlertDialogDescription>
            )}
          </div>
        </div>
      </AlertDialogHeader>

      {/* Footer */}
      <AlertDialogFooter className="mt-14 gap-2.5">
        {/* Cancel Button */}
        <AlertDialogCancel className="w-1/2 grow">
          {variants[dialogTo].cancel}
        </AlertDialogCancel>

        {/* Confirm Button */}
        <AlertDialogAction
          className="w-1/2 grow bg-red-600"
          onClick={handleConfirm}
        >
          {variants[dialogTo].confirm}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
