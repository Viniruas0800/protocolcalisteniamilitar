import React from 'react';

interface ProgressBarProps {
  progress: number;
  label: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-regular tracking-wider text-zinc-400 uppercase">
          {label}
        </span>
        <span className="text-xs font-regular text-zinc-500">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-[#27272A] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#FF5722] rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};