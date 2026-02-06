import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#27272A] py-2.5 flex justify-center items-center px-2">
      <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full border border-[#27272A] shadow-lg shadow-black/50 max-w-full overflow-hidden">
        <div className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF5722]"></span>
        </div>
        <span className="text-[9px] font-bold tracking-wide text-zinc-300 uppercase truncate">
          NUEVO MÉTODO 2026 — <span className="text-[#FF5722]">MÁS POTENTE. MÁS RÁPIDO. MÁS EFECTIVO</span>
        </span>
      </div>
    </div>
  );
};