import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, TrendingUp, FlaskConical, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { apiRequest, ApiError } from '../services/api';
import type { DashboardStatsResponse } from '../types/api';
import { AppLayout } from '../layouts/AppLayout';
import { PageHeader } from '../components/shared/PageHeader';
import { LoadingState } from '../components/shared/LoadingState';
import { ErrorState } from '../components/shared/ErrorState';
import { EmptyState } from '../components/shared/EmptyState';
import { Button } from '../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest<DashboardStatsResponse>('/dashboard/stats');
      setStats(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const chartData = stats
    ? [
        { name: 'Crop', count: stats.by_module.crop, color: '#285442' },
        { name: 'Yield', count: stats.by_module.yield, color: '#D98B55' },
        { name: 'Fertilizer', count: stats.by_module.fertilizer, color: '#142B25' },
      ]
    : [];

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Workspace Overview"
        title={`Welcome back, ${user?.name || 'Grower'}`}
        description="Real-time summary of your saved predictions and direct access to AgriSense ML modules[cite: 1]."
      />

      {/* Module Quick Entry Points */}
      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        <Link
          to="/predict/crop"
          className="group flex flex-col justify-between rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-5 hover:border-[#285442] dark:hover:border-[#D6F36A] transition-colors"
        >
          <div className="flex items-center justify-between">
            <Sprout className="h-5 w-5 text-[#285442] dark:text-[#D6F36A]" />
            <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="mt-4">
            <h2 className="font-heading font-bold">Crop Recommendation</h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Soil NPK & climate classification[cite: 1]</p>
          </div>
        </Link>

        <Link
          to="/predict/yield"
          className="group flex flex-col justify-between rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-5 hover:border-[#285442] dark:hover:border-[#D6F36A] transition-colors"
        >
          <div className="flex items-center justify-between">
            <TrendingUp className="h-5 w-5 text-[#D98B55]" />
            <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="mt-4">
            <h2 className="font-heading font-bold">Crop Yield Prediction</h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Historical regression estimate[cite: 1]</p>
          </div>
        </Link>

        <Link
          to="/predict/fertilizer"
          className="group flex flex-col justify-between rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-5 hover:border-[#285442] dark:hover:border-[#D6F36A] transition-colors"
        >
          <div className="flex items-center justify-between">
            <FlaskConical className="h-5 w-5 text-[#285442] dark:text-[#D6F36A]" />
            <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="mt-4">
            <h2 className="font-heading font-bold">Fertilizer Advisory</h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Soil-nutrient category advisory[cite: 1]</p>
          </div>
        </Link>
      </div>

      {loading && <LoadingState message="Loading your verified prediction metrics..." />}
      {error && <ErrorState message={error} onRetry={loadStats} />}

      {!loading && !error && stats && (
        <div className="space-y-8">
          {/* Verified Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Total Saved</p>
              <p className="mt-1 font-heading text-3xl font-extrabold">{stats.total_predictions}</p>
            </div>
            <div className="rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Crop Runs</p>
              <p className="mt-1 font-heading text-3xl font-extrabold">{stats.by_module.crop}</p>
            </div>
            <div className="rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Yield Runs</p>
              <p className="mt-1 font-heading text-3xl font-extrabold">{stats.by_module.yield}</p>
            </div>
            <div className="rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Fertilizer Runs</p>
              <p className="mt-1 font-heading text-3xl font-extrabold">{stats.by_module.fertilizer}</p>
            </div>
          </div>

          {stats.total_predictions === 0 ? (
            <EmptyState
              title="No predictions recorded yet"
              description="Your dashboard chart and recent activity will populate automatically once you run your first model prediction[cite: 1]."
              action={
                <Link to="/predict/crop">
                  <Button>Start with Crop Recommendation</Button>
                </Link>
              }
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6 rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-6">
                <h3 className="font-heading text-base font-bold mb-4">Predictions by Module</h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" stroke="#778078" fontSize={12} />
                      <YAxis allowDecimals={false} stroke="#778078" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-base font-bold">Recent Activity</h3>
                  <Link to="/history" className="text-xs font-semibold text-[#285442] dark:text-[#D6F36A] underline">
                    View All
                  </Link>
                </div>
                <ul className="divide-y divide-[var(--border-stone)]">
                  {stats.recent_predictions.map((item) => (
                    <li key={item.id} className="py-3 flex items-center justify-between text-sm">
                      <div>
                        <span className="font-semibold capitalize">{item.prediction_type}</span>
                        <p className="text-xs text-[var(--text-muted)]">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </div>
                      <span className="font-heading font-bold">
                        {String(item.output_data?.label ?? item.output_data?.value ?? 'Recorded')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};