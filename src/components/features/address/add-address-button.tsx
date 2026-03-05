'use client';

// Imports

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import AddressModal from './address-modal';

// Component

/**
 * AddAddressButton - A standalone button that opens the address creation wizard
 *
 * This component handles its own dialog state and initializes the
 * AddressModal in 'wizard' mode directly.
 *
 * Features:
 * - Direct access to the address creation flow
 * - Handles dialog open/close state internally
 * - Uses the standard AddressModal component
 */
export function AddAddressButton() {
  // Context

  const t = useTranslations('pages.address.list');

  // State

  const [isOpen, setIsOpen] = useState(false);

  // Handlers

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Render

  return (
    <>
      <Button
        variant={'secondary'}
        onClick={handleOpen}
        className="flex w-full items-center gap-2 font-medium"
        type="button"
      >
        <Plus className="h-4 w-4" />
        {t('addNew')}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-xl overflow-hidden border-none p-0 shadow-2xl">
          <div className="p-6">
            <AddressModal
              initialView="wizard"
              onAddressSelect={() => handleClose()}
              onSave={() => handleClose()}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
