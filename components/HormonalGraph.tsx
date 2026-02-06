import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface HormonalGraphProps {
  onNext: () => void;
}

export const HormonalGraph: React.FC<HormonalGraphProps> = ({ onNext }) => {
  const [age, setAge] = useState<string>('30-39');
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    const storedAge = localStorage.getItem('user_age_range');
    if (storedAge) setAge(storedAge);
    
    // Trigger animation slightly after mount
    setTimeout(() => setAnimationActive(true), 100);
  }, []);

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-700 pb-8">
      
      {/* 1. HEADER GROUP - Centralized with rhythmic spacing */}
      <div className="flex flex-col items-center space-y-4 mb-8 text-center w-full px-4">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                ANÁLISIS EN CURSO
            </span>
        </div>
        <h2 className="text-xl font-bold text-white uppercase leading-tight max-w-[280px]">
          DATO CLAVE PARA TU PERFIL DE <span className="text-[#FF5722] block mt-1">{age} AÑOS</span>
        </h2>
      </div>

      {/* 2. CHART CONTAINER - Strict Full Width relative to container */}
      <div className="relative w-full aspect-[16/10] mb-8 select-none">
            
        {/* Vertical Bars Background */}
        <div className="absolute inset-0 flex justify-between px-4 z-0 opacity-20">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-[12%] h-full bg-[#333] rounded-sm" />
            ))}
        </div>

        {/* SVG Chart */}
        <svg className="absolute inset-0 w-full h-full z-10 overflow-visible" viewBox="0 0 350 200" preserveAspectRatio="none">
            
            {/* Curve 1: Cortisol (White) - High to Low */}
            <path 
                d="M 20,40 C 120,40 180,160 330,160" 
                fill="none" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinecap="round"
                className="drop-shadow-md"
                strokeDasharray="400"
                strokeDashoffset={animationActive ? "0" : "400"}
                style={{ transition: 'stroke-dashoffset 2s ease-out' }}
            />

            {/* Curve 2: Testosterone (Orange) - Low to High */}
            <path 
                d="M 20,160 C 120,160 180,40 330,40" 
                fill="none" 
                stroke="#FF5722" 
                strokeWidth="4" 
                strokeLinecap="round"
                className="drop-shadow-lg"
                strokeDasharray="400"
                strokeDashoffset={animationActive ? "0" : "400"}
                style={{ transition: 'stroke-dashoffset 2s ease-out' }}
            />

            {/* White Dot (End of Cortisol) */}
            <circle 
                cx="330" cy="160" r="5" fill="white" 
                className={`transition-opacity duration-300 delay-[2000ms] ${animationActive ? 'opacity-100' : 'opacity-0'}`} 
            />

            {/* Orange Dot (End of Testosterone) */}
            <circle 
                cx="330" cy="40" r="5" fill="#FF5722" 
                className={`transition-opacity duration-300 delay-[2000ms] ${animationActive ? 'opacity-100' : 'opacity-0'}`} 
            />
        </svg>

        {/* Labels inside the graph area - Adjusted for clear separation above/below lines */}
        
        {/* Cortisol: Above the white line start (y=40) */}
        <span className="absolute top-[5%] left-0 text-white font-bold text-sm tracking-wide bg-[#0D0D0D]/50 px-1 rounded">
            Cortisol
        </span>

        {/* Testosterone: Below the orange line start (y=160) */}
        <span className="absolute bottom-[5%] left-0 text-[#FF5722] font-bold text-sm tracking-wide bg-[#0D0D0D]/50 px-1 rounded">
            Testosterona
        </span>

        {/* X-Axis Labels - Absolute aligned strictly to edges */}
        <span className="absolute -bottom-6 left-0 text-zinc-400 text-sm font-medium">Ahora</span>
        <span className="absolute -bottom-6 right-0 text-zinc-400 text-sm font-medium">6 meses</span>

        {/* Bicep Icon Box */}
        <div className={`absolute top-[5%] right-0 transform translate-x-2 -translate-y-2 z-20 transition-opacity duration-500 delay-[2000ms] ${animationActive ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-[#FF5722] p-1.5 rounded-sm shadow-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="-9 -9 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        fill="rgb(18,18,18)" 
                        fillOpacity="1" 
                        d="M-8,0.5849999785423279 C-8,0.5849999785423279 -7.251999855041504,-0.5849999785423279 -4.922999858856201,-0.5849999785423279 C-2.5940001010894775,-0.5849999785423279 -1.8459999561309814,1.1710000038146973 -1.8459999561309814,1.1710000038146973 C-1.8459999561309814,1.1710000038146973 0.6150000095367432,-1.1699999570846558 3.0769999027252197,1.1710000038146973 C3.0769999027252197,1.1710000038146973 0.5820000171661377,-3.3299999237060547 0,-5.26800012588501 C0,-5.26800012588501 -1.2309999465942383,-4.684000015258789 -1.2309999465942383,-4.684000015258789 C-1.2309999465942383,-4.684000015258789 -3.691999912261963,-4.684000015258789 -3.691999912261963,-4.684000015258789 C-3.691999912261963,-4.684000015258789 -5.113999843597412,-6.811999797821045 -3.0769999027252197,-8.196999549865723 C-3.0769999027252197,-8.196999549865723 0.10000000149011612,-7.823999881744385 1.8459999561309814,-6.439000129699707 C3.5929999351501465,-5.054999828338623 7.126999855041504,-2.8889999389648438 8,2.927999973297119 C8,2.927999973297119 5.98799991607666,5.302000045776367 3.0769999027252197,5.855000019073486 C0.16599999368190765,6.408999919891357 -2.4619998931884766,5.855000019073486 -2.4619998931884766,5.855000019073486 C-2.4619998931884766,5.855000019073486 -4.50600004196167,8.196999549865723 -8,8.196999549865723 C-8,8.196999549865723 -8,0.5849999785423279 -8,0.5849999785423279z"
                    />
                </svg>
            </div>
        </div>
      </div>

      {/* 3. TEXT GROUP - Left aligned, strictly matching graph width, grouped logic */}
      <div className="w-full space-y-3 mb-8 mt-2">
        <p className="text-white text-[15px] leading-snug font-normal text-left">
          Un entrenamiento demasiado intenso puede aumentar tus niveles de cortisol y dificultar el incremento de masa muscular. Adaptamos tu plan para que puedas conseguir tus objetivos sin excederte.
        </p>
        <p className="text-left text-zinc-500 text-[11px]">
          *Basado en datos de 1.3 millones de entrenamientos
        </p>
      </div>

      {/* 4. ACTION - Centered Full Width Button */}
      <div className="w-full flex justify-center">
        <button
            onClick={onNext}
            className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-orange-900/20"
        >
            <span>Ver Mi Estado Hormonal Actual</span>
            <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
};