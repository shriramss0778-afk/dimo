'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DatabaseStatus {
  configured: boolean;
  status: 'connected' | 'disconnected' | 'error' | 'checking';
  latencyMs?: number | null;
}

export function NeonConnectivityBanner({
  className,
  onRefresh,
}: {
  className?: string;
  onRefresh?: () => void;
}) {
  return null;
}

export function DisconnectedState() {
  return null;
}

export function EmptyState({
  title = 'No records found',
  description = 'There are currently no items matching your criteria in the system.',
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-10 px-4 border border-dashed border-[var(--border-subtle)] rounded-[var(--radius-lg)] bg-[var(--bg-card)]">
      <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-muted)] mx-auto flex items-center justify-center mb-2.5">
        <AlertTriangle className="w-4 h-4 text-[var(--accent)]" />
      </div>
      <h3 className="text-xs font-semibold text-[var(--text-primary)] font-mono uppercase tracking-wider">{title}</h3>
      <p className="text-[11px] text-[var(--text-secondary)] mt-1 max-w-sm mx-auto font-mono">{description}</p>
      {action && <div className="mt-3.5">{action}</div>}
    </div>
  );
}
