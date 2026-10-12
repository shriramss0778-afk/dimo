'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge, TelemetryPill } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { 
  Cpu, 
  Zap, 
  TrendingUp, 
  AlertOctagon, 
  ArrowUpRight, 
  Layers, 
  Activity, 
  Filter, 
  RefreshCw,
  Gauge,
  Sliders,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function FleetOverviewPage() {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fleetReactors = [
    { id: '1', serial: 'PL1-SEC1-CVD03', site: 'Surat Fab 1', status: 'RUNNING', temp: 848.0, pressure: 18.2, power: 31.2, ch4: 14.8, h2: 320, growth: 2.52, health: 93, isSim: true },
    { id: '2', serial: 'PL1-SEC1-CVD01', site: 'Surat Fab 1', status: 'WARNING', temp: 842.5, pressure: 18.4, power: 31.0, ch4: 15.2, h2: 315, growth: 2.67, health: 65, isSim: true },
    { id: '3', serial: 'PL1-SEC1-CVD02', site: 'Surat Fab 1', status: 'RUNNING', temp: 848.0, pressure: 18.1, power: 31.1, ch4: 14.9, h2: 320, growth: 2.52, health: 85, isSim: true },
    { id: '4', serial: 'PL1-SEC1-CVD06', site: 'Surat Fab 1', status: 'CRITICAL', temp: 841.4, pressure: 18.2, power: 30.4, ch4: 16.5, h2: 300, growth: 2.67, health: 38, isSim: true },
    { id: '5', serial: 'PL1-SEC1-CVD04', site: 'Surat Fab 1', status: 'RUNNING', temp: 843.5, pressure: 18.1, power: 30.0, ch4: 14.6, h2: 325, growth: 2.53, health: 88, isSim: true },
    { id: '6', serial: 'PL1-SEC1-CVD07', site: 'Navsari Plant', status: 'IDLE', temp: 843.7, pressure: 18.1, power: 30.1, ch4: 14.7, h2: 318, growth: 2.51, health: 90, isSim: true },
    { id: '7', serial: 'PL1-SEC1-CVD08', site: 'Navsari Plant', status: 'RUNNING', temp: 844.4, pressure: 18.4, power: 31.4, ch4: 15.0, h2: 322, growth: 2.58, health: 94, isSim: true },
    { id: '8', serial: 'PL1-SEC1-CVD05', site: 'Mumbai R&D', status: 'MAINTENANCE', temp: 842.7, pressure: 18.2, power: 31.7, ch4: 14.9, h2: 319, growth: 2.55, health: 44, isSim: true },
    { id: '9', serial: 'PL1-SEC1-CVD09', site: 'Mumbai R&D', status: 'RUNNING', temp: 843.0, pressure: 18.3, power: 31.3, ch4: 15.1, h2: 321, growth: 2.56, health: 82, isSim: true },
    { id: '10', serial: 'PL1-SEC1-CVD10', site: 'Navsari Plant', status: 'IDLE', temp: 840.8, pressure: 18.3, power: 31.2, ch4: 14.5, h2: 315, growth: 2.68, health: 91, isSim: true },
  ];

  const filtered = fleetReactors.filter((r) => {
    const matchesFilter = filterStatus === 'ALL' || r.status === filterStatus;
    const matchesSearch = r.serial.toLowerCase().includes(searchTerm.toLowerCase()) || r.site.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageShell
      section="OPERATIONS OVERVIEW"
      title="Fleet Overview"
      subtitle="Live multi-reactor CVD synthesis console, telemetry curves, and yield optimization matrix."
      action={
        <div className="flex items-center gap-2">
          <Link
            href="/connectivity/telemetry"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Ingest Stream</span>
          </Link>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--accent-dim)] border border-[var(--accent-border)] text-xs font-mono text-[var(--accent)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>142 Hz Telemetry</span>
          </div>
        </div>
      }
    >
      {/* Real Neon DB Connectivity Status Banner */}
      <NeonConnectivityBanner />

      {/* Top 4 Industrial Precision Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <MetricCard
          label="Reactors Online"
          value="5"
          unit="/ 10"
          subtext="50% Fleet Active"
          trend="+1 vs shift start"
          trendDirection="up"
          icon={Cpu}
          sparklineColor="#10b981"
          isSimulated={true}
        />
        <MetricCard
          label="Aggregate RF Power"
          value="75.0"
          unit="kW"
          subtext="2.45 GHz Magnetrons"
          trend="Nominal draw"
          trendDirection="neutral"
          icon={Zap}
          sparklineColor="#eab308"
          isSimulated={true}
        />
        <MetricCard
          label="Avg Diamond Growth"
          value="25.77"
          unit="µm/h"
          subtext="Combined fleet yield"
          trend="+3.2% vs baseline"
          trendDirection="up"
          icon={TrendingUp}
          sparklineColor="#06b6d4"
          isSimulated={true}
        />
        <MetricCard
          label="Active Anomalies"
          value="2"
          unit="Critical"
          subtext="Requires intervention"
          trend="2 thermal alerts"
          trendDirection="down"
          icon={AlertOctagon}
          sparklineColor="#f43f5e"
          isSimulated={true}
        />
      </div>

      {/* Main Grid: Live Telemetry Fleet Table + Right Industrial AI / Alert Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Full Industrial Table (Takes 2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader
              title="REACTOR FLEET • REAL-TIME PROCESS ENVELOPE"
              subtitle="Synchronized optical pyrometry, Baratron vacuum, and microwave generator channels"
              icon={Gauge}
              action={
                <div className="flex items-center space-x-2">
                  {/* Status Filter */}
                  <div className="flex items-center gap-1 bg-[var(--bg-input)] border border-[var(--border-default)] p-0.5 rounded-[var(--radius-sm)] text-[10px] font-mono">
                    {['ALL', 'RUNNING', 'WARNING', 'CRITICAL'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        className={`px-2 py-0.5 rounded-[2px] transition-colors ${
                          filterStatus === st
                            ? 'bg-[var(--accent-dim)] text-[var(--accent)] font-semibold border border-[var(--accent-border)]'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <Link
                    href="/reactors"
                    className="text-[11px] font-mono text-[var(--accent)] hover:underline flex items-center gap-1 pl-2 border-l border-[var(--border-subtle)]"
                  >
                    <span>Full Registry</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              }
            />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400 tracking-wider">
                  <tr>
                    <th className="px-3.5 py-2.5">Reactor Unit</th>
                    <th className="px-3 py-2.5">Facility</th>
                    <th className="px-3 py-2.5">State</th>
                    <th className="px-3 py-2.5 text-right">Pyrometer (°C)</th>
                    <th className="px-3 py-2.5 text-right">Pressure (Torr)</th>
                    <th className="px-3 py-2.5 text-right">RF (kW)</th>
                    <th className="px-3 py-2.5 text-right">Growth (µm/h)</th>
                    <th className="px-3.5 py-2.5 text-right">Health Index</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-[#16171d] transition-colors group cursor-pointer"
                    >
                      <td className="px-3.5 py-2.5 font-semibold text-zinc-100 flex items-center space-x-2">
                        <Link href="/reactors/details" className="hover:text-amber-300">
                          {r.serial}
                        </Link>
                        {r.isSim && (
                          <span className="text-[8px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                            SIM
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-zinc-400 text-[11px]">{r.site}</td>
                      <td className="px-3 py-2.5">
                        <StatusBadge status={r.status} size="sm" />
                      </td>
                      <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">
                        {r.temp.toFixed(1)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">
                        {r.pressure.toFixed(1)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">
                        {r.power.toFixed(1)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-tabular text-emerald-400 font-semibold">
                        {r.growth.toFixed(2)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right">
                        <div className="flex items-center justify-end space-x-2 font-tabular">
                          <div className="w-14 bg-[#1f2129] rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full ${
                                r.health > 80
                                  ? 'bg-emerald-400'
                                  : r.health > 50
                                  ? 'bg-amber-400'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${r.health}%` }}
                            />
                          </div>
                          <span
                            className={`text-[11px] font-semibold ${
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="p-8 text-center text-xs font-mono text-zinc-400">
                No reactors match filter: {filterStatus}
              </div>
            )}
          </Card>

          {/* Quick Telemetry Band & Operational Envelopes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#131418] border border-[#23252d] p-3 rounded-lg font-mono text-xs">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">CH4 Methane Ratio</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-bold text-zinc-100 font-tabular">4.62%</span>
                <span className="text-[10px] text-emerald-400 font-medium">Optimal Window</span>
              </div>
              <div className="w-full bg-[#1e2027] h-1 rounded mt-2">
                <div className="bg-emerald-400 h-1 rounded" style={{ width: '74%' }} />
              </div>
            </div>

            <div className="bg-[#131418] border border-[#23252d] p-3 rounded-lg font-mono text-xs">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Chamber Vacuum</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-bold text-zinc-100 font-tabular">18.2 Torr</span>
                <span className="text-[10px] text-zinc-400">Setpoint 18.0</span>
              </div>
              <div className="w-full bg-[#1e2027] h-1 rounded mt-2">
                <div className="bg-amber-400 h-1 rounded" style={{ width: '88%' }} />
              </div>
            </div>

            <div className="bg-[#131418] border border-[#23252d] p-3 rounded-lg font-mono text-xs">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Substrate Temp Std Dev</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-bold text-zinc-100 font-tabular">±1.4 °C</span>
                <span className="text-[10px] text-emerald-400">High Stability</span>
              </div>
              <div className="w-full bg-[#1e2027] h-1 rounded mt-2">
                <div className="bg-cyan-400 h-1 rounded" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Process Insights & Real-Time Alert Stream */}
        <div className="space-y-4">
          {/* Process Tuning Recommendation */}
          <Card>
            <CardHeader
              title="PROCESS OPTIMIZATION RULE"
              badge={
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-[var(--accent-dim)] border border-[var(--accent-border)] text-[var(--accent)] font-semibold">
                  ACTIVE HEURISTIC
                </span>
              }
              icon={Sparkles}
              action={
                <Link
                  href="/reactor-health/faults"
                  className="text-[10px] font-mono text-[var(--accent)] hover:underline flex items-center gap-1"
                >
                  <span>Rules</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              }
            />
            <CardBody className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
                  P1 ENERGY PROFILE
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 font-semibold">
                  IMMEDIATE
                </span>
              </div>
              <h3 className="text-xs font-semibold text-zinc-100 font-mono">
                Optimise Reactor PL1-SEC1-CVD03 Plasma Settings
              </h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                PL1-SEC1-CVD03 is operating 22% above energy baseline. Adjusting plasma power from 11.4 kW → 9.2 kW and CH4 from 16.8 → 14.9 sccm will restore efficiency without quality impact.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-[#23252d]">
                <span className="inline-block px-2 py-0.8 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold">
                  ₹18,000/mo estimated saving
                </span>
                <Link
                  href="/reactor-health/condition"
                  className="text-[11px] font-mono text-zinc-300 hover:text-amber-400 inline-flex items-center space-x-1"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardBody>
          </Card>

          {/* Active Industrial Alerts Stream */}
          <Card>
            <CardHeader
              title="ACTIVE ALARMS & DISPATCH"
              badge={
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-400 border border-rose-500/25">
                  2 CRITICAL
                </span>
              }
              icon={AlertOctagon}
              action={
                <Link
                  href="/reactor-health/alarms"
                  className="text-[10px] font-mono text-zinc-400 hover:text-amber-400 flex items-center space-x-1"
                >
                  <span>All (5)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              }
            />
            <div className="divide-y divide-[#1b1c23] text-xs font-mono">
              <div className="p-3 hover:bg-[#16171d] transition-colors flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0 animate-ping" />
                  <div>
                    <h4 className="text-xs font-medium text-zinc-200">Thermal Runaway Risk</h4>
                    <span className="text-[10px] text-zinc-400">2 min ago • E-THERM-902</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-400/90 font-mono font-semibold">PL1-SEC1-CVD06</span>
              </div>

              <div className="p-3 hover:bg-[#16171d] transition-colors flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-medium text-zinc-200">Energy Spike Detected</h4>
                    <span className="text-[10px] text-zinc-400">10 min ago • E-RF-410</span>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-300 font-mono">PL1-SEC1-CVD03</span>
              </div>

              <div className="p-3 hover:bg-[#16171d] transition-colors flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-medium text-zinc-200">Magnetron Servicing Due</h4>
                    <span className="text-[10px] text-zinc-400">1 hr ago • PM-MAG-05</span>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-300 font-mono">PL1-SEC1-CVD05</span>
              </div>

              <div className="p-3 hover:bg-[#16171d] transition-colors flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-medium text-zinc-200">Vacuum Seal Micro-Leak</h4>
                    <span className="text-[10px] text-zinc-400">2 hr ago • E-VAC-012</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-400/90 font-mono font-semibold">PL1-SEC1-CVD06</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
