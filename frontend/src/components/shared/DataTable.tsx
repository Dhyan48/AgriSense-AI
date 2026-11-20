import React from 'react';

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
}

export function DataTable<T>({ columns, data, keyExtractor }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)]">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border-stone)] bg-[var(--bg-primary)]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-stone)]">
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
            >
              {columns.map((col, idx) => (
                <td key={idx} className={`px-4 py-3.5 align-middle ${col.className || ''}`}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}