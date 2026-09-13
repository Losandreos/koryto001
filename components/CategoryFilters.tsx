
import React from 'react';
import { Category } from '../types';

interface CategoryFiltersProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex overflow-x-auto gap-2 py-2 no-scrollbar">
      {categories.map((cat) => {
        const isActive = selected === cat.id;
        const isDopychacz = cat.id === 'DOPYCHACZ';
        const isAkcja = cat.id === 'OBIADY_AKCJA';
        const isChemia = cat.id === 'CHEMIA_DZIKA';
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`
              whitespace-nowrap px-4 py-1.5 text-[11px] font-black uppercase tracking-tighter italic border-2 transition-all
              ${isActive 
                ? isDopychacz ? 'bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                : isAkcja ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]'
                : isChemia ? 'bg-[#39FF14] border-[#39FF14] text-black shadow-[0_0_20px_rgba(57,255,20,0.5)]'
                : 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]' 
                : isDopychacz
                  ? 'bg-zinc-950 border-red-900/40 text-red-500 animate-pulse'
                  : isAkcja
                  ? 'bg-zinc-950 border-blue-900/40 text-blue-400'
                  : isChemia
                  ? 'bg-zinc-950 border-green-900/40 text-[#39FF14]'
                  : 'bg-zinc-900 border-zinc-700 text-[#CCFF00] hover:border-[#CCFF00]'
              }
            `}
          >
            {cat.label}
          </button>
        );
      })}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
