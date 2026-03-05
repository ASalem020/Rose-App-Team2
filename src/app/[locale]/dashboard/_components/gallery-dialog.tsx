'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import GalleryDialogContent from './gallery-dialog-content';

type GalleryDialogProps = {
  productId: string;
};

export default function GalleryDialog({
  productId,
}: GalleryDialogProps) {
  // Translation
  const t = useTranslations('pages.gallery-dialog');

  // States
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>{t('show-dialog')}</Button>
      </AlertDialogTrigger>

      {/* Dialog Content */}
      <GalleryDialogContent
        productId={productId}
        setClosed={setOpen}
      />
    </AlertDialog>
  );
}
