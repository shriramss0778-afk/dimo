'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Radio, Cpu, Wifi, Activity, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function SensorGatewayHubPage() {
  const [gateways, setGateways] = useState([
    { id: 'gw-1', name: 'Edge-GW-Surat-01', mac: '00:1B:44:11:3A:B7', ip: '192.168.10.15', protocol: 'MQTT / Modbus-TCP', status: 'CONNECTED', sensors: 8, pingMs: 14, site: 'Surat Fab 1' },
    { id: 'gw-2', name: 'Edge-GW-Surat-02', mac: '00:1B:44:22:9C:12', ip: '192.168.10.16', protocol: 'OPC-UA over TCP', status: 'CONNECTED', sensors: 6, pingMs: 18, site: 'Surat Fab 1' },
    { id: 'gw-3', name: 'Edge-GW-Navsari-01', mac: '00:1B:44:88:F4:90', ip: '192.168.20.10', protocol: 'MQTT / RS-485', status: 'CONNECTED', sensors: 6, pingMs: 24, site: 'Navsari Plant' },
    { id: 'gw-4', name: 'Edge-GW-Mumbai-01', mac: '00:1B:44:44:E2:31', ip: '192.168.30.22', protocol: 'MQTT / Modbus-TCP', status: 'DEGRADED', sensors: 4, pingMs: 65, site: 'Mumbai R&D' },
  ]);

  return (
    <PageShell
      section="CONNECTIVITY & EDGE"
      title="Sensor & Gateway Hub"
      subtitle="Industrial IoT hardware connectivity layer, protocol bridges, and active edge nodes."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-led" />
            <span>4 Gateways Active</span>
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard
          label="Edge Gateways"
          value="4"
          unit="Active"
          subtext="3 Sites Linked"
          icon={Radio}
          sparklineColor="#10b981"
        />
        <MetricCard
          label="Total Edge Sensors"
          value="24"
          unit="Nodes"
          subtext="Transducers Polled"
          icon={Cpu}
          sparklineColor="#eab308"
        />
        <MetricCard
          label="Mean Network RTT"
          value="21.5"
          unit="ms"
          subtext="Industrial Ethernet"
          icon={Wifi}
          sparklineColor="#06b6d4"
        />
        <MetricCard
          label="Ingested Packet Rate"
          value="1,420"
          unit="msg/s"
          subtext="Aggregate Inflow"
          icon={Activity}
          sparklineColor="#10b981"
        />
      </div>

      <Card>
        <CardHeader
          title="EDGE GATEWAY CONNECTIONS"
          subtitle="Physical IoT bridges routing Modbus-TCP, OPC-UA, and RS-485 fieldbus into DIMO"
          icon={Radio}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Gateway Node</th>
                <th className="px-3 py-2.5">Facility</th>
                <th className="px-3 py-2.5">MAC Address</th>
                <th className="px-3 py-2.5">IP Address</th>
                <th className="px-3 py-2.5">Field Protocol</th>
                <th className="px-3 py-2.5 text-right">Sensors</th>
                <th className="px-3 py-2.5 text-right">Latency</th>
                <th className="px-3.5 py-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {gateways.map((gw) => (
                <tr key={gw.id} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{gw.name}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{gw.site}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{gw.mac}</td>
                  <td className="px-3 py-2.5 text-zinc-200">{gw.ip}</td>
                  <td className="px-3 py-2.5 text-zinc-300">{gw.protocol}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{gw.sensors}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300">{gw.pingMs} ms</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={gw.status} size="sm" />
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
