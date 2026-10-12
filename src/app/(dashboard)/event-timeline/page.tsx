'use client';

import React from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Clock, ShieldAlert, Cpu, Wrench, Activity } from 'lucide-react';

export default function EventTimelinePage() {
  const events = [
    { id: 'EV-01', time: '10:44:12 IST', reactor: 'PL1-SEC1-CVD06', category: 'ALARM', title: 'Thermal Gradient Boundary Trip', details: 'Core plasma pyrometer registered 841.4 °C with rapid derivative spike > 12 °C/min.', user: 'SYSTEM (AIoT Edge)', severity: 'CRITICAL' },
    { id: 'EV-02', time: '10:38:00 IST', reactor: 'PL1-SEC1-CVD03', category: 'CONTROL', title: 'Automated RF Power Decrement', details: 'Power setpoint adjusted from 31.4 kW → 31.2 kW to preserve microwave cavity life.', user: 'OPTIMIZER (Auto)', severity: 'INFO' },
    { id: 'EV-03', time: '10:15:30 IST', reactor: 'PL1-SEC1-CVD05', category: 'MAINTENANCE', title: 'Technician Check-In: Cathode Overhaul', details: 'Work order WO-2026-0041 transitioned to IN_PROGRESS by Lead Technician R. Sharma.', user: 'R. Sharma (Tech)', severity: 'WARNING' },
    { id: 'EV-04', time: '09:50:00 IST', reactor: 'PL1-SEC1-CVD01', category: 'CALIBRATION', title: 'Baratron Zero Offset Calibrated', details: 'Capacitance manometer baseline zeroed at base vacuum 2.1e-4 Torr.', user: 'S. Kulkarni (Eng)', severity: 'INFO' },
    { id: 'EV-05', time: '09:00:15 IST', reactor: 'FLEET', category: 'SYSTEM', title: 'Morning Shift Telemetry Health Check', details: 'Edge gateways Surat-01, Surat-02, Navsari-01, Mumbai-01 verified and streaming at 142 Hz.', user: 'SYSTEM', severity: 'INFO' },
  ];

  return (
    <PageShell
      section="OPERATIONS OVERVIEW"
      title="Event Timeline"
      subtitle="Audited chronological sequence of equipment state transitions, operator setpoint changes, and automated alarms."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#14151a] border border-[#23252d] text-zinc-300">
            Real-Time Audit Feed
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Events Logged (24h)" value="142" unit="Logs" subtext="Immutable stream" sparklineColor="#10b981" />
        <MetricCard label="Operator Actions" value="28" unit="Overrides" subtext="Audited setpoints" sparklineColor="#eab308" />
        <MetricCard label="Automated Trips" value="6" unit="Events" subtext="Protection tripped" sparklineColor="#f43f5e" />
      </div>

      <Card>
        <CardHeader
          title="CHRONOLOGICAL OPERATIONS LEDGER"
          subtitle="Events timestamped with millisecond precision"
          icon={Clock}
        />
        <div className="divide-y divide-[#1b1c23]">
          {events.map((ev) => (
            <div key={ev.id} className="p-4 hover:bg-[#16171d] transition-colors flex items-start space-x-3.5 font-mono text-xs">
              <div className="pt-0.5 shrink-0">
                <StatusBadge status={ev.severity} size="sm" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-zinc-100 text-sm">{ev.title}</span>
                  <span className="text-[10px] text-amber-400 font-semibold">{ev.reactor}</span>
                  <span className="text-[10px] text-zinc-400">• {ev.time}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                    {ev.category}
                  </span>
                </div>
                <p className="text-zinc-400 text-[11px] mt-1 leading-relaxed">{ev.details}</p>
                <div className="mt-2 text-[10px] text-zinc-400">
                  <span>Recorded by: <strong className="text-zinc-300">{ev.user}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
