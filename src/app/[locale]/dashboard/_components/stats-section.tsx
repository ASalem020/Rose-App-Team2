import { Suspense } from 'react';
import FirstRowSkeleton from './skeleton/first-row-skeleton';
import StatsRow from './stats-row';

export default function StatsSection() {
  return (
    <Suspense fallback={<FirstRowSkeleton />}>
      <StatsRow />
    </Suspense>
  );
}
