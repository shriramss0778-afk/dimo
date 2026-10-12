export type ReactorStatusType = 'RUNNING' | 'IDLE' | 'OFFLINE' | 'MAINTENANCE' | 'ALARM';
export type EquipmentConditionType = 'OPTIMAL' | 'GOOD' | 'DEGRADED' | 'CRITICAL' | 'UNKNOWN';
export type SensorStatusType = 'ONLINE' | 'OFFLINE' | 'CALIBRATING' | 'ERROR' | 'STALE';
export type GatewayStatusType = 'CONNECTED' | 'DISCONNECTED' | 'DEGRADED';
export type AlarmSeverityType = 'INFO' | 'WARNING' | 'CRITICAL';
export type AlarmStatusType = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
export type WorkOrderStatusType = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'PENDING_PARTS' | 'RESOLVED' | 'CLOSED';
export type PriorityType = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface TelemetryPayload {
  reactorId: string;
  timestamp?: string;
  temperatureC: number;
  pressureTorr: number;
  microwavePowerKw: number;
  ch4FlowSccm: number;
  h2FlowSccm: number;
  substrateTempC: number;
  vacuumLevelMbar?: number;
  coolingFlowLpm?: number;
  isSimulated?: boolean;
}

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  badge?: {
    text: string;
    variant: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  };
}

export interface SidebarSubItem {
  id: string;
  title: string;
  href: string;
  badge?: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarSubItem[];
}
