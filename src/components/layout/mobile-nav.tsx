'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBAR_SECTIONS } from './navigation-data';
import { ReactorLogo } from './reactor-logo';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => { onClose(); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw]',
          'flex flex-col',
          'sidebar-glass',
          'animate-slide-in-left'
        )}
      >
        {/* Header */}
        <div className="px-4 py-3.5 flex items-center justify-between border-b border-[var(--border-subtle)] shrink-0">
          <div className="flex items-center gap-2.5">
            <ReactorLogo className="w-6 h-6 shrink-0" />
            <div>
              <p className="text-[13px] font-semibold text-[var(--text-primary)] tracking-tight leading-none">DIMO</p>
              <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider leading-none mt-1 font-mono">Reactor Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick stats strip */}
        <div className="px-4 py-2.5 grid grid-cols-2 gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 shrink-0">
          {[
            { label: 'Reactors', value: '5 / 10', color: 'text-[var(--text-primary)]' },
            { label: 'Alerts', value: '2 Crit', color: 'text-[var(--status-red)]' },
            { label: 'Power', value: '75.0 kW', color: 'text-[var(--text-secondary)]' },
            { label: 'Stream', value: '142 Hz', color: 'text-[var(--status-green)]' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] leading-none mb-1 font-mono">{label}</p>
              <p className={cn('text-[11px] font-semibold font-tabular leading-none', color)}>{value}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4" aria-label="Mobile navigation">
          {SIDEBAR_SECTIONS.map((section) => {
            const hasActiveChild = section.items.some(
              (i) => pathname === i.href || pathname.startsWith(i.href + '/')
            );
            const SectionIcon = section.icon;

            return (
              <div key={section.title}>
                <div className="flex items-center gap-2 px-2 pb-1.5">
                  <SectionIcon className="w-3 h-3 shrink-0 text-[var(--text-muted)]" />
                  <span className={cn(
                    'text-[9px] font-semibold uppercase tracking-[0.1em] leading-none font-mono',
                    hasActiveChild ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                  )}>
                    {section.title.replace(/^[A-Z]\.\s/, '')}
                  </span>
                </div>
                <div className="space-y-[1px]">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between px-2.5 py-2 rounded-[var(--radius-sm)] transition-colors group',
                          isActive
                            ? 'bg-[var(--accent-dim)] border-l-2 border-[var(--accent)] text-[var(--text-primary)]'
                            : 'border-l-2 border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/70'
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <ItemIcon
                            className={cn('w-3.5 h-3.5 shrink-0 transition-colors', isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]')}
                          />
                          <span className={cn('text-[12px] leading-tight truncate', isActive ? 'font-semibold text-[var(--text-primary)]' : 'font-normal')}>
                            {item.title}
                          </span>
                        </div>
                        {item.badge && (
                          <span className={cn(
                            'text-[8.5px] font-mono px-1.5 py-[1px] rounded-[3px] font-medium shrink-0 ml-2 leading-none',
                            isActive ? 'bg-[var(--accent-glow)] text-[var(--accent)] font-semibold' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                          )}>
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

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[var(--border-subtle)] shrink-0 bg-[var(--bg-elevated)]/20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-green)] shrink-0" />
            <span className="text-[11px] text-[var(--text-secondary)] font-mono">Edge Gateways Online</span>
          </div>
        </div>
      </div>
    </>
  );
}
