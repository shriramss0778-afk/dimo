'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { CheckCircle2, RefreshCw, AlertTriangle, FileCheck } from 'lucide-react';

export default function CalibrationManagementPage() {
  const calibrations = [
    { sensor: 'BP-VAC-02', name: 'Baratron Capacitance Manometer', reactor: 'PL1-SEC1-CVD03', calibratedAt: '2026-09-15', technician: 'S. Kulkarni', standard: 'MKS NIST Transfer Standard', pre: 18.35, post: 18.20, passed: true },
    { sensor: 'TC-PLASM-01', name: 'Optical Dual-Wavelength Pyrometer', reactor: 'PL1-SEC1-CVD03', calibratedAt: '2026-08-20', technician: 'R. Sharma', standard: 'Mikron Blackbody Cavity M390', pre: 854.2, post: 848.0, passed: true },
    { sensor: 'MFC-CH4-01', name: 'Methane Thermal Mass Flow Controller', reactor: 'PL1-SEC1-CVD03', calibratedAt: '2026-09-01', technician: 'A. Patel', standard: 'DryCal Primary Piston Prover', pre: 15.12, post: 14.80, passed: true },
    { sensor: 'TC-PLASM-06', name: 'Optical Pyrometer (CVD06)', reactor: 'PL1-SEC1-CVD06', calibratedAt: '2026-04-10', technician: 'V. Mehta', standard: 'Mikron Blackbody M390', pre: 835.0, post: 841.4, passed: false },
  ];

  return (
    <PageShell
      section="CONNECTIVITY & EDGE"
      title="Calibration Management"
      subtitle="NIST-traceable sensor calibrations, zero-drift adjustments, standard references, and compliance logs."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Audit Standard: ISO 17025
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Calibrated Transducers" value="23 / 24" unit="Pass" subtext="95.8% In Compliance" icon={CheckCircle2} sparklineColor="#10b981" />
        <MetricCard label="Overdue Calibration" value="1" unit="Sensor" subtext="TC-PLASM-06" icon={AlertTriangle} sparklineColor="#f43f5e" />
        <MetricCard label="Calibration Cycle" value="90" unit="Days" subtext="Recalibration period" icon={RefreshCw} sparklineColor="#06b6d4" />
      </div>

      <Card>
        <CardHeader
          title="TRANSDUCER CALIBRATION CERTIFICATES & DRIFT LOGS"
          subtitle="Pre-calibration vs. post-calibration readings with certified reference standards"
          icon={FileCheck}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Sensor Tag</th>
                <th className="px-3 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5">Calibration Date</th>
                <th className="px-3 py-2.5">Standard Used</th>
                <th className="px-3 py-2.5 text-right">Pre-Cal Reading</th>
                <th className="px-3 py-2.5 text-right">Post-Cal Reading</th>
                <th className="px-3 py-2.5 text-right">Technician</th>
                <th className="px-3 py-2.5 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {calibrations.map((c) => (
                <tr key={c.sensor} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{c.sensor}</td>
                  <td className="px-3 py-2.5 text-amber-400/90">{c.reactor}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{c.calibratedAt}</td>
                  <td className="px-3 py-2.5 text-zinc-300">{c.standard}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{c.pre.toFixed(2)}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-amber-300 font-bold">{c.post.toFixed(2)}</td>
                  <td className="px-3 py-2.5 text-right text-zinc-300">{c.technician}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusBadge status={c.passed ? 'PASSED' : 'FAILED'} size="sm" />
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
