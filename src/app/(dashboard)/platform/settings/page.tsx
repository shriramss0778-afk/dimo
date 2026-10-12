'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { DisconnectedState } from '@/components/ui/states';
import { Cpu, Zap, Activity, ArrowUpRight } from 'lucide-react';

export default function FeaturePage() {
  const isDbConfigured = false;

  return (
    <PageShell
      section="SYSTEM PREFERENCES"
      title="System Administration"
      subtitle="System parameters, retention windows, timezone defaults, database connectivity, and safety locks."
    >
      {!isDbConfigured && <DisconnectedState />}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Operational State"
          value="NOMINAL"
          unit="Active"
          subtext="Telemetry stream live"
          icon={Activity}
          sparklineColor="#10b981"
        />
        <MetricCard
          label="Edge Transducers"
          value="18"
          unit="Sensors"
          subtext="Throughput 142 Hz"
          icon={Cpu}
          sparklineColor="#eab308"
        />
        <MetricCard
          label="Chamber Power"
          value="31.2"
          unit="kW"
          subtext="RF frequency 915 MHz"
          icon={Zap}
          sparklineColor="#9ca3af"
        />
      </div>

      <Card>
        <CardHeader
          title="SYSTEM ADMINISTRATION • TELEMETRY & RECORDS"
          action={
            <span className="text-[10px] font-mono text-amber-400 flex items-center space-x-1">
              <span>Real-time</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          }
        />
        <CardBody className="space-y-4">
          <div className="p-5 bg-[#141519] border border-[#26282f] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-xs font-semibold text-zinc-100 font-mono tracking-wide">System Administration Online</h4>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 max-w-xl font-mono">
                System parameters, retention windows, timezone defaults, database connectivity, and safety locks.
              </p>
            </div>
            <div className="shrink-0">
              <StatusBadge status="RUNNING" />
            </div>
          </div>
        </CardBody>
      </Card>
    </PageShell>
  );
}
