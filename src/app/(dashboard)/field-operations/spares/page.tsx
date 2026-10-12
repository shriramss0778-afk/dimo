'use client';

import React, { useState, useEffect } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Boxes, AlertTriangle, CheckCircle2, RefreshCw, Layers } from 'lucide-react';

interface SpareItem {
  id?: string;
  partNumber: string;
  name: string;
  category: string;
  stock: number;
  min: number;
  cost: string;
  location: string;
  status: string;
}

export default function SparePartsRegistryPage() {
  const [spares, setSpares] = useState<SpareItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSpares = async () => {
    try {
      const res = await fetch('/api/maintenance');
      const json = await res.json();
      if (json && json.data && json.data.spares && json.data.spares.length > 0) {
        const mapped = json.data.spares.map((s: any) => ({
          id: s.id,
          partNumber: s.partNumber,
          name: s.name,
          category: s.category,
          stock: s.stockCount,
          min: s.minThreshold,
          cost: `₹${(s.unitCostInr).toLocaleString()}`,
          location: s.location,
          status: s.stockCount <= s.minThreshold ? 'WARNING' : 'OPTIMAL',
        }));
        setSpares(mapped);
      }
    } catch (e) {
      console.error('Failed to load spares:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpares();
  }, []);

  const belowMinCount = spares.filter(s => s.stock <= s.min).length;

  return (
    <PageShell
      section="FIELD OPERATIONS"
      title="Spare Parts Registry"
      subtitle="Critical CVD component inventory: Microwave magnetrons, quartz belljars, turbopump bearings, and FFKM seals synchronized with maintenance requisition records."
      action={
        <div className="flex items-center space-x-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#14151a] border border-[#23252d] text-zinc-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Database Synchronized</span>
          </div>
          <button
            onClick={fetchSpares}
            className="p-1.5 rounded bg-[#181920] hover:bg-[#20222a] border border-[#2b2d37] text-zinc-300 hover:text-amber-300 transition"
            title="Refresh Inventory"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard label="SKUs Registered" value={spares.length.toString()} unit="Parts" subtext="Persisted in Neon DB" icon={Boxes} sparklineColor="#10b981" />
        <MetricCard label="Total Stock Valuation" value="₹24.8" unit="Lakh" subtext="Current inventory" icon={CheckCircle2} sparklineColor="#06b6d4" />
        <MetricCard label="Stock Below Min" value={belowMinCount.toString()} unit="SKU" subtext={belowMinCount > 0 ? "Requires re-order" : "Stock nominal"} icon={AlertTriangle} sparklineColor={belowMinCount > 0 ? "#f43f5e" : "#10b981"} />
        <MetricCard label="Fulfillment SLA" value="< 2.0" unit="hrs" subtext="On-site replenishment" icon={Boxes} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader
          title="CRITICAL REPLACEMENT INVENTORY"
          subtitle="Directly mapped to Prisma SparePart model with safety reorder levels"
          icon={Boxes}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Part Number</th>
                <th className="px-3 py-2.5">Component Description</th>
                <th className="px-3 py-2.5">Category</th>
                <th className="px-3 py-2.5 text-right">In Stock</th>
                <th className="px-3 py-2.5 text-right">Min Buffer</th>
                <th className="px-3 py-2.5 text-right">Unit Cost (INR)</th>
                <th className="px-3 py-2.5">Storage Location</th>
                <th className="px-3 py-2.5 text-right">Stock Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {spares.map((s) => (
                <tr key={s.partNumber} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{s.partNumber}</td>
                  <td className="px-3 py-2.5 text-zinc-200">{s.name}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{s.category}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{s.stock}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{s.min}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{s.cost}</td>
                  <td className="px-3 py-2.5 text-zinc-300 text-[11px]">{s.location}</td>
                  <td className="px-3 py-2.5 text-right">
                    <StatusBadge status={s.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
