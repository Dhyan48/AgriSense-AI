import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, children, className = '', ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full h-11 rounded-md border bg-[var(--bg-surface)] px-3.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#285442] dark:focus:ring-[#D6F36A] transition-colors ${
          hasError ? 'border-[#B84233]' : 'border-[var(--border-stone)]'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';