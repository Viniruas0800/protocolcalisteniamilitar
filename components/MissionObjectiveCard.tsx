import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MissionObjectiveData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface MissionObjectiveCardProps {
  data: MissionObjectiveData;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export const MissionObjectiveCard: React.FC<MissionObjectiveCardProps> = ({ data, onSelect, isSelected }) => {
  const Icon = data.icon;

  return (
    <button
      onClick={() => onSelect(data.id)}
      className={`
        w-full flex items-center p-5 rounded-2xl border text-left transition-all duration-300 group relative overflow-hidden
        ${isSelected 
          ? 'bg-[#1A1A1A] border-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.15)]' 
          : 'bg-[#1A1A1A] border-[#27272A] hover:border-zinc-600 hover:bg-[#202020]'
        }
      `}
    >
      {/* Icon Container */}
      <div className={`
        flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center mr-5 transition-colors duration-300
        bg-[#291610] text-[#FF5722] border border-[#FF5722]/10
      `}>
        <Icon size={26} strokeWidth={2} />
      </div>

      {/* Text Content */}
      <div className="flex flex-col pr-2">
        <span className={`text-[15px] font-extrabold uppercase tracking-wider mb-1.5 ${isSelected ? 'text-white' : 'text-white'}`}>
          {data.title}
        </span>
        <span className="text-[12px] font-medium text-zinc-500 leading-snug">
          {data.description}
        </span>
      </div>

      {/* Selected Indicator (Optional Glow) */}
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl ring-1 ring-[#FF5722]/50 pointer-events-none" />
      )}
    </button>
  );
};