'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { ShieldAlert, AlertTriangle, Cpu, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FaultDetectionPage() {
  const anomalies = [
    {
      id: 'ANOM-01',
      reactor: 'PL1-SEC1-CVD06',
      title: 'Plasma Thermal Non-Linearity',
      confidence: '98.4%',
      risk: 'HIGH',
      rootCause: 'Impedance mismatch in automatic E-H tuner or quartz window soot accumulation',
      action: 'Trigger automatic power backoff from 30.4 kW → 28.0 kW; schedule window inspection',
      time: '3 min ago',
    },
    {
      id: 'ANOM-02',
      reactor: 'PL1-SEC1-CVD03',
      title: 'Cavity RF Standing Wave Ratio (VSWR) Drift',
      confidence: '92.1%',
      risk: 'MEDIUM',
      rootCause: 'Substrate holder thermal expansion altering cavity resonance frequency',
      action: 'Retune magnetron manual stub tuner or compensate substrate Z-axis height by -0.5 mm',
      time: '12 min ago',
    },
    {
      id: 'ANOM-03',
      reactor: 'PL1-SEC1-CVD01',
      title: 'MFC Methane Micro-Pulsing',
      confidence: '86.7%',
      risk: 'LOW',
      rootCause: 'Mass flow controller upstream line pressure regulator jitter (± 0.4 bar)',
      action: 'Inspect supply manifold gas booster stage',
      time: '45 min ago',
    },
  ];

  return (
    <PageShell
      section="REACTOR HEALTH"
      title="Fault Detection"
      subtitle="Multi-parameter heuristic anomaly classification and early plasma instability prediction."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
            Real-Time Heuristic Stream
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard
          label="Active Classified Faults"
          value="3"
          unit="Active"
          subtext="2 High/Medium Risk"
          icon={AlertTriangle}
          sparklineColor="#f43f5e"
        />
        <MetricCard
          label="Anomaly Classifier Accuracy"
          value="96.8"
          unit="%"
          subtext="Model version v3.1"
          icon={Sparkles}
          sparklineColor="#10b981"
        />
        <MetricCard
          label="Mean Lead Time to Trip"
          value="18.5"
          unit="min"
          subtext="Early warning prevention"
          icon={TrendingUp}
          sparklineColor="#06b6d4"
        />
      </div>

      <div className="space-y-4">
        {anomalies.map((anom) => (
          <Card key={anom.id} glow={anom.risk === 'HIGH'}>
            <CardHeader
              title={`${anom.title} • ${anom.reactor}`}
              badge={
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold ${
                    anom.risk === 'HIGH'
                      ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                      : anom.risk === 'MEDIUM'
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  RISK: {anom.risk}
                </span>
              }
              action={
                <span className="text-[11px] font-mono text-zinc-400">
                  Confidence: <strong className="text-emerald-400">{anom.confidence}</strong>
                </span>
              }
              icon={ShieldAlert}
            />
            <CardBody className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-[#14151a] border border-[#23252d] rounded">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                    Probable Physical Root Cause
                  </span>
                  <p className="text-zinc-200 leading-relaxed">{anom.rootCause}</p>
                </div>

                <div className="p-3 bg-[#14151a] border border-[#23252d] rounded">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                    Recommended Remediation Action
                  </span>
                  <p className="text-amber-300/90 leading-relaxed">{anom.action}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1b1c23]">
                <span className="text-[11px] text-zinc-400">Detected: {anom.time}</span>
                <Link
                  href="/reactor-health/root-cause"
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-[#181920] hover:bg-[#22242c] border border-[#2b2d37] text-zinc-200 text-xs transition"
                >
                  <span>Investigate Root Cause</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
