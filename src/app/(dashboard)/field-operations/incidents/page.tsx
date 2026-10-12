'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { AlertOctagon, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function IncidentInvestigationPage() {
  const incidents = [
    { id: 'INC-2026-088', reactor: 'PL1-SEC1-CVD06', title: 'High Reflected Power Trip (> 14%)', date: '2026-10-12', capaStatus: 'OPEN', rootCause: 'Quartz belljar soot buildup causing severe impedance mismatch.', capaAction: 'Procure replacement quartz dome; retune manual 3-stub waveguide tuner.' },
    { id: 'INC-2026-079', reactor: 'PL1-SEC1-CVD05', title: 'Intermittent Plasma Quench at 10.2 kW', date: '2026-10-04', capaStatus: 'IN_PROGRESS', rootCause: 'Magnetron power supply capacitor bank ripple current exceeding ripple tolerance.', capaAction: 'Replace 2x 450V electrolytic filter caps in high-voltage supply.' },
    { id: 'INC-2026-062', reactor: 'PL1-SEC1-CVD01', title: 'Vacuum Chamber Seal Micro-Leak', date: '2026-09-22', capaStatus: 'RESOLVED', rootCause: 'Viton gasket compression set after 3,000 thermal cycles.', capaAction: 'Replaced with FFKM high-temperature perfluoroelastomer seal.' },
  ];

  return (
    <PageShell
      section="FIELD OPERATIONS"
      title="Incident Investigation"
      subtitle="Corrective and Preventive Action (CAPA) tracking, failure investigation reports, and root cause mitigation."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Audit Standard: ISO 9001 CAPA
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Open Incidents" value="1" unit="Active" subtext="INC-2026-088" icon={AlertOctagon} sparklineColor="#f43f5e" />
        <MetricCard label="CAPA Closure Rate" value="94.4" unit="%" subtext="Within 14d SLA" icon={ShieldAlert} sparklineColor="#10b981" />
        <MetricCard label="Recurring Failures" value="0" unit="Zero" subtext="No duplicate trips" icon={CheckCircle2} sparklineColor="#10b981" />
      </div>

      <div className="space-y-4">
        {incidents.map((inc) => (
          <Card key={inc.id}>
            <CardHeader
              title={`${inc.id} • ${inc.title}`}
              badge={<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-300">{inc.reactor}</span>}
              action={<StatusBadge status={inc.capaStatus} size="sm" />}
              icon={FileText}
            />
            <CardBody className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-[#14151a] border border-[#23252d] rounded">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Determined Failure Mode</span>
                  <p className="text-zinc-200 leading-relaxed">{inc.rootCause}</p>
                </div>

                <div className="p-3 bg-[#14151a] border border-[#23252d] rounded">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Corrective & Preventive Action (CAPA)</span>
                  <p className="text-amber-300/90 leading-relaxed">{inc.capaAction}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-between text-[11px] text-zinc-400 border-t border-[#1b1c23]">
                <span>Incident Date: {inc.date}</span>
                <span>Audit Status: <strong className="text-zinc-200">{inc.capaStatus}</strong></span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
