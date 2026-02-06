import React, { useEffect, useState } from 'react';
import { VisualObjectiveData } from '../types';

interface VisualObjectiveCardProps {
  data: VisualObjectiveData;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export const VisualObjectiveCard: React.FC<VisualObjectiveCardProps> = ({ data, onSelect, isSelected }) => {
  const [width, setWidth] = useState(0);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(data.intensity);
    }, 100);
    return () => clearTimeout(timer);
  }, [data.intensity]);

  return (
    <button
      onClick={() => onSelect(data.id)}
      className={`
        relative w-full flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 group
        ${isSelected 
          ? 'bg-[#1A1A1A] border-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.15)]' 
          : 'bg-[#1A1A1A] border-[#27272A] hover:border-zinc-600'
        }
      `}
    >
      {/* HEADER BADGE (Full Width) */}
      {data.badge && (
        <div className={`
          w-full py-1.5 flex items-center justify-center text-[10px] font-black uppercase tracking-widest
          ${data.badgeColor === 'yellow' ? 'bg-[#F59E0B] text-black' : 'bg-[#FF5722] text-white'}
        `}>
          {data.badge}
        </div>
      )}

      {/* CARD BODY (Row Layout) */}
      <div className="flex w-full relative min-h-[140px]">
        
        {/* LEFT COLUMN: Text & Meter */}
        {/* Adjusted width to 60% to ensure progress bar does not overlap image */}
        <div className="w-[60%] pl-5 py-5 pr-2 flex flex-col justify-center z-20 relative">
          
          {/* Typography Group */}
          <div className="mb-4">
            <h3 className="text-lg font-black text-white uppercase leading-none mb-1">
              {data.title}
            </h3>
            <p className="text-[#FF5722] text-sm font-medium leading-tight mb-1">
              {data.subtitle}
            </p>
            <p className="text-zinc-500 text-[11px] font-medium">
              {data.description}
            </p>
          </div>

          {/* Intensity Meter */}
          <div className="w-full pr-2">
             <div className="flex justify-between items-end mb-1.5">
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">INTENSIDAD</span>
              <span className="text-[10px] font-bold text-[#FF5722]">
                {data.intensity}%
              </span>
            </div>
            <div className="h-2 w-full bg-[#0D0D0D] rounded-full overflow-hidden border border-zinc-800/50">
              <div 
                className="h-full rounded-full bg-[#FF5722] shadow-[0_0_10px_#FF5722]"
                style={{ 
                  width: `${width}%`,
                  transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' 
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Image */}
        <div className="absolute right-0 top-0 bottom-0 w-[40%] overflow-hidden h-full">
           {/* Gradient Overlay for seamless blending into card bg */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent z-10" />
           
           <img 
            src={data.imageUrl} 
            alt={data.title} 
            className="w-full h-full object-cover object-center transform translate-x-1"
          />
        </div>

      </div>
    </button>
  );
};