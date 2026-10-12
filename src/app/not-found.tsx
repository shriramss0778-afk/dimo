import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
      <div className="max-w-md w-full bg-white border border-zinc-200 rounded-lg p-6 shadow-xs text-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-500 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <h2 className="text-base font-semibold text-zinc-900">404 — Route Not Found</h2>
        <p className="text-xs text-zinc-500">
          The requested reactor telemetry node or management path does not exist.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-3 py-1.5 rounded bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition"
        >
          Return to Fleet Overview
        </Link>
      </div>
    </div>
  );
}
