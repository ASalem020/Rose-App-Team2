'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GetAddresses } from '@/lib/actions/get-addresses.action';
import { toast } from 'sonner';
import type { Address } from '../../../lib/types/address';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddressListProps {
  onEdit: (address: Address) => void;
  onAddNew: () => void;
  onSelect?: (address: Address) => void;
  selectedAddressId?: string | null;
}

export default function AddressList({
  onEdit,
  onAddNew,
  onSelect,
  selectedAddressId,
}: AddressListProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const { error, data } = await GetAddresses();

      if (error) {
        console.error('Failed to load addresses:', error);
        toast.error('Failed to load addresses');
        setAddresses([]);
      } else {
        const addressesArray = data?.addresses || data || [];
        const mappedAddresses: Address[] = addressesArray.map((addr: any) => ({
          id: addr._id || addr.id,
          name: addr.username || addr.name || addr.label || 'Address',
          category: addr.category || addr.type || 'Other',
          street: addr.street || addr.address || '',
          city: addr.city || '',
          building: addr.building || '',
          floor: addr.floor || '',
          apartment: addr.apartment || '',
          phone: addr.phone || addr.phoneNumber || '',
          isDefault: addr.isDefault || false,
          latitude: addr.lat || addr.latitude,
          longitude: addr.long || addr.longitude,
        }));

        setAddresses(mappedAddresses);
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
      toast.error('An error occurred while loading addresses');
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (address: Address) => {
    setAddressToDelete(address);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (addressToDelete) {
      try {
        setAddresses((prev) => prev.filter((addr) => addr.id !== addressToDelete.id));
        toast.success('Address deleted successfully');
      } catch (error) {
        console.error('Error deleting address:', error);
        toast.error('Failed to delete address');
      } finally {
        setDeleteDialogOpen(false);
        setAddressToDelete(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b">
        <h2 className="text-xl font-semibold text-gray-800">My Addresses</h2>
        <Button
          onClick={onAddNew}
          variant="secondary"
          className=" text-end !px-3  text-sm font-medium"
        >
          Add a New Address
        </Button>
      </div>

      {/* Addresses List */}
      <div className=" max-h-[500px]">
        <div className="p-4 space-y-3">
          {addresses.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>No addresses yet</p>
              <p className="text-sm">Add your first address to get started</p>
            </div>
          ) : (
            addresses.slice(0, 3).map((address, index) => {
              const categories = ['Home', 'Work', 'Family'];
              const category = categories[index];
              const isSelected = selectedAddressId === address.id;
              return (
              <div
                key={address.id}
                onClick={() => onSelect?.(address)}
                className={`relative bg-white rounded-lg border-2 transition-all pt-5 pb-2 mb-5 px-4 cursor-pointer ${
                  isSelected
                    ? 'border-red-500 ring-2 ring-red-500/20 shadow-md'
                    : 'border-gray-200 hover:shadow-md hover:border-gray-300'
                }`}
              >
                {/* Category Badge - Absolute Top Left */}
                <div className="absolute -top-3 left-3">
                  <div className="bg-white px-2  rounded-full   ">
                    <span className="text-sm font-semibold text-red-600">
                      {category}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-2">
                  {/* First Line: City and Phone */}
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <div className='bg-green-500 p-1 rounded-full'>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        {address.city}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{address.phone}</span>
                    </div>
                  </div>

                  {/* Second Line: Street Address */}
                  <p className="text-sm text-gray-600 bg-gray-100 rounded-lg w-fit px-2">
                    {address.street}
                  </p>
                </div>

                {/* Action Buttons - Absolute Top Right */}
                <div className="absolute top-4 -right-3 flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 border bg-white border-gray-200 shadow-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded-full"
                    onClick={(e) => { e.stopPropagation(); onEdit(address); }}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6  border border-gray-200 shadow-sm text-white hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-full"
                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(address); }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              );
            })
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <DialogTitle className="text-center">
              Are you sure you want to delete this address?
            </DialogTitle>
            <DialogDescription className="text-center">
              {addressToDelete && (
                <span className="font-medium text-gray-700">
                  {addressToDelete.city} - {addressToDelete.street}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={confirmDelete}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
