import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  unit?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, unit, className = '', ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          ref={ref}
          className={`w-full h-11 rounded-md border bg-[var(--bg-surface)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#285442] dark:focus:ring-[#D6F36A] transition-colors ${
            hasError ? 'border-[#B84233]' : 'border-[var(--border-stone)]'
          } ${unit ? 'pr-16' : ''} ${className}`}
          {...props}
        />
        {unit && (
          <span className="pointer-events-none absolute right-3 text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-0.5 rounded border border-[var(--border-stone)]">
            {unit}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';