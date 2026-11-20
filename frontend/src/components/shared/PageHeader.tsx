import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col gap-4 border-b border-[var(--border-stone)] pb-6 mb-8 md:flex-row md:items-end md:justify-between">
    <div className="space-y-2 max-w-2xl">
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#285442] dark:text-[#D6F36A]">
          {eyebrow}
        </span>
      )}
      <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
        {title}
      </h1>
      {description && (
        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);