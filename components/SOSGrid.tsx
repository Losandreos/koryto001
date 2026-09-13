
import React from 'react';
import { Recipe } from '../types';
import { Plus, Zap, Flame, Info, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface SOSGridProps {
  items: Recipe[];
  onAdd: (recipe: Recipe) => void;
  onView: (recipe: Recipe) => void;
}

export const SOSGrid: React.FC<SOSGridProps> = ({ items, onAdd, onView }) => {
  const isAkcja = items.some(i => i.tags.includes('OBIADY_AKCJA'));
  const isChemia = items.some(i => i.tags.includes('CHEMIA_DZIKA'));

  const getManifest = () => {
    if (isChemia) return '"SUPLEMENTACJA TO FUNDAMENT. KREATYNA, KOFEINA I CUKIER PROSTY – TO TRIO, KTÓRE ROBI RÓŻNICĘ MIĘDZY BYCIEM DUŻYM, A BYCIEM POTĘŻNYM. CHEMIA DZIKA NIE PYTA O ZGODĘ, ONA ROBI FORMĘ!"';
    if (isAkcja) return '"BRAK KUCHNI? BRAK CZASU? ŻADEN PROBLEM. KUPUJESZ, OTWIERASZ I ŁADUJESZ W AUCIE ALBOR NA ŁAWCE. ZERO GOTOWANIA, TYLKO CZYSTE MAKRO DOSTARCZONE NATYCHMIAST. KAŻDY ZESTAW TO OKOŁO 50G BIAŁKA I 125G WĘGLI. DZIAŁAJ!"';
    return '"SŁUCHAJ BRACIE: NIEDOBÓR WĘGLI TO WYROK ŚMIERCI DLA TWOICH MIĘŚNI. JEŚLI NIE MASZ ENERGII Z GLUKOZY, TWÓJ ORGANIZM ZACZNIE TRAWIĆ WŁASNE BICEPSY, ŻEBY MIEĆ PALIWO. CUKIER W TYM SPISIE TO NIE WRÓG, TO PALIWO RAKIETOWE. ŁADUJ WĘGLE ALBO PRZESTAŃ MARZYĆ O MASIE!"';
  };

  const getBorderColor = () => {
    if (isChemia) return 'border-[#39FF14]';
    if (isAkcja) return 'border-blue-600';
    return 'border-red-600';
  };

  return (
    <div className="flex flex-col gap-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* MANIFEST SECTION */}
      <div className={`bg-zinc-900 border-l-4 p-4 space-y-2 ${getBorderColor()}`}>
         <h3 className="text-[#CCFF00] font-black italic uppercase text-xs flex items-center gap-2">
            <Zap size={14} fill="currentColor" /> {isChemia ? 'MANIFEST CHEMII DZIKA' : isAkcja ? 'MANIFEST SKLEPOWEJ AKCJI' : 'DOPYCHACZ DZIKA (SOS)'}
         </h3>
         <p className="text-[10px] text-zinc-400 font-bold uppercase leading-tight tracking-tight italic">
            {getManifest()}
         </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {items.map((item, idx) => (
          <motion.button 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onView(item)}
            className="relative aspect-square bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-between p-2 overflow-hidden group active:scale-95 transition-all shadow-lg"
          >
            {/* Background Preview */}
            <div className="absolute inset-0 z-0 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-500">
              <img src={item.image_url} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]" />

            <div className="relative z-10 w-full flex justify-between items-center">
                <div className="bg-black/60 p-0.5 rounded-full border border-white/10">
                    <Info size={10} className="text-zinc-400" />
                </div>
                <div 
                    onClick={(e) => { e.stopPropagation(); onAdd(item); }}
                    className={`p-1 shadow-lg active:scale-90 ${isChemia ? 'bg-[#39FF14]' : isAkcja ? 'bg-blue-600' : 'bg-red-600'}`}
                >
                    <Plus size={10} className={isChemia ? 'text-black' : 'text-white'} />
                </div>
            </div>

            <div className="relative z-10 text-center space-y-0.5 mt-1">
              <h4 className="text-[9px] font-black italic uppercase text-white leading-[1.1] tracking-tighter drop-shadow-md line-clamp-2">
                  {item.title}
              </h4>
              <div className="flex justify-center gap-1.5 pt-1">
                  <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black text-[#CCFF00] italic leading-none">{item.protein}</span>
                      <span className="text-[5px] font-bold text-zinc-500 uppercase leading-none">B</span>
                  </div>
                  <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black text-blue-500 italic leading-none">{item.carbs}</span>
                      <span className="text-[5px] font-bold text-zinc-500 uppercase leading-none">W</span>
                  </div>
              </div>
            </div>
            
            <div className="relative z-10 w-full bg-black/60 backdrop-blur-sm border-t border-white/5 py-0.5 mt-1">
              <p className="text-[5px] text-zinc-400 font-bold uppercase italic truncate px-1 text-center">
                  KLIKNIJ PO SZCZEGÓŁY
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
