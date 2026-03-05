import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="bg-white">
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-2/3" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-1/2" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-1/4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
