'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Radio, Wifi, Activity, Terminal } from 'lucide-react';

export default function GatewayConnectionsPage() {
  const gateways = [
    { name: 'Edge-GW-Surat-01', ip: '192.168.10.15', mac: '00:1B:44:11:3A:B7', firmware: 'v2.4.1', protocol: 'MQTT / Modbus-TCP', site: 'Surat Fab 1', status: 'CONNECTED', uptime: '142 days', latency: '14 ms' },
    { name: 'Edge-GW-Surat-02', ip: '192.168.10.16', mac: '00:1B:44:22:9C:12', firmware: 'v2.4.1', protocol: 'OPC-UA over TCP', site: 'Surat Fab 1', status: 'CONNECTED', uptime: '98 days', latency: '18 ms' },
    { name: 'Edge-GW-Navsari-01', ip: '192.168.20.10', mac: '00:1B:44:88:F4:90', firmware: 'v2.3.8', protocol: 'MQTT / RS-485', site: 'Navsari Plant', status: 'CONNECTED', uptime: '45 days', latency: '24 ms' },
    { name: 'Edge-GW-Mumbai-01', ip: '192.168.30.22', mac: '00:1B:44:44:E2:31', firmware: 'v2.4.0', protocol: 'MQTT / Modbus-TCP', site: 'Mumbai R&D', status: 'DEGRADED', uptime: '12 days', latency: '65 ms' },
  ];

  return (
    <PageShell
      section="CONNECTIVITY & EDGE"
      title="Gateway Connections"
      subtitle="Industrial edge gateway appliances, MAC address registry, heartbeat ping, and firmware lifecycle."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            4 Appliances Active
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Connected Gateways" value="4" unit="Units" subtext="3 Facilities" icon={Radio} sparklineColor="#10b981" />
        <MetricCard label="Average Ping RTT" value="30.2" unit="ms" subtext="Site link verified" icon={Wifi} sparklineColor="#06b6d4" />
        <MetricCard label="Firmware Compliance" value="100" unit="%" subtext="v2.3+ baseline" icon={Activity} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader
          title="EDGE GATEWAY APPLIANCE REGISTRY"
          subtitle="Industrial edge computing nodes forwarding field telemetry"
          icon={Radio}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Gateway Tag</th>
                <th className="px-3 py-2.5">Site Location</th>
                <th className="px-3 py-2.5">MAC Address</th>
                <th className="px-3 py-2.5">IP Address</th>
                <th className="px-3 py-2.5">Firmware</th>
                <th className="px-3 py-2.5 text-right">Uptime</th>
                <th className="px-3 py-2.5 text-right">Heartbeat Ping</th>
                <th className="px-3 py-2.5 text-right">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {gateways.map((g) => (
                <tr key={g.mac} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{g.name}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{g.site}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{g.mac}</td>
                  <td className="px-3 py-2.5 text-zinc-200">{g.ip}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{g.firmware}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{g.uptime}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{g.latency}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={g.status} size="sm" />
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
