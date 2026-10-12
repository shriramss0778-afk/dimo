import React from 'react';

export function ReactorLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Hexagonal Chamber Hull */}
        <path
          d="M18 2 L32 10 V26 L18 34 L4 26 V10 Z"
          fill="#18181b"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.25"
        />

        {/* Outer Microwave Waveguide Coupling Lines */}
        <line x1="18" y1="2" x2="18" y2="7" stroke="#f59e0b" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="18" y1="29" x2="18" y2="34" stroke="#f59e0b" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="4" y1="18" x2="9" y2="18" stroke="#f59e0b" strokeWidth="1.25" strokeLinecap="round" />
        <line x1="27" y1="18" x2="32" y2="18" stroke="#f59e0b" strokeWidth="1.25" strokeLinecap="round" />

        {/* Inner Resonant Vacuum Ring */}
        <circle
          cx="18"
          cy="18"
          r="9.5"
          fill="#1f1f23"
          stroke="#f59e0b"
          strokeWidth="1"
          strokeDasharray="2.5 1.5"
        />

        {/* Central CVD Plasma Core (Diamond Crystal) */}
        <path
          d="M18 12 L23 18 L18 24 L13 18 Z"
          fill="#f59e0b"
        />

        {/* Substrate Focus Center */}
        <circle cx="18" cy="18" r="2" fill="#ffffff" />
      </svg>
    </div>
  );
}
