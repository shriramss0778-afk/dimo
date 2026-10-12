'use client';

import React, { useState, useEffect } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Building2, Cpu, MapPin, Activity, ArrowUpRight, ExternalLink, RefreshCw, Radio } from 'lucide-react';
import Link from 'next/link';

interface SiteItem {
  id: string;
  code: string;
  name: string;
  city: string;
  state: string;
  reactorsTotal: number;
  reactorsOnline: number;
  avgHealth: number;
  powerDrawKw: number;
  gateways: number;
  status: string;
}

export default function SitesPage() {
  const [sites, setSites] = useState<SiteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSites = async () => {
    try {
      const res = await fetch('/api/sites');
      const json = await res.json();
      if (json && json.data && json.data.length > 0) {
        setSites(json.data);
      }
    } catch (e) {
      console.error('Failed to load sites:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const totalCapacity = sites.reduce((acc, s) => acc + s.reactorsTotal, 0);
  const totalPower = sites.reduce((acc, s) => acc + s.powerDrawKw, 0);

  return (
    <PageShell
      section="FACILITY OPERATIONS"
      title="Site Management"
      subtitle="Regional industrial production hubs (Surat, Navsari, Mumbai) and distributed reactor facilities synchronized via edge gateways."
      action={
        <div className="flex items-center space-x-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Radio className="w-3.5 h-3.5" />
            <span>Industrial Site Ingestion Active</span>
          </div>
          <button
            onClick={fetchSites}
            className="p-1.5 rounded bg-[#181920] hover:bg-[#20222a] border border-[#2b2d37] text-zinc-300 hover:text-amber-300 transition"
            title="Refresh Sites"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard
          label="Active Facilities"
          value={sites.length.toString()}
          unit="Sites"
          subtext="Persisted in Neon PostgreSQL"
          icon={Building2}
          sparklineColor="#10b981"
        />
        <MetricCard
          label="Total Fleet Capacity"
          value={totalCapacity.toString()}
          unit="CVD Units"
          subtext="Distributed manufacturing lines"
          icon={Cpu}
          sparklineColor="#eab308"
        />
        <MetricCard
          label="Facility Power Load"
          value={totalPower.toFixed(1)}
          unit="kW"
          subtext="Live RF generators draw"
          icon={Activity}
          sparklineColor="#06b6d4"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {sites.map((site) => (
          <Card key={site.id} className="flex flex-col justify-between">
            <CardHeader
              title={`${site.code} • ${site.city.toUpperCase()}`}
              badge={<StatusBadge status={site.status} size="sm" />}
              icon={MapPin}
            />
            <CardBody className="space-y-3 font-mono text-xs">
              <div>
                <h3 className="font-semibold text-zinc-100 text-sm">{site.name}</h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">{site.city}, {site.state}, India</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1b1c23]">
                <div className="bg-[#14151a] p-2 rounded border border-[#23252d]">
                  <span className="text-[9px] uppercase text-zinc-400 block">Reactors Active</span>
                  <span className="text-sm font-bold text-zinc-100 font-tabular">
                    {site.reactorsOnline} / {site.reactorsTotal}
                  </span>
                </div>
                <div className="bg-[#14151a] p-2 rounded border border-[#23252d]">
                  <span className="text-[9px] uppercase text-zinc-400 block">RF Load</span>
                  <span className="text-sm font-bold text-amber-300 font-tabular">
                    {site.powerDrawKw} kW
                  </span>
                </div>
              </div>

              <div className="space-y-1 pt-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Mean Health Score:</span>
                  <span className={`font-semibold ${site.avgHealth > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {site.avgHealth}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Edge Gateways:</span>
                  <span className="text-zinc-200">{site.gateways} Online</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/health-map"
                  className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded bg-[#181920] hover:bg-[#22242c] border border-[#2b2d37] text-zinc-300 text-xs font-mono transition"
                >
                  <span>Inspect Facility Grid</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
