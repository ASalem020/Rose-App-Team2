'use client';


// Imports


import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
        onClick={handleOpen}
        className="flex items-center gap-2 font-medium"
      >
        <Plus className="w-4 h-4" />
        {t('addNew')}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl w-full p-0 overflow-hidden border-none shadow-2xl">
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
