
import React, { useState, useMemo } from 'react';
import { ShoppingBasket, Trash2, Share2, ChevronLeft, CheckCircle2, Circle, Utensils, Eye, Package, ChevronDown, ChevronUp, LayoutList, Combine, Zap, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Recipe } from '../types';

interface ShoppingListProps {
  likedRecipes: Recipe[];
  onClear: () => void;
  onRemoveRecipe: (id: number) => void;
  onViewRecipe: (recipe: Recipe) => void;
  onLogToKoryto: (recipe: Recipe) => void;
  onClose: () => void;
}

const DZIK_STAPLES = [
  "Skyr naturalny (Lidl/Biedra)",
  "Jaja kl. L (30 szt)",
  "Pierś z kurczaka (opakowanie XXL)",
  "Twaróg chudy (klin)",
  "Ryż biały / basmati",
  "Oliwa z oliwek",
  "Banan (kiść)",
  "Płatki owsiane"
];

// Department categories mapping logic
const CATEGORIES = {
  'MIĘSO/BIAŁKO': ['KURCZAK', 'INDYK', 'SZYNKA', 'WOŁOWINA', 'PARÓWKI', 'MIELONE', 'PASZTET', 'RYBA', 'ŁOSOŚ', 'TUNCZYK'],
  'NABIAŁ': ['SKYR', 'TWARÓG', 'SEREK', 'JAJA', 'SER', 'JOGURT', 'MLEKO', 'MOZZARELLA'],
  'PIEKARNIA': ['BUŁKA', 'KAJZERKA', 'CHLEB', 'BAGIETKA', 'DROŻDŻÓWKA', 'ROGAL', 'TOSTY'],
  'OWOCE/WARZYWA': ['BANAN', 'JABŁKO', 'OWOCE', 'POMIDORY', 'WARZYWA', 'DAKTYLE', 'DŻEM', 'PASSATA'],
  'KASY/SUCHE': ['RYŻ', 'MAKARON', 'KASZA', 'WAFLE', 'PŁATKI', 'MĄKA', 'MUSLI'],
  'SUPLE/INNE': ['ODŻYWKA', 'SHAKE', 'SZEJK', 'IZOTONIK', 'MIÓD', 'CUKIER', 'ŻELKI', 'OLEJ', 'OLIWA']
};

const getCategory = (itemName: string): string => {
  const upper = itemName.toUpperCase();
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some(k => upper.includes(k))) return cat;
  }
  return 'INNE (RESZTA)';
};

const CATEGORY_ORDER = ['MIĘSO/BIAŁKO', 'NABIAŁ', 'PIEKARNIA', 'OWOCE/WARZYWA', 'KASY/SUCHE', 'SUPLE/INNE', 'INNE (RESZTA)'];

export const ShoppingList: React.FC<ShoppingListProps> = ({ 
  likedRecipes, 
  onClear, 
  onRemoveRecipe, 
  onViewRecipe,
  onLogToKoryto,
  onClose 
}) => {
  const [isStaplesExpanded, setIsStaplesExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'per-recipe' | 'unified'>('unified');
  const [boughtItems, setBoughtItems] = useState<Set<string>>(new Set());
  const [boughtStaples, setBoughtStaples] = useState<Set<string>>(new Set());

  // Aggregation and Categorization logic
  const categorizedIngredients = useMemo(() => {
    const categories: Record<string, Map<string, { amounts: string[], recipes: string[] }>> = {};
    
    CATEGORY_ORDER.forEach(cat => categories[cat] = new Map());

    likedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        const name = ing.item.trim().toUpperCase();
        const cat = getCategory(name);
        
        if (!categories[cat]) categories[cat] = new Map();
        const map = categories[cat];

        if (!map.has(name)) {
          map.set(name, { amounts: [], recipes: [] });
        }
        const entry = map.get(name)!;
        entry.amounts.push(ing.amount);
        if (!entry.recipes.includes(recipe.title)) {
          entry.recipes.push(recipe.title);
        }
      });
    });

    return categories;
  }, [likedRecipes]);

  const toggleItem = (key: string) => {
    setBoughtItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const toggleStaple = (item: string) => {
    setBoughtStaples(prev => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item); else next.add(item);
      return next;
    });
  };

  const handleShare = () => {
    if (likedRecipes.length === 0 && boughtStaples.size === 0) return;
    let text = `🔥 MOJA ZDOBYCZ - KORYTO DZIKA 🔥\n\n`;
    
    if (viewMode === 'unified') {
      CATEGORY_ORDER.forEach(cat => {
        const items = Array.from(categorizedIngredients[cat].entries());
        if (items.length > 0) {
          text += `📍 ${cat}:\n`;
          items.forEach(([name, data]) => {
            const isBought = boughtItems.has(name);
            text += `${isBought ? '✅' : '⬜'} ${name}: ${data.amounts.join(' + ')}\n`;
          });
          text += `\n`;
        }
      });
    } else {
      likedRecipes.forEach(recipe => {
        text += `[ ${recipe.title.toUpperCase()} ]\n`;
        recipe.ingredients.forEach((ing, idx) => {
          const isBought = boughtItems.has(`${recipe.id}-${idx}`);
          text += `${isBought ? '✅' : '⬜'} ${ing.item}: ${ing.amount}\n`;
        });
        text += `\n`;
      });
    }

    text += `\n📦 BAZA DZIKA:\n`;
    DZIK_STAPLES.forEach(item => {
      text += `${boughtStaples.has(item) ? '✅' : '⬜'} ${item}\n`;
    });
    
    if (navigator.share) {
      navigator.share({ title: 'Moja Zdobycz', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('ZDOBYCZ SKOPIOWANA!');
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
      <header className="p-5 border-b-2 border-zinc-900 bg-black flex flex-col gap-3 shrink-0 shadow-2xl">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 font-black text-[#CCFF00] uppercase italic text-sm">
            <ChevronLeft size={20} /> WRÓĆ
          </button>
          <h1 className="text-lg font-black italic uppercase tracking-tighter">ZDOBYCZ</h1>
          <div className="w-8"></div>
        </div>

        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button 
            onClick={() => setViewMode('per-recipe')}
            className={`flex-1 py-1.5 flex items-center justify-center gap-2 text-[10px] font-black uppercase italic transition-all rounded-md ${viewMode === 'per-recipe' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
          >
            <LayoutList size={12} /> PO BLIUDACH
          </button>
          <button 
            onClick={() => setViewMode('unified')}
            className={`flex-1 py-1.5 flex items-center justify-center gap-2 text-[10px] font-black uppercase italic transition-all rounded-md ${viewMode === 'unified' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
          >
            <Combine size={12} /> LISTA SKLEPOWA
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-44 no-scrollbar">
        {/* DZIK BASE */}
        <section className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
          <button 
            onClick={() => setIsStaplesExpanded(!isStaplesExpanded)}
            className="w-full p-3.5 flex items-center justify-between text-[#CCFF00]"
          >
            <div className="flex items-center gap-2">
              <Package size={18} />
              <h3 className="text-xs font-black italic uppercase tracking-tighter">MOJA BAZA (STAPLES)</h3>
            </div>
            {isStaplesExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          <AnimatePresence>
            {isStaplesExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-zinc-800 bg-black/40"
              >
                <div className="p-3 grid grid-cols-1 gap-1">
                  {DZIK_STAPLES.map(item => (
                    <button 
                      key={item}
                      onClick={() => toggleStaple(item)}
                      className={`w-full text-left p-2.5 border rounded-lg flex justify-between items-center transition-all ${
                        boughtStaples.has(item) ? 'bg-zinc-900/20 border-zinc-900 opacity-40' : 'bg-zinc-900/40 border-zinc-800'
                      }`}
                    >
                      <span className={`text-[10px] font-bold uppercase ${boughtStaples.has(item) ? 'line-through text-zinc-600' : 'text-zinc-300'}`}>{item}</span>
                      <div className={boughtStaples.has(item) ? 'text-zinc-700' : 'text-[#CCFF00]'}>
                        {boughtStaples.has(item) ? <CheckCircle2 size={14} /> : <Circle size={14} className="opacity-10" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* SHOPPING CONTENT */}
        <div className="space-y-6">
          {likedRecipes.length === 0 ? (
            <div className="text-center p-12 border-2 border-dashed border-zinc-900 rounded-3xl text-zinc-800">
              <UtensilsCrossed size={48} className="mx-auto mb-3 opacity-20" />
              <p className="font-black uppercase italic text-xs tracking-widest">KOSZYK PUSTY. DORZUĆ MIĘSA!</p>
            </div>
          ) : viewMode === 'unified' ? (
            /* CATEGORIZED UNIFIED VIEW */
            <div className="space-y-6">
               {CATEGORY_ORDER.map(cat => {
                 const items = Array.from(categorizedIngredients[cat].entries());
                 if (items.length === 0) return null;
                 return (
                   <div key={cat} className="space-y-2">
                      <div className="flex items-center gap-2 px-1">
                         <div className="h-[2px] flex-1 bg-zinc-900"></div>
                         <h4 className="text-[10px] font-black italic uppercase text-zinc-500 tracking-[0.2em] whitespace-nowrap">{cat}</h4>
                         <div className="h-[2px] flex-1 bg-zinc-900"></div>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {items.map(([name, data]) => {
                          const isBought = boughtItems.has(name);
                          return (
                            <button 
                              key={name}
                              onClick={() => toggleItem(name)}
                              className={`w-full text-left p-3 border rounded-xl flex flex-col gap-1 transition-all ${
                                isBought ? 'bg-zinc-900/10 border-zinc-900 opacity-30' : 'bg-zinc-900/40 border-zinc-800/60 shadow-sm'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className={`text-[11px] font-black uppercase italic tracking-tight ${isBought ? 'line-through text-zinc-700' : 'text-[#CCFF00]'}`}>
                                  {name}
                                </span>
                                <div className={isBought ? 'text-zinc-800' : 'text-[#CCFF00]'}>
                                  {isBought ? <CheckCircle2 size={14} /> : <Circle size={14} className="opacity-10" />}
                                </div>
                              </div>
                              <div className="flex justify-between items-end">
                                <span className={`text-[9px] font-bold ${isBought ? 'text-zinc-800' : 'text-zinc-500'}`}>
                                  {data.amounts.join(' + ')}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                   </div>
                 );
               })}
            </div>
          ) : (
            /* PER-RECIPE VIEW with "LOG TO KORYTO" */
            <AnimatePresence mode="popLayout">
              <div className="space-y-4">
                {likedRecipes.map((recipe) => (
                  <motion.section 
                    key={recipe.id} 
                    layout 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-xl"
                  >
                    <div className="relative h-24 cursor-pointer" onClick={() => onViewRecipe(recipe)}>
                      <img src={recipe.image_url} className="w-full h-full object-cover opacity-50" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-4 flex flex-col justify-end">
                        <h3 className="text-lg font-black uppercase italic text-white leading-none">{recipe.title}</h3>
                      </div>
                    </div>
                    
                    <div className="p-3 space-y-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onLogToKoryto(recipe)}
                          className="flex-1 bg-[#CCFF00] text-black py-2.5 rounded-xl font-black uppercase italic text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-all"
                        >
                          <Zap size={12} fill="currentColor" /> WRZUĆ DO KORYTA
                        </button>
                        <button 
                          onClick={() => onRemoveRecipe(recipe.id)}
                          className="p-2.5 border border-red-950 text-red-700 rounded-xl active:scale-95 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-1">
                        {recipe.ingredients.map((ing, idx) => {
                          const key = `${recipe.id}-${idx}`;
                          const isBought = boughtItems.has(key);
                          return (
                            <button 
                              key={key}
                              onClick={() => toggleItem(key)} 
                              className={`w-full text-left p-2.5 border rounded-lg flex justify-between items-center transition-all ${
                                isBought ? 'bg-zinc-900/10 border-zinc-900/50 opacity-40' : 'bg-zinc-900/40 border-zinc-800'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className={`text-[10px] font-bold uppercase ${isBought ? 'line-through text-zinc-600' : 'text-zinc-300'}`}>
                                  {ing.item}
                                </span>
                                <span className={`text-[9px] font-black italic ${isBought ? 'text-zinc-800' : 'text-[#CCFF00]'}`}>
                                  {ing.amount}
                                </span>
                              </div>
                              <div className={isBought ? 'text-zinc-700' : 'text-[#CCFF00]'}>
                                {isBought ? <CheckCircle2 size={14} /> : <Circle size={14} className="opacity-10" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.section>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-black/80 backdrop-blur-xl border-t border-zinc-900 grid grid-cols-2 gap-3 z-[120]">
        <button onClick={onClear} className="bg-zinc-900 border border-zinc-800 py-4 rounded-2xl font-black text-red-600 uppercase italic text-[10px] active:scale-95 transition-all">WYCZYŚĆ WSZYSTKO</button>
        <button onClick={handleShare} className="bg-[#CCFF00] text-black py-4 rounded-2xl font-black uppercase italic text-[10px] shadow-[0_0_25px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Share2 size={16} /> UDOSTĘPNIJ
        </button>
      </div>
    </motion.div>
  );
};
