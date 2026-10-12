'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Search, ShieldAlert, Cpu, GitBranch, ArrowRight } from 'lucide-react';

export default function RootCauseInvestigationPage() {
  const causes = [
    {
      incidentId: 'INC-2026-088',
      reactor: 'PL1-SEC1-CVD06',
      title: 'Plasma Uncoupling during High Methane Phase',
      eventTime: 'Today 10:44 IST',
      trigger: 'E-THERM-902 & Reflected RF > 14%',
      primaryHypothesis: 'Impedance mismatch driven by soot deposition on quartz viewport',
      confidence: '94.2%',
      factors: ['Quartz wall optical transmission dropped to 72%', 'Reflected power spiked 0.74 kW → 4.2 kW', 'Baratron vacuum shifted +0.2 Torr'],
    },
    {
      incidentId: 'INC-2026-081',
      reactor: 'PL1-SEC1-CVD01',
      title: 'Growth Rate Suppression (-18%)',
      eventTime: 'Yesterday 16:20 IST',
      trigger: 'C2 / CH optical emission ratio drop',
      primaryHypothesis: 'Mass Flow Controller calibration drift resulting in sub-stoichiometric methane feed',
      confidence: '89.6%',
      factors: ['MFC-CH4-01 line pressure unstable', 'Pyrometer color ratio shifted blue', 'Substrate temperature +12 °C over normal'],
    },
  ];

  return (
    <PageShell
      section="REACTOR HEALTH"
      title="Root Cause Investigation"
      subtitle="Multi-parameter synchronized fault drill-down, telemetry correlation, and causal tree diagnosis."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Inference Engine: Causal DAG
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="space-y-4">
        {causes.map((c) => (
          <Card key={c.incidentId}>
            <CardHeader
              title={`${c.incidentId} • ${c.title}`}
              badge={<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/25">{c.reactor}</span>}
              icon={GitBranch}
              action={
                <span className="text-xs font-mono text-zinc-400">
                  Confidence: <strong className="text-emerald-400">{c.confidence}</strong>
                </span>
              }
            />
            <CardBody className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-[#14151a] border border-[#23252d] rounded">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Triggering Alarm Signature</span>
                  <p className="text-rose-300 font-semibold">{c.trigger}</p>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Occurred at {c.eventTime}</span>
                </div>

                <div className="p-3 bg-[#14151a] border border-[#23252d] rounded">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Evaluated Root Cause</span>
                  <p className="text-zinc-200 leading-relaxed">{c.primaryHypothesis}</p>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1.5">Correlated Sensor Evidence</span>
                <ul className="space-y-1 text-zinc-300">
                  {c.factors.map((f, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
