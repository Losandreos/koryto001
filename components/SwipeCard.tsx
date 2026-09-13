
import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';
import { Clock, Zap, Flame, Loader2, UtensilsCrossed, Edit2 } from 'lucide-react';
import { Recipe, SwipeDirection } from '../types';

interface SwipeCardProps {
  recipe: Recipe;
  onSwipe: (direction: SwipeDirection) => void;
  onEdit?: () => void;
  isTop: boolean;
  index: number;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ recipe, onSwipe, onEdit, isTop, index }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);
  
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100 || info.velocity.x > 500) {
      onSwipe(SwipeDirection.RIGHT);
    } else if (info.offset.x < -100 || info.velocity.x < -500) {
      onSwipe(SwipeDirection.LEFT);
    } else if (info.offset.y < -100 || info.velocity.y < -500) {
      onSwipe(SwipeDirection.UP);
      animate(x, 0);
      animate(y, 0);
    } else {
      animate(x, 0);
      animate(y, 0);
    }
  };

  return (
    <motion.div
      style={{ 
        x, 
        y,
        rotate, 
        opacity, 
        position: 'absolute', 
        zIndex: index,
        width: '100%',
        height: '100%'
      }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      className="cursor-grab active:cursor-grabbing touch-none"
    >
      <div className="flex flex-col h-full bg-zinc-950 border-2 border-zinc-900 rounded-[32px] overflow-hidden shadow-2xl">
        
        {/* TOP: PURE IMAGE AREA (Increased to 80% for better visibility) */}
        <div className="relative h-[82%] w-full bg-zinc-900 overflow-hidden">
          {/* Swiping Indicators (Only visible during drag) */}
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-8 z-50 border-4 border-[#CCFF00] text-[#CCFF00] font-black px-4 py-1 text-3xl rotate-[-15deg] pointer-events-none uppercase italic tracking-tighter bg-black/40">
            ŁADUJ!
          </motion.div>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-8 z-50 border-4 border-red-600 text-red-600 font-black px-4 py-1 text-3xl rotate-[15deg] pointer-events-none uppercase italic tracking-tighter bg-black/40">
            SYF
          </motion.div>

          {imgLoading && !imgError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin text-[#CCFF00]" size={40} />
            </div>
          )}
          
          {imgError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800">
              <UtensilsCrossed size={48} className="opacity-20" />
            </div>
          ) : (
            <img 
              src={recipe.image_url} 
              alt={recipe.title} 
              onLoad={() => setImgLoading(false)}
              onError={() => { setImgError(true); setImgLoading(false); }}
              className={`w-full h-full object-cover contrast-[105%] transition-opacity duration-500 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
            />
          )}

          {/* Edit Button stays but is minimal */}
          {onEdit && isTop && (
              <button 
                  onClick={(e) => { e.stopPropagation(); onEdit(); }}
                  className="absolute top-4 right-4 z-[60] bg-black/50 backdrop-blur-md p-2.5 border border-white/10 text-white rounded-full active:scale-90"
              >
                  <Edit2 size={14} />
              </button>
          )}
        </div>

        {/* BOTTOM: ULTRA COMPACT INFO AREA */}
        <div className="flex-1 bg-black px-5 py-3 flex flex-col justify-center gap-2">
          <h2 className="text-xl font-black italic tracking-tighter leading-tight uppercase text-white truncate">
            {recipe.title}
          </h2>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center justify-center gap-2 bg-zinc-900 py-1.5 rounded-lg border border-zinc-800">
              <Zap className="text-[#CCFF00]" size={12} />
              <span className="text-sm font-black text-white">{recipe.protein}g</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-zinc-900 py-1.5 rounded-lg border border-zinc-800">
              <Flame className="text-blue-500" size={12} />
              <span className="text-sm font-black text-white">{recipe.carbs}g</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-zinc-900 py-1.5 rounded-lg border border-zinc-800">
              <Clock className="text-zinc-500" size={12} />
              <span className="text-sm font-black text-white">{recipe.time}'</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
