import React from 'react';
import { BodyTypeData } from '../types';

interface BodyTypeCardProps {
  data: BodyTypeData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const BodyTypeCard: React.FC<BodyTypeCardProps> = ({ data, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(data.id)}
      className={`
        relative group flex flex-col w-full h-64 rounded-xl overflow-hidden border transition-all duration-300
        ${isSelected 
          ? 'border-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.3)]' 
          : 'border-[#27272A] hover:border-zinc-500'
        }
      `}
    >
      {/* Background Image Area - Anchored to TOP to show Head to Waist */}
      <div className="absolute inset-0 bg-[#1A1A1A]">
         <img 
          src={data.imageUrl} 
          alt={data.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      {/* Content Area (Centered at bottom) */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-center justify-end h-full z-10">
        <span className={`text-sm font-bold uppercase tracking-wider mb-0.5 ${isSelected ? 'text-white' : 'text-white'}`}>
          {data.title}
        </span>
        <span className="text-[10px] font-medium text-zinc-400 leading-tight text-center">
          {data.description}
        </span>
      </div>
      
      {/* Active State Indicator (Optional visual cue) */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-[#FF5722] rounded-xl pointer-events-none z-20"></div>
      )}
    </button>
  );
};