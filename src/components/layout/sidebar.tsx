'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBAR_SECTIONS } from './navigation-data';
import { ReactorLogo } from './reactor-logo';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'sidebar-glass sidebar-desktop',
        'hidden lg:flex',
        'w-[236px] h-screen sticky top-0',
        'flex-col z-30 select-none shrink-0',
        'text-[var(--text-primary)]'
      )}
    >
      {/* ── Brand ────────────────────────────────────────── */}
      <div className="px-4 py-3.5 flex items-center gap-3 border-b border-[var(--border-subtle)] shrink-0">
        <ReactorLogo className="w-6 h-6 shrink-0" />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold leading-none text-[var(--text-primary)] tracking-tight">
            DIMO
          </p>
          <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider leading-none mt-1 font-mono">
            Reactor Intelligence
          </p>
        </div>
      </div>

      {/* ── Fleet Status Strip ───────────────────────────── */}
      <div className="px-4 py-2.5 grid grid-cols-2 gap-x-3 gap-y-2 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 shrink-0">
        <div>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] leading-none mb-1 font-mono">
            Reactors
          </p>
          <p className="text-[11px] font-semibold text-[var(--text-primary)] font-tabular leading-none">
            5 / 10 Online
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] leading-none mb-1 font-mono">
            Alerts
          </p>
          <p className="text-[11px] font-semibold text-[var(--status-red)] font-tabular leading-none">
            2 Critical
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] leading-none mb-1 font-mono">
            Total RF
          </p>
          <p className="text-[11px] font-semibold text-[var(--text-secondary)] font-tabular leading-none">
            75.0 kW
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] leading-none mb-1 font-mono">
            Stream
          </p>
          <p className="text-[11px] font-semibold text-[var(--status-green)] leading-none flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-green)] shrink-0" />
            142 Hz
          </p>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────── */}
      <nav
        className="flex-1 overflow-y-auto px-2.5 py-3 space-y-5"
        aria-label="Main navigation"
        style={{ scrollbarWidth: 'none' }}
      >
        {SIDEBAR_SECTIONS.map((section) => {
          const hasActiveChild = section.items.some(
            (i) => pathname === i.href || pathname.startsWith(i.href + '/')
          );
          const SectionIcon = section.icon;

          return (
            <div key={section.title}>
              {/* ── Section heading ── */}
              <div className="flex items-center gap-2 px-2 pb-1.5">
                <SectionIcon
                  className="w-3 h-3 shrink-0 text-[var(--text-muted)]"
                />
                <span
                  className={cn(
                    'text-[9px] font-semibold uppercase tracking-[0.1em] leading-none font-mono',
                    hasActiveChild
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-muted)]'
                  )}
                >
                  {section.title.replace(/^[A-Z]\.\s/, '')}
                </span>
              </div>

              {/* ── Nav items ── */}
              <div className="space-y-[9px]">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(item.href + '/');
                  const ItemIcon = item.icon;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between',
                        'px-2.5 py-1.5 rounded-[var(--radius-sm)]',
                        'transition-colors duration-100 group',
                        isActive
                          ? [
                            'bg-[var(--accent-dim)]',
                            'border-l-2 border-[var(--accent)]',
                            'text-[var(--text-primary)]',
                          ]
                          : [
                            'border-l-2 border-transparent',
                            'text-[var(--text-secondary)]',
                            'hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/70',
                          ]
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ItemIcon
                          className={cn(
                            'w-3.5 h-3.5 shrink-0 transition-colors',
                            isActive
                              ? 'text-[var(--accent)]'
                              : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
                          )}
                        />
                        <span
                          className={cn(
                            'text-[14px] leading-tight whitespace-nowrap',
                            isActive
                              ? 'font-semibold text-[var(--text-primary)]'
                              : 'font-normal'
                          )}
                        >
                          {item.title}
                        </span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            'text-[8.5px] font-mono px-1.5 py-[1px] rounded-[3px]',
                            'font-medium shrink-0 ml-2 leading-none',
                            isActive
                              ? 'bg-[var(--accent-glow)] text-[var(--accent)] font-semibold'
                              : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* ── Footer ───────────────────────────────────────── */}
      <div className="px-3.5 py-2.5 border-t border-[var(--border-subtle)] shrink-0 flex items-center justify-between bg-[var(--bg-elevated)]/20">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-green)] shrink-0" />
          <span className="text-[11px] text-[var(--text-secondary)] leading-none font-mono">
            Gateways Linked
          </span>
        </div>
      </div>
    </aside>
  );
}
