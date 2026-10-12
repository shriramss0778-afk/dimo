'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { History, Wrench, CheckCircle2, User } from 'lucide-react';

export default function ServiceHistoryPage() {
  const serviceLogs = [
    { id: 'SRV-804', reactor: 'PL1-SEC1-CVD02', date: '2026-10-10', type: 'PREVENTATIVE', hoursAtService: 3120, technician: 'V. Mehta', summary: 'Replaced turbo pump bearings and regenerated vacuum sorption trap.', partsReplaced: 'TURBO-BEAR-V301, V-SEAL-02' },
    { id: 'SRV-798', reactor: 'PL1-SEC1-CVD01', date: '2026-10-09', type: 'CALIBRATION', hoursAtService: 2840, technician: 'S. Kulkarni', summary: 'Zero drift calibration on Baratron capacitance manometer; leak rate < 1e-9 mbar l/s verified.', partsReplaced: 'None' },
    { id: 'SRV-785', reactor: 'PL1-SEC1-CVD08', date: '2026-09-28', type: 'OVERHAUL', hoursAtService: 2200, technician: 'R. Sharma', summary: 'Complete chamber strip-down, acid wash of quartz belljar, and RF coupler retune.', partsReplaced: 'QZ-DOME-45L, SEAL-FFKM-DN250' },
    { id: 'SRV-762', reactor: 'PL1-SEC1-CVD04', date: '2026-09-14', type: 'CORRECTIVE', hoursAtService: 4100, technician: 'A. Patel', summary: 'MFC Methane valve body rebuild following flow hunting anomaly.', partsReplaced: 'MFC-SEAL-KIT' },
  ];

  return (
    <PageShell
      section="FIELD OPERATIONS"
      title="Service History"
      subtitle="Complete chronological equipment service records indexed by reactor serial numbers."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Total Overhauls: 124
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Lifetime Servicing Events" value="124" unit="Records" subtext="All 10 reactors" icon={History} sparklineColor="#10b981" />
        <MetricCard label="Mean Service Interval" value="480" unit="hrs" subtext="Target 500h cycle" icon={Wrench} sparklineColor="#06b6d4" />
        <MetricCard label="Certified Technicians" value="6" unit="Engineers" subtext="Surat, Navsari, Mumbai" icon={User} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader
          title="HISTORICAL EQUIPMENT SERVICING LEDGER"
          subtitle="All mechanical interventions, component replacements, and post-service verifications"
          icon={History}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Service Log #</th>
                <th className="px-3 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5">Date Completed</th>
                <th className="px-3 py-2.5">Intervention Type</th>
                <th className="px-3 py-2.5 text-right">Chamber Hours</th>
                <th className="px-3 py-2.5">Lead Technician</th>
                <th className="px-3 py-2.5">Parts Replaced</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {serviceLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{log.id}</td>
                  <td className="px-3 py-2.5 text-amber-400/90">{log.reactor}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{log.date}</td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      {log.type}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{log.hoursAtService} hrs</td>
                  <td className="px-3 py-2.5 text-zinc-300">{log.technician}</td>
                  <td className="px-3 py-2.5 text-zinc-400 text-[11px]">{log.partsReplaced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
