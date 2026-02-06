import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Database, ChevronRight } from 'lucide-react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [linesVisible, setLinesVisible] = useState([false, false, false]);
  
  // Data State
  const [userData, setUserData] = useState({
    age: '30-39',
    bodyType: 'ENDOMORFO',
    imc: '26.5',
    mission: 'SECADO TÁCTICO'
  });

  // --- 1. DATA RETRIEVAL & FORMATTING ---
  useEffect(() => {
    // Helpers to format raw IDs into display text
    const formatBodyType = (id: string | null) => {
      if (!id) return 'ENDOMORFO';
      const map: Record<string, string> = {
        'ecto': 'ECTOMORFO',
        'meso': 'MESOMORFO',
        'endo': 'ENDOMORFO',
        'endo-sev': 'ENDO SEVERO'
      };
      return map[id] || 'ESTÁNDAR';
    };

    const formatMission = (id: string | null) => {
      if (!id) return 'SECADO TÁCTICO';
      const map: Record<string, string> = {
        'fat_loss': 'ELIMINAR GRASA',
        'muscle_gain': 'GANAR MASA',
        'recomp': 'RECOMPOSICIÓN',
        'reactivation': 'REACTIVACIÓN'
      };
      return map[id] || 'GENERAL';
    };

    // Retrieve
    const age = localStorage.getItem('user_age_range') || '30-39';
    const bodyRaw = localStorage.getItem('user_body_type');
    const imcRaw = localStorage.getItem('user_imc');
    const missionRaw = localStorage.getItem('user_mission_objective');

    setUserData({
      age,
      bodyType: formatBodyType(bodyRaw),
      imc: imcRaw || '26.5',
      mission: formatMission(missionRaw)
    });

  }, []);

  // --- 2. PROGRESS BAR LOGIC ---
  useEffect(() => {
    const duration = 3000; // 3 seconds to reach 90%
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 90 / steps;

    let currentProgress = 0;
    
    const timer = setInterval(() => {
      currentProgress += increment;
      
      // Phase 1: Linear to 90%
      if (currentProgress < 90) {
        setProgress(currentProgress);
      } 
      // Phase 2: Boost to 100%
      else {
        clearInterval(timer);
        setProgress(90);
        
        // Boost delay
        setTimeout(() => {
          setProgress(100);
          setTimeout(onComplete, 800); // Small delay after 100% before redirect
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // --- 3. CHECKPOINT ANIMATION (TYPEWRITER SEQUENCE) ---
  useEffect(() => {
    const sequence = [400, 1400, 2400]; // Delays for each line
    
    sequence.forEach((delay, index) => {
      setTimeout(() => {
        setLinesVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, delay);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between pt-20 pb-10 px-6 font-sans relative overflow-hidden">
      
      {/* Background Tech Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF5722] to-transparent opacity-50"></div>
      <div className="absolute top-10 right-10 text-zinc-800 animate-pulse">
        <Cpu size={120} strokeWidth={0.5} opacity={0.1} />
      </div>

      {/* HEADER */}
      <div className="z-10 text-center mb-12 animate-in fade-in duration-1000">
        <div className="inline-flex items-center gap-2 mb-4">
           <Database size={16} className="text-[#FF5722] animate-pulse" />
           <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
             SISTEMA CENTRAL V.2.4
           </span>
        </div>
        <h1 className="text-3xl font-black uppercase leading-none tracking-tight">
          CALIBRANDO PROTOCOLO <span className="text-[#FF5722]">MILITAR</span>
        </h1>
      </div>

      {/* CHECKPOINTS (TERMINAL STYLE) */}
      <div className="flex-1 w-full max-w-sm mx-auto space-y-6 z-10 font-mono text-sm">
        
        {/* Line 1 */}
        <div className={`transition-all duration-500 ${linesVisible[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
            <span className="text-zinc-400">Perfil Hormonal</span>
            <span className="text-[#FF5722] font-bold">({userData.age})</span>
          </div>
          <div className="flex justify-end mt-1 text-[10px] text-green-500 font-bold tracking-widest items-center gap-1">
            VERIFICADO <ShieldCheck size={10} />
          </div>
        </div>

        {/* Line 2 */}
        <div className={`transition-all duration-500 ${linesVisible[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
            <span className="text-zinc-400">Metabolismo</span>
            <span className="text-[#FF5722] font-bold">({userData.bodyType})</span>
          </div>
          <div className="flex justify-end mt-1 text-[10px] text-green-500 font-bold tracking-widest items-center gap-1">
             IMC {userData.imc} <ChevronRight size={8} /> LISTO
          </div>
        </div>

        {/* Line 3 */}
        <div className={`transition-all duration-500 ${linesVisible[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
            <span className="text-zinc-400">Misión</span>
            <span className="text-[#FF5722] font-bold">({userData.mission})</span>
          </div>
          <div className="flex justify-end mt-1 text-[10px] text-green-500 font-bold tracking-widest items-center gap-1">
            OPTIMIZADO <ShieldCheck size={10} />
          </div>
        </div>

      </div>

      {/* FOOTER PROGRESS BAR */}
      <div className="z-10 w-full max-w-sm mx-auto mt-auto">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] text-zinc-400 font-mono animate-pulse">
            {progress < 100 ? 'Generando protocolo personalizado...' : 'Redirigiendo al plan...'}
          </span>
          <span className="text-lg font-black text-[#FF5722] tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        
        <div className="h-2 w-full bg-zinc-900 rounded-none overflow-hidden border border-zinc-800">
          <div 
            className="h-full bg-[#FF5722] shadow-[0_0_15px_#FF5722]"
            style={{ 
              width: `${progress}%`,
              transition: progress === 100 ? 'width 0.5s ease-out' : 'width 0.1s linear'
            }}
          />
        </div>
        
        {/* Decorative Grid Line */}
        <div className="w-full flex justify-between mt-6 opacity-30">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-1 w-px bg-[#FF5722]"></div>
          ))}
        </div>
      </div>

    </div>
  );
};
