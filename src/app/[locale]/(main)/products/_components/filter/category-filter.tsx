
"use client";
import BuildSearchparams, { BuildSearchparamsProps } from '@/components/features/build-searchparams';
import useAllCategories from '@/hooks/use-all-category';
import { categories } from '@/lib/types/category';
import CategoryCard from '../category-card';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function CategoryFilter({ searchParams }: BuildSearchparamsProps) {

    // ^ 1 Router and Active Category
    const router = useRouter();
    const activeCategory = searchParams.category ?? null;

    // ^ 1 Get Categories
    const { categories } = useAllCategories();


    return (
        <div className='flex flex-col gap-2'>

            {/* reset  */}
            <div className='flex justify-between items-center '>
                <h2 className='text-xl text-zinc-800 '>Categories</h2>
                <span
                    className="cursor-pointer text-red-600 gap-2 flex items-center"
                    onClick={() => {
                        const params = BuildSearchparams({ searchParams });
                        params.delete("category");
                        router.push(`/products?${params.toString()}`);
                    }}
                >
                    <X /> Reset
                </span>
            </div>

            {/* display categories */}
            <div className="flex flex-col space-y-3 max-h-64 overflow-y-auto pr-2">
                {categories?.map((category: categories) => {
                    const params = BuildSearchparams({ searchParams });
                    params.set('category', category._id);
                    const isActive = activeCategory === category._id;
                    return (
                        <Link href={`/products?${params.toString()}`} key={category._id}><CategoryCard key={category._id} category={category} isActive={isActive} /></Link>
                    );
                })
                }
            </div>

        </div>
    );
}
