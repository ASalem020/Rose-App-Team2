import { Button } from '@/components/ui/button';
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
import { useTranslations } from 'next-intl';

export default function AddAddress() {
  // Translation
  const t = useTranslations(
    'pages.checkout.shipping-addresses',
  );

  return (
    <div className="add-address flex flex-col gap-2.5 border-b border-zinc-100">
      {/* OR UI */}
      <div className="flex items-center gap-2.5 py-2">
        <span className="line flex-1 border border-zinc-100"></span>
        <span className="text text-base font-semibold text-zinc-500 md:text-lg">
          {t('or')}
        </span>
        <span className="line flex-1 border border-zinc-100"></span>
      </div>

      {/* Add Address Button */}
      <AlertDialog>
        {/* Trigger */}
        <AlertDialogTrigger asChild>
          <Button variant="secondary">
            {t('add-new-address')}
          </Button>
        </AlertDialogTrigger>

        {/* Content */}
        {/* TODO: Will replaced when merge */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will
              permanently delete your account from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
