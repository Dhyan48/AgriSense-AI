import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Processing agricultural model data...',
}) => (
  <div className="flex flex-col items-center justify-center rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] py-14 px-6 text-center">
    <Loader2 className="h-8 w-8 animate-spin text-[#285442] dark:text-[#D6F36A] mb-3" />
    <p className="text-sm font-medium text-[var(--text-primary)]">{message}</p>
  </div>
);