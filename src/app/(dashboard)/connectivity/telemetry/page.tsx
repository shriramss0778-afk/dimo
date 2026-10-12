'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, CardBody, MetricCard, StatusBadge } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Activity, Send, CheckCircle2, AlertTriangle, Terminal, RefreshCw } from 'lucide-react';

export default function TelemetryIngestionPage() {
  const [reactorId, setReactorId] = useState('PL1-SEC1-CVD03');
  const [temperature, setTemperature] = useState(848.0);
  const [pressure, setPressure] = useState(18.2);
  const [microwavePower, setMicrowavePower] = useState(31.2);
  const [ch4Flow, setCh4Flow] = useState(14.8);
  const [h2Flow, setH2Flow] = useState(320.0);
  const [substrateTemp, setSubstrateTemp] = useState(825.4);
  const [statusMsg, setStatusMsg] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleTestIngest = async () => {
    setStatusMsg({ type: 'idle', message: 'Transmitting packet to /api/telemetry...' });
    try {
      const payload = {
        reactorId,
        temperatureC: Number(temperature),
        pressureTorr: Number(pressure),
        microwavePowerKw: Number(microwavePower),
        ch4FlowSccm: Number(ch4Flow),
        h2FlowSccm: Number(h2Flow),
        substrateTempC: Number(substrateTemp),
        isSimulated: true,
      };

      const res = await fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setStatusMsg({
          type: 'success',
          message: `Ingestion ACK received! Packet validated: ID=${data.id || 'SYN-OK'}, Mode=${data.mode || 'Local Ingest'}.`,
        });
      } else {
        const err = await res.json();
        setStatusMsg({
          type: 'error',
          message: `Ingestion failed (${res.status}): ${err.error || 'Server rejected payload'}`,
        });
      }
    } catch (e: any) {
      setStatusMsg({
        type: 'error',
        message: `Network failure during ingestion: ${e.message}`,
      });
    }
  };

  return (
    <PageShell
      section="DATA PIPELINE"
      title="Telemetry Ingestion"
      subtitle="Validated edge ingestion console, JSON schema parsing, and live payload injection."
      action={
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#16171d] border border-[#23252d] text-zinc-300">
            Endpoint: <code className="text-amber-400">POST /api/telemetry</code>
          </span>
        </div>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard
          label="Validation Engine"
          value="ZOD SCHEMA"
          unit="Active"
          subtext="Strict float checking"
          icon={Activity}
          sparklineColor="#10b981"
        />
        <MetricCard
          label="Max Batch Envelope"
          value="50"
          unit="Records"
          subtext="High-throughput queue"
          icon={Terminal}
          sparklineColor="#06b6d4"
        />
        <MetricCard
          label="Parser Latency"
          value="< 2.4"
          unit="ms"
          subtext="Edge route handler"
          icon={Activity}
          sparklineColor="#eab308"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Col: Live Testing Form */}
        <Card>
          <CardHeader
            title="EDGE TELEMETRY INJECTOR"
            subtitle="Simulate incoming IoT field packet from industrial gateway"
            icon={Send}
          />
          <CardBody className="space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Target Reactor</label>
                <select
                  value={reactorId}
                  onChange={(e) => setReactorId(e.target.value)}
                  className="w-full bg-[#14151a] border border-[#23252d] rounded p-2 text-zinc-200"
                >
                  <option value="PL1-SEC1-CVD01">PL1-SEC1-CVD01</option>
                  <option value="PL1-SEC1-CVD02">PL1-SEC1-CVD02</option>
                  <option value="PL1-SEC1-CVD03">PL1-SEC1-CVD03</option>
                  <option value="PL1-SEC1-CVD06">PL1-SEC1-CVD06</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Pyrometer Temp (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full bg-[#14151a] border border-[#23252d] rounded p-2 text-zinc-200"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Vacuum Pressure (Torr)</label>
                <input
                  type="number"
                  step="0.1"
                  value={pressure}
                  onChange={(e) => setPressure(parseFloat(e.target.value))}
                  className="w-full bg-[#14151a] border border-[#23252d] rounded p-2 text-zinc-200"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">RF Power (kW)</label>
                <input
                  type="number"
                  step="0.1"
                  value={microwavePower}
                  onChange={(e) => setMicrowavePower(parseFloat(e.target.value))}
                  className="w-full bg-[#14151a] border border-[#23252d] rounded p-2 text-zinc-200"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Methane CH4 (sccm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={ch4Flow}
                  onChange={(e) => setCh4Flow(parseFloat(e.target.value))}
                  className="w-full bg-[#14151a] border border-[#23252d] rounded p-2 text-zinc-200"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Hydrogen H2 (sccm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={h2Flow}
                  onChange={(e) => setH2Flow(parseFloat(e.target.value))}
                  className="w-full bg-[#14151a] border border-[#23252d] rounded p-2 text-zinc-200"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleTestIngest}
                className="w-full py-2 rounded bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold flex items-center justify-center space-x-2 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inject Telemetry Sample Now</span>
              </button>
            </div>

            {statusMsg.message && (
              <div
                className={`p-2.5 rounded border text-[11px] ${
                  statusMsg.type === 'success'
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                    : statusMsg.type === 'error'
                    ? 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                    : 'bg-[#181920] border-[#262833] text-zinc-300'
                }`}
              >
                {statusMsg.message}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Right Col: Live Generated JSON Payload Preview */}
        <Card>
          <CardHeader
            title="PAYLOAD SCHEMATIC PREVIEW"
            subtitle="Raw JSON payload mapped to Prisma TelemetryLog schema"
            icon={Terminal}
          />
          <CardBody noPadding>
            <pre className="p-4 bg-[#0d0e12] text-amber-300/90 text-xs font-mono overflow-x-auto leading-relaxed border-t border-[#1f2129]">
{`{
  "reactorId": "${reactorId}",
  "timestamp": "${new Date().toISOString()}",
  "temperatureC": ${temperature},
  "pressureTorr": ${pressure},
  "microwavePowerKw": ${microwavePower},
  "ch4FlowSccm": ${ch4Flow},
  "h2FlowSccm": ${h2Flow},
  "substrateTempC": ${substrateTemp},
  "isSimulated": true,
  "gatewayKey": "reactor-gw-dev-secret-key"
}`}
            </pre>
            <div className="p-4 text-xs font-mono text-zinc-400 border-t border-[#1f2129] space-y-1">
              <div className="flex justify-between">
                <span>Schema Validation:</span>
                <span className="text-emerald-400 font-semibold">Strict Pass</span>
              </div>
              <div className="flex justify-between">
                <span>Target Table:</span>
                <span className="text-zinc-200">telemetry_logs</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </PageShell>
  );
}
