'use client';


// Imports


import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/tailwind-merge';
import type { Address, AddressFormData } from '../../../lib/types/address';
import AddressFormStep from './address-form-step';
import AddressMapStep from './address-map-step';


// Types


interface AddressWizardProps {
  /** Pre-filled data when editing an existing address */
  editingAddress?: Address | null;
  /** Session username (firstName + lastName) */
  username: string;
  /** Default phone from the session */
  defaultPhone?: string;
  /** Called after a successful save (add / update) */
  onSave: () => void;
  /** Called when the user cancels out of the wizard entirely */
  onCancel: () => void;
}

type WizardStep = 'form' | 'map';


// Component


/**
 * AddressWizard - Multi-step wizard for adding or editing user addresses
 *
 * Features:
 * - Two-step process: Details Form -> Map Selection
 * - Handles both create and update operations
 * - Adaptive progress bar with visual feedback
 * - Responsive layout with dark mode support
 *
 * @param props - Component properties
 */
export default function AddressWizard({
  editingAddress,
  username,
  defaultPhone = '',
  onSave,
  onCancel,
}: AddressWizardProps) {

  // State


  const [step, setStep] = useState<WizardStep>('form');
  const [formData, setFormData] = useState<AddressFormData | null>(
    editingAddress
      ? {
          id: editingAddress.id,
          name: editingAddress.name,
          street: editingAddress.street,
          city: editingAddress.city,
          phone: editingAddress.phone,
        }
      : null,
  );


  // Variables


  const isEditing = !!editingAddress;
  const t = useTranslations('pages.address.wizard');


  // Handlers


  /**
   * Handle form submission from step 1
   * @param data - Validated form data
   */
  const handleFormSubmit = (data: AddressFormData) => {
    setFormData(data);
    setStep('map');
  };

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    if (step === 'form') {
      onCancel();
    } else {
      setStep('form');
    }
  };


  // Helper Functions


  /**
   * Render the wizard header with progress bar
   */
  const renderHeader = () => (
    <div className="mb-6">
      <div className="flex justify-start rtl:justify-end ">
      <button
        type="button"
        onClick={handleBack}
        className="mb-2  text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5   " />
      </button>
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {isEditing ? t('updateTitle') : t('addTitle')}
      </h2>

      {/* Step Progress Bar */}
      <div className="flex items-center gap-0 mb-3">
        {/* Line before step 1 */}
        <div className="flex-1 h-1 bg-red-500 dark:bg-softPink-500 rounded-full" />
        
        {/* Step 1 badge */}
        <div className="relative -mx-1 z-10">
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 shadow-sm",
              "bg-red-500 dark:bg-softPink-500 text-white border-white dark:border-zinc-700"
            )}
          >
            1
          </div>
        </div>

        {/* Line between steps */}
        <div
          className={cn(
            "flex-1 h-1 rounded-full",
            step === 'map'
              ? "bg-red-500 dark:bg-softPink-500"
              : "bg-gray-200 dark:bg-zinc-600"
          )}
        />

        {/* Step 2 badge */}
        <div className="relative -mx-1 z-10">
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 shadow-sm",
              step === 'map'
                ? "bg-red-500 dark:bg-softPink-500 text-white border-white dark:border-zinc-700"
                : "bg-gray-200 dark:bg-zinc-600 text-gray-400 dark:text-gray-500 border-white dark:border-zinc-700"
            )}
          >
            2
          </div>
        </div>
      </div>

      <p className="text-red-500 dark:text-softPink-500 font-medium text-sm">
        {step === 'form' ? t('steps.details') : t('steps.location')}
      </p>
    </div>
  );


  // Render


  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-700">
      {renderHeader()}

      {step === 'form' && (
        <AddressFormStep
          initialData={formData}
          defaultPhone={defaultPhone}
          onSubmit={handleFormSubmit}
        />
      )}

      {step === 'map' && formData && (
        <AddressMapStep
          formData={formData}
          editingAddress={editingAddress}
          username={username}
          onSave={onSave}
        />
      )}
    </div>
  );
}
