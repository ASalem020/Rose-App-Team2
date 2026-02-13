'use client';


// Imports


import { useState } from 'react';
import { MapPin, Phone, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/tailwind-merge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetAddresses } from '@/hooks/use-get-addresses';
import { useDeleteAddress } from '@/hooks/use-delete-address';
import type { Address } from '../../../lib/types/address';


// Types


interface AddressListProps {
  /** Callback function when edit button is clicked */
  onEdit: (address: Address) => void;
  /** Callback function to navigate to add new address step */
  onAddNew: () => void;
  /** Optional callback when an address card is clicked/selected */
  onSelect?: (address: Address) => void;
  /** ID of currently selected address for highlighting */
  selectedAddressId?: string | null;
}


// Component


/**
 * AddressList - Displays a list of user addresses with edit/delete actions
 *
 * Features:
 * - Fetches addresses from API using React Query
 * - Displays addresses with category badges
 * - Delete confirmation dialog with API integration
 * - Selection highlighting and optimized dark mode
 *
 * @param props - Component properties
 */
export default function AddressList({
  onEdit,
  onAddNew,
  onSelect,
  selectedAddressId,
}: AddressListProps) {

  // Query & Mutation


  const { data: addresses, isLoading, isError } = useGetAddresses();
  const { deleteAddress, isPending: isDeleting } = useDeleteAddress();
  const t = useTranslations('pages.address.list');
  const tc = useTranslations('pages.address.categories');
  const ta = useTranslations('common.actions');


  // State


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState<Address | null>(null);


  // Handlers


  /**
   * Open delete confirmation dialog
   * @param address - Address to be deleted
   */
  const handleDeleteClick = (address: Address) => {
    // Check if the address is currently selected
    if (address.id === selectedAddressId) {
      toast.error(t('deleteConfirm.error'));
      return;
    }

    setSelectedForDeletion(address);
    setDeleteDialogOpen(true);
  };

  /**
   * Finalize address deletion via API
   */
  const confirmDelete = async () => {
    if (selectedForDeletion) {
      deleteAddress(selectedForDeletion.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedForDeletion(null);
        },
      });
    }
  };


  // Render


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <p className="text-red-500 mb-4">{t('error')}</p>
        <Button onClick={() => window.location.reload()}>{ta('retry')}</Button>
      </div>
    );
  }

  

  const normalizedAddresses: Address[] = (addresses || []).map((addr: any) => ({
    id: addr._id || addr.id,
    name: addr.username || addr.name || addr.label  ,
    category: addr.category || addr.type || tc('other'),
    street: addr.street || addr.address || '',
    city: addr.city || '',          
    phone: addr.phone || addr.phoneNumber || '',
    isDefault: addr.isDefault || false,
    latitude: addr.lat || addr.latitude,
    longitude: addr.long || addr.longitude,
  }));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('title')}</h2>
        <Button
          onClick={onAddNew}
          variant="secondary"
          className="text-end !px-3 text-sm font-medium rtl:text-start"
        >
          {t('addNew')}
        </Button>
      </div>

      {/* Addresses List */}
      <div className="max-h-[500px]">
        <div className="p-4 space-y-3">
          {normalizedAddresses.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>{t('empty.title')}</p>
              <p className="text-sm">{t('empty.description')}</p>
            </div>
          ) : (
            normalizedAddresses.slice(-3).map((address, index) => {
              const categories = [tc('home'), tc('work'), tc('family')];
              const category = categories[index] || tc('other');
              const isSelected = selectedAddressId === address.id;

              return (
                <div
                  key={address.id}
                  onClick={() => onSelect?.(address)}
                  className={cn(
                    "relative rounded-lg border-2 transition-all pt-5 pb-2 mb-5 px-4 cursor-pointer",
                    isSelected
                      ? "border-red-500 dark:border-softPink-500 ring-2 ring-red-500 dark:ring-softPink-300 shadow-md"
                      : "border-gray-200 hover:shadow-md hover:border-gray-300"
                  )}
                >
                  {/* Category Badge - Absolute Top Left */}
                  <div className="absolute bg-white dark:bg-zinc-700 rounded-lg -top-3 left-3 rtl:left-auto rtl:right-3">
                    <div className="px-2 rounded-full">
                      <span className="text-sm font-semibold text-red-600 dark:text-softPink-500">
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div dir="ltr" className="space-y-2">
                    {/* First Line: City and Phone */}
                    <div  className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-500 p-1 rounded-full">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {address.city}
                        </h3>
                      </div>
                      <div className="flex rtl:flex-row-reverse items-center gap-2 text-gray-600 dark:text-white">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm" dir="ltr">{address.phone}</span>
                      </div>
                    </div>

                    {/* Second Line: Street Address */}
                    <p className="text-sm text-gray-600 dark:text-white rounded-lg w-fit px-2">
                      {address.street}
                    </p>
                  </div>

                  {/* Action Buttons - Absolute Top Right */}
                  <div  className="absolute top-4 -right-3 flex flex-col items-center gap-2 rtl:right-auto rtl:-left-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 border bg-white dark:bg-zinc-700 border-gray-200 shadow-sm text-gray-600 hover:text-red-600 dark:hover:text-softPink-500 hover:bg-blue-50 hover:border-blue-200 rounded-full"
                      onClick={(e) => { e.stopPropagation(); onEdit(address); }}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6 border border-gray-200 shadow-sm text-white hover:border-red-200 rounded-full"
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
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <DialogTitle className="text-center">
              {t('deleteConfirm.title')}
            </DialogTitle>
            <DialogDescription className="text-center">
              {selectedForDeletion && (
                <span className="font-medium text-gray-700">
                  {selectedForDeletion.city} - {selectedForDeletion.street}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedForDeletion(null);
              }}
              disabled={isDeleting}
            >
              {t('deleteConfirm.cancel')}
            </Button>
            <Button
              variant="destructive"
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? tc('deleting') || 'Deleting...' : t('deleteConfirm.confirm')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
