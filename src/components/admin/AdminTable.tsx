import React from 'react';

interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function AdminTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No records in database',
}: AdminTableProps<T>) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-stone-400 font-sans text-sm animate-pulse">
        Loading administrative records...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="p-8 text-center text-stone-400 font-sans text-sm border border-forest-800/60 rounded-xl bg-charcoal-900/60">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-forest-800/80 bg-charcoal-900/90 shadow-elevated">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-forest-800 bg-forest-950/80 text-stone-300 font-sans text-xs uppercase tracking-wider">
            {columns.map((col, i) => (
              <th key={i} className={`py-3.5 px-4 font-semibold ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-forest-900/80 text-ivory-200">
          {data.map(row => (
            <tr
              key={keyExtractor(row)}
              className="hover:bg-forest-900/40 transition-colors duration-150"
            >
              {columns.map((col, i) => (
                <td key={i} className={`py-3.5 px-4 ${col.className || ''}`}>
                  {col.render ? col.render(row) : String(col.accessor ? row[col.accessor] : '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
