'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { MapPin, Activity, ShieldCheck, Cpu } from 'lucide-react';

export default function FleetHealthMapPage() {
  const facilities = [
    {
      name: 'Surat Industrial Synthesis Plant (Fab 1)',
      city: 'Surat, Gujarat',
      reactors: [
        { serial: 'CVD01', health: 65, status: 'WARNING', load: '31.0 kW' },
        { serial: 'CVD02', health: 85, status: 'RUNNING', load: '31.1 kW' },
        { serial: 'CVD03', health: 93, status: 'RUNNING', load: '31.2 kW' },
        { serial: 'CVD04', health: 88, status: 'RUNNING', load: '30.0 kW' },
        { serial: 'CVD06', health: 38, status: 'CRITICAL', load: '30.4 kW' },
      ],
    },
    {
      name: 'Navsari High-Yield Growth Center',
      city: 'Navsari, Gujarat',
      reactors: [
        { serial: 'CVD07', health: 90, status: 'IDLE', load: '0.0 kW' },
        { serial: 'CVD08', health: 94, status: 'RUNNING', load: '31.4 kW' },
        { serial: 'CVD10', health: 91, status: 'IDLE', load: '0.0 kW' },
      ],
    },
    {
      name: 'Mumbai Advanced CVD Labs',
      city: 'Mumbai, Maharashtra',
      reactors: [
        { serial: 'CVD05', health: 44, status: 'MAINTENANCE', load: '0.0 kW' },
        { serial: 'CVD09', health: 82, status: 'RUNNING', load: '31.3 kW' },
      ],
    },
  ];

  return (
    <PageShell
      section="OPERATIONS OVERVIEW"
      title="Fleet Health Map"
      subtitle="Spatial and matrix-level chamber health distribution, equipment degradation heatmap, and thermal load."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Heatmap Scale: 0% → 100% Health
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Mean Fleet Health" value="77.0" unit="%" subtext="10 units aggregated" sparklineColor="#10b981" />
        <MetricCard label="Optimal Health Units" value="6" unit="/ 10" subtext="Health > 80%" sparklineColor="#10b981" />
        <MetricCard label="Degraded Units" value="2" unit="Units" subtext="Health < 50%" sparklineColor="#f43f5e" />
      </div>

      <div className="space-y-4">
        {facilities.map((fac) => (
          <Card key={fac.name}>
            <CardHeader
              title={fac.name}
              subtitle={fac.city}
              icon={MapPin}
            />
            <CardBody>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 font-mono text-xs">
                {fac.reactors.map((r) => (
                  <div
                    key={r.serial}
                    className={`p-3 rounded-lg border flex flex-col justify-between ${
                      r.health > 80
                        ? 'bg-emerald-950/15 border-emerald-800/35'
                        : r.health > 50
                        ? 'bg-amber-950/15 border-amber-800/35'
                        : 'bg-rose-950/20 border-rose-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-100">{r.serial}</span>
                      <StatusBadge status={r.status} size="sm" />
                    </div>

                    <div className="my-3">
                      <span className="text-[10px] text-zinc-400 block uppercase">Health Index</span>
                      <span
                        className={`text-2xl font-bold font-tabular ${
                          r.health > 80
                            ? 'text-emerald-400'
                            : r.health > 50
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {r.health}%
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
                      <span>RF Load</span>
                      <span className="text-zinc-200 font-semibold">{r.load}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
