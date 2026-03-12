'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import GalleryDialogContent from './gallery-dialog-content';

type GalleryDialogProps = {
  images: string[];
  children: React.ReactNode;
};

export default function GalleryDialog({
  images,
  children,
}: GalleryDialogProps) {
  // States
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      {/* Dialog Content */}
      <GalleryDialogContent
        images={images}
        setClosed={setOpen}
      />
    </AlertDialog>
  );
}
