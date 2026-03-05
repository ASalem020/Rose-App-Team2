import GalleryDialog from '../_components/gallery-dialog';
import GlobalDeleteAlertDialog from '../_components/global-delete-alert-dialog.tsx';

export default function Page() {
  return (
    // Write here for test only, will be deleted later
    <div className="flex items-center gap-6">
      {/* Global Delete Alert Dialog */}
      <GlobalDeleteAlertDialog />

      {/* Gallery Dialog */}
      <GalleryDialog productId="673e32c7115992017182817b" />
    </div>
  );
}
