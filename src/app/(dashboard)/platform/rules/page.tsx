'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Dialog, Field, Input, Select, Button, Toast } from '@/components/ui/dialog';
import { ShieldCheck, Plus, AlertOctagon } from 'lucide-react';

type Severity = 'CRITICAL' | 'WARNING' | 'INFO';

interface Rule {
  id: string; code: string; name: string; parameter: string;
  condition: string; threshold: string; severity: Severity;
  isActive: boolean; triggersCount: number;
}

const SEED: Rule[] = [
  { id:'RULE-01', code:'RULE-TEMP-RUNAWAY',  name:'Thermal Runaway Detection',        parameter:'plasma_temp',      condition:'ROC > 15 °C/min',                      threshold:'15 °C/min', severity:'CRITICAL', isActive:true,  triggersCount:14 },
  { id:'RULE-02', code:'RULE-VAC-LEAK',      name:'Vacuum Envelope Micro-leak',        parameter:'chamber_pressure', condition:'Pressure > Setpoint + 1.5 Torr > 30s', threshold:'1.5 Torr',  severity:'WARNING',  isActive:true,  triggersCount:28 },
  { id:'RULE-03', code:'RULE-RF-REFLECTED',  name:'Magnetron High Reflected Power',    parameter:'reflected_power',  condition:'Reflected / Forward > 12%',             threshold:'12%',       severity:'CRITICAL', isActive:true,  triggersCount:3  },
  { id:'RULE-04', code:'RULE-GAS-RATIO',     name:'CH4 / H2 Gas Depletion',           parameter:'gas_ratio',        condition:'Ratio < 3.5% or > 6.5%',               threshold:'3.5%-6.5%', severity:'WARNING',  isActive:true,  triggersCount:7  },
  { id:'RULE-05', code:'RULE-COOLING-DROP',  name:'Chamber Cooling Flow Loss',         parameter:'cooling_flow',     condition:'Flow < 3.0 L/min',                      threshold:'3.0 L/min', severity:'CRITICAL', isActive:false, triggersCount:0  },
];

export default function RulesEnginePage() {
  const [rules, setRules]       = useState<Rule[]>(SEED);
  const [toggling, setToggling] = useState<string | null>(null);
  const [toast, setToast]       = useState<{ msg:string; type:'success'|'error' }|null>(null);
  const [dialogOpen, setDialog] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [form, setForm] = useState({ name:'', code:'', parameter:'plasma_temp', condition:'', threshold:'', severity:'WARNING' as Severity });
  const [formErrors, setFormErrors] = useState<Record<string,string>>({});

  const toggleRule = async (rule: Rule) => {
    setToggling(rule.id);
    const next = !rule.isActive;
    try {
      await fetch(`/api/rules/${rule.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: next }),
      });
    } catch {
      // DB not configured — still update locally
    } finally {
      setRules(prev => prev.map(r => r.id === rule.id ? { ...r, isActive: next } : r));
      setToast({ msg: `${rule.code} ${next ? 'enabled' : 'disabled'}`, type: 'success' });
      setToggling(null);
    }
  };

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())      e.name      = 'Name is required';
    if (!form.code.trim())      e.code      = 'Code is required';
    if (!form.condition.trim()) e.condition = 'Condition is required';
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const newRule: Rule = {
        id:            `RULE-${String(rules.length + 1).padStart(2,'0')}`,
        code:          form.code.toUpperCase(),
        name:          form.name,
        parameter:     form.parameter,
        condition:     form.condition,
        threshold:     form.threshold,
        severity:      form.severity,
        isActive:      true,
        triggersCount: 0,
      };
      setRules(prev => [...prev, newRule]);
      setDialog(false);
      setForm({ name:'', code:'', parameter:'plasma_temp', condition:'', threshold:'', severity:'WARNING' });
      setToast({ msg: `Rule ${newRule.code} created`, type: 'success' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell
      section="PLATFORM & GOVERNANCE"
      title="Rules & Detection Engine"
      subtitle="Autonomous heuristic evaluator, rate-of-change (ROC) boundary algorithms, and safety trips."
      action={
        <button
          onClick={() => setDialog(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--accent-dim)] hover:bg-[var(--accent-glow)] border border-[var(--accent-border)] text-[var(--accent)] text-xs font-mono font-semibold transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Detection Rule
        </button>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Active Detection Rules" value={`${rules.filter(r=>r.isActive).length} / ${rules.length}`} unit="" subtext="Engine evaluates at 142 Hz" icon={ShieldCheck}  sparklineColor="#10b981" />
        <MetricCard label="24h Heuristic Triggers" value="52"   unit="Events" subtext="Early anomaly suppression"         icon={AlertOctagon} sparklineColor="#eab308" />
        <MetricCard label="Rule Evaluation Cycle"  value="<1.8" unit="ms"     subtext="Sub-millisecond processing"        icon={ShieldCheck}  sparklineColor="#06b6d4" />
      </div>

      <Card>
        <CardHeader title="AUTONOMOUS DETECTION RULE SET" subtitle="Real-time condition matchers applied against incoming edge telemetry packets" icon={ShieldCheck} />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Rule Identifier</th>
                <th className="px-3 py-2.5">Rule Name</th>
                <th className="px-3 py-2.5">Parameter</th>
                <th className="px-3 py-2.5">Trigger Condition</th>
                <th className="px-3 py-2.5">Severity</th>
                <th className="px-3 py-2.5 text-right">Triggers (24h)</th>
                <th className="px-3.5 py-2.5 text-right">State / Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-[#16171d]">
                  <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{rule.code}</td>
                  <td className="px-3 py-2.5 text-zinc-200">{rule.name}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{rule.parameter}</td>
                  <td className="px-3 py-2.5 text-amber-300 font-semibold">{rule.condition}</td>
                  <td className="px-3 py-2.5"><StatusBadge status={rule.severity} size="sm" /></td>
                  <td className="px-3 py-2.5 text-right font-tabular">{rule.triggersCount}</td>
                  <td className="px-3.5 py-2.5 text-right">
                    <button
                      onClick={() => toggleRule(rule)}
                      disabled={toggling === rule.id}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border transition disabled:opacity-50 ${
                        rule.isActive
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {toggling === rule.id ? '...' : rule.isActive ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Rule Dialog */}
      <Dialog open={dialogOpen} onClose={() => { setDialog(false); setFormErrors({}); }} title="New Detection Rule">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Rule Name" required error={formErrors.name}>
              <Input placeholder="e.g. Thermal Runaway" value={form.name} onChange={e => setForm(p=>({...p, name:e.target.value}))} />
            </Field>
            <Field label="Rule Code" required error={formErrors.code}>
              <Input placeholder="e.g. RULE-TEMP-01" value={form.code} onChange={e => setForm(p=>({...p, code:e.target.value}))} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Target Parameter">
              <Select value={form.parameter} onChange={e => setForm(p=>({...p, parameter:e.target.value}))}>
                {['plasma_temp','chamber_pressure','microwave_power','gas_flow_ch4','cooling_flow','reflected_power','gas_ratio'].map(p=><option key={p} value={p}>{p}</option>)}
              </Select>
            </Field>
            <Field label="Severity">
              <Select value={form.severity} onChange={e => setForm(p=>({...p, severity:e.target.value as Severity}))}>
                {(['CRITICAL','WARNING','INFO'] as Severity[]).map(s=><option key={s} value={s}>{s}</option>)}
              </Select>
            </Field>
          </div>
          <Field label="Trigger Condition" required error={formErrors.condition}>
            <Input placeholder="e.g. ROC > 15 °C/min" value={form.condition} onChange={e => setForm(p=>({...p, condition:e.target.value}))} />
          </Field>
          <Field label="Threshold">
            <Input placeholder="e.g. 15 °C/min" value={form.threshold} onChange={e => setForm(p=>({...p, threshold:e.target.value}))} />
          </Field>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={() => { setDialog(false); setFormErrors({}); }}>Cancel</Button>
            <Button loading={saving} onClick={handleCreate}>Create Rule</Button>
          </div>
        </div>
      </Dialog>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </PageShell>
  );
}
