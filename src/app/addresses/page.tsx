'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import AddressModal from '@/components/features/address/address-modal';

export default function AddressesPage() {
  return (
    <Dialog open={true}>
      <DialogContent className="max-w-xl w-full max-h-md p-0 overflow-auto">
        <div className="p-6">
          <AddressModal />
        </div>
      </DialogContent>
    </Dialog>
  );
}
