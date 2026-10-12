'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { ShieldAlert, AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-react';

export default function FailureRiskAssessmentPage() {
  const risks = [
    { reactor: 'PL1-SEC1-CVD06', riskScore: 84.5, level: 'CRITICAL', primaryHazard: 'Thermal Runaway & Substrate Delamination', probability: '18.4% in next 24h', mitigation: 'Power backoff & manual optical pyrometer recalibration' },
    { reactor: 'PL1-SEC1-CVD05', riskScore: 68.2, level: 'WARNING', primaryHazard: 'Magnetron Filament Open-Circuit Breakdown', probability: '8.2% in next 48h', mitigation: 'Schedule cathode replacement before next 100h run' },
    { reactor: 'PL1-SEC1-CVD01', riskScore: 42.0, level: 'WARNING', primaryHazard: 'Gas Mixture Fluctuation & Dark Growth Rings', probability: '3.1% in next 24h', mitigation: 'Inspect upstream methane mass flow controller' },
    { reactor: 'PL1-SEC1-CVD03', riskScore: 12.4, level: 'OPTIMAL', primaryHazard: 'Nominal Operational State', probability: '< 0.5%', mitigation: 'Continue automated plasma closed-loop regulation' },
    { reactor: 'PL1-SEC1-CVD08', riskScore: 8.9, level: 'OPTIMAL', primaryHazard: 'Nominal Operational State', probability: '< 0.5%', mitigation: 'Standard preventative schedule' },
  ];

  return (
    <PageShell
      section="REACTOR HEALTH"
      title="Failure Risk Assessment"
      subtitle="Probabilistic failure forecasting, hazard scoring, and preventative risk rankings across the CVD fleet."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Model: Weibull Reliability Curve
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Mean Fleet Risk Score" value="28.4" unit="/ 100" subtext="Fleet Average Risk" icon={ShieldCheck} sparklineColor="#10b981" />
        <MetricCard label="High Hazard Units" value="1" unit="Reactor" subtext="PL1-SEC1-CVD06" icon={AlertTriangle} sparklineColor="#f43f5e" />
        <MetricCard label="Forecast Horizon" value="48" unit="Hours" subtext="Predictive lookahead" icon={TrendingUp} sparklineColor="#06b6d4" />
      </div>

      <Card>
        <CardHeader
          title="PROBABILISTIC FAILURE RISK RANKINGS"
          subtitle="Bayesian failure model calculated from sensor jitter and historical degradation"
          icon={ShieldAlert}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Reactor Unit</th>
                <th className="px-3 py-2.5 text-right">Risk Score</th>
                <th className="px-3 py-2.5">Risk Level</th>
                <th className="px-3 py-2.5">Primary Physical Hazard</th>
                <th className="px-3 py-2.5 text-right">Failure Probability</th>
                <th className="px-3 py-2.5">Remediation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {risks.map((r) => (
                <tr key={r.reactor} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{r.reactor}</td>
                  <td className="px-3.5 py-2.5 text-right font-tabular text-amber-300 font-bold">{r.riskScore.toFixed(1)}</td>
                  <td className="px-3.5 py-2.5">
                    <StatusBadge status={r.level} size="sm" />
                  </td>
                  <td className="px-3.5 py-2.5 text-zinc-300">{r.primaryHazard}</td>
                  <td className="px-3.5 py-2.5 text-right font-tabular text-zinc-200">{r.probability}</td>
                  <td className="px-3.5 py-2.5 text-zinc-400 text-[11px] max-w-sm">{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
