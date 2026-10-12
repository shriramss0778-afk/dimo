'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
      <div className="max-w-md w-full bg-white border border-zinc-200 rounded-lg p-6 shadow-xs text-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h2 className="text-base font-semibold text-zinc-900">Application Error Encountered</h2>
        <p className="text-xs text-zinc-600 font-mono bg-zinc-50 p-2.5 rounded border border-zinc-200 text-left overflow-auto max-h-32">
          {error.message || 'An unexpected runtime error occurred.'}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reload View</span>
        </button>
      </div>
    </div>
  );
}
