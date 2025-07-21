import { useEffect, useState } from 'react';

export const usePreviewImages = (images?: File[]) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (!images?.length) {
      return;
    }

    const previewArr: string[] = [];

    images.forEach((img) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          previewArr.push(reader.result.toString());
          setPreviewImages(previewArr);
        }
      };

      reader.readAsDataURL(img);
    });
  }, [images]);

  return previewImages;
};
