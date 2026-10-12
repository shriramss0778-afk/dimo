'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, Database, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileNav } from './mobile-nav';
import Link from 'next/link';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dbState, setDbState] = useState<'checking' | 'connected' | 'simulated'>('checking');
  const [telemetryTime, setTelemetryTime] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setDbState(d.database?.status === 'connected' ? 'connected' : 'simulated'))
      .catch(() => setDbState('simulated'));

    const t = setInterval(() => {
      setTelemetryTime(new Date().toTimeString().slice(0, 8));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <header className="header-glass h-12 px-3 sm:px-5 flex items-center gap-2.5 sm:gap-3 sticky top-0 z-20 shrink-0">

        {/* Hamburger — functional on mobile, hidden on desktop */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="lg:hidden p-1.5 -ml-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-[var(--radius-sm)] transition-colors shrink-0"
          aria-label="Open navigation"
          aria-expanded={mobileNavOpen}
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Search Input */}
        <div className="relative flex-1 min-w-0 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules, reactors, sensors..."
            aria-label="Search DIMO"
            className={cn(
              'w-full pl-8 pr-3 py-1.5 rounded-[var(--radius-sm)] text-[12px] font-mono',
              'bg-[var(--bg-input)] border border-[var(--border-subtle)]',
              'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
              'focus:outline-none focus:border-[var(--accent-border)] focus:ring-1 focus:ring-[var(--accent-border)]',
              'transition-all duration-150'
            )}
          />
        </div>

        {/* Spacer */}
        <div className="flex-1 hidden sm:block" />

        {/* Right controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Precision Telemetry Clock */}
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-tabular text-[var(--text-muted)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40">
            {telemetryTime || '00:00:00'} IST
          </span>

          {/* DB / Telemetry Stream indicator */}
          <div
            className={cn(
              'hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-sm)] text-[10px] font-mono border',
              dbState === 'connected'
                ? 'bg-[var(--status-green-dim)] border-[rgba(16,185,129,0.22)] text-emerald-700'
                : 'bg-[var(--accent-dim)] border-[var(--accent-border)] text-[var(--accent)]'
            )}
            title={dbState === 'connected' ? 'Neon Serverless Connected' : 'Simulated Telemetry Ingestion Active'}
          >
            <Database className="w-3 h-3 shrink-0" />
            <span className="font-semibold whitespace-nowrap hidden md:inline">
              {dbState === 'connected' ? 'NEON: ONLINE' : 'TELEMETRY: ACTIVE'}
            </span>
            <span className={cn('w-1.5 h-1.5 rounded-full shrink-0',
              dbState === 'connected' ? 'bg-emerald-600' : 'bg-[var(--accent)]'
            )} />
          </div>

          {/* Alarm Dispatch Shortcut */}
          <Link
            href="/reactor-health/alarms"
            aria-label="Alarms"
            className="relative p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--status-red)]" />
          </Link>

        </div>
      </header>

      {/* Mobile navigation drawer */}
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
