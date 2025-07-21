import { ComponentProps, useEffect } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';

import { useAlerts } from '../lib/hooks/use-alerts';

type FilesUploadButtonProps = ComponentProps<'input'> & {
  label?: string;
  attachedFilesCount?: number;
  error?: string;
};
export const FilesUploadButton = ({
  label,
  attachedFilesCount,
  name,
  error,
  ...props
}: Readonly<FilesUploadButtonProps>) => {
  const { notify } = useAlerts();

  useEffect(() => {
    if (error) {
      notify({ variant: 'error', title: 'Error', text: error });
    }
  }, [error]);

  return (
    <label className="text-primary-200 relative cursor-pointer" htmlFor={name}>
      <AiOutlinePicture size={24} /> {label}
      <input type="file" className="hidden" id={name} {...props} />
      {!!attachedFilesCount && (
        <span className="bg-primary-200 text-secondary-100 absolute top-0 right-0 z-20 inline-flex h-4 w-4 items-center justify-center rounded-full">
          {attachedFilesCount}
        </span>
      )}
    </label>
  );
};
