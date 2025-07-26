import { PropsWithChildren } from 'react';

export const Centered = ({ children }: PropsWithChildren) => (
  <div className="flex h-full w-full items-center justify-center">{children}</div>
);
