
'use client'

import BuildSearchparams, { BuildSearchparamsProps } from '@/components/features/build-searchparams';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";

export default function RatingFilter({ searchParams }: BuildSearchparamsProps) {

    // ^ translaition
    const t = useTranslations("pages.product.filter");

    // ^ 1 Router and Active Rate
    const router = useRouter();
    const activeRate = Number(searchParams.rateAvg ?? 0);

    return (
        <div className='flex flex-col gap-3'>

            {/* reset  */}
            <div className='flex justify-between items-center '>
                <h2 className='text-xl text-zinc-800 gap-2'>{t("rating")}</h2>
                <span
                    className="cursor-pointer text-red-600 gap-2 flex items-center"
                    onClick={() => {
                        const params = BuildSearchparams({ searchParams });
                        params.delete("rateAvg");
                        router.push(`/products?${params.toString()}`);
                    }}
                >
                    <X /> {t("reset")}
                </span>
            </div>

            {/* stars */}
            <div className="inline-flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rate) => {
                    const params = BuildSearchparams({ searchParams });
                    params.set('rateAvg', rate.toString());
                    const isActive = rate <= activeRate;
                    return (
                        <Link href={`/products?${params.toString()}`} className='inline-flex items-center gap-1 text-yellow-500' key={rate}>
                            {isActive ? <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-7"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.303l-4.118 3.527 1.257 5.284c.27 1.134-.964 2.033-1.96 1.425L12 18.354l-4.626 2.835c-.996.608-2.23-.291-1.96-1.425l1.257-5.284-4.118-3.527c-.887-.758-.415-2.21.749-2.303l5.404-.434 2.082-5.006Z"
                                    clipRule="evenodd"
                                />
                            </svg> :
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-7 "
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111 5.563.475c.475.04.675.593.315.9l-4.24 3.63 1.3 5.475c.11.462-.39.804-.79.556L12 18.354l-4.553 2.793c-.4.248-.9-.094-.79-.556l1.3-5.475-4.24-3.63c-.36-.307-.16-.86.315-.9l5.563-.475 2.125-5.111Z"
                                    />
                                </svg>
                            }
                        </Link>
                    );
                })
                }
            </div>

        </div>
    );
}
