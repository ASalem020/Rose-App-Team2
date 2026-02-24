'use client';


// Imports


import { useState } from 'react';
import { useSession } from 'next-auth/react';
import type { Address } from '../../../lib/types/address';
import AddressList from './address-list';
import AddressWizard from './address-wizard';


// Types


interface AddressModalProps {
  /** Callback function when an address is selected from the list */
  onAddressSelect?: (address: Address) => void;
  /** Callback function when an address is successfully saved */
  onSave?: () => void;
  /** ID of the address that is currently marked as selected */
  selectedAddressId?: string | null;
  /** Initial view mode for the modal */
  initialView?: 'list' | 'wizard';
}


// Component


/**
 * AddressModal - Parent component that toggles between address list and creation wizard
 *
 * Features:
 * - Switches between List View and Wizard View (Add/Edit)
 * - Managed session-derived user info (name, phone)
 * - State synchronization between list and wizard
 *
 * @param props - Component properties
 */
export default function AddressModal({
  onAddressSelect,
  onSave,
  selectedAddressId,
  initialView = 'list',
}: AddressModalProps) {

  // Context


  const { data: session } = useSession();


  // State


  const [viewMode, setViewMode] = useState<'list' | 'wizard'>(initialView);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);


  // Variables


  const username = session?.user
    ? `${session.user.firstName} ${session.user.lastName}`
    : '';
  const userPhone = session?.user?.phone || '';


  // Handlers


  /**
   * Reset data and switch to wizard for a new address
   */
  const handleAddNew = () => {
    setCurrentAddress(null);
    setViewMode('wizard');
  };

  /**
   * Set the active address and switch to wizard for editing
   * @param address - The address to be edited
   */
  const handleEdit = (address: Address) => {
    setCurrentAddress(address);
    setViewMode('wizard');
  };

  /**
   * Return to list view after a successful save
   */
  const handleWizardSave = () => {
    setViewMode('list');
    setCurrentAddress(null);
    onSave?.();
  };

  /**
   * Abort wizard and return to list view
   */
  const handleWizardCancel = () => {
    setViewMode('list');
    setCurrentAddress(null);
  };


  // Render


  return (
    <div className="w-full">
      {viewMode === 'list' && (
        <AddressList
          onEdit={handleEdit}
          onAddNew={handleAddNew}
          onSelect={onAddressSelect}
          selectedAddressId={selectedAddressId}
        />
      )}

      {viewMode === 'wizard' && (
        <AddressWizard
          editingAddress={currentAddress}
          username={username}
          defaultPhone={userPhone}
          onSave={handleWizardSave}
          onCancel={handleWizardCancel}
        />
      )}
    </div>
  );
}
