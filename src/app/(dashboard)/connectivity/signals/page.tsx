'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Radio, Activity, CheckCircle2, Wifi } from 'lucide-react';

export default function LiveSignalMonitorPage() {
  const signals = [
    { channel: 'CH-01', parameter: 'Pyrometer Plasma Optical Core', value: '848.0 °C', frequency: '100 Hz', jitter: '0.4 ms', quality: 99.8, status: 'ONLINE' },
    { channel: 'CH-02', parameter: 'Baratron Capacitance Diaphragm', value: '18.20 Torr', frequency: '50 Hz', jitter: '0.8 ms', quality: 99.5, status: 'ONLINE' },
    { channel: 'CH-03', parameter: 'Directional Coupler Forward RF', value: '31.20 kW', frequency: '100 Hz', jitter: '0.3 ms', quality: 99.9, status: 'ONLINE' },
    { channel: 'CH-04', parameter: 'Directional Coupler Reflected RF', value: '0.74 kW', frequency: '100 Hz', jitter: '0.5 ms', quality: 99.2, status: 'ONLINE' },
    { channel: 'CH-05', parameter: 'Mass Flow Controller - CH4', value: '14.80 sccm', frequency: '10 Hz', jitter: '1.2 ms', quality: 98.9, status: 'ONLINE' },
    { channel: 'CH-06', parameter: 'Mass Flow Controller - H2', value: '320.0 sccm', frequency: '10 Hz', jitter: '1.1 ms', quality: 99.1, status: 'ONLINE' },
    { channel: 'CH-07', parameter: 'OES Spectral Ratio (C2/CH)', value: '0.84 Ratio', frequency: '20 Hz', jitter: '2.4 ms', quality: 97.4, status: 'ONLINE' },
  ];

  return (
    <PageShell
      section="CONNECTIVITY & EDGE"
      title="Live Signal Monitor"
      subtitle="High-frequency sensor acquisition stream, jitter metrics, packet quality scores, and live signal curves."
      action={
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-led" />
          <span>Real-time Ingest (142 Hz)</span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard label="Active Signal Channels" value="7" unit="Sensors" subtext="All Online" icon={Radio} sparklineColor="#10b981" />
        <MetricCard label="Mean Ingest Frequency" value="142" unit="Hz" subtext="Aggregate rate" icon={Activity} sparklineColor="#06b6d4" />
        <MetricCard label="Packet Jitter" value="0.7" unit="ms" subtext="SLA < 5.0 ms" icon={Wifi} sparklineColor="#10b981" />
        <MetricCard label="Stream Quality Score" value="99.4" unit="%" subtext="0 dropped frames" icon={CheckCircle2} sparklineColor="#eab308" />
      </div>

      <Card>
        <CardHeader
          title="HIGH-FREQUENCY FIELD TRANSDUCER SIGNALS"
          subtitle="Real-time channel values and packet timing"
          icon={Radio}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Channel</th>
                <th className="px-3 py-2.5">Physical Parameter</th>
                <th className="px-3 py-2.5 text-right">Current Value</th>
                <th className="px-3 py-2.5 text-right">Sample Rate</th>
                <th className="px-3 py-2.5 text-right">Frame Jitter</th>
                <th className="px-3 py-2.5 text-right">Quality Score</th>
                <th className="px-3.5 py-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {signals.map((sig) => (
                <tr key={sig.channel} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{sig.channel}</td>
                  <td className="px-3 py-2.5 text-zinc-300">{sig.parameter}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{sig.value}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{sig.frequency}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{sig.jitter}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-emerald-400 font-semibold">{sig.quality}%</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={sig.status} size="sm" />
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
