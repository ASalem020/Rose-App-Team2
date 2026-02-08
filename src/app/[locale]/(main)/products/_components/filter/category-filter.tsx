"use client";

import BuildSearchparams, { BuildSearchparamsProps } from '@/components/features/build-searchparams';
import useAllCategories from '@/hooks/use-all-category';
import { categories } from '@/lib/types/category';
import CategoryCard from '../category-card';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';
import { useRouter } from "next/navigation";
import CategoryCardSkeleton from '@/components/skeleton/category-card-skeleton';
import { useTranslations } from 'next-intl';

export default function CategoryFilter({ searchParams }: BuildSearchparamsProps) {
    // ^ Translation 
    const t = useTranslations("pages.product.filter");

    // ^ Navigation 
    const router = useRouter();
    const activeCategory = searchParams.category ?? null;

    // ^ Hooks
    const { categories } = useAllCategories();

    return (
        <div className='flex flex-col gap-2'>

            {/* reset  */}
            <div className='flex justify-between items-center '>
                <h2 className='text-xl text-zinc-800'>{t("categories")}</h2>
                <span
                    className="cursor-pointer text-red-600 gap-2 flex items-center"
                    onClick={() => {
                        const params = BuildSearchparams({ searchParams });
                        params.delete("category");
                        router.push(`/products?${params.toString()}`);
                    }}
                >
                    <X /> {t("reset")}
                </span>
            </div>

            {/* display categories */}
            <div className="flex flex-col space-y-2 max-h-64 overflow-y-auto pr-2">
                {categories ?
                    categories?.map((category: categories) => {
                        const params = BuildSearchparams({ searchParams });
                        params.set('category', category._id);
                        const isActive = activeCategory === category._id;
                        return (
                            <Link href={`/products?${params.toString()}`} key={category._id}>
                                <CategoryCard key={category._id} category={category} isActive={isActive} />
                            </Link>
                        );
                    })
                    : <>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <CategoryCardSkeleton key={index} />
                        ))}
                    </>
                }
            </div>

        </div>
    );
}
