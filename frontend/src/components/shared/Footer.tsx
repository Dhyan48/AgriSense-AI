import React from 'react';
import { Sprout } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="border-t border-[var(--border-stone)] bg-[var(--bg-surface)] py-8 mt-auto">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between text-xs text-[var(--text-muted)]">
      <div className="flex items-center gap-2 font-heading font-bold text-sm text-[var(--text-primary)]">
        <Sprout className="h-4 w-4 text-[#285442] dark:text-[#D6F36A]" />
        <span>AgriSense AI</span>
      </div>
      <p>
        Academic Machine Learning Decision Support System — Not a substitute for certified agronomic advice[cite: 1].
      </p>
    </div>
  </footer>
);