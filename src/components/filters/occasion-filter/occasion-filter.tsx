'use client'

import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { OccasionCard } from './occasion-card'
import { useOccasions } from '@/hooks/use-occasions'
import BuildSearchparams, {
  BuildSearchparamsProps,
} from '@/components/features/build-searchparams'

export function OccasionFilter({ searchParams }: BuildSearchparamsProps) {
  // Translations
  const t = useTranslations('pages.product.filter')

  // Router
  const router = useRouter()

  // Active occasion from URL
  const activeOccasion = searchParams?.occasion ?? null

  // Fetch occasions
  const { data: occasions, isLoading } = useOccasions()

  return (
    <div className="flex flex-col gap-2">
      {/* Header + reset */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-zinc-800">
          {t('occasion')}
        </h2>

        <span
          className="flex cursor-pointer items-center gap-2 text-red-600"
          onClick={() => {
            const params = BuildSearchparams({ searchParams })
            params.delete('occasion')
            router.push(`/products?${params.toString()}`)
          }}
        >
          <X /> {t('reset')}
        </span>
      </div>

      {/* Occasion cards */}
      <div className="grid max-h-[320px] grid-cols-2 gap-3 overflow-y-auto pr-1">
        {isLoading
          ? null
          : occasions?.map(occasion => {
              const params = BuildSearchparams({ searchParams })
              params.set('occasion', occasion._id)

              const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${occasion.image}`
              const isActive = activeOccasion === occasion._id

              return (
                <a
                  key={occasion._id}
                  href={`/products?${params.toString()}`}
                >
                  <OccasionCard
                    name={occasion.name}
                    image={imageUrl}
                    selected={isActive}
                  />
                </a>
              )
            })}
      </div>
    </div>
  )
}
