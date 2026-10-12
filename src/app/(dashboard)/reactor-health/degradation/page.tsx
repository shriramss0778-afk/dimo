'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Gauge, AlertTriangle, Activity, Wrench } from 'lucide-react';

export default function EquipmentDegradationPage() {
  const components = [
    { component: 'Magnetron Microwave Tube', reactor: 'PL1-SEC1-CVD05', wear: '78%', hours: '5,600 hrs', remainingLife: '400 hrs', wearClass: 'CRITICAL', recommendation: 'Schedule replacement within 14 operational days' },
    { component: 'Quartz Belljar Inner Wall', reactor: 'PL1-SEC1-CVD06', wear: '62%', hours: '1,250 hrs', remainingLife: '250 hrs', wearClass: 'WARNING', recommendation: 'Acid etching and de-sooting cleaning needed' },
    { component: 'Turbomolecular Pump Bearings', reactor: 'PL1-SEC1-CVD01', wear: '54%', hours: '2,840 hrs', remainingLife: '1,160 hrs', wearClass: 'WARNING', recommendation: 'Lubrication inspection and vibration spectrum check' },
    { component: 'Viton Chamber O-Ring Seals', reactor: 'PL1-SEC1-CVD03', wear: '22%', hours: '1,980 hrs', remainingLife: '3,020 hrs', wearClass: 'OPTIMAL', recommendation: 'Nominal seal elasticity; vacuum leak rate in spec' },
    { component: 'Substrate Molybdenum Stage', reactor: 'PL1-SEC1-CVD02', wear: '30%', hours: '3,120 hrs', remainingLife: '2,880 hrs', wearClass: 'OPTIMAL', recommendation: 'Flatness tolerance within ± 5 µm' },
  ];

  return (
    <PageShell
      section="REACTOR HEALTH"
      title="Equipment Degradation"
      subtitle="Wear tracking across critical physical subsystems: Magnetron filaments, quartz belljars, seals, and turbo pumps."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Degradation Algorithm: Arrhenius Wear Model
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard label="Components Monitored" value="48" unit="Parts" subtext="Across 10 reactors" icon={Gauge} sparklineColor="#10b981" />
        <MetricCard label="Critical Wear (> 75%)" value="1" unit="Magnetron" subtext="CVD05 Cathode" icon={AlertTriangle} sparklineColor="#f43f5e" />
        <MetricCard label="Warning Wear (50-75%)" value="2" unit="Subsystems" subtext="Scheduled cleaning" icon={Wrench} sparklineColor="#eab308" />
        <MetricCard label="Mean Subsystem Health" value="79.4" unit="%" subtext="Physical baseline" icon={Activity} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader
          title="PHYSICAL SUBSYSTEM WEAR & LIFE EXPECTANCY"
          subtitle="Wear estimates calibrated to accumulated run hours and thermal stress"
          icon={Gauge}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Subsystem Component</th>
                <th className="px-3 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5 text-right">Wear Percent</th>
                <th className="px-3 py-2.5 text-right">Run Hours</th>
                <th className="px-3 py-2.5 text-right">Remaining Life</th>
                <th className="px-3 py-2.5">Maintenance Recommendation</th>
                <th className="px-3 py-2.5 text-right">Wear State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {components.map((c, idx) => (
                <tr key={idx} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{c.component}</td>
                  <td className="px-3 py-2.5 text-amber-400/90">{c.reactor}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{c.wear}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{c.hours}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{c.remainingLife}</td>
                  <td className="px-3 py-2.5 text-zinc-300 text-[11px] max-w-xs">{c.recommendation}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={c.wearClass} size="sm" />
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
