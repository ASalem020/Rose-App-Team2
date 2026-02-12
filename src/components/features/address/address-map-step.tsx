'use client';

import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowLeft } from 'lucide-react';
import { useAddAddress } from '@/hooks/use-add-address';
import { useUpdateAddress } from '@/hooks/use-update-address';
import type { Address, AddressFormData } from '../../../lib/types/address';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Default center: Cairo, Egypt
const defaultCenter = {
  lat: 30.0444,
  lng: 31.2357,
};

interface AddressMapStepProps {
  formData: AddressFormData | null;
  editingAddress: Address | null;
  username: string;
  onSave: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export default function AddressMapStep({
  formData,
  editingAddress,
  username,
  onSave,
  onBack,
  onCancel,
}: AddressMapStepProps) {
  // Google Maps needs { lat, lng } — ensure values are numbers
  const initialCenter =
    editingAddress?.latitude && editingAddress?.longitude
      ? { lat: Number(editingAddress.latitude), lng: Number(editingAddress.longitude) }
      : defaultCenter;

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>(initialCenter);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const { addAddress, isPending: isAdding } = useAddAddress();
  const { updateAddress, isPending: isUpdating } = useUpdateAddress();
  const isPending = isAdding || isUpdating;

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  }, []);

  const handleConfirm = () => {
    if (!formData) return;

    const payload = {
      street: formData.street,
      phone: formData.phone,
      city: formData.city,
      lat: String(selectedLocation.lat),
      long: String(selectedLocation.lng),
      username,
    };

    if (editingAddress) {
      // Update existing address
      updateAddress(
        { addressId: editingAddress.id, fields: payload },
        { onSuccess: () => onSave() },
      );
    } else {
      // Add new address
      addAddress(payload, { onSuccess: () => onSave() });
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert('Unable to get your location. Please enable location access.');
        },
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          className="mb-2 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {editingAddress ? 'Update Address' : 'Add a New Address'}
        </h2>

        {/* Step Progress Bar */}
        <div className="flex items-center gap-0 mb-3">
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="relative -mx-1 z-10">
            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
              ✓
            </div>
          </div>
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="relative -mx-1 z-10">
            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
              2
            </div>
          </div>
        </div>

        <p className="text-red-500 font-medium text-sm">Find Your Location</p>
      </div>

      {/* Use Current Location Button */}
      <button
        onClick={handleUseCurrentLocation}
        className="w-full flex items-center justify-center gap-2 py-2.5 mb-4 text-sm font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
      >
        <MapPin className="w-4 h-4" />
        Find Your Location
      </button>

      {/* Google Map */}
      <div className="relative h-80 rounded-lg overflow-hidden mb-4 border border-gray-200">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={selectedLocation}
            zoom={14}
            onClick={handleMapClick}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <MarkerF position={selectedLocation} />
          </GoogleMap>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
          </div>
        )}
      </div>

      {/* Selected location display */}
      <div className="mb-4 p-2 bg-gray-50 rounded-lg text-center">
        <p className="text-xs text-gray-600">
          📍 {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={isPending}
          className="w-full h-12 bg-[#8B1A1A] hover:bg-[#721616] text-white font-medium rounded-lg text-base"
        >
          {isPending ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
        </Button>
      </div>
    </div>
  );
}
