'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { History, Activity, ShieldCheck, Clock } from 'lucide-react';

export default function HealthHistoryPage() {
  const historyRecords = [
    { date: '2026-10-10', reactor: 'PL1-SEC1-CVD03', health: 93, notes: 'Plasma power backed off to 31.2 kW; optimal growth resume', change: '+2%' },
    { date: '2026-10-08', reactor: 'PL1-SEC1-CVD01', health: 65, notes: 'Reflected power jitter observed; stub tuner adjusted', change: '-8%' },
    { date: '2026-10-05', reactor: 'PL1-SEC1-CVD05', health: 44, notes: 'Magnetron filament hours exceeded 5,500 hrs', change: '-12%' },
    { date: '2026-10-02', reactor: 'PL1-SEC1-CVD02', health: 85, notes: 'Turbo pump bearings serviced; vibration dampened', change: '+10%' },
    { date: '2026-09-28', reactor: 'PL1-SEC1-CVD08', health: 94, notes: 'Routine 500h harvest cycle completed; seals replaced', change: '+5%' },
  ];

  return (
    <PageShell
      section="REACTOR HEALTH"
      title="Health History"
      subtitle="Historical incident timeline, chamber degradation trends, and shift-over-shift reliability index."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Historical Horizon: 90 Days
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Mean Health (30d)" value="81.2" unit="%" subtext="Fleet Average" icon={Activity} sparklineColor="#10b981" />
        <MetricCard label="Incidents Cleared" value="42" unit="Events" subtext="Resolved by maintenance" icon={ShieldCheck} sparklineColor="#06b6d4" />
        <MetricCard label="Uptime Stability" value="98.1" unit="%" subtext="MTBF trend positive" icon={Clock} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader
          title="HISTORICAL RELIABILITY & MAINTENANCE AUDIT TRAIL"
          subtitle="Chamber health index adjustments over preceding production runs"
          icon={History}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Date</th>
                <th className="px-3 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5 text-right">Health Score</th>
                <th className="px-3 py-2.5 text-right">Delta</th>
                <th className="px-3 py-2.5">Operational Observations & Servicing Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {historyRecords.map((r, i) => (
                <tr key={i} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 text-zinc-400">{r.date}</td>
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{r.reactor}</td>
                  <td className="px-3.5 py-2.5 text-right font-tabular text-amber-300 font-bold">{r.health}%</td>
                  <td className={`px-3.5 py-2.5 text-right font-tabular font-semibold ${r.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {r.change}
                  </td>
                  <td className="px-3.5 py-2.5 text-zinc-300">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
