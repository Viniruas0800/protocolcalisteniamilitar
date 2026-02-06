import React from 'react';
import { QuizOptionData } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface QuizOptionProps {
  option: QuizOptionData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const QuizOption: React.FC<QuizOptionProps> = ({ option, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={`
        relative group w-full flex flex-col items-center justify-center py-4 px-2 rounded-xl border transition-all duration-300
        ${isSelected 
          ? 'bg-[#1A1A1A] border-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.15)] scale-[1.02]' 
          : 'bg-[#1A1A1A] border-[#27272A] hover:border-zinc-600 active:scale-[0.98]'
        }
      `}
    >
      {/* Diagonal Arrow Icon */}
      <div className={`absolute top-2 right-2 transition-colors duration-300 ${isSelected ? 'text-[#FF5722]' : 'text-[#3F3F46] group-hover:text-zinc-500'}`}>
        <ArrowUpRight size={16} strokeWidth={2.5} />
      </div>

      <span className={`text-2xl font-black mb-1 transition-colors ${isSelected ? 'text-[#FF5722]' : 'text-white'}`}>
        {option.ageRange}
      </span>
      <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors text-center leading-tight">
        {option.label}
      </span>
    </button>
  );
};