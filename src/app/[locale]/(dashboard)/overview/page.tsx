import React, { Suspense } from 'react';
import FirstRow from '../../dashboard/_components/stats-row';
import FirstRowSkeleton from '../../dashboard/_components/skeleton/first-row-skeleton';

export default function page() {
  return (
    <div className="flex h-screen flex-row bg-zinc-50">
      <div className="w-1/5 bg-white">Sidebar</div>
      <Suspense fallback={<FirstRowSkeleton />}>
        <FirstRow />
      </Suspense>
    </div>
  );
}
