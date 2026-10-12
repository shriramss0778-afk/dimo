export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Loading DIMO...
        </span>
      </div>
    </div>
  );
}
