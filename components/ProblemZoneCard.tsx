import React from 'react';
import { ProblemZoneData } from '../types';
import { Check } from 'lucide-react';

interface ProblemZoneCardProps {
  data: ProblemZoneData;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const ProblemZoneCard: React.FC<ProblemZoneCardProps> = ({ data, isSelected, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(data.id)}
      className={`
        relative w-full flex items-center h-32 overflow-hidden rounded-xl border transition-all duration-300 group
        ${isSelected 
          ? 'bg-[#1A1A1A] border-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.15)]' 
          : 'bg-[#131313] border-[#27272A] hover:border-zinc-600'
        }
      `}
    >
      {/* LEFT: Checkbox & Text */}
      <div className="flex-1 flex items-center pl-5 pr-2 z-10">
        {/* Custom Checkbox */}
        <div className={`
          flex-shrink-0 w-6 h-6 rounded flex items-center justify-center mr-4 border transition-all duration-300
          ${isSelected 
            ? 'bg-[#FF5722] border-[#FF5722]' 
            : 'bg-transparent border-zinc-600 group-hover:border-zinc-400'
          }
        `}>
          {isSelected && <Check size={16} className="text-white stroke-[4]" />}
        </div>

        <span className={`text-sm font-bold uppercase tracking-wide text-left leading-tight ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
          {data.title}
        </span>
      </div>

      {/* RIGHT: Image (Fully visible, no cropping, no zoom) */}
      <div className="relative w-40 h-full border-l border-[#27272A] bg-black flex items-center justify-center p-1">
        <img 
          src={data.imageUrl} 
          alt={data.title} 
          className="w-full h-full object-contain"
        />
      </div>
    </button>
  );
};