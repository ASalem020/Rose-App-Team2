'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 font-sans">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      <p className="text-gray-600">Loading...</p>
    </div>
  );
}
