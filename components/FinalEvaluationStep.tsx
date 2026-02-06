import React, { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { Clock, TrendingDown, Brain, Utensils, Ban, CheckCircle2 } from 'lucide-react';

interface FinalEvaluationStepProps {
  onNext: () => void;
}

export const FinalEvaluationStep: React.FC<FinalEvaluationStepProps> = ({ onNext }) => {
  const [selectedObstacle, setSelectedObstacle] = useState<string | null>(null);

  const OBSTACLES = [
    { 
      id: 'time', 
      label: 'Falta de Tiempo', 
      icon: Clock,
      resolution: 'SOLUCIÓN ACTIVADA: Protocolos de Densidad Metabólica de 18 min. Máximo impacto, mínimo tiempo.' 
    },
    { 
      id: 'motivation', 
      label: 'Pierdo la motivación rápido', 
      icon: TrendingDown,
      resolution: 'SOLUCIÓN ACTIVADA: El sistema militar no depende de la motivación, sino de la disciplina automatizada.' 
    },
    { 
      id: 'consistency', 
      label: 'Me cuesta ser constante', 
      icon: Brain,
      resolution: 'SOLUCIÓN ACTIVADA: Ciclos cortos de 21 días diseñados para recablear tu neuroplasticidad y crear hábitos.' 
    },
    { 
      id: 'diet', 
      label: 'La dieta es muy difícil', 
      icon: Utensils,
      resolution: 'SOLUCIÓN ACTIVADA: Sin hambre. Sin contar calorías. Combustible táctico real para hombres reales.' 
    },
    { 
      id: 'knowledge', 
      label: 'No sé por dónde empezar', 
      icon: Ban,
      resolution: 'SOLUCIÓN ACTIVADA: Mapa de ruta paso a paso. Eliminamos la duda para que solo tengas que ejecutar.' 
    },
  ];

  const handleSelect = (id: string) => {
    if (selectedObstacle) return; // Prevent double click
    
    setSelectedObstacle(id);
    localStorage.setItem('user_main_obstacle', id);

    // Delay to allow user to read the resolution (Objection Handling)
    setTimeout(() => {
      onNext();
    }, 1800);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 pb-10">
      
      {/* Custom Header for this step to include the Pulse Effect requested */}
      <div className="w-full mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-regular tracking-wider text-zinc-400 uppercase">
            FASE 7 DE 7 — EVALUACIÓN FINAL
          </span>
          <span className="text-xs font-regular text-zinc-500">92%</span>
        </div>
        <div className="h-1.5 w-full bg-[#27272A] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#FF5722] rounded-full transition-all duration-500 ease-out animate-pulse" 
            style={{ width: '92%' }}
          />
        </div>
      </div>

      <div className="space-y-3 mb-8 text-center">
        <h2 className="text-2xl font-semibold text-white leading-tight">
          ¿Cuál es el mayor obstáculo que ha frenado tu transformación física hasta hoy?
        </h2>
        <p className="text-zinc-400 text-sm">
          Sé honesto. Identificar al enemigo es el primer paso para eliminarlo.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {OBSTACLES.map((opt) => {
          const isSelected = selectedObstacle === opt.id;
          const Icon = opt.icon;
          
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={selectedObstacle !== null}
              className={`
                relative w-full flex flex-col items-start p-4 rounded-xl border transition-all duration-300 overflow-hidden
                ${isSelected 
                  ? 'bg-[#1A1A1A] border-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.2)]' 
                  : 'bg-[#1A1A1A] border-[#27272A] hover:border-zinc-500'
                }
                ${selectedObstacle && !isSelected ? 'opacity-40 grayscale' : 'opacity-100'}
              `}
            >
              <div className="flex items-center w-full z-10">
                <div className={`
                  p-2 rounded-lg mr-4 transition-colors duration-300
                  ${isSelected ? 'bg-[#FF5722] text-white' : 'bg-zinc-800 text-zinc-400'}
                `}>
                  <Icon size={20} />
                </div>
                
                <span className={`text-sm font-bold text-left flex-1 ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                  {opt.label}
                </span>

                {isSelected && (
                  <CheckCircle2 size={18} className="text-[#FF5722] animate-in zoom-in spin-in-90 duration-300" />
                )}
              </div>

              {/* EXPANDABLE RESOLUTION AREA */}
              <div 
                className={`
                  w-full overflow-hidden transition-all duration-500 ease-out
                  ${isSelected ? 'max-h-24 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
                `}
              >
                <div className="bg-[#291610] border-l-2 border-[#FF5722] p-3 rounded-r-lg">
                  <p className="text-[11px] text-zinc-300 text-left leading-relaxed font-medium">
                    <span className="text-[#FF5722] font-bold block mb-1 text-[10px] tracking-widest uppercase">
                      OBJECIÓN NEUTRALIZADA
                    </span>
                    {opt.resolution}
                  </p>
                </div>
              </div>

            </button>
          );
        })}
      </div>

    </div>
  );
};