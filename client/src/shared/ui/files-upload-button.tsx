import { PaperClipIcon } from '@heroicons/react/16/solid';

import { ComponentProps } from 'react';

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
  if (error) {
    alert(error);
  }

  return (
    <label className="text-primary relative" htmlFor={name}>
      <PaperClipIcon width={24} height={24} /> {label}
      <input type="file" className="hidden" id={name} {...props} />
      {!!attachedFilesCount && (
        <span className="bg-primary absolute top-0 right-0 z-20 inline-flex h-4 w-4 items-center justify-center rounded-full text-white">
          {attachedFilesCount}
        </span>
      )}
    </label>
  );
};
