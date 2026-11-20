import React from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { PageHeader } from '../components/shared/PageHeader';
import { EmptyState } from '../components/shared/EmptyState';

export const YieldPage: React.FC = () => (
  <AppLayout>
    <PageHeader
      eyebrow="Module 02 — Owner: Chetan"
      title="Crop Yield Prediction"
      description="Estimate crop yield from verified historical agricultural dataset features[cite: 1, 2]."
    />
    <EmptyState
      title="Yield Inference Module Ready for Integration"
      description="Chetan will connect the yield regression form and POST /api/predict/yield endpoint here using shared components[cite: 2]."
    />
  </AppLayout>
);