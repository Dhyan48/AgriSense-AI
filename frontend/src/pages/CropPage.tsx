import React from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { PageHeader } from '../components/shared/PageHeader';
import { EmptyState } from '../components/shared/EmptyState';

export const CropPage: React.FC = () => (
  <AppLayout>
    <PageHeader
      eyebrow="Module 01 — Owner: Sujay"
      title="Crop Recommendation"
      description="Predict suitable crops from Nitrogen, Phosphorus, Potassium, temperature, humidity, pH, and rainfall."
    />
    <EmptyState
      title="Crop Inference Module Ready for Integration"
      description="Sujay will connect the 7-input form and POST /api/predict/crop endpoint here using shared FormField and PredictionResult components."
    />
  </AppLayout>
);