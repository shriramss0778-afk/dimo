'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Cpu, Activity, AlertTriangle, Radio } from 'lucide-react';

export default function SensorRegistryPage() {
  const sensors = [
    { code: 'TC-PLASM-01', reactor: 'PL1-SEC1-CVD03', name: 'Dual-Wavelength Optical Pyrometer', type: 'TEMPERATURE', unit: '°C', status: 'ONLINE', reading: '848.0', calDue: '2026-12-15' },
    { code: 'BP-VAC-02', reactor: 'PL1-SEC1-CVD03', name: 'Baratron Capacitance Manometer', type: 'PRESSURE', unit: 'Torr', status: 'ONLINE', reading: '18.20', calDue: '2026-11-01' },
    { code: 'RF-GEN-01', reactor: 'PL1-SEC1-CVD03', name: 'Directional RF Power Detector', type: 'MICROWAVE_POWER', unit: 'kW', status: 'ONLINE', reading: '31.20', calDue: '2027-01-20' },
    { code: 'MFC-CH4-01', reactor: 'PL1-SEC1-CVD03', name: 'Thermal Mass Flow Controller - CH4', type: 'GAS_FLOW_CH4', unit: 'sccm', status: 'ONLINE', reading: '14.80', calDue: '2026-11-15' },
    { code: 'MFC-H2-01', reactor: 'PL1-SEC1-CVD03', name: 'Thermal Mass Flow Controller - H2', type: 'GAS_FLOW_H2', unit: 'sccm', status: 'ONLINE', reading: '320.0', calDue: '2026-11-15' },
    { code: 'CW-FLOW-01', reactor: 'PL1-SEC1-CVD03', name: 'Cooling Water Turbine Flowmeter', type: 'COOLING_WATER_FLOW', unit: 'L/min', status: 'ONLINE', reading: '4.80', calDue: '2027-03-10' },
    { code: 'TC-PLASM-06', reactor: 'PL1-SEC1-CVD06', name: 'Dual-Wavelength Optical Pyrometer', type: 'TEMPERATURE', unit: '°C', status: 'ERROR', reading: '841.4', calDue: '2026-10-01 (OVERDUE)' },
    { code: 'BP-VAC-06', reactor: 'PL1-SEC1-CVD06', name: 'Baratron Capacitance Manometer', type: 'PRESSURE', unit: 'Torr', status: 'ONLINE', reading: '18.20', calDue: '2026-12-01' },
  ];

  return (
    <PageShell
      section="CONNECTIVITY & EDGE"
      title="Sensor Registry"
      subtitle="Complete hardware inventory of physical CVD sensors, serial calibration tags, and field statuses."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Total Transducers: 24
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Registered Sensors" value="24" unit="Units" subtext="Across 10 reactors" icon={Cpu} sparklineColor="#10b981" />
        <MetricCard label="Online & Verified" value="23" unit="/ 24" subtext="95.8% operational" icon={Activity} sparklineColor="#10b981" />
        <MetricCard label="Calibration Overdue" value="1" unit="Sensor" subtext="TC-PLASM-06 (CVD06)" icon={AlertTriangle} sparklineColor="#f43f5e" />
      </div>

      <Card>
        <CardHeader
          title="TRANSDUCER HARDWARE INVENTORY"
          subtitle="Field sensors mapped to Prisma Sensor model"
          icon={Cpu}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Sensor Tag</th>
                <th className="px-3 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5">Instrument Name</th>
                <th className="px-3 py-2.5">Sensor Type</th>
                <th className="px-3 py-2.5 text-right">Latest Reading</th>
                <th className="px-3 py-2.5 text-right">Calibration Due</th>
                <th className="px-3 py-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {sensors.map((s) => (
                <tr key={s.code} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{s.code}</td>
                  <td className="px-3 py-2.5 text-amber-400/90">{s.reactor}</td>
                  <td className="px-3 py-2.5 text-zinc-300">{s.name}</td>
                  <td className="px-3 py-2.5 text-zinc-400 text-[11px]">{s.type}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-100 font-bold">{s.reading} {s.unit}</td>
                  <td className={`px-3 py-2.5 text-right font-tabular ${s.calDue.includes('OVERDUE') ? 'text-rose-400 font-semibold' : 'text-zinc-400'}`}>
                    {s.calDue}
                  </td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={s.status} size="sm" />
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
