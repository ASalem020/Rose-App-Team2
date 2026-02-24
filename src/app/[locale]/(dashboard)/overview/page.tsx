import React, { Suspense } from 'react';
import FirstRow from './_components/first-row';
import FirstRowSkeleton from './_components/first-row-skeleton';

export default function page() {
  return (
    <div className="flex h-screen flex-row bg-zinc-200">
      <div className="w-1/5 bg-white">Sidebar</div>
      <Suspense fallback={<FirstRowSkeleton />}>
        <FirstRow />
      </Suspense>
    </div>
  );
}
