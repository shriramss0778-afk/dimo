# DIMO — CVD Reactor Intelligence Platform

Retrofit sensor + AIoT intelligence platform designed for physical Chemical Vapor Deposition (CVD) diamond reactors across industrial manufacturing hubs (Surat, Navsari, Mumbai).

## Architecture Overview

- **Frontend:** Next.js (App Router, Turbopack, React 19, TypeScript, Tailwind CSS)
- **Backend:** Next.js Route Handlers (`/api/*`), server-side business services
- **Database:** Neon Serverless PostgreSQL with Prisma ORM
- **Visualizations:** Recharts (telemetry curves, degradation indices, health maps)
- **Deployment:** Vercel-ready with edge compatibility and graceful zero-config build safety

---

## 40 Feature Navigation Structure

### A. OVERVIEW
1. **Fleet Overview** (`/dashboard`) — Fleet status, connected equipment indicators, and operational KPIs.
2. **Reactor Registry** (`/reactors`) — Equipment serial numbers, chamber volume, max power ratings.
3. **Site Management** (`/sites`) — Facilities, regional factories (Surat, Navsari, Mumbai).
4. **Reactor Details** (`/reactors/details`) — Deep-dive reactor specifications and telemetry channels.
5. **Operating Status** (`/operating-status`) — Running, Idle, Offline, Maintenance state matrix.
6. **Fleet Health Map** (`/health-map`) — Site-level heat and equipment health distribution.
7. **Event Timeline** (`/event-timeline`) — Chronological edge state changes and operator actions.
8. **Operational Summary** (`/operational-summary`) — Availability, MTBF, and uptime analytics.

### B. CONNECTIVITY
1. **Sensor & Gateway Hub** (`/connectivity/hub`) — Central IoT edge node and sensor hub.
2. **Live Signal Monitor** (`/connectivity/signals`) — High-frequency incoming sensor stream.
3. **Sensor Registry** (`/connectivity/sensors`) — Transducer inventory (pyrometer, thermocouples, manometers).
4. **Gateway Connections** (`/connectivity/gateways`) — Industrial edge gateways, heartbeat latency, and bridges.
5. **Telemetry Ingestion** (`/connectivity/telemetry`) — Validated API ingestion testing console.
6. **Data Quality Monitor** (`/connectivity/data-quality`) — Tracking stale, noisy, or dropped frames.
7. **Calibration Management** (`/connectivity/calibration`) — Calibration routines, zero-offset drift corrections.
8. **Protocol Integrations** (`/connectivity/protocols`) — MQTT, Modbus-TCP, OPC-UA, RS-485 interfaces.

### C. REACTOR HEALTH
1. **Reactor Condition** (`/reactor-health/condition`) — Health score calculation and microwave stability.
2. **Fault Detection** (`/reactor-health/faults`) — Rule-based and heuristic anomaly detection.
3. **Operating Limits** (`/reactor-health/operating-limits`) — Safe operational envelopes and threshold boundaries.
4. **Event & Alarm Log** (`/reactor-alarm/alarms`) — Persistent alarm records, acknowledgement, and resolution.
5. **Equipment Degradation** (`/reactor-health/degradation`) — Magnetron wear, quartz window coating, and vacuum seals.
6. **Failure Risk Assessment** (`/reactor-health/risk-assessment`) — Statistical risk scoring with confidence metrics.
7. **Root Cause Investigation** (`/reactor-health/root-cause`) — Multi-parameter synchronized fault drill-down.
8. **Health History** (`/reactor-health/history`) — Historical incident timeline and wear logs.

### D. FIELD OPERATIONS
1. **Maintenance Workbench** (`/field-operations/workbench`) — Unified field engineer task list.
2. **Work Orders** (`/field-operations/work-orders`) — Digital tickets, lifecycle tracking, and assignments.
3. **Technician Inspections** (`/field-operations/inspections`) — Standard digital checklists (vacuum seal, stage tilt).
4. **Maintenance Scheduling** (`/field-operations/scheduling`) — Preventive calendar synced with harvest cycles.
5. **Incident Investigation** (`/field-operations/incidents`) — Corrective actions (CAPA) and failure reports.
6. **Spare Parts Registry** (`/field-operations/spares`) — Critical inventory (magnetrons, circulators, o-rings).
7. **Service History** (`/field-operations/service-history`) — Servicing logs by reactor serial number.
8. **Downtime Tracking** (`/field-operations/downtime`) — Unscheduled outage vs. scheduled downtime analytics.

### E. PLATFORM
1. **Reactor Digital Model** (`/platform/digital-twin`) — Physical reactor emulation and parameters.
2. **Fleet Reports** (`/platform/reports`) — PDF/CSV exportable engineering reports.
3. **Integrations & API** (`/platform/api`) — REST and MQTT ingestion specifications.
4. **Notification Center** (`/platform/notifications`) — System alerts and persistent alarm notices.
5. **Rules & Detection Engine** (`/platform/rules`) — Configurable detection rule evaluator.
6. **Audit Logs** (`/platform/audit-logs`) — Immutable security and change log.
7. **User & Role Management** (`/platform/users`) — RBAC for Admins, Engineers, and Operators.
8. **System Administration** (`/platform/settings`) — Retention policies, safety locks, and system health.

---

## Environment Variables & Neon Database Setup

Create a `.env` or `.env.local` file by copying [.env.example](file:///s:/Downloads/cvd-yield/.env.example):

```bash
# Neon Serverless PostgreSQL Connection String (pooled connection recommended for Vercel/serverless)
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Direct URL for migrations (optional)
DIRECT_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-sample.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Environment
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Secret token for IoT Gateway edge ingestion
GATEWAY_API_KEY="reactor-gw-dev-secret-key"
```

### Neon Setup & Database Migrations

When your Neon PostgreSQL database instance is provisioned, run:

```bash
# Apply migrations to Neon database
npx prisma migrate dev --name init

# Or push schema directly for rapid prototyping
npx prisma db push

# Generate fresh Prisma Client
npx prisma generate
```

---

## Verification & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. TypeScript Type-Check
npx tsc --noEmit

# 4. ESLint Check
npm run lint

# 5. Production Build
npm run build

# 6. Run Local Dev Server
npm run dev
```

All 53 routes (40 UI pages + 11 API endpoints + root & error pages) compile without errors during static generation and build validation.
