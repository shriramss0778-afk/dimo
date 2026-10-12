'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Radio, Share2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ProtocolIntegrationsPage() {
  const protocols = [
    { protocol: 'MQTT v3.1.1 / v5.0', role: 'Edge Ingestion Broker', port: 1883, security: 'TLS 1.3 / PSK', throughput: '1,420 msg/s', status: 'ONLINE' },
    { protocol: 'Modbus-TCP', role: 'PLC Vacuum & Gas Interlocks', port: 502, security: 'Isolated Subnet VLAN 10', throughput: '240 registers/s', status: 'ONLINE' },
    { protocol: 'OPC-UA', role: 'Enterprise SCADA Bridge', port: 4840, security: 'Basic256Sha256 Certs', throughput: '850 nodes/s', status: 'ONLINE' },
    { protocol: 'RS-485 / Modbus RTU', role: 'Serial Manometer Array', port: 'Serial COM2', security: 'Hardwired Shielded Pair', throughput: '19.2 kbaud', status: 'ONLINE' },
    { protocol: 'REST / HTTPS API', role: 'Cloud Neon DB Telemetry Pipe', port: 443, security: 'API Bearer Token + HTTPS', throughput: '50 req/s', status: 'ONLINE' },
  ];

  return (
    <PageShell
      section="CONNECTIVITY & EDGE"
      title="Protocol Integrations"
      subtitle="Industrial fieldbus interfaces: MQTT broker, Modbus-TCP PLC polling, OPC-UA servers, and RS-485 bridges."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            5 Protocols Active
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Active Protocols" value="5" unit="Stacks" subtext="All bridges operational" icon={Share2} sparklineColor="#10b981" />
        <MetricCard label="Fieldbus Ingest Rate" value="2.5" unit="kMsg/s" subtext="Aggregate throughput" icon={Radio} sparklineColor="#06b6d4" />
        <MetricCard label="Transport Security" value="TLS 1.3" unit="Cipher" subtext="End-to-end encrypted" icon={ShieldCheck} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader
          title="FIELD INTERFACE BUS & PROTOCOL STACKS"
          subtitle="Communication adapters interfacing shop-floor hardware to DIMO"
          icon={Share2}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Protocol Stack</th>
                <th className="px-3 py-2.5">Functional Role</th>
                <th className="px-3 py-2.5">Port / Channel</th>
                <th className="px-3 py-2.5">Security Cipher</th>
                <th className="px-3 py-2.5 text-right">Throughput</th>
                <th className="px-3 py-2.5 text-right">Stack Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {protocols.map((p) => (
                <tr key={p.protocol} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{p.protocol}</td>
                  <td className="px-3 py-2.5 text-zinc-300">{p.role}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{p.port}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{p.security}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{p.throughput}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={p.status} size="sm" />
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
