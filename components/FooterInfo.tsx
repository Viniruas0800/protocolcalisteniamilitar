import React from 'react';
import { Dumbbell, Calendar, Target } from 'lucide-react';

export const FooterInfo: React.FC = () => {
  const items = [
    { icon: Dumbbell, label: 'Sin gimnasio' },
    { icon: Calendar, label: 'Results en 21 días' },
    { icon: Target, label: 'Personalizado' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 pb-8 border-t border-[#27272A] pt-6">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center justify-center gap-2 text-center">
          <item.icon size={18} className="text-[#FF5722]" />
          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};