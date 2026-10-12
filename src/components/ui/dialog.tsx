'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Dialog({ open, onClose, title, description, children, size = 'md' }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={cn(
          'relative w-full rounded-[var(--radius-lg)]',
          'bg-[var(--bg-card-solid)] border border-[var(--border-default)]',
          'shadow-[0_20px_50px_rgba(0,0,0,0.6)]',
          'animate-fade-up',
          widths[size]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40">
          <div>
            <h2 id="dialog-title" className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight uppercase tracking-wider font-mono">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-[11px] text-[var(--text-secondary)] leading-relaxed">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors -mr-1 -mt-1 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Body */}
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

// ── Form field helpers ──────────────────────────────────────────

export function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] font-mono">
        {label}{required && <span className="text-[var(--status-red)] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-[10px] text-[var(--status-red)] font-mono">{error}</p>}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full px-3 py-1.5 rounded-[var(--radius-sm)] text-[12px] font-mono',
        'bg-[var(--bg-input)] border border-[var(--border-default)]',
        'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
        'focus:outline-none focus:border-[var(--accent-border)] focus:ring-1 focus:ring-[var(--accent-border)]',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full px-3 py-1.5 rounded-[var(--radius-sm)] text-[12px] font-mono',
        'bg-[var(--bg-input)] border border-[var(--border-default)]',
        'text-[var(--text-primary)]',
        'focus:outline-none focus:border-[var(--accent-border)]',
        'transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full px-3 py-2 rounded-[var(--radius-sm)] text-[12px] font-mono',
        'bg-[var(--bg-input)] border border-[var(--border-default)]',
        'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
        'focus:outline-none focus:border-[var(--accent-border)] focus:ring-1 focus:ring-[var(--accent-border)]',
        'resize-none transition-colors',
        className
      )}
      {...props}
    />
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  loading?: boolean;
}

export function Button({ variant = 'primary', loading, disabled, children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-[var(--radius-sm)] text-[11px] font-semibold font-mono tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-[var(--accent-dim)] border border-[var(--accent-border)] text-[var(--accent)] hover:bg-[var(--accent-glow)]',
    ghost:   'bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]',
    danger:  'bg-[var(--status-red-dim)] border border-[rgba(239,68,68,0.3)] text-[var(--status-red)] hover:bg-[rgba(239,68,68,0.2)]',
  };
  return (
    <button
      disabled={disabled || loading}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {loading && (
        <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ── Toast notification ──────────────────────────────────────────

export function Toast({ message, type, onClose }: {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: 'bg-[var(--bg-card-solid)] border-[rgba(16,185,129,0.3)] text-emerald-400',
    error:   'bg-[var(--bg-card-solid)] border-[rgba(239,68,68,0.3)] text-[var(--status-red)]',
    info:    'bg-[var(--bg-card-solid)] border-[var(--accent-border)] text-[var(--accent)]',
  };

  return (
    <div className={cn(
      'fixed bottom-5 right-5 z-[100]',
      'flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-md)]',
      'border shadow-lg text-[11px] font-mono font-medium',
      'animate-fade-up',
      colors[type]
    )}>
      <span>{message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 ml-1">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ── Confirm dialog ──────────────────────────────────────────────

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
}) {
  return (
    <Dialog open={open} onClose={onClose} title={title} size="sm">
      <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed mb-4">{message}</p>
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
      </div>
    </Dialog>
  );
}
