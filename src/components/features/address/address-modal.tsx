'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import type { Address, AddressFormData, ViewMode } from '../../../lib/types/address';
import AddressList from './address-list';
import AddressForm from './address-form';
import AddressMapStep from './address-map-step';

interface AddressModalProps {
  onAddressSelect?: (address: Address) => void;
  selectedAddressId?: string | null;
}

export default function AddressModal({
  onAddressSelect,
  selectedAddressId,
}: AddressModalProps) {
  const { data: session } = useSession();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<AddressFormData | null>(null);

  const username = session?.user
    ? `${session.user.firstName} ${session.user.lastName}`
    : '';
  const userPhone = session?.user?.phone || '';

  // --- List callbacks ---
  const handleAddNew = () => {
    setCurrentAddress(null);
    setFormData(null);
    setViewMode('form');
  };

  const handleEdit = (address: Address) => {
    setCurrentAddress(address);
    setFormData({
      id: address.id,
      name: address.name,
      street: address.street,
      city: address.city,
      phone: address.phone,
    });
    setViewMode('form');
  };

  // --- Form callbacks ---
  const handleFormSubmit = (data: AddressFormData) => {
    setFormData(data);
    setViewMode('map');
  };

  const handleFormCancel = () => {
    setViewMode('list');
    setCurrentAddress(null);
    setFormData(null);
  };

  // --- Map callbacks ---
  const handleMapSave = () => {
    setViewMode('list');
    setCurrentAddress(null);
    setFormData(null);
  };

  const handleMapBack = () => {
    setViewMode('form');
  };

  const handleMapCancel = () => {
    setViewMode('list');
    setCurrentAddress(null);
    setFormData(null);
  };

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

      {viewMode === 'form' && (
        <AddressForm
          initialData={formData}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          defaultPhone={userPhone}
        />
      )}

      {viewMode === 'map' && (
        <AddressMapStep
          formData={formData}
          editingAddress={currentAddress}
          username={username}
          onSave={handleMapSave}
          onBack={handleMapBack}
          onCancel={handleMapCancel}
        />
      )}
    </div>
  );
}
