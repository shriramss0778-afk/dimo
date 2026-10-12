'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { Card, CardHeader, MetricCard } from '@/components/ui/card';
import { NeonConnectivityBanner } from '@/components/ui/states';
import { Dialog, Field, Select, Button, Toast } from '@/components/ui/dialog';
import { generateReportPDF } from '@/lib/pdf-report';
import { FileText, Download, Calendar, CheckCircle2, Check, ArrowDownToLine, FileDown } from 'lucide-react';

interface ReportItem {
  title: string;
  id: string;
  date: string;
  format: string;
  size: string;
  author: string;
  status: string;
}

const REPORTS: ReportItem[] = [
  { title: 'Weekly Fleet Energy & Plasma Efficiency Report', id: 'REP-2026-W41', date: '2026-10-12', format: 'PDF / CSV', size: '2.4 MB', author: 'Automated Pipeline', status: 'READY' },
  { title: 'CVD Diamond Harvest Yield & Growth Rate Summary', id: 'REP-2026-W40', date: '2026-10-05', format: 'PDF / CSV', size: '3.1 MB', author: 'Synthesis Lead', status: 'READY' },
  { title: 'ISO 9001 Equipment Calibration & Audit Ledger', id: 'REP-2026-M09', date: '2026-09-30', format: 'PDF', size: '5.8 MB', author: 'Quality Assurance', status: 'READY' },
  { title: 'Quarterly Unscheduled Outage & MTBF Reliability Audit', id: 'REP-2026-Q3', date: '2026-09-30', format: 'PDF / XLSX', size: '8.2 MB', author: 'Maintenance Director', status: 'READY' },
];

function downloadBlob(filename: string, content: string, mimeType: string = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function generateReportCsv(reportId: string): { filename: string; content: string } {
  if (reportId === 'REP-2026-W41') {
    const csv = [
      'Reactor_ID,Facility,Plasma_Power_kW,Chamber_Pressure_Torr,H2_Flow_sccm,CH4_Flow_sccm,Substrate_Temp_C,Growth_Rate_um_hr,Energy_kWh_per_ct,Efficiency_Pct',
      'PL1-SEC1-CVD01,Surat Facility,5.82,120.4,498.2,12.4,982.5,14.2,32.4,96.8',
      'PL1-SEC1-CVD02,Surat Facility,5.90,121.0,500.1,12.5,988.1,14.6,31.8,97.4',
      'PL1-SEC1-CVD03,Surat Facility,5.75,119.8,495.0,12.2,975.3,13.9,33.1,95.2',
      'PL1-SEC1-CVD04,Surat Facility,6.01,122.3,504.0,12.8,995.0,15.1,30.9,98.1',
      'PL2-SEC2-CVD05,Navsari Facility,5.84,120.2,499.0,12.4,980.4,14.3,32.0,96.5',
      'PL2-SEC2-CVD06,Navsari Facility,5.78,119.5,496.2,12.3,978.2,14.0,32.8,95.9',
      'PL3-SEC1-CVD01,Mumbai R&D Lab,6.12,124.0,510.5,13.1,1004.2,15.8,29.8,98.9',
    ].join('\n');
    return { filename: 'REP-2026-W41_Fleet_Energy_Plasma_Efficiency.csv', content: csv };
  }

  if (reportId === 'REP-2026-W40') {
    const csv = [
      'Batch_ID,Reactor_ID,Seed_Substrates,Harvest_Date,Target_Carats,Harvested_Carats,Yield_Pct,Avg_Thickness_mm,Defect_Rate_Pct,Gem_Grade',
      'BT-2026-9041,PL1-SEC1-CVD01,36,2026-10-05,180.0,188.4,104.7,2.84,0.42,Type IIa (VVS1)',
      'BT-2026-9042,PL1-SEC1-CVD02,36,2026-10-05,180.0,182.1,101.2,2.79,0.51,Type IIa (VVS2)',
      'BT-2026-9043,PL1-SEC1-CVD03,36,2026-10-05,180.0,174.6,97.0,2.68,0.85,Type IIa (VS1)',
      'BT-2026-9044,PL1-SEC1-CVD04,36,2026-10-05,180.0,191.2,106.2,2.91,0.38,Type IIa (FL/IF)',
      'BT-2026-9045,PL2-SEC2-CVD05,36,2026-10-05,180.0,184.8,102.7,2.82,0.48,Type IIa (VVS1)',
    ].join('\n');
    return { filename: 'REP-2026-W40_Diamond_Harvest_Yield_Summary.csv', content: csv };
  }

  if (reportId === 'REP-2026-M09') {
    const csv = [
      'Equipment_Tag,Subsystem,Sensor_Model,Calibration_Date,Next_Due_Date,Certified_Tolerance,Measured_Drift,Auditor,Audit_Status,Certificate_No',
      'PYRO-OPT-01,Optical Pyrometry,Chino IR-CAQ,2026-09-30,2026-12-30,±1.5 C,0.3 C,N. Varma (Lead QA),PASSED,CAL-ISO-2026-881',
      'MFC-H2-101,Mass Flow Controller,Horiba SEC-Z500,2026-09-29,2026-12-29,±0.5 sccm,0.1 sccm,N. Varma (Lead QA),PASSED,CAL-ISO-2026-882',
      'VAC-CAP-04,Capacitance Manometer,MKS Baratron 627D,2026-09-28,2026-12-28,±0.12 Torr,0.02 Torr,K. Dave (Metrology),PASSED,CAL-ISO-2026-883',
      'MW-GEN-02,Microwave Magnetron,Sairem 6kW 2.45GHz,2026-09-27,2026-12-27,±20 W,8 W,K. Dave (Metrology),PASSED,CAL-ISO-2026-884',
    ].join('\n');
    return { filename: 'REP-2026-M09_ISO9001_Equipment_Calibration_Ledger.csv', content: csv };
  }

  const csv = [
    'Incident_ID,Reactor_ID,Subsystem_Failure,Timestamp_Start,Downtime_Hours,MTBF_Hours,Root_Cause,Corrective_Action,Resolved_By,Audit_Signoff',
    'INC-2026-081,PL1-SEC1-CVD03,Microwave Cavity Arc,2026-09-14 04:12,2.8,842.1,Filament deposition flake,Cleaned launcher tuned tuner,R. Sharma,VERIFIED',
    'INC-2026-079,PL2-SEC2-CVD06,Coolant Chiller Interlock,2026-09-02 18:45,1.4,1240.5,Inline filter differential pressure,Flushed filter replaced mesh,A. Patel,VERIFIED',
    'INC-2026-072,PL1-SEC1-CVD05,Turbo Pump Purge Alarm,2026-08-21 11:20,3.1,980.0,N2 ballast regulator valve seal,Replaced viton gasket calibrated,R. Sharma,VERIFIED',
  ].join('\n');
  return { filename: 'REP-2026-Q3_Outage_MTBF_Reliability_Audit.csv', content: csv };
}

export default function FleetReportsPage() {
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null);
  const [downloadingCsvId, setDownloadingCsvId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState('ALL_SYNTHESIS');
  const [customFacility, setCustomFacility] = useState('ALL');
  const [customFormat, setCustomFormat] = useState('pdf');
  const [customRange, setCustomRange] = useState('30d');
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handlePdfDownload = (report: ReportItem) => {
    setDownloadingPdfId(report.id);
    try {
      generateReportPDF({
        id: report.id,
        title: report.title,
        date: report.date,
        author: report.author,
        status: report.status,
      });
      setToast({ message: `Generated & downloaded ${report.id}.pdf`, type: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ message: `Failed to generate PDF for ${report.id}`, type: 'error' });
    } finally {
      setTimeout(() => setDownloadingPdfId(null), 800);
    }
  };

  const handleCsvDownload = (report: ReportItem) => {
    setDownloadingCsvId(report.id);
    try {
      const { filename, content } = generateReportCsv(report.id);
      downloadBlob(filename, content);
      setToast({ message: `Downloaded ${filename}`, type: 'success' });
    } catch {
      setToast({ message: `Failed to export CSV for ${report.id}`, type: 'error' });
    } finally {
      setTimeout(() => setDownloadingCsvId(null), 800);
    }
  };

  const handleCustomExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const timestamp = new Date().toISOString().split('T')[0];

        if (customFormat === 'pdf') {
          const titles: Record<string, string> = {
            ALL_SYNTHESIS: 'CVD Reactor Telemetry & Harvest Yield Comprehensive Ledger',
            ENERGY_PLASMA: 'Weekly Energy & Microwave Plasma Density Efficiency Audit',
            HARVEST_YIELD: 'CVD Diamond Synthesis Harvest & Growth Rate Summary',
            CALIBRATION_ISO: 'ISO 9001 Metrology & Sensor Calibration Audit Ledger',
            OUTAGE_RELIABILITY: 'Quarterly Unscheduled Outage & MTBF Reliability Audit',
          };
          generateReportPDF({
            id: `REP-CUSTOM-${timestamp.replace(/-/g, '')}`,
            title: titles[customCategory] || 'Custom CVD Engineering Audit Report',
            date: timestamp,
            author: 'Plant Systems Lead',
            facility: customFacility,
          });
          setDialogOpen(false);
          setIsExporting(false);
          setToast({ message: `Generated and downloaded PDF report`, type: 'success' });
          return;
        }

        let filename = `DIMO_Custom_Report_${customCategory}_${customFacility}_${timestamp}`;
        let content = '';

        if (customFormat === 'json') {
          filename += '.json';
          const exportJson = {
            exportTitle: `DIMO CVD Intelligence Platform - Custom Engineering Export`,
            generatedAt: new Date().toISOString(),
            parameters: {
              category: customCategory,
              facility: customFacility,
              range: customRange,
            },
            totalReactorsAnalyzed: customFacility === 'ALL' ? 24 : 8,
            fleetSummary: {
              averageYieldPct: 98.4,
              meanPlasmaUptimePct: 99.2,
              totalCaratsHarvested: 1842.6,
              energyEfficiencyKwhPerCt: 31.4,
            },
            status: 'CERTIFIED_VERIFIED',
          };
          content = JSON.stringify(exportJson, null, 2);
          downloadBlob(filename, content, 'application/json');
        } else if (customFormat === 'md') {
          filename += '.md';
          content = [
            `# DIMO CVD Reactor Fleet Intelligence Report`,
            `**Generated Date:** ${new Date().toISOString()}`,
            `**Scope:** ${customCategory} | Facility: ${customFacility} | Period: ${customRange}`,
            ``,
            `## Executive Synthesis Metrics`,
            `- **Fleet Diamond Harvest Yield:** 98.4%`,
            `- **Mean Plasma Stability Index:** 99.2%`,
            `- **Specific Energy Consumption:** 31.4 kWh/ct`,
            `- **Total Verified Yield:** 1,842.60 Carats (Type IIa Single-Crystal)`,
            ``,
            `## Facility Status`,
            `| Facility | Units Active | Mean Temp (°C) | Pressure (Torr) | Audit State |`,
            `|:---------|:-------------|:---------------|:----------------|:------------|`,
            `| Surat Facility #1 | 12 / 12 | 985.4 | 120.2 | ISO 9001 Compliant |`,
            `| Navsari Facility #2 | 8 / 8 | 982.0 | 119.8 | ISO 9001 Compliant |`,
            `| Mumbai R&D Center | 4 / 4 | 1002.5 | 124.0 | QA Validated |`,
          ].join('\n');
          downloadBlob(filename, content, 'text/markdown');
        } else {
          filename += '.csv';
          content = [
            'Facility,Reactor_ID,Operational_State,Plasma_kW,Pressure_Torr,Growth_Rate_um_hr,Target_Carats,Actual_Carats,Yield_Pct,ISO_Audit',
            'Surat Facility,PL1-SEC1-CVD01,GROWTH_RUN,5.82,120.4,14.2,180.0,188.4,104.7,VERIFIED',
            'Surat Facility,PL1-SEC1-CVD02,GROWTH_RUN,5.90,121.0,14.6,180.0,182.1,101.2,VERIFIED',
            'Surat Facility,PL1-SEC1-CVD03,GROWTH_RUN,5.75,119.8,13.9,180.0,174.6,97.0,VERIFIED',
            'Surat Facility,PL1-SEC1-CVD04,GROWTH_RUN,6.01,122.3,15.1,180.0,191.2,106.2,VERIFIED',
            'Navsari Facility,PL2-SEC2-CVD05,GROWTH_RUN,5.84,120.2,14.3,180.0,184.8,102.7,VERIFIED',
            'Navsari Facility,PL2-SEC2-CVD06,GROWTH_RUN,5.78,119.5,14.0,180.0,179.2,99.6,VERIFIED',
            'Mumbai R&D,PL3-SEC1-CVD01,ACTIVE_PARAM,6.12,124.0,15.8,150.0,158.4,105.6,VERIFIED',
          ].join('\n');
          downloadBlob(filename, content, 'text/csv');
        }

        setDialogOpen(false);
        setIsExporting(false);
        setToast({ message: `Generated & downloaded ${filename}`, type: 'success' });
      } catch {
        setIsExporting(false);
        setToast({ message: 'Error generating custom export', type: 'error' });
      }
    }, 600);
  };

  return (
    <PageShell
      section="PLATFORM & GOVERNANCE"
      title="Fleet Reports"
      subtitle="Exportable engineering reports: Production throughput, power efficiency, downtime analysis, and compliance."
      action={
        <button
          onClick={() => {
            setCustomFormat('pdf');
            setDialogOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--accent-dim)] hover:bg-[var(--accent-glow)] border border-[var(--accent-border)] text-[var(--accent)] text-xs font-mono font-semibold transition-colors cursor-pointer"
        >
          <ArrowDownToLine className="w-3.5 h-3.5" />
          <span>Generate Custom Export</span>
        </button>
      }
    >
      <NeonConnectivityBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <MetricCard label="Archived Reports" value="48" unit="Documents" subtext="Automated cadence" icon={FileText} sparklineColor="#10b981" />
        <MetricCard label="Scheduled Cadence" value="Weekly" unit="Mon 06:00" subtext="Surat, Navsari, Mumbai" icon={Calendar} sparklineColor="#06b6d4" />
        <MetricCard label="Export Compliance" value="100" unit="%" subtext="Signed checksum" icon={CheckCircle2} sparklineColor="#10b981" />
      </div>

      <Card>
        <CardHeader
          title="ENGINEERING REPORTS & AUDIT ARTIFACTS"
          subtitle="Downloadable summaries formatted for plant managers, synthesis engineers, and QA auditors"
          icon={FileText}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0f1013] border-b border-[#20222a] text-[10px] uppercase text-zinc-400">
              <tr>
                <th className="px-3.5 py-2.5">Document Title</th>
                <th className="px-3 py-2.5">Report ID</th>
                <th className="px-3 py-2.5">Date</th>
                <th className="px-3 py-2.5">Available Formats</th>
                <th className="px-3 py-2.5 text-right">File Size</th>
                <th className="px-3 py-2.5">Prepared By</th>
                <th className="px-3 py-2.5 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1c23] text-zinc-300">
              {REPORTS.map((r) => {
                const isDownloadingPdf = downloadingPdfId === r.id;
                const isDownloadingCsv = downloadingCsvId === r.id;
                return (
                  <tr key={r.id} className="hover:bg-[#16171d]">
                    <td className="px-3.5 py-2.5 font-semibold text-zinc-100">{r.title}</td>
                    <td className="px-3 py-2.5 text-zinc-400">{r.id}</td>
                    <td className="px-3 py-2.5 text-zinc-400">{r.date}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/10 text-red-600 border border-red-500/20 font-bold">PDF</span>
                        {r.format.includes('CSV') && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-medium">CSV</span>
                        )}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right font-tabular text-zinc-200">{r.size}</td>
                    <td className="px-3 py-2.5 text-zinc-400">{r.author}</td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {/* Primary PDF Download */}
                        <button
                          onClick={() => handlePdfDownload(r)}
                          disabled={isDownloadingPdf}
                          title="Download high-resolution audit PDF"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-sm)] bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-600 font-semibold text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          {isDownloadingPdf ? (
                            <>
                              <Check className="w-3 h-3 text-red-600 animate-pulse" />
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <FileDown className="w-3.5 h-3.5" />
                              <span>PDF</span>
                            </>
                          )}
                        </button>

                        {/* Secondary CSV Download */}
                        {r.format.includes('CSV') && (
                          <button
                            onClick={() => handleCsvDownload(r)}
                            disabled={isDownloadingCsv}
                            title="Download raw tabular CSV data"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] hover:bg-[var(--accent-dim)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] border border-[var(--border-default)] text-[var(--text-secondary)] text-[11px] font-mono font-medium transition-colors cursor-pointer"
                          >
                            {isDownloadingCsv ? (
                              <Check className="w-3 h-3 text-emerald-500 animate-pulse" />
                            ) : (
                              <Download className="w-3 h-3" />
                            )}
                            <span>CSV</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Custom Export Dialog ── */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Generate Custom Export"
        description="Select report parameters to compile and download verified CVD engineering documents."
      >
        <div className="space-y-3.5">
          <Field label="REPORT DOMAIN">
            <Select value={customCategory} onChange={(e) => setCustomCategory(e.target.value)}>
              <option value="ALL_SYNTHESIS">All Telemetry & Synthesis Records</option>
              <option value="ENERGY_PLASMA">Weekly Energy & Plasma Efficiency</option>
              <option value="HARVEST_YIELD">CVD Diamond Harvest & Growth Rate</option>
              <option value="CALIBRATION_ISO">ISO 9001 Metrology Calibration Ledger</option>
              <option value="OUTAGE_RELIABILITY">Outage & MTBF Reliability Audit</option>
            </Select>
          </Field>

          <Field label="FACILITY LOCATION">
            <Select value={customFacility} onChange={(e) => setCustomFacility(e.target.value)}>
              <option value="ALL">All Facilities (Surat, Navsari, Mumbai)</option>
              <option value="SURAT">Surat Production Plant #1 (12 Units)</option>
              <option value="NAVSARI">Navsari Production Plant #2 (8 Units)</option>
              <option value="MUMBAI">Mumbai High-Pressure R&D (4 Units)</option>
            </Select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="TIMEFRAME">
              <Select value={customRange} onChange={(e) => setCustomRange(e.target.value)}>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Current Quarter (Q3/Q4)</option>
                <option value="365d">Full Year (2026 YTD)</option>
              </Select>
            </Field>

            <Field label="EXPORT FORMAT">
              <Select value={customFormat} onChange={(e) => setCustomFormat(e.target.value)}>
                <option value="pdf">PDF Document (.pdf) — Official Audit</option>
                <option value="csv">CSV Spreadsheet (.csv) — Raw Data</option>
                <option value="json">JSON Telemetry (.json)</option>
                <option value="md">Markdown Document (.md)</option>
              </Select>
            </Field>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[var(--border-subtle)]">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button loading={isExporting} onClick={handleCustomExport}>
              <Download className="w-3.5 h-3.5 mr-1" />
              Download {customFormat.toUpperCase()}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* ── Feedback Toast ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </PageShell>
  );
}


