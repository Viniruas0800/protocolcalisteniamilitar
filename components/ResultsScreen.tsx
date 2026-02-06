import React, { useEffect, useState } from 'react';
import { Share2, CheckCircle2, Shield, Lock, Award, ChevronRight, Star } from 'lucide-react';

interface ResultsScreenProps {
  onCtaClick: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ onCtaClick }) => {
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);

  // Data State
  const [userData, setUserData] = useState({
    age: '30-39',
    bodyType: 'ENDOMORFO',
    imc: '26.5',
    obstacle: 'MOTIVACIÓN'
  });

  useEffect(() => {
    setMounted(true);

    // Mapping for Obstacles to ensure Spanish translation
    const obstacleRaw = localStorage.getItem('user_main_obstacle');
    const OBSTACLE_MAP: Record<string, string> = {
      'time': 'FALTA DE TIEMPO',
      'motivation': 'MOTIVACIÓN',
      'consistency': 'CONSTANCIA',
      'diet': 'DIETA',
      'knowledge': 'CONOCIMIENTO'
    };

    // Retrieve Data
    setUserData({
      age: localStorage.getItem('user_age_range') || '30-39',
      bodyType: (localStorage.getItem('user_body_type') || 'Endomorfo').toUpperCase(),
      imc: localStorage.getItem('user_imc') || '26.5',
      obstacle: OBSTACLE_MAP[obstacleRaw || 'time'] || 'FALTA DE TIEMPO'
    });

    // Score Animation - Optimized for Elite Score (96)
    const interval = setInterval(() => {
      setScore(prev => {
        if (prev >= 96) {
          clearInterval(interval);
          return 96;
        }
        return prev + 2;
      });
    }, 20); // Slightly faster animation

    return () => clearInterval(interval);
  }, []);

  const BARS = [
    { label: 'Composición Corporal', value: 23, max: 25, color: 'bg-[#FF5722]', delay: 500 },
    { label: 'Capacidad Metabólica', value: 24, max: 25, color: 'bg-[#FF5722]', delay: 800 },
    { label: 'Perfil Hormonal', value: 22, max: 25, color: 'bg-[#FF5722]', delay: 1100 },
    { label: 'Potencial de Transformación', value: 25, max: 25, color: 'bg-[#FF5722]', delay: 1600 }
  ];

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] flex flex-col items-center relative overflow-hidden font-sans pb-28">

      {/* GLOBAL ATMOSPHERIC LIGHTING */}
      {/* Top Center Glow - The Main Light Source */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#FF5722]/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Bottom Ambience */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#FF5722]/5 to-transparent pointer-events-none z-0"></div>

      <div className="w-full max-w-md px-4 pt-6 relative z-10 flex flex-col items-center">

        {/* PREMIUM GLASS CARD CONTAINER */}
        <div className="w-full bg-[#121212]/80 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl shadow-black/50 overflow-hidden relative">

          {/* Internal Light Reflection at top of card */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

          <div className="p-6 flex flex-col items-center text-center">

            {/* 1. HERO SECTION: MEDAL & TITLE */}
            <div className={`transition-all duration-1000 transform ${mounted ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`}>

              {/* 3D MEDAL COMPOSITION */}
              <div className="relative w-32 h-32 mb-3 mx-auto filter drop-shadow-[0_15px_30px_rgba(255,87,34,0.3)]">
                <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
                  <defs>
                    {/* Gold/Bronze Gradient for Metal */}
                    <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF7ED" />
                      <stop offset="20%" stopColor="#FDBA74" />
                      <stop offset="50%" stopColor="#D97706" />
                      <stop offset="100%" stopColor="#78350F" />
                    </linearGradient>
                    {/* Deep Ribbon Gradient */}
                    <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7F1D1D" />
                      <stop offset="50%" stopColor="#B91C1C" />
                      <stop offset="100%" stopColor="#7F1D1D" />
                    </linearGradient>
                    {/* Inner Glow */}
                    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Ribbon (Behind) - Natural Hang */}
                  <path d="M30,0 L70,0 L70,50 L50,65 L30,50 Z" fill="url(#ribbonGradient)" />
                  <path d="M30,0 L30,50 L50,65 L50,0 Z" fill="black" fillOpacity="0.1" /> {/* Ribbon Fold Shadow */}

                  {/* Medal Body - 3D Sphere Effect */}
                  <circle cx="50" cy="65" r="28" fill="#502510" /> {/* Dark Shadow Base */}
                  <circle cx="50" cy="62" r="28" fill="url(#metalGradient)" stroke="#78350F" strokeWidth="1" />

                  {/* Inner Ring */}
                  <circle cx="50" cy="62" r="22" fill="none" stroke="#78350F" strokeWidth="0.5" opacity="0.5" />

                  {/* Star Emblem - Embossed Look */}
                  <path
                    d="M50 48 L54 58 L64 58 L56 66 L59 76 L50 70 L41 76 L44 66 L36 58 L46 58 Z"
                    fill="#FFF7ED"
                    filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.5))"
                  />

                  {/* Shine Highlight */}
                  <ellipse cx="40" cy="50" rx="8" ry="4" fill="white" opacity="0.3" transform="rotate(-45 40 50)" />
                </svg>

                {/* Glow Behind Medal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#FF5722] blur-[40px] opacity-60 -z-10 rounded-full"></div>
              </div>

              <h1 className="text-3xl font-extrabold italic uppercase leading-none text-white mb-6 tracking-tight drop-shadow-md">
                FELICITACIONES,
                <br />
                <span className="text-[#FF5722]">RECLUTA APROBABO!</span>
              </h1>
            </div>

            {/* 2. SCORE CARD - Sleek & Dark */}
            <div className={`w-full transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-between bg-[#0A0A0A] rounded-2xl p-5 border border-white/5 mb-6 shadow-inner relative overflow-hidden group">
                {/* Subtle Orange Gradient overlay on hover/active */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF5722]/5 to-transparent opacity-50"></div>

                <div className="relative z-10 flex flex-col items-start">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Puntaje Alpha</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white leading-none tracking-tighter">{score}</span>
                    <span className="text-sm text-zinc-600 font-medium">/100</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Award size={12} className="text-[#FF5722]" />
                    <span className="text-[10px] font-bold text-[#FF5722] tracking-wide">
                      RECLUTA DE ÉLITE
                    </span>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="border border-[#FF5722]/30 bg-[#FF5722]/10 px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(255,87,34,0.2)]">
                    <span className="text-xs font-black text-[#FF5722] tracking-wide">TOP 3%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. COMPETENCY BARS - Clean & Technical */}
            <div className="w-full space-y-6 mb-6">
              {BARS.map((bar, index) => (
                <div key={index} className="w-full">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                      {bar.label}
                    </span>
                    <span className="text-[10px] font-bold text-white font-mono">
                      {bar.value}<span className="text-zinc-600">/{bar.max}</span>
                    </span>
                  </div>
                  {/* Continuous Bar instead of segmented for cleaner look */}
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-[#FF5722] relative"
                      style={{
                        width: mounted ? `${(bar.value / bar.max) * 100}%` : '0%',
                        transition: `width 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${bar.delay}ms`
                      }}
                    >
                      {/* Shine effect on bar */}
                      <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-l from-white/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. DATA GRID - Minimalist */}
            <div className="w-full bg-[#0A0A0A]/50 border border-white/5 rounded-xl p-5 mb-4 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-left">
                <div>
                  <span className="text-[9px] text-zinc-600 uppercase block mb-1 tracking-wider">Edad</span>
                  <span className="text-sm font-bold text-white">{userData.age}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-600 uppercase block mb-1 tracking-wider">Morfología</span>
                  <span className="text-sm font-bold text-white truncate">{userData.bodyType}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-600 uppercase block mb-1 tracking-wider">IMC Actual</span>
                  <span className="text-sm font-bold text-white">{userData.imc}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-600 uppercase block mb-1 tracking-wider">Obstáculo</span>
                  <span className="text-sm font-bold text-[#FF5722] truncate">{userData.obstacle}</span>
                </div>
              </div>
            </div>

            {/* Compatibility - Footer Highlight */}
            <div className="w-full mt-2">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Compatibilidad</span>
                <span className="text-xs font-black text-[#FF5722]">99%</span>
              </div>
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF5722]"
                  style={{
                    width: mounted ? '99%' : '0%',
                    transition: 'width 2s ease-out 2s'
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* STICKY CTA FOOTER - Clean & Solid (No Glow) */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-5 bg-gradient-to-t from-black via-black/95 to-transparent pb-8">
        <div className="max-w-md mx-auto relative">
          <button
            onClick={onCtaClick}
            className="relative w-full bg-[#FF5722] text-white font-black text-sm py-4 rounded-2xl uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-[#F4511E] transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <span className="relative z-10">Acceder al Protocolo</span>
            <ChevronRight size={18} strokeWidth={3} className="relative z-10" />
          </button>
        </div>
      </div>

    </div>
  );
};
