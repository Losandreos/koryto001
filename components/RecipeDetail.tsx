
import React, { useState, useMemo } from 'react';
import { X, CheckCircle2, UtensilsCrossed, Zap, Info, ShieldAlert, ShoppingBasket, Flame, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Recipe, UserStats } from '../types';
import { StoreBadge } from './StoreBadge';

interface RecipeDetailProps {
  recipe: Recipe;
  userStats: UserStats;
  onLogPortion?: (multiplier: number) => void;
  onNavigateToCategory?: (category: any) => void;
  onClose: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, userStats, onLogPortion, onNavigateToCategory, onClose }) => {
  const [imgError, setImgError] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const isDopychacz = recipe.tags.includes('DOPYCHACZ');
  const isSklepowaAkcja = recipe.tags.includes('SKLEPOWA AKCJA');

  const handleAddToDiet = () => {
      if (onLogPortion) {
          onLogPortion(multiplier);
          setJustAdded(true);
          setTimeout(() => setJustAdded(false), 2000);
      }
  };

  const handleSOS = () => {
    if (onNavigateToCategory) {
        onNavigateToCategory('DOPYCHACZ');
        onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black overflow-y-auto pb-48 no-scrollbar">
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageExpanded(false)}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-4 cursor-zoom-out"
          >
            <img src={recipe.image_url} className="max-w-full max-h-full object-contain" alt="" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PURE IMAGE TOP */}
      <div className="relative h-64 bg-zinc-900 w-full">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center border-b border-zinc-800">
            <UtensilsCrossed size={48} className="text-zinc-800" />
          </div>
        ) : (
          <img 
            src={recipe.image_url} 
            alt={recipe.title} 
            onError={() => setImgError(true)}
            onClick={() => setIsImageExpanded(true)}
            className="w-full h-full object-cover"
          />
        )}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2.5 rounded-full border border-white/10 text-white z-50"
        >
            <X size={20} />
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* TITLE AND STORE AREA */}
        <section className="space-y-2">
          <div className="flex justify-between items-center">
             <StoreBadge store={recipe.store} />
             <div className="flex gap-1">
                {[1, 2].map(m => (
                    <button key={m} onClick={() => setMultiplier(m)} className={`w-7 h-7 flex items-center justify-center text-[10px] font-black border ${multiplier === m ? 'bg-[#CCFF00] text-black border-[#CCFF00]' : 'text-zinc-500 border-zinc-800'}`}>x{m}</button>
                ))}
             </div>
          </div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-tight text-white">
            {recipe.title}
          </h2>
          <div className={`px-2 py-0.5 inline-flex items-center gap-1.5 text-[9px] font-black uppercase italic ${isSklepowaAkcja ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
             {isSklepowaAkcja ? <ShoppingBasket size={10} /> : <Info size={10} />}
             {isSklepowaAkcja ? 'SKLEPOWA AKCJA' : 'PODGLĄD KORYTA'}
          </div>
        </section>

        {/* MACRO GRID - Smaller and Cleaner */}
        <div className="grid grid-cols-3 gap-2">
            <div className="bg-zinc-900/50 p-3 border-b-2 border-[#CCFF00] flex flex-col items-center">
                <Zap size={16} className="text-[#CCFF00] mb-0.5" />
                <span className="text-xl font-black text-white">{Math.round(recipe.protein * multiplier)}g</span>
                <span className="text-[8px] font-black text-zinc-600 uppercase">BIAŁKO</span>
            </div>
            <div className="bg-zinc-900/50 p-3 border-b-2 border-blue-600 flex flex-col items-center">
                <Flame size={16} className="text-blue-600 mb-0.5" />
                <span className="text-xl font-black text-white">{Math.round(recipe.carbs * multiplier)}g</span>
                <span className="text-[8px] font-black text-zinc-600 uppercase">WĘGLE</span>
            </div>
            <div className="bg-zinc-900/50 p-3 border-b-2 border-zinc-700 flex flex-col items-center">
                <Clock size={16} className="text-zinc-500 mb-0.5" />
                <span className="text-xl font-black text-white">{recipe.time}'</span>
                <span className="text-[8px] font-black text-zinc-600 uppercase">MIN</span>
            </div>
        </div>

        {/* INGREDIENTS LIST */}
        <section className="space-y-3">
           <h3 className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2">
              <ShoppingBasket size={18} className="text-[#CCFF00]" /> SKŁADNIKI
           </h3>
           <div className="space-y-1">
              {recipe.ingredients.map((ing, i) => (
                <div key={i} className="flex justify-between items-center bg-zinc-900/20 p-3 border border-zinc-800/50">
                   <span className="font-bold text-zinc-300 uppercase text-[11px]">{ing.item}</span>
                   <span className="text-[#CCFF00] font-black text-[11px] italic">{ing.amount}</span>
                </div>
              ))}
           </div>
        </section>

        {/* LOGIKA DZIKA */}
        {recipe.dzik_rationale && (
          <div className="bg-[#CCFF00]/5 border-l-2 border-[#CCFF00] p-3">
             <h4 className="text-[9px] font-black text-[#CCFF00] uppercase italic mb-0.5">LOGIKA DZIKA</h4>
             <p className="text-zinc-400 font-bold text-[10px] uppercase italic leading-tight">
                {recipe.dzik_rationale}
             </p>
          </div>
        )}
      </div>

      {/* STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-black border-t border-zinc-900 flex gap-2 z-[160]">
          {!isDopychacz && (
            <button onClick={handleSOS} className="flex-1 py-3 bg-red-950/20 border border-red-600 text-red-600 font-black uppercase italic text-[10px]">SOS</button>
          )}
          <button 
            onClick={handleAddToDiet}
            className={`flex-[3] py-3 font-black uppercase italic text-xs shadow-xl transition-all ${justAdded ? 'bg-white text-black' : 'bg-[#CCFF00] text-black'}`}
          >
            {justAdded ? 'DODANO!' : `WRZUĆ DO KORYTA (x${multiplier})`}
          </button>
      </div>
    </div>
  );
};
