'use client';

import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { cn } from '@/lib/utils';

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  section?: string;
  action?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageShell({ children, title, subtitle, section, action }: PageShellProps) {
  return (
    <div className="page-shell min-h-screen flex bg-[var(--bg-base)] text-[var(--text-primary)] overflow-x-hidden">

      {/* Subtle ambient foundation — behind interface */}
      <div className="dimo-bg" aria-hidden="true" />

      {/* Sidebar — static on desktop (≥1024px), drawer on mobile */}
      <Sidebar />

      {/* Main content column — fills remaining width */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Header />

        <main
          className="flex-1 page-content-padding space-y-4"
          role="main"
          id="main-content"
        >
          {/* ── Page header ─────────────────────────────── */}
          <div className="pb-3 border-b border-[var(--border-subtle)]">
            {section && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] mb-1">
                {section}
              </p>
            )}

            {/* Title row — wraps on mobile so action never clips */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <h1 className="page-title text-[var(--text-primary)]">{title}</h1>
                {subtitle && (
                  <p className="mt-1 text-[12px] text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    {subtitle}
                  </p>
                )}
              </div>

              {action && (
                <div className="flex flex-wrap items-center gap-2 shrink-0 sm:mt-0.5">
                  {action}
                </div>
              )}
            </div>
          </div>

          {/* ── Page content ─────────────────────────────── */}
          <div className="space-y-4 animate-fade-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
