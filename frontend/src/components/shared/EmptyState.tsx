import React from 'react';
import { Sprout } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-[var(--border-stone)] bg-[var(--bg-surface)] py-14 px-6 text-center">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#285442]/10 text-[#285442] dark:bg-[#D6F36A]/15 dark:text-[#D6F36A]">
      <Sprout className="h-6 w-6" />
    </div>
    <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">{title}</h3>
    <p className="mt-1 max-w-md text-sm text-[var(--text-muted)]">{description}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);