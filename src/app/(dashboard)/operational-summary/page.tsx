'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Activity, Zap, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export default function OperationalSummaryPage() {
  const kpis = [
    { metric: 'Mean Time Between Failures (MTBF)', value: '312.4 hrs', target: '≥ 300 hrs', status: 'OPTIMAL' },
    { metric: 'Mean Time to Repair (MTTR)', value: '2.8 hrs', target: '≤ 4.0 hrs', status: 'OPTIMAL' },
    { metric: 'Fleet Operational Availability', value: '94.2%', target: '≥ 92.0%', status: 'OPTIMAL' },
    { metric: 'Overall Equipment Effectiveness (OEE)', value: '88.6%', target: '≥ 85.0%', status: 'OPTIMAL' },
    { metric: 'Average Microwave Efficiency', value: '91.8%', target: '≥ 90.0%', status: 'OPTIMAL' },
    { metric: 'First-Pass Yield Quality Rate', value: '96.2%', target: '≥ 95.0%', status: 'OPTIMAL' },
  ];

  return (
    <PageShell
      section="OPERATIONS OVERVIEW"
      title="Operational Summary"
      subtitle="Fleet-level aggregate manufacturing KPIs: Availability, MTBF, MTTR, energy intensity, and yield throughput."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Current Shift: Q4-DAY-01
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard label="Fleet Availability" value="94.2" unit="%" subtext="Uptime factor" sparklineColor="#10b981" />
        <MetricCard label="Mean Run Time" value="312.4" unit="hrs" subtext="MTBF index" sparklineColor="#10b981" />
        <MetricCard label="Specific Energy Draw" value="3.41" unit="kWh/ct" subtext="Per carat diamond" sparklineColor="#eab308" />
        <MetricCard label="Cumulative Yield" value="25.77" unit="µm/h" subtext="Combined diamond growth" sparklineColor="#06b6d4" />
      </div>

      <Card>
        <CardHeader
          title="MANUFACTURING PROCESS & RELIABILITY BENCHMARKS"
          subtitle="Target versus actual performance metrics across physical CVD lines"
          icon={Activity}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Key Performance Indicator</th>
                <th className="px-3 py-2.5 text-right">Actual Realized</th>
                <th className="px-3 py-2.5 text-right">Engineering Target</th>
                <th className="px-3.5 py-2.5 text-right">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {kpis.map((kpi) => (
                <tr key={kpi.metric} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{kpi.metric}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{kpi.value}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{kpi.target}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={kpi.status} size="sm" />
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
