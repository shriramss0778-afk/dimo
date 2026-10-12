'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Cpu, Activity, Zap, Layers, RefreshCw } from 'lucide-react';

export default function DigitalTwinPage() {
  const twinMetrics = [
    { channel: 'Microwave Cavity Electric Field (E-Field)', simulated: '2.45 kV/cm', measured: '2.42 kV/cm', deviation: '-1.2%', status: 'OPTIMAL' },
    { channel: 'Substrate Thermal Boundary Layer', simulated: '850.0 °C', measured: '848.0 °C', deviation: '-0.2%', status: 'OPTIMAL' },
    { channel: 'Methane Dissociation Kinetics (CH3+)', simulated: '4.82e16 cm⁻³', measured: '4.71e16 cm⁻³', deviation: '-2.3%', status: 'OPTIMAL' },
    { channel: 'Atomic Hydrogen Flux (H*)', simulated: '1.25e17 cm⁻³', measured: '1.24e17 cm⁻³', deviation: '-0.8%', status: 'OPTIMAL' },
    { channel: 'Diamond Growth Surface Speed', simulated: '2.55 µm/h', measured: '2.52 µm/h', deviation: '-1.1%', status: 'OPTIMAL' },
  ];

  return (
    <PageShell
      section="PLATFORM & GOVERNANCE"
      title="Reactor Digital Model"
      subtitle="High-fidelity physics emulator of physical Chemical Vapor Deposition plasma and chemical kinetics."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Model: Finite Element CFD + Plasma 0D/1D
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard label="Model Convergence" value="99.2" unit="%" subtext="Navier-Stokes + Maxwell" icon={Activity} sparklineColor="#10b981" />
        <MetricCard label="Sim-to-Real Error" value="< 1.8" unit="%" subtext="Across all 5 channels" icon={Cpu} sparklineColor="#10b981" />
        <MetricCard label="Plasma Electron Temp" value="1.85" unit="eV" subtext="Te Core Estimation" icon={Zap} sparklineColor="#06b6d4" />
        <MetricCard label="Electron Density" value="3.4e11" unit="cm⁻³" subtext="Microwave resonance" icon={Layers} sparklineColor="#eab308" />
      </div>

      <Card>
        <CardHeader
          title="PHYSICS DIGITAL TWIN VS. PHYSICAL REALITY"
          subtitle="Real-time comparison between mathematical physics solver and live edge sensors"
          icon={Cpu}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Physics Parameter Channel</th>
                <th className="px-3 py-2.5 text-right">Digital Twin Simulation</th>
                <th className="px-3 py-2.5 text-right">Physical Sensor Ingest</th>
                <th className="px-3 py-2.5 text-right">Sim-to-Real Delta</th>
                <th className="px-3 py-2.5 text-right">Convergence State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {twinMetrics.map((m) => (
                <tr key={m.channel} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{m.channel}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{m.simulated}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{m.measured}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-emerald-400 font-semibold">{m.deviation}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={m.status} size="sm" />
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
