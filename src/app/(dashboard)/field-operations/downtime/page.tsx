'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Clock, AlertTriangle, Activity, CheckCircle2 } from 'lucide-react';

export default function DowntimeTrackingPage() {
  const downtimeLogs = [
    { reactor: 'PL1-SEC1-CVD05', category: 'UNSCHEDULED_BREAKDOWN', reason: 'High reflected RF power interlock trip', duration: '240 min', recordedBy: 'R. Sharma', date: '2026-10-11' },
    { reactor: 'PL1-SEC1-CVD06', category: 'PREVENTIVE_MAINTENANCE', reason: 'Emergency belljar cleaning & leak check', duration: '180 min', recordedBy: 'A. Patel', date: '2026-10-10' },
    { reactor: 'PL1-SEC1-CVD02', category: 'SEED_PLACEMENT', reason: 'Substrate carrier unload & diamond harvest', duration: '90 min', recordedBy: 'V. Mehta', date: '2026-10-09' },
    { reactor: 'PL1-SEC1-CVD07', category: 'VACUUM_PUMPDOWN', reason: 'Chamber roughing down to base 1e-3 Torr', duration: '45 min', recordedBy: 'S. Kulkarni', date: '2026-10-08' },
  ];

  return (
    <PageShell
      section="FIELD OPERATIONS"
      title="Downtime Tracking"
      subtitle="Unscheduled breakdown versus scheduled maintenance downtime analytics and MTTR metrics."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Total Outage (30d): 32.5 hrs
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard label="Total Downtime (30d)" value="32.5" unit="hrs" subtext="Fleet aggregated" icon={Clock} sparklineColor="#f43f5e" />
        <MetricCard label="Unscheduled Ratio" value="18.2" unit="%" subtext="Target < 20%" icon={AlertTriangle} sparklineColor="#10b981" />
        <MetricCard label="Harvest Turnaround" value="84" unit="min" subtext="Seed replacement SLA" icon={Activity} sparklineColor="#06b6d4" />
        <MetricCard label="Availability Index" value="95.5" unit="%" subtext="Uptime operational" icon={CheckCircle2} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader
          title="OUTAGE & DOWNTIME INCIDENT AUDIT"
          subtitle="Directly recorded to Prisma DowntimeLog model"
          icon={Clock}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Date</th>
                <th className="px-3 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5">Outage Classification</th>
                <th className="px-3 py-2.5">Root Reason Description</th>
                <th className="px-3 py-2.5 text-right">Duration</th>
                <th className="px-3 py-2.5 text-right">Engineer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {downtimeLogs.map((l, i) => (
                <tr key={i} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 text-zinc-400">{l.date}</td>
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{l.reactor}</td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      {l.category}
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5 text-zinc-300">{l.reason}</td>
                  <td className="px-3.5 py-2.5 text-right font-tabular text-amber-300 font-bold">{l.duration}</td>
                  <td className="px-3.5 py-2.5 text-right text-zinc-400">{l.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
