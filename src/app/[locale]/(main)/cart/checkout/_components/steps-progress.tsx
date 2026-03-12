'use client';

import { Fragment } from 'react';
import { cn } from '@/lib/utils/tailwind-merge';

type StepsProgressProps = {
  currentStep: number;
  totalSteps?: number;
};

export default function StepsProgress({
  currentStep,
  totalSteps = 2,
}: StepsProgressProps) {
  // Variables
  const steps = Array.from(
    { length: totalSteps },
    (_, i) => i + 1,
  );

  return (
    <div className="mx-auto mb-6 flex items-center justify-between">
      {/* Initial Line (Before Step 1) - Always fills if we are at least on step 1 */}
      <div className="h-1.5 flex-1 rounded-s-full bg-zinc-200">
        <div
          className={cn(
            'h-full rounded-s-full bg-maroon-600 transition-all duration-500 ease-in-out',
            currentStep >= 1 ? 'w-full' : 'w-0',
          )}
        />
      </div>

      {/* Steps */}
      {steps.map((step, i) => {
        const isStepActive = currentStep >= step;
        const isLineActive =
          i === steps.length - 1
            ? currentStep >= step
            : currentStep > step;

        return (
          <Fragment key={step}>
            {/* Step */}
            <div
              className={cn(
                'step relative z-10 flex size-6 items-center justify-center rounded-full text-sm font-semibold',
                isStepActive
                  ? 'bg-maroon-600 text-white'
                  : 'bg-zinc-200 text-zinc-500',
              )}
            >
              {step}
            </div>

            {/* Line */}
            <div
              className={cn(
                'h-1.5 flex-1',
                isLineActive
                  ? 'bg-maroon-600'
                  : 'bg-zinc-200',
                i === steps.length - 1 && 'rounded-e-full',
              )}
            ></div>
          </Fragment>
        );
      })}
    </div>
  );
}
