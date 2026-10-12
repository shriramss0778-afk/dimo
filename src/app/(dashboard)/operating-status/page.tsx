'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Layers, Activity, Cpu, ShieldCheck } from 'lucide-react';

export default function OperatingStatusPage() {
  const statusGroups = [
    {
      status: 'RUNNING',
      count: 5,
      color: 'emerald',
      reactors: [
        { serial: 'PL1-SEC1-CVD02', site: 'Surat Fab 1', power: '31.1 kW', temp: '848.0 °C', uptime: '99.4%' },
        { serial: 'PL1-SEC1-CVD03', site: 'Surat Fab 1', power: '31.2 kW', temp: '848.0 °C', uptime: '98.8%' },
        { serial: 'PL1-SEC1-CVD04', site: 'Surat Fab 1', power: '30.0 kW', temp: '843.5 °C', uptime: '97.2%' },
        { serial: 'PL1-SEC1-CVD08', site: 'Navsari Plant', power: '31.4 kW', temp: '844.4 °C', uptime: '99.6%' },
        { serial: 'PL1-SEC1-CVD09', site: 'Mumbai R&D', power: '31.3 kW', temp: '843.0 °C', uptime: '96.5%' },
      ],
    },
    {
      status: 'WARNING',
      count: 1,
      color: 'amber',
      reactors: [
        { serial: 'PL1-SEC1-CVD01', site: 'Surat Fab 1', power: '31.0 kW', temp: '842.5 °C', uptime: '92.1%' },
      ],
    },
    {
      status: 'CRITICAL',
      count: 1,
      color: 'rose',
      reactors: [
        { serial: 'PL1-SEC1-CVD06', site: 'Surat Fab 1', power: '30.4 kW', temp: '841.4 °C', uptime: '84.0%' },
      ],
    },
    {
      status: 'IDLE',
      count: 2,
      color: 'zinc',
      reactors: [
        { serial: 'PL1-SEC1-CVD07', site: 'Navsari Plant', power: '0.0 kW', temp: '25.0 °C', uptime: '100%' },
        { serial: 'PL1-SEC1-CVD10', site: 'Navsari Plant', power: '0.0 kW', temp: '25.0 °C', uptime: '100%' },
      ],
    },
    {
      status: 'MAINTENANCE',
      count: 1,
      color: 'amber',
      reactors: [
        { serial: 'PL1-SEC1-CVD05', site: 'Mumbai R&D', power: '0.0 kW', temp: '28.0 °C', uptime: '76.0%' },
      ],
    },
  ];

  return (
    <PageShell
      section="OPERATIONS OVERVIEW"
      title="Operating Status"
      subtitle="Fleet-wide operational state categorization: Running, Warning, Critical, Idle, and Maintenance."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Total Fleet: 10 Units
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <MetricCard label="Running" value="5" unit="Units" subtext="50% Active" sparklineColor="#10b981" />
        <MetricCard label="Warning" value="1" unit="Unit" subtext="Sub-nominal" sparklineColor="#eab308" />
        <MetricCard label="Critical" value="1" unit="Unit" subtext="High anomaly" sparklineColor="#f43f5e" />
        <MetricCard label="Idle / Standby" value="2" unit="Units" subtext="Harvest cycle" sparklineColor="#9ca3af" />
        <MetricCard label="Maintenance" value="1" unit="Unit" subtext="Overhaul" sparklineColor="#f59e0b" />
      </div>

      <div className="space-y-4">
        {statusGroups.map((group) => (
          <Card key={group.status}>
            <CardHeader
              title={`${group.status} ENVELOPE`}
              badge={<StatusBadge status={group.status} size="sm" />}
              action={
                <span className="text-xs font-mono text-zinc-400">
                  {group.count} {group.count === 1 ? 'Reactor' : 'Reactors'}
                </span>
              }
              icon={Activity}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
                  <tr>
                    <th className="px-3.5 py-2.5">Serial</th>
                    <th className="px-3 py-2.5">Site Location</th>
                    <th className="px-3 py-2.5 text-right">RF Power</th>
                    <th className="px-3 py-2.5 text-right">Core Temp</th>
                    <th className="px-3.5 py-2.5 text-right">Uptime Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
                  {group.reactors.map((r) => (
                    <tr key={r.serial} className="hover:bg-[#16171d]">
                      <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{r.serial}</td>
                      <td className="px-3 py-2.5 text-zinc-400">{r.site}</td>
                      <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{r.power}</td>
                      <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{r.temp}</td>
                      <td className="px-3.5 py-2.5 text-right font-tabular text-emerald-400 font-semibold">{r.uptime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
