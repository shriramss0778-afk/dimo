'use client';

import React, { useState, useEffect } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Cpu, Search, SlidersHorizontal, ArrowUpRight, Gauge, Activity, ShieldCheck, RefreshCw, Radio } from 'lucide-react';
import Link from 'next/link';

interface ReactorItem {
  id?: string;
  serial: string;
  name: string;
  model: string;
  site: string;
  status: string;
  volume: number;
  maxPower: number;
  hours: number;
  health: number;
  isSimulated?: boolean;
}

export default function ReactorRegistryPage() {
  const [search, setSearch] = useState('');
  const [siteFilter, setSiteFilter] = useState('ALL');
  const [reactors, setReactors] = useState<ReactorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const fetchReactors = async () => {
    try {
      const res = await fetch('/api/reactors');
      const data = await res.json();
      if (data && data.reactors && data.reactors.length > 0) {
        const mapped: ReactorItem[] = data.reactors.map((r: any) => ({
          id: r.id,
          serial: r.serialNumber,
          name: r.name,
          model: r.model,
          site: r.site?.name || 'Surat Fab 1',
          status: r.status,
          volume: r.chamberVolumeL ?? 45.0,
          maxPower: r.maxPowerKw ?? 6.0,
          hours: Math.round(r.totalRunHours ?? 0),
          health: Math.round(r.healthScore ?? 100),
          isSimulated: r.isSimulated,
        }));
        setReactors(mapped);
      }
    } catch (e) {
      console.error('Failed to load reactors from DB:', e);
    } finally {
      setLoading(false);
      setLastRefreshed(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    fetchReactors();
  }, []);

  const filtered = reactors.filter((r) => {
    const matchesSite = siteFilter === 'ALL' || r.site === siteFilter || r.site.includes(siteFilter);
    const matchesSearch =
      r.serial.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase());
    return matchesSite && matchesSearch;
  });

  const totalRunHours = reactors.reduce((acc, r) => acc + r.hours, 0);
  const avgHealth = reactors.length > 0 ? Math.round(reactors.reduce((acc, r) => acc + r.health, 0) / reactors.length) : 0;
  const degradedCount = reactors.filter(r => r.health < 80).length;

  return (
    <PageShell
      section="EQUIPMENT MANAGEMENT"
      title="Reactor Registry"
      subtitle="Physical CVD equipment ledger, serial numbers, chamber volumes, and generator models automatically discovered and synchronized via edge gateways."
      action={
        <div className="flex items-center space-x-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Gateway Auto-Provisioned</span>
          </div>
          <button
            onClick={fetchReactors}
            className="p-1.5 rounded bg-[#181920] hover:bg-[#20222a] border border-[#2b2d37] text-zinc-300 hover:text-amber-300 transition"
            title="Refresh Ledger"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard
          label="Total Registered Units"
          value={reactors.length.toString()}
          unit="Reactors"
          subtext="Persisted in Neon PostgreSQL"
          icon={Cpu}
          sparklineColor="#10b981"
        />
        <MetricCard
          label="Mean Chamber Health"
          value={avgHealth.toString()}
          unit="%"
          subtext="Target ≥ 85.0%"
          trend={degradedCount > 0 ? `${degradedCount} units degraded` : 'All nominal'}
          trendDirection={degradedCount > 0 ? 'down' : 'up'}
          icon={Activity}
          sparklineColor="#eab308"
        />
        <MetricCard
          label="Cumulative Run Hours"
          value={totalRunHours.toLocaleString()}
          unit="hrs"
          subtext="Telemetry-derived runtime"
          icon={Gauge}
          sparklineColor="#06b6d4"
        />
      </div>

      <Card>
        <CardHeader
          title="PHYSICAL REACTOR LEDGER"
          subtitle="Serial numbers, chamber dimensions, power envelope, and health indices derived from database records"
          icon={Cpu}
          action={
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by serial / tag..."
                  className="bg-[#14151a] border border-[#23252d] rounded pl-8 pr-2.5 py-1 text-xs text-zinc-200 placeholder-zinc-400 font-mono w-44 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <select
                value={siteFilter}
                onChange={(e) => setSiteFilter(e.target.value)}
                className="bg-[#14151a] border border-[#23252d] rounded px-2.5 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-amber-500/50"
              >
                <option value="ALL">All Facilities</option>
                <option value="Surat">Surat Fab 1</option>
                <option value="Navsari">Navsari Plant</option>
                <option value="Mumbai">Mumbai R&D</option>
              </select>
            </div>
          }
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400 tracking-wider">
              <tr>
                <th className="px-3.5 py-2.5">Serial Tag</th>
                <th className="px-3 py-2.5">Name</th>
                <th className="px-3 py-2.5">Model Specification</th>
                <th className="px-3 py-2.5">Facility</th>
                <th className="px-3 py-2.5">Operating State</th>
                <th className="px-3 py-2.5 text-center">Data Source</th>
                <th className="px-3 py-2.5 text-right">Chamber (L)</th>
                <th className="px-3 py-2.5 text-right">Max RF (kW)</th>
                <th className="px-3 py-2.5 text-right">Run Hours</th>
                <th className="px-3.5 py-2.5 text-right">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {filtered.map((r) => (
                <tr key={r.serial} className="hover:bg-[#16171d] transition-colors">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">
                    <Link href="/reactors/details" className="hover:text-amber-300">
                      {r.serial}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-zinc-300">{r.name}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{r.model}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{r.site}</td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={r.status} size="sm" />
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    {r.isSimulated ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60 font-mono">
                        SIMULATED
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        HARDWARE
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{r.volume.toFixed(1)}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{r.maxPower.toFixed(1)}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{r.hours.toLocaleString()}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <span
                      className={`font-semibold font-tabular ${
                        r.health > 80 ? 'text-emerald-400' : r.health > 50 ? 'text-amber-400' : 'text-rose-400'
                      }`}
                    >
                      {r.health}%
                    </span>
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
