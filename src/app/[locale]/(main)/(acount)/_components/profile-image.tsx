'use client';

import Image from 'next/image';
import { CloudUpload } from 'lucide-react';
import { useState } from 'react';

type Props = {
  imageUrl?: string;
  onChange?: (file: File) => void;
};

export default function ProfileImage({
  imageUrl,
  onChange,
}: Props) {
    // ^ state
  const [preview, setPreview] = useState<string | null>(
    null,
  );
  return (
    <div className="flex items-center gap-6 -mt-5">
      <div className="relative h-24 w-24">
        <Image
          src={
            preview || imageUrl || '/default-profile.png'
          }
          alt="profile"
          fill
          className="rounded-full border object-cover"
        />

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
        <p className="font-medium text-zinc-800">Upload Photo</p>
        <p className="text-sm text-zinc-500">
          You can upload a .jpg, .png, or .gif photo with
          max size of 5MB.
        </p>
      </div>
    </div>
  );
}
