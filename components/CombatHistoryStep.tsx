import React, { useState, useEffect } from 'react';
import { ProgressBar } from './ProgressBar';
import { Trophy, Activity, Dumbbell, Ban, CheckCircle2 } from 'lucide-react';
import { EvidenceScreen } from './EvidenceScreen';

interface CombatHistoryStepProps {
  onNext: () => void;
}

export const CombatHistoryStep: React.FC<CombatHistoryStepProps> = ({ onNext }) => {
  const [historyOption, setHistoryOption] = useState<string | null>(null);
  const [pushupOption, setPushupOption] = useState<string | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);
  const [userAge, setUserAge] = useState('30-39');

  // Load user age for the dynamic feedback box
  useEffect(() => {
    const savedAge = localStorage.getItem('user_age_range');
    if (savedAge) setUserAge(savedAge);
  }, []);

  const HISTORY_OPTIONS = [
    { id: 'sedentary', label: 'Nunca he entrenado', sub: 'Principiante Absoluto', icon: Ban },
    { id: 'light', label: 'Entreno ocasionalmente', sub: 'Sin rutina fija', icon: Activity },
    { id: 'regular', label: 'Entreno regularmente', sub: '2-3 veces/semana', icon: Dumbbell },
    { id: 'athlete', label: 'Estuve en forma antes', sub: 'Memoria muscular activa', icon: Trophy },
  ];

  // Updated options with Emojis and "Visual" style
  const PUSHUP_OPTIONS = [
    { id: '0-5', label: 'Menos de 5', emoji: '😵', sub: 'Necesito ayuda' },
    { id: '5-10', label: '5 a 10', emoji: '😐', sub: 'Promedio' },
    { id: '10-20', label: '10 a 20', emoji: '💪', sub: 'En forma' },
    { id: '20+', label: 'Más de 20', emoji: '🦁', sub: 'Bestia' },
  ];

  const handleHistorySelect = (id: string) => {
    setHistoryOption(id);
    localStorage.setItem('user_training_history', id);
    // Smooth scroll to Part B after a tiny delay to allow render
    setTimeout(() => {
        const element = document.getElementById('aptitude-test');
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePushupSelect = (id: string) => {
    setPushupOption(id);
    localStorage.setItem('user_pushup_level', id);
    // Transition to Evidence Screen immediately instead of a loader
    setShowEvidence(true);
  };

  // RENDER THE NEW EVIDENCE SCREEN INSTEAD OF BLUE BOX LOADER
  if (showEvidence) {
    return <EvidenceScreen onNext={onNext} />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 pb-10">
      <ProgressBar progress={85} label="FASE 6 DE 7 — HISTORIAL DE COMBATE" />

      {/* PART A: GENERAL EXPERIENCE */}
      <div className="space-y-3 mb-8 text-center">
        <h2 className="text-2xl font-semibold text-white leading-tight">
          Definamos tu punto de partida.
        </h2>
        <p className="text-zinc-400 text-sm">
          Para evitar lesiones y maximizar la hipertrofia, necesitamos saber tu experiencia previa.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {HISTORY_OPTIONS.map((option) => {
          const isSelected = historyOption === option.id;
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => handleHistorySelect(option.id)}
              className={`
                relative w-full flex items-center p-4 rounded-xl border transition-all duration-300
                ${isSelected 
                  ? 'bg-[#1A1A1A] border-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.15)] translate-x-1' 
                  : 'bg-[#1A1A1A] border-[#27272A] hover:border-zinc-600'
                }
                ${historyOption && !isSelected ? 'opacity-50 grayscale' : 'opacity-100'}
              `}
            >
              <div className={`p-2 rounded-lg mr-4 ${isSelected ? 'bg-[#291610] text-[#FF5722]' : 'bg-zinc-800 text-zinc-400'}`}>
                <Icon size={20} />
              </div>
              <div className="flex flex-col items-start">
                <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                    {option.label}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wide">
                    {option.sub}
                </span>
              </div>
              {isSelected && <CheckCircle2 className="absolute right-4 text-[#FF5722]" size={18} />}
            </button>
          );
        })}
      </div>

      {/* PART B: APTITUDE TEST (EXPANDABLE) */}
      {historyOption && (
        <div id="aptitude-test" className="animate-in slide-in-from-bottom-10 fade-in duration-700 pt-6 border-t border-[#27272A]">
           
           <div className="mb-6 flex items-start gap-3">
              <div className="mt-1 bg-[#FF5722] h-6 w-1 rounded-full shrink-0" />
              <div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-wider">
                    PRUEBA DE APTITUD RÁPIDA
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                    ¿Cuántas <span className="text-white font-bold">flexiones estrictas</span> (pecho al suelo) puedes hacer ahora mismo sin detenerte?
                </p>
              </div>
           </div>

           {/* UPDATED GRID DESIGN - 2x2 with Emojis */}
           <div className="grid grid-cols-2 gap-3">
              {PUSHUP_OPTIONS.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => handlePushupSelect(opt.id)}
                    className={`
                        group relative flex flex-col items-center justify-center py-5 px-3 rounded-xl border transition-all duration-200 active:scale-95
                        bg-[#1A1A1A] border-[#27272A] hover:border-zinc-500
                    `}
                >
                    <span className="text-3xl mb-2 filter drop-shadow-md">
                        {opt.emoji}
                    </span>
                    <span className="text-lg font-black text-white leading-none mb-1">
                        {opt.label}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        {opt.sub}
                    </span>
                </button>
              ))}
           </div>
           
           <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
                <Activity size={12} className="text-zinc-500" />
                <span className="text-[10px] text-zinc-500">Esto calibra la intensidad inicial de tu plan.</span>
           </div>

        </div>
      )}

    </div>
  );
};
