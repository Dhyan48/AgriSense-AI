import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6F36A] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-[#285442] text-[#F3F0E7] hover:bg-[#1E4032]',
    secondary: 'bg-[#142B25] text-[#F3F0E7] hover:bg-[#1F3F36] dark:bg-[#D6F36A] dark:text-[#142B25] dark:hover:bg-[#c5e553]',
    outline: 'border border-[var(--border-stone)] bg-transparent text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5',
    ghost: 'bg-transparent text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5',
    danger: 'bg-[#9E3B2B] text-[#F3F0E7] hover:bg-[#822F22]',
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-7 text-base',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};