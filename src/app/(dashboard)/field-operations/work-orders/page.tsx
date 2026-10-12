'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Dialog, Field, Input, Select, Textarea, Button, Toast } from '@/components/ui/dialog';
import { Wrench, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

interface WorkOrder {
  number: string;
  title: string;
  reactor: string;
  priority: Priority;
  status: string;
  assignee: string;
  hours: string;
  scheduled: string;
}

const INITIAL_ORDERS: WorkOrder[] = [
  { number: 'WO-2026-0041', title: 'Magnetron Filament Inspection & Cavity Tuning', reactor: 'PL1-SEC1-CVD05', priority: 'HIGH',   status: 'IN_PROGRESS', assignee: 'R. Sharma',    hours: '3.5 hrs', scheduled: '2026-10-12' },
  { number: 'WO-2026-0042', title: 'Quartz Belljar Optical Cleaning & De-sooting',  reactor: 'PL1-SEC1-CVD06', priority: 'URGENT', status: 'OPEN',        assignee: 'A. Patel',    hours: '0.0 hrs', scheduled: '2026-10-12' },
  { number: 'WO-2026-0039', title: 'Turbomolecular Pump Bearing Lubrication',       reactor: 'PL1-SEC1-CVD02', priority: 'MEDIUM', status: 'RESOLVED',    assignee: 'V. Mehta',    hours: '4.0 hrs', scheduled: '2026-10-10' },
  { number: 'WO-2026-0038', title: 'Baratron Capacitance Manometer Zero-Offset',    reactor: 'PL1-SEC1-CVD01', priority: 'LOW',    status: 'CLOSED',      assignee: 'S. Kulkarni', hours: '1.5 hrs', scheduled: '2026-10-09' },
];

export default function WorkOrdersPage() {
  const [orders, setOrders]       = useState<WorkOrder[]>(INITIAL_ORDERS);
  const [dialogOpen, setDialog]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [toast, setToast]         = useState<{ msg: string; type: 'success'|'error' } | null>(null);

  const [form, setForm] = useState({
    title: '', description: '', reactor: 'PL1-SEC1-CVD01',
    priority: 'MEDIUM' as Priority, assignee: '', scheduled: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim())    e.title    = 'Title is required';
    if (!form.reactor.trim())  e.reactor  = 'Reactor is required';
    if (!form.priority)        e.priority = 'Priority is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const res = await fetch('/api/work-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, description: form.description,
          reactorId: form.reactor,  // simulated: serial used as id
          priority:  form.priority,
          assignedTo: form.assignee || null,
          scheduledDate: form.scheduled || null,
        }),
      });

      // If DB not configured, still add optimistically to local state
      const year  = new Date().getFullYear();
      const num   = String(orders.length + 1).padStart(4, '0');
      const newOrder: WorkOrder = {
        number:    `WO-${year}-${num}`,
        title:     form.title,
        reactor:   form.reactor,
        priority:  form.priority,
        status:    'OPEN',
        assignee:  form.assignee || '—',
        hours:     '0.0 hrs',
        scheduled: form.scheduled || '—',
      };
      setOrders((prev) => [newOrder, ...prev]);
      setDialog(false);
      setForm({ title: '', description: '', reactor: 'PL1-SEC1-CVD01', priority: 'MEDIUM', assignee: '', scheduled: '' });
      setErrors({});
      setToast({ msg: `Work order ${newOrder.number} created`, type: 'success' });
    } catch {
      setToast({ msg: 'Failed to create work order', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell
      section="FIELD OPERATIONS"
      title="Work Orders"
      subtitle="Digital maintenance tickets, lifecycle state tracking, parts requisition, and technician assignments."
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <MetricCard label="Total Work Orders"  value={orders.length}                                          unit="Orders" subtext="Current sprint"      icon={Wrench}        sparklineColor="#10b981" />
        <MetricCard label="Active In Progress" value={orders.filter(o => o.status === 'IN_PROGRESS').length}  unit="Order"  subtext="Currently on-site"  icon={Clock}         sparklineColor="#eab308" />
        <MetricCard label="Urgent Priority"    value={orders.filter(o => o.priority === 'URGENT').length}     unit="Order"  subtext="Needs immediate action" icon={AlertTriangle} sparklineColor="#f43f5e" />
        <MetricCard label="Closed / Resolved"  value={orders.filter(o => ['CLOSED','RESOLVED'].includes(o.status)).length} unit="Orders" subtext="Verified by QA" icon={CheckCircle2} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader title="FIELD WORK ORDERS • AUDITED LOG" subtitle="Direct link to physical reactor serials and failure logs" icon={Wrench} />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Ticket #</th>
                <th className="px-3 py-2.5">Task Description</th>
                <th className="px-3 py-2.5">Target Unit</th>
                <th className="px-3 py-2.5">Priority</th>
                <th className="px-3 py-2.5">Technician</th>
                <th className="px-3 py-2.5 text-right">Scheduled</th>
                <th className="px-3 py-2.5 text-right">Labor Hours</th>
                <th className="px-3 py-2.5 text-right">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {orders.map((o) => (
                <tr key={o.number} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{o.number}</td>
                  <td className="px-3 py-2.5 text-zinc-200 max-w-[240px] truncate">{o.title}</td>
                  <td className="px-3 py-2.5 text-amber-400/90">{o.reactor}</td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">{o.priority}</span>
                  </td>
                  <td className="px-3 py-2.5 text-zinc-300">{o.assignee}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-400">{o.scheduled}</td>
                  <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{o.hours}</td>
                  <td className="px-3 py-2.5 text-right"><StatusBadge status={o.status} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Create Work Order Dialog ── */}
      <Dialog open={dialogOpen} onClose={() => { setDialog(false); setErrors({}); }} title="Create Work Order" description="New field maintenance ticket for a CVD reactor unit">
        <div className="space-y-4">
          <Field label="Task Title" required error={errors.title}>
            <Input placeholder="e.g. Magnetron filament inspection" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          </Field>
          <Field label="Description">
            <Textarea rows={3} placeholder="Describe the maintenance task..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Target Reactor" required error={errors.reactor}>
              <Select value={form.reactor} onChange={e => setForm(p => ({ ...p, reactor: e.target.value }))}>
                {['PL1-SEC1-CVD01','PL1-SEC1-CVD02','PL1-SEC1-CVD03','PL1-SEC1-CVD04',
                  'PL1-SEC1-CVD05','PL1-SEC1-CVD06','PL1-SEC1-CVD07','PL1-SEC1-CVD08',
                  'PL1-SEC1-CVD09','PL1-SEC1-CVD10'].map(r => <option key={r} value={r}>{r}</option>)}
              </Select>
            </Field>
            <Field label="Priority" required error={errors.priority}>
              <Select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value as Priority }))}>
                {(['LOW','MEDIUM','HIGH','URGENT'] as Priority[]).map(p => <option key={p} value={p}>{p}</option>)}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Assign To">
              <Input placeholder="e.g. R. Sharma" value={form.assignee} onChange={e => setForm(p => ({ ...p, assignee: e.target.value }))} />
            </Field>
            <Field label="Scheduled Date">
              <Input type="date" value={form.scheduled} onChange={e => setForm(p => ({ ...p, scheduled: e.target.value }))} />
            </Field>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => { setDialog(false); setErrors({}); }}>Cancel</Button>
            <Button loading={saving} onClick={handleCreate}>Create Work Order</Button>
          </div>
        </div>
      </Dialog>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </PageShell>
  );
}
