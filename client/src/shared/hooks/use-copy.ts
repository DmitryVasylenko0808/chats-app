import { useState } from 'react';

export const useCopy = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (text: string) => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(text);
    } else {
      document.execCommand('copy', true, text);
    }

    setCopied(true);
  };

  return { copied, handleCopy };
};
