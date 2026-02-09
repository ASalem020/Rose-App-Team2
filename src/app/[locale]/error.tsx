'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-8 text-center font-sans">
      <h1 className="mb-4 text-2xl">
        Something went wrong!
      </h1>
      <p className="mb-8 text-gray-600">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={() => reset()}
        className="cursor-pointer rounded border-none bg-blue-600 px-4 py-2 text-base text-white"
      >
        Try again
      </button>
    </div>
  );
}
