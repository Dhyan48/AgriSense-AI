import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  helperText,
  error,
  required,
  children,
}) => {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[var(--text-primary)]"
      >
        {label} {required && <span className="text-[#D98B55]">*</span>}
      </label>
      {children}
      {helperText && !error && (
        <p className="text-xs text-[var(--text-muted)]">{helperText}</p>
      )}
      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-[#B84233] dark:text-[#F4A698]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};