'use client';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import GlobalDeleteAlertDialogContent from './global-delete-alert-dialog-content';
import { useTranslations } from 'next-intl';

export default function GlobalDeleteAlertDialog() {
  // Translation
  const t = useTranslations(
    'pages.global-delete-alert-dialog',
  );

  // States
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>{t('show-dialog')}</Button>
      </AlertDialogTrigger>

      {/* Dialog Content */}
      <GlobalDeleteAlertDialogContent
        // show messages files to know translated messages for all dialog types
        title={t('account.title')}
        description={t('account.description')}
        confirmText={t('account.confirm')}
        cancelText={t('account.cancel')}
        dialogTo="account"
        setDialogClose={setOpen}
        actionId=""
      />
    </AlertDialog>
  );
}
