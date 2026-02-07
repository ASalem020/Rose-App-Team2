import { BuildSearchparamsProps } from "@/components/features/build-searchparams";
import CategoryFilter from "./_components/filter/category-filter";
import RatingFilter from "./_components/filter/rating-filter";
import ResetAllFilters from "./_components/filter/reset-all-filter";

export default function ProductPage({ searchParams }: BuildSearchparamsProps) {
  return (
    <div className="mx-auto container mt-12 grid grid-cols-4 gap-6 ">
      <div className="col-span-1 bg-zinc-50 space-y-6 divide-y-2 *:py-2 p-2 border-1">

        {/* By Category */}
        <CategoryFilter searchParams={searchParams}/>

        {/* By Rating */}
        <RatingFilter searchParams={searchParams}/>

        {/* Reset All Filters */}
        <ResetAllFilters />
      </div>

      {/* dispaly products */}
      <div className="col-span-3">
        yassa
      </div>
      
    </div>
  );

}