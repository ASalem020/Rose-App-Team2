'use client';


// Imports


import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CloudUpload } from 'lucide-react';
import { useState } from 'react';


// Types


type Props = {
  imageUrl?: string;
  onChange?: (file: File) => void;
};


// Component


/**
 * ProfileImage - Circular avatar with an upload overlay button
 *
 * Features:
 * - Shows a live preview as soon as the user picks a new image
 * - Falls back to a default avatar when no image is available
 * - Calls onChange with the selected File for parent form handling
 *
 * @param imageUrl  - Existing image URL from the API
 * @param onChange  - Called with the selected File when the user picks one
 */
export default function ProfileImage({ imageUrl, onChange }: Props) {

  // Translation


  const t = useTranslations('pages.profile');


  // State


  const [preview, setPreview] = useState<string | null>(null);


  // Render


  return (
    <div className="flex items-center gap-6 -mt-5">
      <div className="relative h-24 w-24">
        <Image
          src={preview || imageUrl || '/default-profile.png'}
          alt="profile"
          fill
          className="rounded-full border object-cover"
        />

        {/* Hidden file input triggered by the upload icon */}
        <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-2 shadow">
          <CloudUpload size={18} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (!file) return;
              setPreview(URL.createObjectURL(file));
              onChange?.(file);
            }}
          />
        </label>
      </div>

      <div>
        <p className="font-medium text-zinc-800">{t('upload-photo')}</p>
        <p className="text-sm text-zinc-500">{t('des')}</p>
      </div>
    </div>
  );
}
