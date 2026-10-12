'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Calendar, Clock, CheckCircle2, Wrench } from 'lucide-react';

export default function MaintenanceSchedulingPage() {
  const schedules = [
    { reactor: 'PL1-SEC1-CVD05', task: 'Magnetron Microwave Cathode Replacement', date: '2026-10-15', duration: '6.0 hrs', type: 'CORRECTIVE', team: 'Microwave Specialists' },
    { reactor: 'PL1-SEC1-CVD06', task: 'Chamber De-sooting & Pyrometer Window Etching', date: '2026-10-14', duration: '3.5 hrs', type: 'PREVENTIVE', team: 'Vacuum Operations' },
    { reactor: 'PL1-SEC1-CVD03', task: '500-Hour Harvest & Seed Carrier Exchange', date: '2026-10-18', duration: '2.0 hrs', type: 'HARVEST', team: 'Synthesis Team A' },
    { reactor: 'PL1-SEC1-CVD01', task: 'Baratron Calibration & Seal Greasing', date: '2026-10-22', duration: '1.5 hrs', type: 'PREVENTIVE', team: 'Metrology Lab' },
    { reactor: 'PL1-SEC1-CVD08', task: 'Substrate Carrier Level Verification', date: '2026-10-25', duration: '1.0 hr', type: 'INSPECTION', team: 'Mechanical Field Eng' },
  ];

  return (
    <PageShell
      section="FIELD OPERATIONS"
      title="Maintenance Scheduling"
      subtitle="Synchronized preventative overhauls, diamond harvest cycles, and technician dispatch calendar."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Next Shutdown: Oct 14 (CVD06)
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Upcoming Interventions" value="5" unit="Events" subtext="Next 14 Days" icon={Calendar} sparklineColor="#10b981" />
        <MetricCard label="Scheduled Downtime" value="14.0" unit="hrs" subtext="Fleet aggregated" icon={Clock} sparklineColor="#eab308" />
        <MetricCard label="Harvest Cycle Sync" value="100" unit="%" subtext="Aligned with growth" icon={CheckCircle2} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader
          title="DISPATCH CALENDAR & SCHEDULED INTERVENTIONS"
          subtitle="Preventative actions timed between synthesis growth cycles"
          icon={Calendar}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Scheduled Date</th>
                <th className="px-3 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5">Task Description</th>
                <th className="px-3 py-2.5">Category</th>
                <th className="px-3 py-2.5 text-right">Estimated Duration</th>
                <th className="px-3 py-2.5 text-right">Field Team</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {schedules.map((s, idx) => (
                <tr key={idx} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{s.date}</td>
                  <td className="px-3 py-2.5 text-amber-400/90">{s.reactor}</td>
                  <td className="px-3 py-2.5 text-zinc-200">{s.task}</td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {s.type}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{s.duration}</td>
                  <td className="px-3 py-2.5 text-right text-zinc-400">{s.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
