'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge, TelemetryPill } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Cpu, Zap, Activity, Radio, Gauge, Sliders, ShieldAlert, ArrowRight, Settings } from 'lucide-react';
import Link from 'next/link';

export default function ReactorDetailsPage() {
  const [selectedReactor, setSelectedReactor] = useState('PL1-SEC1-CVD03');

  const reactorInfo = {
    serial: 'PL1-SEC1-CVD03',
    name: 'Alpha-03',
    facility: 'Surat Fab 1 (Gujarat)',
    model: 'MPCVD-915-PRO',
    frequency: '915 MHz Cavity',
    status: 'RUNNING',
    health: 93,
    runHours: 1980.5,
    lastServiced: '2026-03-28',
    temperature: 848.0,
    pressure: 18.2,
    power: 31.2,
    ch4: 14.8,
    h2: 320.0,
    substrateTemp: 825.4,
    coolingFlow: 4.8,
    vacuumLeakRate: '< 1e-9 mbar·l/s',
  };

  const sensors = [
    { code: 'TC-PLASM-01', name: 'Dual-Wavelength Pyrometer', type: 'TEMPERATURE', value: '848.0 °C', status: 'ONLINE', sampleRate: '100 Hz' },
    { code: 'BP-VAC-02', name: 'Baratron Capacitance Manometer', type: 'PRESSURE', value: '18.20 Torr', status: 'ONLINE', sampleRate: '50 Hz' },
    { code: 'RF-GEN-01', name: 'Microwave Forward Power Detector', type: 'POWER', value: '31.20 kW', status: 'ONLINE', sampleRate: '100 Hz' },
    { code: 'MFC-CH4-01', name: 'Mass Flow Controller - Methane', type: 'GAS_FLOW', value: '14.80 sccm', status: 'ONLINE', sampleRate: '10 Hz' },
    { code: 'MFC-H2-01', name: 'Mass Flow Controller - Hydrogen', type: 'GAS_FLOW', value: '320.0 sccm', status: 'ONLINE', sampleRate: '10 Hz' },
    { code: 'OES-SPEC-01', name: 'Optical Emission Spectrometer (C2/CH)', type: 'OPTICAL', value: '0.84 Ratio', status: 'ONLINE', sampleRate: '20 Hz' },
  ];

  return (
    <PageShell
      section="EQUIPMENT TELEMETRY"
      title={`Reactor Details • ${selectedReactor}`}
      subtitle="Chamber physical characteristics, real-time RF microwave coupling, gas mixture, and transducer stream."
      action={
        <div className="flex items-center space-x-2">
          <select
            value={selectedReactor}
            onChange={(e) => setSelectedReactor(e.target.value)}
            className="bg-[#14151a] border border-[#23252d] rounded px-3 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-amber-500/50"
          >
            <option value="PL1-SEC1-CVD01">PL1-SEC1-CVD01 (Warning)</option>
            <option value="PL1-SEC1-CVD02">PL1-SEC1-CVD02 (Running)</option>
            <option value="PL1-SEC1-CVD03">PL1-SEC1-CVD03 (Optimal)</option>
            <option value="PL1-SEC1-CVD06">PL1-SEC1-CVD06 (Critical)</option>
          </select>
          <Link
            href="/reactor-health/operating-limits"
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#181920] hover:bg-[#22242c] border border-[#2c2e38] text-zinc-300 text-xs font-mono transition"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Limits</span>
          </Link>
        </div>
      }
    >
      <NeonConnectivityBanner />

      {/* Top Spec Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard
          label="Plasma Temperature"
          value={reactorInfo.temperature.toFixed(1)}
          unit="°C"
          subtext="Setpoint 850.0 °C"
          trend="±0.4% var"
          trendDirection="up"
          icon={Activity}
          sparklineColor="#10b981"
        />
        <MetricCard
          label="Chamber Pressure"
          value={reactorInfo.pressure.toFixed(1)}
          unit="Torr"
          subtext="Baratron Manometer"
          trend="Stable"
          trendDirection="neutral"
          icon={Gauge}
          sparklineColor="#eab308"
        />
        <MetricCard
          label="Forward RF Power"
          value={reactorInfo.power.toFixed(1)}
          unit="kW"
          subtext="Magnetron 915 MHz"
          trend="2.4% ref power"
          trendDirection="neutral"
          icon={Zap}
          sparklineColor="#06b6d4"
        />
        <MetricCard
          label="CH4 / H2 Ratio"
          value="4.62"
          unit="%"
          subtext="Gas envelope"
          trend="In spec"
          trendDirection="up"
          icon={Sliders}
          sparklineColor="#10b981"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Transducer Inventory & Live Process Curves */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader
              title="CALIBRATED TRANSDUCER CHANNELS"
              subtitle="Live high-frequency instrumentation attached to this chamber"
              icon={Radio}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
                  <tr>
                    <th className="px-3.5 py-2.5">Sensor Tag</th>
                    <th className="px-3 py-2.5">Transducer Name</th>
                    <th className="px-3 py-2.5">Category</th>
                    <th className="px-3 py-2.5 text-right">Live Reading</th>
                    <th className="px-3 py-2.5 text-right">Sample Rate</th>
                    <th className="px-3.5 py-2.5 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
                  {sensors.map((s) => (
                    <tr key={s.code} className="hover:bg-[#16171d]">
                      <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{s.code}</td>
                      <td className="px-3 py-2.5 text-zinc-300">{s.name}</td>
                      <td className="px-3 py-2.5 text-zinc-400 text-[11px]">{s.type}</td>
                      <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-semibold">{s.value}</td>
                      <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{s.sampleRate}</td>
                      <td className="px-3.5 py-2.5 text-right">
                        <StatusBadge status={s.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Operational Envelope Check */}
          <Card>
            <CardHeader
              title="PROCESS ENVELOPE TOLERANCE"
              subtitle="Threshold verification across critical synthesis channels"
              icon={Sliders}
            />
            <CardBody className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-300">Microwave Cavity Resonance (915 MHz ± 2.5 MHz)</span>
                  <span className="text-emerald-400 font-semibold">914.8 MHz (OK)</span>
                </div>
                <div className="w-full bg-[#1e2027] h-2 rounded overflow-hidden">
                  <div className="bg-emerald-400 h-2 rounded" style={{ width: '82%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-300">Cooling Water Flow Rate (&gt; 4.0 L/min)</span>
                  <span className="text-emerald-400 font-semibold">4.8 L/min (OK)</span>
                </div>
                <div className="w-full bg-[#1e2027] h-2 rounded overflow-hidden">
                  <div className="bg-emerald-400 h-2 rounded" style={{ width: '90%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-300">Quartz Belljar Optical Transmission (&gt; 80%)</span>
                  <span className="text-amber-400 font-semibold">84.2% (Moderate Soot)</span>
                </div>
                <div className="w-full bg-[#1e2027] h-2 rounded overflow-hidden">
                  <div className="bg-amber-400 h-2 rounded" style={{ width: '84%' }} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Col: Machine Passport */}
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="EQUIPMENT PASSPORT"
              subtitle="Static equipment configuration"
              icon={Cpu}
            />
            <CardBody className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#1b1c23]">
                <span className="text-zinc-400">Unit ID</span>
                <span className="font-semibold text-zinc-100">{reactorInfo.serial}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1b1c23]">
                <span className="text-zinc-400">Machine Model</span>
                <span className="text-zinc-200">{reactorInfo.model}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1b1c23]">
                <span className="text-zinc-400">RF Source</span>
                <span className="text-zinc-200">{reactorInfo.frequency}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1b1c23]">
                <span className="text-zinc-400">Facility Location</span>
                <span className="text-zinc-200">{reactorInfo.facility}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1b1c23]">
                <span className="text-zinc-400">Accumulated Hours</span>
                <span className="text-zinc-200 font-tabular">{reactorInfo.runHours} hrs</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1b1c23]">
                <span className="text-zinc-400">Last Overhaul</span>
                <span className="text-zinc-200">{reactorInfo.lastServiced}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1b1c23]">
                <span className="text-zinc-400">Vacuum Leak Rate</span>
                <span className="text-emerald-400">{reactorInfo.vacuumLeakRate}</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/field-operations/workbench"
                  className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded bg-[#181920] hover:bg-[#20222a] border border-[#2b2d37] text-zinc-200 text-xs font-mono transition"
                >
                  <span>Dispatch Maintenance Ticket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
