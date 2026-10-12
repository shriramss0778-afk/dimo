'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { ClipboardCheck, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TechnicianInspectionsPage() {
  const inspections = [
    { id: 'INSP-402', reactor: 'PL1-SEC1-CVD03', inspector: 'R. Sharma', checkDate: '2026-10-11', vacuumSeal: true, waveguide: true, coolingFlow: true, stageTilt: true, gasLines: true, overallPass: true, notes: 'Stage tilt < 0.02°. All vacuum seals greased with Krytox.' },
    { id: 'INSP-401', reactor: 'PL1-SEC1-CVD06', inspector: 'A. Patel', checkDate: '2026-10-10', vacuumSeal: false, waveguide: true, coolingFlow: true, stageTilt: false, gasLines: true, overallPass: false, notes: 'Vacuum seal degradation on door flange. Stage tilt deviation 0.08°.' },
    { id: 'INSP-399', reactor: 'PL1-SEC1-CVD02', inspector: 'V. Mehta', checkDate: '2026-10-09', vacuumSeal: true, waveguide: true, coolingFlow: true, stageTilt: true, gasLines: true, overallPass: true, notes: 'All checklist items verified. Ready for 200h run.' },
    { id: 'INSP-398', reactor: 'PL1-SEC1-CVD08', inspector: 'S. Kulkarni', checkDate: '2026-10-08', vacuumSeal: true, waveguide: true, coolingFlow: true, stageTilt: true, gasLines: true, overallPass: true, notes: 'Cooling manifold descaled; flow verified at 4.9 L/min.' },
  ];

  return (
    <PageShell
      section="FIELD OPERATIONS"
      title="Technician Inspections"
      subtitle="Standardized digital quality assurance checklists: Vacuum seal integrity, waveguide tilt, and gas lines."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Pass Rate: 75%
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Inspections (This Month)" value="38" unit="Audits" subtext="Fleet-wide QA" icon={ClipboardCheck} sparklineColor="#10b981" />
        <MetricCard label="First-Time Pass Rate" value="92.1" unit="%" subtext="Target ≥ 90%" icon={ShieldCheck} sparklineColor="#10b981" />
        <MetricCard label="Failed Checks" value="1" unit="Reactor" subtext="PL1-SEC1-CVD06" icon={AlertTriangle} sparklineColor="#f43f5e" />
      </div>

      <Card>
        <CardHeader
          title="FIELD TECHNICIAN INSPECTION CHECKLIST AUDITS"
          subtitle="Point-by-point verification logged to Prisma Inspection schema"
          icon={ClipboardCheck}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Audit ID</th>
                <th className="px-3 py-2.5">Target Unit</th>
                <th className="px-3 py-2.5">Inspector</th>
                <th className="px-3 py-2.5">Date</th>
                <th className="px-3 py-2.5 text-center">Vacuum Seal</th>
                <th className="px-3 py-2.5 text-center">Waveguide</th>
                <th className="px-3 py-2.5 text-center">Stage Level</th>
                <th className="px-3 py-2.5 text-center">Cooling Flow</th>
                <th className="px-3 py-2.5 text-right">Overall Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {inspections.map((insp) => (
                <tr key={insp.id} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{insp.id}</td>
                  <td className="px-3 py-2.5 text-amber-400/90">{insp.reactor}</td>
                  <td className="px-3 py-2.5 text-zinc-300">{insp.inspector}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{insp.checkDate}</td>
                  <td className="px-3 py-2.5 text-center">{insp.vacuumSeal ? '✓' : '✗'}</td>
                  <td className="px-3 py-2.5 text-center">{insp.waveguide ? '✓' : '✗'}</td>
                  <td className="px-3 py-2.5 text-center">{insp.stageTilt ? '✓' : '✗'}</td>
                  <td className="px-3 py-2.5 text-center">{insp.coolingFlow ? '✓' : '✗'}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={insp.overallPass ? 'PASSED' : 'FAILED'} size="sm" />
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
