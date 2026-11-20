export type PredictionModuleType = 'crop' | 'yield' | 'fertilizer';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface StandardPredictionResponse<T = Record<string, unknown>> {
  success: boolean;
  prediction_type: PredictionModuleType;
  prediction: T;
  model_version: string | null;
  created_at: string;
}

export interface HistoryItem {
  id: number;
  prediction_type: PredictionModuleType;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  model_version: string | null;
  created_at: string;
}

export interface DashboardStatsResponse {
  success: boolean;
  total_predictions: number;
  by_module: {
    crop: number;
    yield: number;
    fertilizer: number;
  };
  recent_predictions: HistoryItem[];
}