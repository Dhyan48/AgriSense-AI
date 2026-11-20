import React from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';

interface PredictionResultProps {
  moduleTitle: string;
  primaryLabel: string;
  primaryValue: string | number;
  unit?: string;
  secondaryMetric?: { label: string; value: string };
  modelVersion?: string | null;
  inputs: Record<string, string | number>;
  disclaimer?: string;
  onReset: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  moduleTitle,
  primaryLabel,
  primaryValue,
  unit,
  secondaryMetric,
  modelVersion,
  inputs,
  disclaimer = 'Model outputs are statistical estimates derived from historical training datasets, not certified agronomic prescriptions. Verify decisions with local soil-test reports and agricultural authorities.',
  onReset,
}) => (
  <div className="space-y-6 rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-6 sm:p-8">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-stone)] pb-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#285442] dark:text-[#D6F36A]">
        <CheckCircle2 className="h-4 w-4" />
        <span>{moduleTitle} Output</span>
      </div>
      {modelVersion && (
        <span className="rounded border border-[var(--border-stone)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-muted)]">
          Model: {modelVersion}
        </span>
      )}
    </div>

    <div className="grid gap-6 sm:grid-cols-2 items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {primaryLabel}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] capitalize">
            {primaryValue}
          </span>
          {unit && <span className="text-base font-medium text-[var(--text-muted)]">{unit}</span>}
        </div>
      </div>

      {secondaryMetric && (
        <div className="border-l border-[var(--border-stone)] pl-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {secondaryMetric.label}
          </p>
          <p className="mt-1 font-heading text-xl font-bold text-[var(--text-primary)]">
            {secondaryMetric.value}
          </p>
        </div>
      )}
    </div>

    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        Submitted Input Parameters
      </p>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(inputs).map(([key, val]) => (
          <div
            key={key}
            className="rounded border border-[var(--border-stone)] bg-[var(--bg-primary)] px-3 py-2"
          >
            <dt className="text-xs text-[var(--text-muted)] capitalize">{key.replace(/_/g, ' ')}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">{String(val)}</dd>
          </div>
        ))}
      </dl>
    </div>

    <Alert variant="warning" title="Decision-Support Limitation">
      {disclaimer}
    </Alert>

    <div className="pt-2">
      <Button variant="outline" onClick={onReset}>
        <RotateCcw className="h-4 w-4" />
        Run Another Prediction
      </Button>
    </div>
  </div>
);