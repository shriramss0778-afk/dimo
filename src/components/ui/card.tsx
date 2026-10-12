import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

/* ================================================================
   Card — Premium Industrial Glassmorphism Surface
   Restrained engineering surface with crisp borders,
   subtle backdrop blur, and layered elevation.
   All existing props & exports preserved unchanged.
   ================================================================ */

export function Card({
  children,
  className,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-lg)]',
        'bg-[var(--bg-card)] border border-[var(--border-subtle)]',
        'shadow-[var(--shadow-card)] backdrop-blur-md',
        'transition-all duration-150',
        'hover:border-[var(--border-default)] hover:shadow-[var(--shadow-hover)]',
        glow && 'border-[var(--accent-border)] ring-1 ring-[var(--accent-border)] shadow-[var(--shadow-card)]',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  badge,
  action,
  icon: Icon,
  className,
}: {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'px-4 py-2.5 border-b border-[var(--border-subtle)]',
        'bg-[var(--bg-elevated)]/60',
        'flex flex-wrap items-center justify-between gap-2',
        className
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {Icon && (
          <div
            className={cn(
              'p-1.5 rounded-[var(--radius-sm)] shrink-0',
              'bg-[var(--bg-elevated)] border border-[var(--border-default)]',
              'text-[var(--accent)]'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              className={cn(
                'text-[11px] uppercase tracking-[0.08em] font-semibold',
                'text-[var(--text-primary)]',
                'leading-none'
              )}
            >
              {title}
            </h2>
            {badge}
          </div>
          {subtitle && (
            <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({
  children,
  className,
  noPadding = false,
}: {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <div className={cn(noPadding ? 'p-0' : 'p-4', className)}>
      {children}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  unit,
  subtext,
  icon: Icon,
  trend,
  trendDirection = 'neutral',
  sparklineColor = '#f59e0b',
  isSimulated = false,
  className,
}: {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  icon?: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  sparklineColor?: string;
  isSimulated?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-lg)]',
        'bg-[var(--bg-card)] border border-[var(--border-subtle)]',
        'shadow-[var(--shadow-card)] backdrop-blur-md',
        'p-3.5 sm:p-4 flex flex-col justify-between',
        'transition-all duration-150 group',
        'hover:border-[var(--border-default)] hover:shadow-[var(--shadow-hover)]',
        className
      )}
    >
      {/* Subtle top-edge accent hairline */}
      <div
        className="absolute inset-x-0 top-0 h-[1.5px] opacity-40 group-hover:opacity-80 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${sparklineColor}66, transparent)` }}
        aria-hidden="true"
      />

      {/* Label row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={cn(
              'text-[10px] uppercase tracking-[0.08em] font-semibold',
              'text-[var(--text-secondary)]',
              'group-hover:text-[var(--text-primary)] transition-colors',
              'truncate'
            )}
          >
            {label}
          </span>
          {isSimulated && (
            <span
              className={cn(
                'shrink-0 px-1 py-0.2 rounded text-[8px] font-mono font-medium uppercase',
                'bg-[var(--accent-dim)] text-[var(--accent)] border border-[var(--accent-border)]'
              )}
            >
              SIM
            </span>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              'w-6 h-6 sm:w-7 sm:h-7 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0',
              'bg-[var(--bg-elevated)] border border-[var(--border-default)]',
              'text-[var(--text-muted)] group-hover:text-[var(--accent)]',
              'transition-colors duration-150'
            )}
          >
            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        )}
      </div>

      {/* Primary value */}
      <div className="mt-2.5 flex items-baseline gap-1.5 min-w-0">
        <span className="metric-value text-[var(--text-primary)]">
          {value}
        </span>
        {unit && (
          <span className="text-[11px] text-[var(--text-secondary)] font-tabular shrink-0">
            {unit}
          </span>
        )}
      </div>

      {/* Footer: trend + sparkline */}
      <div
        className={cn(
          'mt-2.5 pt-2 border-t border-[var(--border-subtle)]',
          'flex items-center justify-between gap-2',
          'text-[10px] text-[var(--text-secondary)]'
        )}
      >
        <div className="flex items-center gap-1.5 truncate min-w-0">
          {trend && (
            <span
              className={cn(
                'shrink-0 font-medium text-[9px] px-1 py-0.2 rounded',
                trendDirection === 'up'      && 'text-emerald-400 bg-[var(--status-green-dim)] border border-emerald-500/20',
                trendDirection === 'down'    && 'text-[var(--status-red)] bg-[var(--status-red-dim)] border border-rose-500/20',
                trendDirection === 'neutral' && 'text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]'
              )}
            >
              {trend}
            </span>
          )}
          <span className="truncate text-[10px]">{subtext || 'Nominal stream'}</span>
        </div>

        {/* Sparkline */}
        <svg
          className="w-14 h-3.5 shrink-0 overflow-visible opacity-75 group-hover:opacity-100 transition-opacity"
          style={{ color: sparklineColor }}
          aria-hidden="true"
        >
          <path
            d="M 0 10 L 10 6 L 19 8 L 29 3 L 39 7 L 48 3 L 56 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function StatusBadge({
  status,
  size = 'md',
}: {
  status: string;
  size?: 'sm' | 'md';
}) {
  const norm = status?.toUpperCase() || 'UNKNOWN';

  const isGreen  = ['RUNNING','ONLINE','OPTIMAL','ACTIVE','CONNECTED','PASSED','RESOLVED','CLOSED'].includes(norm);
  const isYellow = ['WARNING','IDLE','DEGRADED','CALIBRATING','PENDING_PARTS','IN_PROGRESS','ASSIGNED','STANDBY'].includes(norm);
  const isRed    = ['CRITICAL','ALARM','OFFLINE','ERROR','FAILED','HIGH','URGENT'].includes(norm);
  const isBlue   = ['INFO','OPEN','TEST','LOW'].includes(norm);

  const sizeClass = size === 'sm'
    ? 'px-1.5 py-[2px] text-[9px]'
    : 'px-2 py-[3px] text-[10px]';

  const base = cn(
    'inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] font-medium tracking-wide',
    sizeClass
  );

  if (isGreen) return (
    <span className={cn(base, 'bg-[var(--status-green-dim)] text-emerald-400 border border-[rgba(16,185,129,0.22)] light:text-emerald-700')}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
      {status}
    </span>
  );

  if (isYellow) return (
    <span className={cn(base, 'bg-[var(--status-amber-dim)] text-[var(--accent)] border border-[var(--accent-border)]')}>
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
      {status}
    </span>
  );

  if (isRed) return (
    <span className={cn(base, 'bg-[var(--status-red-dim)] text-[var(--status-red)] border border-[rgba(239,68,68,0.25)] light:text-rose-700')}>
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-red)] shrink-0" />
      {status}
    </span>
  );

  if (isBlue) return (
    <span className={cn(base, 'bg-[var(--status-cyan-dim)] text-[var(--status-cyan)] border border-[rgba(6,182,212,0.22)] light:text-cyan-700')}>
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-cyan)] shrink-0" />
      {status}
    </span>
  );

  return (
    <span className={cn(base, 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)]')}>
      {status}
    </span>
  );
}

export function TelemetryPill({
  label,
  value,
  unit,
  status = 'nominal',
}: {
  label: string;
  value: string | number;
  unit?: string;
  status?: 'nominal' | 'warning' | 'alert';
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)]',
        'bg-[var(--bg-elevated)] border border-[var(--border-subtle)]',
        'text-[11px] font-tabular'
      )}
    >
      <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide">
        {label}:
      </span>
      <span
        className={cn(
          'font-semibold',
          status === 'nominal' && 'text-[var(--text-primary)]',
          status === 'warning' && 'text-[var(--accent)]',
          status === 'alert'   && 'text-[var(--status-red)]'
        )}
      >
        {value}
      </span>
      {unit && (
        <span className="text-[var(--text-muted)] text-[10px]">{unit}</span>
      )}
    </div>
  );
}
