import jsPDF from 'jspdf';

export interface ReportMeta {
  id: string;
  title: string;
  date: string;
  facility?: string;
  author?: string;
  status?: string;
}

export function generateReportPDF(report: ReportMeta, customData?: {
  category?: string;
  timeframe?: string;
  facility?: string;
}): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = margin;

  // ── Header Banner ──────────────────────────────────────────
  doc.setFillColor(24, 24, 27); // #18181b industrial charcoal
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Accent line
  doc.setFillColor(217, 119, 6); // #d97706 amber
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Brand title
  doc.setTextColor(244, 244, 245);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('DIMO // CVD REACTOR INTELLIGENCE', margin, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(161, 161, 170);
  doc.text('INDUSTRIAL SYNTHESIS AUDIT & TELEMETRY LEDGER', margin, 19);

  // Document ID & Classification tag
  doc.setFont('courier', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(217, 119, 6);
  doc.text(report.id, pageWidth - margin, 13, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(161, 161, 170);
  doc.text('CONFIDENTIAL // LEVEL-3 COMPLIANCE', pageWidth - margin, 19, { align: 'right' });

  y = 38;

  // ── Title & Metadata Section ───────────────────────────────
  doc.setTextColor(24, 24, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(report.title, margin, y);

  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(82, 82, 91);
  doc.text(
    `Date of Issue: ${report.date}    |    Prepared By: ${report.author || 'Automated Pipeline'}    |    Status: VERIFIED (ISO 9001:2015)`,
    margin,
    y
  );

  y += 9;

  // ── KPI Summary Cards ───────────────────────────────────────
  const cardWidth = (pageWidth - margin * 2 - 9) / 4;
  const cardHeight = 16;
  const kpis = [
    { label: 'FLEET YIELD', val: '98.4%', sub: 'Target 95.0%' },
    { label: 'MEAN PLASMA UPTIME', val: '99.2%', sub: '24/24 Online' },
    { label: 'ENERGY PER CT', val: '31.4 kWh', sub: '-4.2% vs target' },
    { label: 'QUALITY GRADE', val: 'Type IIa', sub: 'Single-Crystal' },
  ];

  kpis.forEach((kpi, idx) => {
    const cardX = margin + idx * (cardWidth + 3);
    doc.setFillColor(244, 244, 245);
    doc.setDrawColor(228, 228, 231);
    doc.roundedRect(cardX, y, cardWidth, cardHeight, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(113, 113, 122);
    doc.text(kpi.label, cardX + 3, y + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(24, 24, 27);
    doc.text(kpi.val, cardX + 3, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(82, 82, 91);
    doc.text(kpi.sub, cardX + 3, y + 14);
  });

  y += cardHeight + 10;

  // ── Telemetry / Audit Table ────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(24, 24, 27);
  doc.text('VERIFIED PROCESS TELEMETRY & EQUIPMENT LOGS', margin, y);
  y += 4;

  interface TableDef {
    headers: string[];
    widths: number[];
    rows: string[][];
  }

  let table: TableDef;

  if (report.id === 'REP-2026-W40') {
    table = {
      headers: ['Batch ID', 'Reactor', 'Seeds', 'Target (ct)', 'Harvest (ct)', 'Yield %', 'Growth Rate', 'Grade'],
      widths: [28, 30, 16, 22, 22, 18, 24, 22],
      rows: [
        ['BT-2026-9041', 'PL1-SEC1-CVD01', '36', '180.0', '188.4', '104.7%', '14.2 um/h', 'Type IIa (VVS1)'],
        ['BT-2026-9042', 'PL1-SEC1-CVD02', '36', '180.0', '182.1', '101.2%', '14.6 um/h', 'Type IIa (VVS2)'],
        ['BT-2026-9043', 'PL1-SEC1-CVD03', '36', '180.0', '174.6', '97.0%',  '13.9 um/h', 'Type IIa (VS1)'],
        ['BT-2026-9044', 'PL1-SEC1-CVD04', '36', '180.0', '191.2', '106.2%', '15.1 um/h', 'Type IIa (FL/IF)'],
        ['BT-2026-9045', 'PL2-SEC2-CVD05', '36', '180.0', '184.8', '102.7%', '14.3 um/h', 'Type IIa (VVS1)'],
        ['BT-2026-9046', 'PL2-SEC2-CVD06', '36', '180.0', '179.2', '99.6%',  '14.0 um/h', 'Type IIa (VVS2)'],
        ['BT-2026-9047', 'PL3-SEC1-CVD01', '24', '120.0', '128.5', '107.1%', '15.8 um/h', 'Type IIa (FL)'],
      ],
    };
  } else if (report.id === 'REP-2026-M09') {
    table = {
      headers: ['Tag', 'Subsystem', 'Sensor / Instrument', 'Cal. Date', 'Next Due', 'Tolerance', 'Status'],
      widths: [24, 34, 40, 22, 22, 20, 20],
      rows: [
        ['PYRO-01', 'Pyrometry', 'Chino IR-CAQ 2-Color', '2026-09-30', '2026-12-30', '±1.5 °C', 'PASSED'],
        ['MFC-101', 'Mass Flow', 'Horiba SEC-Z500 (H2)', '2026-09-29', '2026-12-29', '±0.5 sccm', 'PASSED'],
        ['MFC-102', 'Mass Flow', 'Horiba SEC-Z500 (CH4)', '2026-09-29', '2026-12-29', '±0.1 sccm', 'PASSED'],
        ['VAC-004', 'Vacuum', 'MKS Baratron 627D', '2026-09-28', '2026-12-28', '±0.12 Torr', 'PASSED'],
        ['MW-002', 'Microwave', 'Sairem 6kW 2.45GHz', '2026-09-27', '2026-12-27', '±20 W', 'PASSED'],
        ['EM-001', 'RF Filter', 'Ametek Line Reactance', '2026-09-25', '2026-12-25', '±1.0%', 'PASSED'],
      ],
    };
  } else if (report.id === 'REP-2026-Q3') {
    table = {
      headers: ['Incident ID', 'Reactor', 'Subsystem', 'Outage Date', 'Downtime', 'MTBF', 'Resolution Status'],
      widths: [26, 30, 38, 24, 20, 20, 24],
      rows: [
        ['INC-2026-081', 'PL1-SEC1-CVD03', 'Cavity Arc Disruption', '2026-09-14', '2.8 hrs', '842.1 hrs', 'VERIFIED'],
        ['INC-2026-079', 'PL2-SEC2-CVD06', 'Cooling Loop Pressure', '2026-09-02', '1.4 hrs', '1240.5 hrs', 'VERIFIED'],
        ['INC-2026-072', 'PL1-SEC1-CVD05', 'Turbo Purge Ballast', '2026-08-21', '3.1 hrs', '980.0 hrs', 'VERIFIED'],
        ['INC-2026-068', 'PL1-SEC1-CVD01', 'Gas Valve Actuator', '2026-08-04', '0.8 hrs', '1420.2 hrs', 'VERIFIED'],
        ['INC-2026-059', 'PL3-SEC1-CVD01', 'Optical Window Film', '2026-07-22', '1.2 hrs', '1105.0 hrs', 'VERIFIED'],
      ],
    };
  } else {
    // Default / REP-2026-W41
    table = {
      headers: ['Reactor ID', 'Facility', 'Power (kW)', 'Pressure', 'H2/CH4', 'Substrate Temp', 'Growth Rate', 'Efficiency'],
      widths: [30, 26, 20, 22, 20, 24, 20, 20],
      rows: [
        ['PL1-SEC1-CVD01', 'Surat #1', '5.82 kW', '120.4 Torr', '498 / 12.4', '982.5 °C', '14.2 um/h', '96.8%'],
        ['PL1-SEC1-CVD02', 'Surat #1', '5.90 kW', '121.0 Torr', '500 / 12.5', '988.1 °C', '14.6 um/h', '97.4%'],
        ['PL1-SEC1-CVD03', 'Surat #1', '5.75 kW', '119.8 Torr', '495 / 12.2', '975.3 °C', '13.9 um/h', '95.2%'],
        ['PL1-SEC1-CVD04', 'Surat #1', '6.01 kW', '122.3 Torr', '504 / 12.8', '995.0 °C', '15.1 um/h', '98.1%'],
        ['PL2-SEC2-CVD05', 'Navsari #2', '5.84 kW', '120.2 Torr', '499 / 12.4', '980.4 °C', '14.3 um/h', '96.5%'],
        ['PL2-SEC2-CVD06', 'Navsari #2', '5.78 kW', '119.5 Torr', '496 / 12.3', '978.2 °C', '14.0 um/h', '95.9%'],
        ['PL3-SEC1-CVD01', 'Mumbai R&D', '6.12 kW', '124.0 Torr', '510 / 13.1', '1004.2 °C', '15.8 um/h', '98.9%'],
      ],
    };
  }

  // Draw Table Header
  const rowHeight = 6.5;
  doc.setFillColor(24, 24, 27);
  doc.rect(margin, y, pageWidth - margin * 2, rowHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);

  let currentX = margin;
  table.headers.forEach((h, i) => {
    const w = table.widths[i];
    doc.text(h, currentX + 2, y + 4.5);
    currentX += w;
  });

  y += rowHeight;

  // Draw Table Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);

  table.rows.forEach((row, rowIndex) => {
    if (rowIndex % 2 === 0) {
      doc.setFillColor(250, 250, 250);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(margin, y, pageWidth - margin * 2, rowHeight, 'F');
    doc.setDrawColor(228, 228, 231);
    doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight);

    let cellX = margin;
    row.forEach((cell, cellIndex) => {
      const w = table.widths[cellIndex];
      doc.setTextColor(39, 39, 42);
      if (cellIndex === 0) doc.setFont('helvetica', 'bold');
      else doc.setFont('helvetica', 'normal');
      doc.text(cell, cellX + 2, y + 4.5);
      cellX += w;
    });

    y += rowHeight;
  });

  // Outer table boundary
  doc.setDrawColor(212, 212, 216);
  doc.rect(margin, y - rowHeight * (table.rows.length + 1), pageWidth - margin * 2, rowHeight * (table.rows.length + 1), 'D');

  y += 12;

  // ── Executive Notes / Observations ─────────────────────────
  doc.setFillColor(244, 244, 245);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 22, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(24, 24, 27);
  doc.text('AUDIT CERTIFICATION & ENGINEERING OBSERVATION:', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(82, 82, 91);
  const notes = [
    '• All microwave resonant cavities exhibited < 0.8% reflective power losses across the 168-hour continuous cycle.',
    '• Substrate temperature variance maintained within ±3.2 °C across the 36-seed molybdenum holder array.',
    '• Cryptographic SHA-256 telemetry seal valid; approved for ISO 9001:2015 and internal gemological registry.',
  ];
  notes.forEach((note, nIdx) => {
    doc.text(note, margin + 4, y + 10 + nIdx * 4);
  });

  // ── Footer ─────────────────────────────────────────────────
  const footerY = pageHeight - 12;
  doc.setDrawColor(228, 228, 231);
  doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(161, 161, 170);
  doc.text(`HASH: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`, margin, footerY);
  doc.text(`Page 1 of 1  •  DIMO CVD Fleet Platform`, pageWidth - margin, footerY, { align: 'right' });

  // Trigger browser download
  const cleanFilename = `${report.id}_${report.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(cleanFilename);
}
