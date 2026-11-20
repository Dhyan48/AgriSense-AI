import React, { useEffect, useState } from 'react';
import { Search, Trash2, Eye, X } from 'lucide-react';
import { apiRequest, ApiError } from '../services/api';
import type { HistoryItem, PredictionModuleType } from '../types/api';
import { AppLayout } from '../layouts/AppLayout';
import { PageHeader } from '../components/shared/PageHeader';
import { DataTable, type Column } from '../components/shared/DataTable';
import { LoadingState } from '../components/shared/LoadingState';
import { ErrorState } from '../components/shared/ErrorState';
import { EmptyState } from '../components/shared/EmptyState';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const HistoryPage: React.FC = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [filterType, setFilterType] = useState<'all' | PredictionModuleType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = filterType === 'all' ? '' : `?prediction_type=${filterType}`;
      const res = await apiRequest<{ items: HistoryItem[] }>(`/history${query}`);
      setItems(res.items);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load prediction history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [filterType]);

  const handleDelete = async (id: number) => {
    try {
      await apiRequest(`/history/${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((item) => item.id !== id));
      if (selectedItem?.id === id) setSelectedItem(null);
    } catch (err) {
      alert(err instanceof ApiError ? err.message : 'Unable to delete record.');
    }
  };

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const text = `${item.prediction_type} ${JSON.stringify(item.output_data)} ${JSON.stringify(item.input_data)}`.toLowerCase();
    return text.includes(searchQuery.toLowerCase());
  });

  const columns: Column<HistoryItem>[] = [
    {
      header: 'Module',
      accessor: (row) => (
        <span className="inline-block rounded border border-[var(--border-stone)] px-2.5 py-0.5 text-xs font-semibold capitalize">
          {row.prediction_type}
        </span>
      ),
    },
    {
      header: 'Result',
      accessor: (row) => (
        <span className="font-heading font-bold">
          {String(row.output_data?.label ?? row.output_data?.value ?? JSON.stringify(row.output_data))}
          {row.output_data?.unit ? ` ${row.output_data.unit}` : ''}
        </span>
      ),
    },
    {
      header: 'Model',
      accessor: (row) => <span className="text-xs text-[var(--text-muted)]">{row.model_version || '—'}</span>,
    },
    {
      header: 'Date',
      accessor: (row) => (
        <span className="text-xs text-[var(--text-muted)]">
          {new Date(row.created_at).toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setSelectedItem(row)} aria-label="Inspect record">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)} aria-label="Delete record">
            <Trash2 className="h-4 w-4 text-[#B84233]" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Audit Log"
        title="Prediction History"
        description="Filter, search, and inspect your authenticated model inference records[cite: 1]."
      />

      {/* Filter & Search Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['all', 'crop', 'yield', 'fertilizer'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                filterType === type
                  ? 'bg-[#142B25] text-[#D6F36A] dark:bg-[#D6F36A] dark:text-[#142B25]'
                  : 'border border-[var(--border-stone)] bg-[var(--bg-surface)] text-[var(--text-primary)]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <Input
            type="search"
            placeholder="Search results or inputs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {loading && <LoadingState message="Retrieving saved prediction history..." />}
      {error && <ErrorState message={error} onRetry={fetchHistory} />}

      {!loading && !error && filteredItems.length === 0 && (
        <EmptyState
          title="No matching history records"
          description="No saved predictions match your current filter or search criteria[cite: 1]."
        />
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <DataTable columns={columns} data={filteredItems} keyExtractor={(r) => r.id} />
      )}

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-stone)] pb-3">
              <h3 className="font-heading text-lg font-bold capitalize">
                {selectedItem.prediction_type} Prediction Details
              </h3>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                className="p-1 rounded hover:bg-black/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold uppercase text-[var(--text-muted)] mb-1">Submitted Inputs</p>
                <pre className="overflow-x-auto rounded border border-[var(--border-stone)] bg-[var(--bg-primary)] p-3">
                  {JSON.stringify(selectedItem.input_data, null, 2)}
                </pre>
              </div>
              <div>
                <p className="font-semibold uppercase text-[var(--text-muted)] mb-1">Model Output</p>
                <pre className="overflow-x-auto rounded border border-[var(--border-stone)] bg-[var(--bg-primary)] p-3">
                  {JSON.stringify(selectedItem.output_data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};