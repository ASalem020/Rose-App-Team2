import { Skeleton } from '@/components/ui/skeleton';

export default function CardSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="mb-2.5 flex items-center justify-between border-b border-gray-200 pb-2.5"
        >
          <Skeleton className="h-7 w-40 rounded-md" />
          <Skeleton className="h-7 w-28 rounded-md" />
        </div>
      ))}
    </>
  );
}
