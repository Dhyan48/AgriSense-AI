import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  variant?: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children }) => {
  const styles = {
    error: {
      wrap: 'border-[#B84233] bg-[#B84233]/10 text-[#9E3B2B] dark:text-[#F4A698]',
      icon: <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />,
    },
    success: {
      wrap: 'border-[#285442] bg-[#285442]/10 text-[#1E4032] dark:text-[#D6F36A]',
      icon: <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />,
    },
    warning: {
      wrap: 'border-[#D98B55] bg-[#D98B55]/15 text-[#8A4E22] dark:text-[#F2BA91]',
      icon: <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />,
    },
    info: {
      wrap: 'border-[var(--border-stone)] bg-[var(--bg-surface)] text-[var(--text-primary)]',
      icon: <Info className="h-5 w-5 shrink-0 mt-0.5 text-[#285442] dark:text-[#D6F36A]" />,
    },
  }[variant];

  return (
    <div role="alert" className={`flex gap-3 rounded-md border p-4 text-sm ${styles.wrap}`}>
      {styles.icon}
      <div className="space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
};