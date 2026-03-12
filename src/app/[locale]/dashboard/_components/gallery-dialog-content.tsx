import {
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';
import ProductGallery from './product-gallery';

type GalleryDialogContentProps = {
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
};

export default function GalleryDialogContent({
  setClosed,
  images,
}: GalleryDialogContentProps) {
  return (
    <AlertDialogContent className="flex min-h-[43.125rem] flex-col gap-0 !rounded-2xl p-6 md:min-w-[58.3125rem]">
      {/* Header */}
      <AlertDialogHeader className="grow">
        {/* X Icon */}
        <div
          className="header flex w-full justify-end pb-6 pl-2.5"
          onClick={() => setClosed(false)}
        >
          <X
            size={25}
            className="cursor-pointer text-zinc-700/50 duration-300 hover:text-zinc-700"
          />
        </div>

        {/* Content */}
        <div className="content flex w-full grow flex-col justify-between gap-6">
          {/* Add Hidden Alert Dialog Title and Description To improve accessibility */}
          <AlertDialogTitle className="hidden">
            Product Gallery Dialog Title
          </AlertDialogTitle>

          <AlertDialogDescription className="hidden">
            Product Gallery Dialog Description
          </AlertDialogDescription>
          {/* ProductGallery */}
          <ProductGallery images={images} />
        </div>
      </AlertDialogHeader>
    </AlertDialogContent>
  );
}
