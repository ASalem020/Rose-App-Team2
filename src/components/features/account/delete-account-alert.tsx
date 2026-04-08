'use client';


// Imports


import { useTranslations } from 'next-intl';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';


// Types


type Props = {
  onConfirm: () => void;
};


// Component


/**
 * DeleteAccountAlert - Confirmation dialog for permanent account deletion
 *
 * Features:
 * - Wraps a trigger button that opens an AlertDialog
 * - Calls onConfirm when the user clicks the destructive action button
 * - Fully translated (EN / AR)
 *
 * @param onConfirm - Called when the user confirms account deletion
 */
export function DeleteAccountAlert({ onConfirm }: Props) {

  // Translation


  const t = useTranslations('pages.profile');


  // Render


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="h-11 border-none text-maroon-500 font-semibold"
          variant="outline"
        >
          {t('delete-my-account')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('dialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('dialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="w-80 mx-auto flex items-center justify-center gap-3 *:w-52">
            <AlertDialogCancel>{t('dialog.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              {t('dialog.action')}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
