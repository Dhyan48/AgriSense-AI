import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
}) => (
  <div role="alert" className="rounded-md border border-[#B84233] bg-[#B84233]/10 p-6">
    <div className="flex items-start gap-3">
      <AlertCircle className="h-5 w-5 text-[#B84233] dark:text-[#F4A698] shrink-0 mt-0.5" />
      <div className="space-y-2">
        <h3 className="font-heading font-bold text-[#9E3B2B] dark:text-[#F4A698]">{title}</h3>
        <p className="text-sm text-[var(--text-primary)]">{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  </div>
);