import React from 'react';
import {
  Activity,
  Radio,
  ShieldAlert,
  Wrench,
  Sliders,
  Cpu,
  Building2,
  Gauge,
  Thermometer,
  Layers,
  MapPin,
  Clock,
  Zap,
  BarChart3,
  Search,
  CheckCircle2,
  AlertTriangle,
  FolderLock,
  Users,
  Settings,
  Bell,
  SlidersHorizontal,
  Flame,
  Binary,
  GitBranch,
  Terminal,
  FileText,
  Boxes,
  ClipboardList,
  Calendar,
  History,
  Timer,
  Share2,
  FileCheck,
  TrendingUp,
  Workflow,
  HelpCircle,
  Network,
  ShieldCheck,
  ClipboardCheck,
} from 'lucide-react';

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavigationSection {
  title: string;
  shortTitle: string;
  code: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavigationItem[];
}

export const SIDEBAR_SECTIONS: NavigationSection[] = [
  {
    title: 'A. OVERVIEW',
    shortTitle: 'Overview',
    code: 'A',
    icon: Activity,
    items: [
      { id: 'fleet-overview', title: 'Fleet Overview', href: '/dashboard', badge: 'LIVE', icon: Activity },
      { id: 'reactor-registry', title: 'Reactor Registry', href: '/reactors', badge: '10', icon: Cpu },
      { id: 'site-management', title: 'Site Management', href: '/sites', badge: '3', icon: MapPin },
      { id: 'reactor-details', title: 'Reactor Details', href: '/reactors/details', icon: Gauge },
      { id: 'operating-status', title: 'Operating Status', href: '/operating-status', icon: Layers },
      { id: 'fleet-health-map', title: 'Fleet Health Map', href: '/health-map', icon: Building2 },
      { id: 'event-timeline', title: 'Event Timeline', href: '/event-timeline', icon: Clock },
      { id: 'operational-summary', title: 'Operational Summary', href: '/operational-summary', icon: BarChart3 },
    ],
  },
  {
    title: 'B. CONNECTIVITY',
    shortTitle: 'Connectivity',
    code: 'B',
    icon: Radio,
    items: [
      { id: 'sensor-gateway-hub', title: 'Sensor & Gateway Hub', href: '/connectivity/hub', icon: Radio },
      { id: 'live-signal-monitor', title: 'Live Signal Monitor', href: '/connectivity/signals', badge: '142Hz', icon: Activity },
      { id: 'sensor-registry', title: 'Sensor Registry', href: '/connectivity/sensors', badge: '18', icon: Cpu },
      { id: 'gateway-connections', title: 'Gateway Connections', href: '/connectivity/gateways', badge: '3', icon: Network },
      { id: 'telemetry-ingestion', title: 'Telemetry Ingestion', href: '/connectivity/telemetry', icon: Terminal },
      { id: 'data-quality-monitor', title: 'Data Quality Monitor', href: '/connectivity/data-quality', icon: CheckCircle2 },
      { id: 'calibration-management', title: 'Calibration Management', href: '/connectivity/calibration', icon: FileCheck },
      { id: 'protocol-integrations', title: 'Protocol Integrations', href: '/connectivity/protocols', icon: Share2 },
    ],
  },
  {
    title: 'C. REACTOR HEALTH',
    shortTitle: 'Health',
    code: 'C',
    icon: ShieldAlert,
    items: [
      { id: 'reactor-condition', title: 'Reactor Condition', href: '/reactor-health/condition', icon: Activity },
      { id: 'fault-detection', title: 'Fault Detection', href: '/reactor-health/faults', badge: 'AI', icon: ShieldAlert },
      { id: 'operating-limits', title: 'Operating Limits', href: '/reactor-health/operating-limits', icon: Sliders },
      { id: 'event-alarm-log', title: 'Event & Alarm Log', href: '/reactor-health/alarms', badge: '2', icon: Bell },
      { id: 'equipment-degradation', title: 'Equipment Degradation', href: '/reactor-health/degradation', icon: Gauge },
      { id: 'failure-risk-assessment', title: 'Failure Risk Assessment', href: '/reactor-health/risk-assessment', icon: AlertTriangle },
      { id: 'root-cause-investigation', title: 'Root Cause Investigation', href: '/reactor-health/root-cause', icon: GitBranch },
      { id: 'health-history', title: 'Health History', href: '/reactor-health/history', icon: History },
    ],
  },
  {
    title: 'D. FIELD OPERATIONS',
    shortTitle: 'Operations',
    code: 'D',
    icon: Wrench,
    items: [
      { id: 'maintenance-workbench', title: 'Maintenance Workbench', href: '/field-operations/workbench', icon: Wrench },
      { id: 'work-orders', title: 'Work Orders', href: '/field-operations/work-orders', badge: '4', icon: ClipboardList },
      { id: 'technician-inspections', title: 'Technician Inspections', href: '/field-operations/inspections', icon: ClipboardCheck },
      { id: 'maintenance-scheduling', title: 'Maintenance Scheduling', href: '/field-operations/scheduling', icon: Calendar },
      { id: 'incident-investigation', title: 'Incident Investigation', href: '/field-operations/incidents', icon: FileText },
      { id: 'spare-parts-registry', title: 'Spare Parts Registry', href: '/field-operations/spares', badge: '12', icon: Boxes },
      { id: 'service-history', title: 'Service History', href: '/field-operations/service-history', icon: History },
      { id: 'downtime-tracking', title: 'Downtime Tracking', href: '/field-operations/downtime', icon: Timer },
    ],
  },
  {
    title: 'E. PLATFORM',
    shortTitle: 'Platform',
    code: 'E',
    icon: SlidersHorizontal,
    items: [
      { id: 'reactor-digital-model', title: 'Reactor Digital Model', href: '/platform/digital-twin', icon: Cpu },
      { id: 'fleet-reports', title: 'Fleet Reports', href: '/platform/reports', icon: FileText },
      { id: 'integrations-api', title: 'Integrations & API', href: '/platform/api', icon: Terminal },
      { id: 'notification-center', title: 'Notification Center', href: '/platform/notifications', icon: Bell },
      { id: 'rules-detection-engine', title: 'Rules & Detection Engine', href: '/platform/rules', icon: ShieldCheck },
      { id: 'audit-logs', title: 'Audit Logs', href: '/platform/audit-logs', icon: History },
      { id: 'user-role-management', title: 'User & Role Management', href: '/platform/users', icon: Users },
      { id: 'system-administration', title: 'System Administration', href: '/platform/settings', icon: Settings },
    ],
  },
];
