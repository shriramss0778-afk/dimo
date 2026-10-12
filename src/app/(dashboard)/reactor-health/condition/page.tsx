'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Activity, ShieldCheck, Zap, Gauge } from 'lucide-react';

export default function ReactorConditionPage() {
  const conditions = [
    { serial: 'PL1-SEC1-CVD03', condition: 'OPTIMAL', score: 93.0, plasmaStability: '99.2%', rfCoupling: '98.5%', vacuumIntegrity: '99.0%', growthRate: '2.52 µm/h' },
    { serial: 'PL1-SEC1-CVD08', condition: 'OPTIMAL', score: 94.0, plasmaStability: '99.5%', rfCoupling: '99.1%', vacuumIntegrity: '98.8%', growthRate: '2.58 µm/h' },
    { serial: 'PL1-SEC1-CVD04', condition: 'GOOD', score: 88.0, plasmaStability: '97.4%', rfCoupling: '96.2%', vacuumIntegrity: '97.5%', growthRate: '2.53 µm/h' },
    { serial: 'PL1-SEC1-CVD02', condition: 'GOOD', score: 85.0, plasmaStability: '96.8%', rfCoupling: '95.9%', vacuumIntegrity: '96.0%', growthRate: '2.52 µm/h' },
    { serial: 'PL1-SEC1-CVD09', condition: 'GOOD', score: 82.0, plasmaStability: '95.1%', rfCoupling: '94.8%', vacuumIntegrity: '95.2%', growthRate: '2.56 µm/h' },
    { serial: 'PL1-SEC1-CVD01', condition: 'DEGRADED', score: 65.0, plasmaStability: '88.2%', rfCoupling: '89.0%', vacuumIntegrity: '91.4%', growthRate: '2.67 µm/h' },
    { serial: 'PL1-SEC1-CVD06', condition: 'CRITICAL', score: 38.0, plasmaStability: '72.4%', rfCoupling: '74.1%', vacuumIntegrity: '82.0%', growthRate: '2.67 µm/h' },
  ];

  return (
    <PageShell
      section="REACTOR HEALTH"
      title="Reactor Condition"
      subtitle="Chamber composite health scoring, microwave plasma coupling stability, and substrate thermal uniformity."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Health Model: Multi-Channel Index
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard label="Mean Fleet Condition" value="77.0" unit="Score" subtext="Target ≥ 80.0" icon={Activity} sparklineColor="#10b981" />
        <MetricCard label="Optimal Reactance" value="6" unit="Units" subtext="Coupling > 95%" icon={Zap} sparklineColor="#10b981" />
        <MetricCard label="Thermal Jitter" value="±1.4" unit="°C" subtext="Low variance" icon={Gauge} sparklineColor="#06b6d4" />
        <MetricCard label="Degraded Chambers" value="2" unit="Units" subtext="Requires tuning" icon={ShieldCheck} sparklineColor="#f43f5e" />
      </div>

      <Card>
        <CardHeader
          title="CHAMBER STABILITY & PHYSICAL CONDITION SCORES"
          subtitle="Real-time multi-channel health calculation per reactor"
          icon={Activity}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5">Condition Class</th>
                <th className="px-3 py-2.5 text-right">Composite Score</th>
                <th className="px-3 py-2.5 text-right">Plasma Stability</th>
                <th className="px-3 py-2.5 text-right">RF Coupling</th>
                <th className="px-3 py-2.5 text-right">Vacuum Integrity</th>
                <th className="px-3 py-2.5 text-right">Growth Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {conditions.map((c) => (
                <tr key={c.serial} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{c.serial}</td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={c.condition} size="sm" />
                  </td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{c.score}%</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{c.plasmaStability}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{c.rfCoupling}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{c.vacuumIntegrity}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-emerald-400 font-semibold">{c.growthRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
