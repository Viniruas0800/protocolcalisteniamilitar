import React, { useEffect, useState } from 'react';
import { Check, ShieldAlert, Timer } from 'lucide-react';

interface EvidenceScreenProps {
  onNext: () => void;
}

export const EvidenceScreen: React.FC<EvidenceScreenProps> = ({ onNext }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-700 pb-6">
      
      {/* 1. HEADLINE DE IMPACTO */}
      <div className="text-center mb-6 space-y-2">
        <h2 className="text-2xl font-black italic text-white uppercase tracking-tight leading-none">
          ⚠️ ESTO VA A <br/>
          <span className="text-white">PASARTE A TI</span>
        </h2>
        <p className="text-zinc-400 text-sm font-medium">
          Tu transformación en <span className="text-[#FF5722] font-bold underline decoration-[#FF5722]/30 underline-offset-4">21 Días</span>
        </p>
      </div>

      {/* 2. COMPARATIVO VISUAL (Side-by-Side) */}
      <div className="w-full grid grid-cols-2 gap-3 mb-6 relative">
        
        {/* VS Badge Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#0D0D0D] border border-zinc-800 rounded-full p-1.5 shadow-xl">
          <span className="text-[10px] font-black text-white bg-zinc-800 rounded-full w-6 h-6 flex items-center justify-center">VS</span>
        </div>

        {/* Card ANTES */}
        <div className="relative group overflow-hidden rounded-xl border border-zinc-800 bg-[#1A1A1A] shadow-lg">
          <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-zinc-300 border border-white/10 tracking-widest uppercase">
            Día 0
          </div>
          <div className="aspect-[3/4] w-full relative">
            <img 
              src="https://i.postimg.cc/h417B05S/Antes.jpg" 
              alt="Antes" 
              className="w-full h-full object-cover grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-40"></div>
          </div>
        </div>

        {/* Card DESPUÉS */}
        <div className={`relative group overflow-hidden rounded-xl border border-[#FF5722] bg-[#1A1A1A] shadow-[0_0_20px_rgba(255,87,34,0.2)] transition-all duration-1000 ${mounted ? 'scale-[1.02]' : 'scale-100'}`}>
          <div className="absolute top-2 right-2 z-10 bg-[#FF5722] px-2 py-1 rounded text-[10px] font-black text-white shadow-lg tracking-widest uppercase animate-pulse">
            Día 21
          </div>
          <div className="aspect-[3/4] w-full relative">
            <img 
              src="https://i.imgur.com/M79HnO9.gif" 
              alt="Después" 
              className="w-full h-full object-cover"
            />
             {/* Subtle Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 animate-[shine_3s_infinite]"></div>
          </div>
        </div>
      </div>

      {/* 3. CONTEÚDO DE APOIO */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white uppercase leading-tight mb-4">
          De cuerpo común a <br/>
          <span className="text-[#FF5722] font-black text-xl bg-gradient-to-r from-[#FF5722] to-orange-500 bg-clip-text text-transparent">MÁQUINA DE GUERRA</span>
        </h3>
        
        {/* Pills Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {['Sin químicos', 'Sin gimnasio', 'Solo protocolo'].map((tag, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#27272A] px-3 py-1.5 rounded-full shadow-sm">
              <Check size={12} className="text-[#FF5722]" strokeWidth={3} />
              <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wide">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BOTÃO DE AÇÃO (PULSE GLOW) */}
      <div className="w-full mt-auto space-y-4">
        <button
          onClick={onNext}
          className="w-full relative group overflow-hidden bg-[#FF5722] hover:bg-[#F4511E] text-white py-4 rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-[0_0_30px_rgba(255,87,34,0.4)] animate-[pulse_2s_infinite]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite]"></div>
          <span className="relative z-10 flex items-center justify-center gap-2 font-black text-sm uppercase tracking-wider">
            👊 Continuar mi protocolo
          </span>
        </button>

        {/* 5. RODAPÉ DE URGÊNCIA */}
        <div className="flex items-center justify-center gap-2 opacity-80">
          <Timer size={14} className="text-[#FF5722]" />
          <p className="text-[10px] text-zinc-500 font-medium tracking-wide text-center">
            <span className="text-[#FF5722] font-bold">ACCESO LIMITADO:</span> Tu plaza está reservada por 10 min
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { opacity: 0; }
          50% { opacity: 0.5; }
          100% { opacity: 0; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
