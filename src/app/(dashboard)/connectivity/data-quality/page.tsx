'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { CheckCircle2, AlertTriangle, Activity, Wifi } from 'lucide-react';

export default function DataQualityMonitorPage() {
  const qualityRecords = [
    { source: 'PL1-SEC1-CVD03', sensor: 'TC-PLASM-01 (Pyrometer)', completeness: '100%', jitter: '0.4 ms', dropRate: '0.00%', score: 1.0, status: 'OPTIMAL' },
    { source: 'PL1-SEC1-CVD03', sensor: 'BP-VAC-02 (Baratron)', completeness: '100%', jitter: '0.8 ms', dropRate: '0.00%', score: 1.0, status: 'OPTIMAL' },
    { source: 'PL1-SEC1-CVD06', sensor: 'TC-PLASM-06 (Pyrometer)', completeness: '96.2%', jitter: '4.8 ms', dropRate: '1.40%', score: 0.75, status: 'DEGRADED' },
    { source: 'PL1-SEC1-CVD01', sensor: 'MFC-CH4-01 (Methane)', completeness: '99.8%', jitter: '1.2 ms', dropRate: '0.02%', score: 0.98, status: 'OPTIMAL' },
    { source: 'PL1-SEC1-CVD05', sensor: 'RF-GEN-05 (Microwave)', completeness: '98.5%', jitter: '2.1 ms', dropRate: '0.40%', score: 0.92, status: 'OPTIMAL' },
  ];

  return (
    <PageShell
      section="CONNECTIVITY & EDGE"
      title="Data Quality Monitor"
      subtitle="Sensor frame dropped rate, timestamp jitter, signal-to-noise ratio, and edge integrity scores."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            Ingest Completeness: 99.4%
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard label="Mean Data Quality" value="99.4" unit="%" subtext="Across all frames" icon={CheckCircle2} sparklineColor="#10b981" />
        <MetricCard label="Dropped Packets" value="0.04" unit="%" subtext="Target < 0.1%" icon={Wifi} sparklineColor="#10b981" />
        <MetricCard label="Out-of-Order Frames" value="0" unit="Packets" subtext="Sequence intact" icon={Activity} sparklineColor="#06b6d4" />
        <MetricCard label="Stale Channels" value="1" unit="Channel" subtext="TC-PLASM-06 jitter" icon={AlertTriangle} sparklineColor="#f43f5e" />
      </div>

      <Card>
        <CardHeader
          title="STREAM QUALITY & TIMESTAMP JITTER AUDIT"
          subtitle="Real-time frame integrity evaluation per sensor channel"
          icon={CheckCircle2}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5">Transducer Channel</th>
                <th className="px-3 py-2.5 text-right">Completeness</th>
                <th className="px-3 py-2.5 text-right">Packet Jitter</th>
                <th className="px-3 py-2.5 text-right">Drop Rate</th>
                <th className="px-3 py-2.5 text-right">Quality Score</th>
                <th className="px-3 py-2.5 text-right">Channel Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {qualityRecords.map((r, idx) => (
                <tr key={idx} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{r.source}</td>
                  <td className="px-3 py-2.5 text-zinc-300">{r.sensor}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-emerald-400 font-bold">{r.completeness}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{r.jitter}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{r.dropRate}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{r.score.toFixed(2)}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={r.status} size="sm" />
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
