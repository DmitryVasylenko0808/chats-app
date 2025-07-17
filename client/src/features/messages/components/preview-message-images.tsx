import { usePreviewImages } from '@/shared/hooks';
import { Button } from '@/shared/ui';

import { ComponentProps } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type PreviewImagesProps = ComponentProps<'div'> & {
  images?: File[];
  onClose?: () => void;
};

export const PreviewMessageImages = ({
  images,
  onClose,
  ...props
}: Readonly<PreviewImagesProps>) => {
  if (!images?.length) {
    return null;
  }

  const previewImages = usePreviewImages(images);

  return (
    <div
      className="border-t-secondary-300 bg-secondary-100 dark:bg-dark-400 dark:border-t-dark-100 absolute bottom-24 left-0 z-30 w-full border-t px-6 py-2"
      {...props}
    >
      <div className="mb-0.5 flex justify-end">
        <Button variant="text" onClick={onClose}>
          <AiOutlineClose size={24} />
        </Button>
      </div>
      <ul className="flex flex-wrap gap-4">
        {previewImages.map((image) => (
          <li className="relative inline-flex" key={image}>
            <img src={image} alt={image} className="h-40 w-40 rounded-2xl" />
          </li>
        ))}
      </ul>
    </div>
  );
};
