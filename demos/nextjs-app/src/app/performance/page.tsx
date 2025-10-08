'use client';

import React from 'react';
import '@nexcraft/forge';
import { ForgeCard, ForgeButton, ForgeInput } from '@nexcraft/forge-react';

type Row = { id: number; name: string; count: number };

function RowItem({ row, onInc, onName }: { row: Row; onInc: (id: number) => void; onName: (id: number, value: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 border-b last:border-b-0">
      <div className="min-w-0 flex-1">
        <div className="text-sm text-gray-600">ID #{row.id}</div>
        <ForgeInput
          value={row.name}
          onChange={(e: any) => onName(row.id, e?.target?.value ?? '')}
          placeholder="Name"
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm w-12 text-right font-mono">{row.count}</div>
        <ForgeButton variant="secondary" onClick={() => onInc(row.id)}>+1</ForgeButton>
      </div>
    </div>
  );
}

export default function PerformancePage() {
  const [rows, setRows] = React.useState<Row[]>(() => Array.from({ length: 200 }, (_, i) => ({ id: i + 1, name: '', count: 0 })));
  const [filter, setFilter] = React.useState('');

  const filtered = rows.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase()));

  const handleInc = (id: number) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, count: r.count + 1 } : r)));
  };
  const handleName = (id: number, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, name: value } : r)));
  };

  const total = rows.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Performance Playground</h1>
        <p className="text-gray-600">Render and interact with 200 rows of inputs and buttons.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <ForgeCard>
          <div className="p-4 space-y-3">
            <div className="text-sm text-gray-600">Global Controls</div>
            <ForgeInput
              value={filter}
              onChange={(e: any) => setFilter(e?.target?.value ?? '')}
              placeholder="Filter by name"
              className="w-full"
            />
            <div className="text-xs text-gray-500">Showing {filtered.length} / {rows.length} rows</div>
          </div>
        </ForgeCard>
        <ForgeCard>
          <div className="p-4 space-y-2">
            <div className="text-sm text-gray-600">Totals</div>
            <div className="text-2xl font-semibold">{total}</div>
            <div className="text-xs text-gray-500">Sum of all counters</div>
          </div>
        </ForgeCard>
        <ForgeCard>
          <div className="p-4 space-y-2">
            <div className="text-sm text-gray-600">Actions</div>
            <ForgeButton variant="secondary" onClick={() => setRows((prev) => prev.map((r) => ({ ...r, count: 0 })))}>Reset Counters</ForgeButton>
          </div>
        </ForgeCard>
      </div>

      <ForgeCard>
        <div className="divide-y">
          {filtered.map((row) => (
            <RowItem key={row.id} row={row} onInc={handleInc} onName={handleName} />
          ))}
        </div>
      </ForgeCard>

      <div className="mt-8 text-center">
        <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Examples</a>
      </div>
    </div>
  );
}

