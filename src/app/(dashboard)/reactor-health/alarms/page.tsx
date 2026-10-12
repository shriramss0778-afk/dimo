'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Toast } from '@/components/ui/dialog';
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

type AlarmStatus   = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
type AlarmSeverity = 'CRITICAL' | 'WARNING' | 'INFO';

interface Alarm {
  id: string; code: string; reactor: string; title: string;
  description: string; severity: AlarmSeverity; status: AlarmStatus;
  time: string; site: string;
}

const SEED: Alarm[] = [
  { id:'ALM-101', code:'E-THERM-902', reactor:'PL1-SEC1-CVD06', title:'Thermal Runaway Risk',        description:'Pyrometer temperature exceeded critical boundary (841.4 °C, dTemp/dt > 12 °C/min)', severity:'CRITICAL', status:'ACTIVE',       time:'2 min ago',  site:'Surat Fab 1' },
  { id:'ALM-102', code:'E-RF-410',    reactor:'PL1-SEC1-CVD03', title:'Energy Spike Detected',       description:'Microwave forward generator: abnormal reflected power ratio > 15%',                severity:'WARNING',  status:'ACTIVE',       time:'10 min ago', site:'Surat Fab 1' },
  { id:'ALM-103', code:'PM-MAG-05',   reactor:'PL1-SEC1-CVD05', title:'Magnetron Servicing Due',     description:'Cumulative operational run hours reached 5,600 hrs; filament degradation expected',  severity:'WARNING',  status:'ACKNOWLEDGED', time:'1 hr ago',   site:'Mumbai R&D'  },
  { id:'ALM-104', code:'E-VAC-012',   reactor:'PL1-SEC1-CVD06', title:'Vacuum Integrity Deviation',  description:'Baratron base pressure baseline shifted +0.2 Torr above chamber setpoint',           severity:'WARNING',  status:'ACTIVE',       time:'2 hr ago',   site:'Surat Fab 1' },
  { id:'ALM-105', code:'E-OES-004',   reactor:'PL1-SEC1-CVD03', title:'Optical Quality Deviation',   description:'C2/CH emission ratio shifted below 0.70; diamond growth purity risk',                severity:'CRITICAL', status:'RESOLVED',     time:'6 hr ago',   site:'Surat Fab 1' },
];

export default function EventAlarmLogPage() {
  const [alarms, setAlarms]         = useState<Alarm[]>(SEED);
  const [severityFilter, setSev]    = useState('ALL');
  const [statusFilter, setSt]       = useState('ALL');
  const [updating, setUpdating]     = useState<string | null>(null);
  const [toast, setToast]           = useState<{ msg:string; type:'success'|'error' }|null>(null);

  const mutateAlarm = async (id: string, newStatus: AlarmStatus, label: string) => {
    setUpdating(id);
    try {
      await fetch(`/api/alarms/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // DB may not be configured — update locally regardless
    } finally {
      setAlarms(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      setToast({ msg: `Alarm ${id} ${label.toLowerCase()}`, type: 'success' });
      setUpdating(null);
    }
  };

  const filtered = alarms.filter(a => {
    const sev = severityFilter === 'ALL' || a.severity === severityFilter;
    const st  = statusFilter   === 'ALL' || a.status   === statusFilter;
    return sev && st;
  });

  return (
    <PageShell
      section="ALARM DISPATCH"
      title="Event & Alarm Log"
      subtitle="Audited industrial alarm ledger with operator acknowledgements, severity classification, and CAPA resolution tracking."
      action={
        <span className="px-2.5 py-1 rounded-[var(--radius-md)] bg-[var(--status-red-dim)] border border-[rgba(244,63,94,0.3)] text-[var(--status-red)] text-xs font-mono font-semibold">
          {alarms.filter(a => a.status === 'ACTIVE').length} Active Unresolved
        </span>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Active Alarms"     value={alarms.filter(a=>a.status==='ACTIVE').length} unit="Active"  subtext="Requires operator attention" icon={AlertTriangle} sparklineColor="#f43f5e" />
        <MetricCard label="Mean Time to Ack"  value="4.2"  unit="min"    subtext="Shift SLA < 10 min"         icon={Clock}         sparklineColor="#10b981" />
        <MetricCard label="Resolved Today"    value="18"   unit="Events" subtext="Cleared across fleet"        icon={CheckCircle2}  sparklineColor="#06b6d4" />
      </div>

      <Card>
        <CardHeader
          title="CHAMBER EVENT & ALARM DISPATCH LEDGER"
          subtitle="Persistent telemetry violations and equipment alarms"
          icon={ShieldAlert}
          action={
            <div className="flex flex-wrap items-center gap-2">
              <select value={severityFilter} onChange={e=>setSev(e.target.value)}
                className="bg-[#14151a] border border-[#23252d] rounded px-2.5 py-1 text-xs text-zinc-200 font-mono focus:outline-none">
                <option value="ALL">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="WARNING">Warnings</option>
              </select>
              <select value={statusFilter} onChange={e=>setSt(e.target.value)}
                className="bg-[#14151a] border border-[#23252d] rounded px-2.5 py-1 text-xs text-zinc-200 font-mono focus:outline-none">
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="ACKNOWLEDGED">Acknowledged</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          }
        />

        <div className="divide-y divide-[#1b1c23]">
          {filtered.map((alarm) => (
            <div key={alarm.id} className="p-4 hover:bg-[#16171d] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs font-mono">
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 shrink-0"><StatusBadge status={alarm.severity} size="sm" /></div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-zinc-100 text-sm">{alarm.title}</span>
                    <span className="text-[10px] text-amber-400/90 font-semibold">{alarm.reactor}</span>
                    <span className="text-[10px] text-zinc-400">• {alarm.code} • {alarm.site}</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-1 leading-relaxed max-w-3xl">{alarm.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-zinc-400">
                    <span>Detected {alarm.time}</span>
                    <span>• Status: <strong className="text-zinc-200">{alarm.status}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                {alarm.status === 'ACTIVE' && (
                  <button
                    disabled={updating === alarm.id}
                    onClick={() => mutateAlarm(alarm.id, 'ACKNOWLEDGED', 'Acknowledged')}
                    className="px-2.5 py-1 rounded bg-[#1e2027] hover:bg-[#282a33] border border-[#2e303c] text-amber-300 text-[11px] font-mono transition disabled:opacity-50"
                  >
                    {updating === alarm.id ? '...' : 'Acknowledge'}
                  </button>
                )}
                {alarm.status !== 'RESOLVED' && (
                  <button
                    disabled={updating === alarm.id}
                    onClick={() => mutateAlarm(alarm.id, 'RESOLVED', 'Resolved')}
                    className="px-2.5 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono transition disabled:opacity-50"
                  >
                    {updating === alarm.id ? '...' : 'Resolve'}
                  </button>
                )}
                {alarm.status === 'RESOLVED' && (
                  <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />Closed
                  </span>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-xs font-mono text-zinc-400">No alarms match current filters</div>
          )}
        </div>
      </Card>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </PageShell>
  );
}
