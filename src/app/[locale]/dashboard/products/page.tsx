import GalleryDialog from '../_components/gallery-dialog';
import GlobalDeleteAlertDialog from '../_components/global-delete-alert-dialog.tsx';

export default function Page() {
  return (
    // Write here for test only, will be deleted later
    <div className="flex items-center gap-6">
      {/* Global Delete Alert Dialog */}
      <GlobalDeleteAlertDialog />

      {/* Gallery Dialog */}
      <GalleryDialog
        // ! replace the images array with the product images from the backend later
        images={[
          'https://flower.elevateegy.com/uploads/66c36d5d-c067-46d9-b339-d81be57e0149-image_one.png',
          'https://flower.elevateegy.com/uploads/f27e1903-74cf-4ed6-a42c-e43e35b6dd14-image_three.png',
          'https://flower.elevateegy.com/uploads/500fe197-0e16-4b01-9a0d-031ccb032714-image_two.png',
        ]}
      />
    </div>
  );
}
