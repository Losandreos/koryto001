
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, Dumbbell, Trophy, Activity, Plus, ShoppingBasket, CheckCircle2 } from 'lucide-react';
import { Recipe, SwipeDirection, RecipeTag, AppSettings, UserStats, ManualLog, Category } from './types';
import { INITIAL_RECIPES } from './constants';
import { SwipeCard } from './components/SwipeCard';
import { ShoppingList } from './components/ShoppingList';
import { RecipeDetail } from './components/RecipeDetail';
import { CategoryFilters } from './components/CategoryFilters';
import { AddRecipeModal } from './components/AddRecipeModal';
import { AdminDashboard } from './components/AdminDashboard';
import { BodyStatsModal } from './components/BodyStatsModal';
import { MacroTracker } from './components/MacroTracker';
import { QuickLogModal } from './components/QuickLogModal';
import { SOSGrid } from './components/SOSGrid';

const DEFAULT_CATEGORIES: Category[] = [
    { id: 'WSZYSTKO', label: 'WSZYSTKO' },
    { id: 'SNIADANIA_LEKKIE', label: '🍳 Śniadania Na Lekkiej' },
    { id: 'SNIADANIA_KONKRETNE', label: '🥩 Śniadania Konkretne' },
    { id: 'OBIADY_SZEFA', label: '🍲 Obiady Dla Szefa' },
    { id: 'OBIADY_AKCJA', label: '🛒 Obiady Sklepowa Akcja', isSpecial: true },
    { id: 'PODWIECZOREK_TRENING', label: '⚡ Podwieczorek Po Treningu' },
    { id: 'KOLACJA', label: '🌙 Kolacja' },
    { id: 'DOPYCHACZ', label: '🚀 Dopychacz', isSpecial: true },
    { id: 'CHEMIA_DZIKA', label: '🧪 Chemia Dzika', isSpecial: true },
];

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  
  const [toast, setToast] = useState<string | null>(null);

  const [settings, setSettings] = useState<AppSettings>({
    appName: "KORYTO DZIKA",
    slogan: "Dobre jadło dla potężnych wyników",
    ctaButton: "ŁADUJ BIAŁKO",
    tgLink: "https://t.me/dzik_koryto",
    featuresEnabled: { aiGeneration: true, batchImport: true }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('dzik_categories_v3');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('dzik_categories_v3', JSON.stringify(categories));
  }, [categories]);

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('dzik_user_stats_v2');
    return saved ? JSON.parse(saved) : { weight: 85, height: 180, isTrainingDay: true, goal: 'MASA', mealCount: 4 };
  });

  useEffect(() => {
    localStorage.setItem('dzik_user_stats_v2', JSON.stringify(userStats));
  }, [userStats]);

  const [customRecipes, setCustomRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('dzik_custom_recipes_v2');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dzik_custom_recipes_v2', JSON.stringify(customRecipes));
  }, [customRecipes]);

  const [manualLogs, setManualLogs] = useState<ManualLog[]>(() => {
    const saved = localStorage.getItem('dzik_manual_logs_v2');
    if (!saved) return [];
    try {
      const logs: ManualLog[] = JSON.parse(saved);
      const today = new Date().setHours(0,0,0,0);
      return logs.filter(log => log.timestamp >= today);
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('dzik_manual_logs_v2', JSON.stringify(manualLogs));
  }, [manualLogs]);

  const [likedRecipes, setLikedRecipes] = useState<{recipe: Recipe, multiplier: number}[]>(() => {
    const saved = localStorage.getItem('dzik_liked_recipes_v2');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dzik_liked_recipes_v2', JSON.stringify(likedRecipes));
  }, [likedRecipes]);

  const [selectedCategory, setSelectedCategory] = useState<string>('WSZYSTKO');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipeDetail, setViewingRecipeDetail] = useState<Recipe | null>(null);
  
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  };

  const allAvailableRecipes = useMemo(() => {
    const base = [...INITIAL_RECIPES];
    const custom = [...customRecipes];
    const merged = base.map(b => {
      const override = custom.find(c => c.id === b.id);
      return override || b;
    });
    const brandNew = custom.filter(c => !base.find(b => b.id === c.id));
    return [...merged, ...brandNew];
  }, [customRecipes]);

  const currentMacros = useMemo(() => {
    const total = { protein: 0, carbs: 0, fat: 0 };
    manualLogs.forEach(log => {
      total.protein += log.protein;
      total.carbs += log.carbs;
      total.fat += log.fat;
    });
    return {
      protein: Math.round(total.protein),
      carbs: Math.round(total.carbs),
      fat: Math.round(total.fat)
    };
  }, [manualLogs]);

  useEffect(() => {
    let filtered = [...allAvailableRecipes];
    if (selectedCategory !== 'WSZYSTKO') {
      filtered = allAvailableRecipes.filter(r => r.tags.includes(selectedCategory));
    }
    const isSpecial = selectedCategory === 'DOPYCHACZ' || selectedCategory === 'OBIADY_AKCJA' || selectedCategory === 'CHEMIA_DZIKA';
    if (isSpecial) {
      setRecipes(filtered);
    } else {
      setRecipes(filtered.sort(() => Math.random() - 0.5));
    }
  }, [selectedCategory, allAvailableRecipes]);

  const handleSwipe = useCallback((direction: SwipeDirection) => {
    if (recipes.length === 0) return;
    const swipedRecipe = recipes[recipes.length - 1];
    if (direction === SwipeDirection.UP) {
      setViewingRecipeDetail(swipedRecipe);
      return;
    }
    if (direction === SwipeDirection.RIGHT) {
      setLikedRecipes(prev => {
        const alreadyIn = prev.find(i => i.recipe.id === swipedRecipe.id);
        if (alreadyIn) return prev;
        return [...prev, { recipe: swipedRecipe, multiplier: 1 }];
      });
      showToast("LUBIĘ TO!");
    }
    setRecipes(prev => prev.slice(0, -1));
  }, [recipes]);

  const handleLogToKoryto = (recipe: Recipe, multiplier: number = 1) => {
    const newLog: ManualLog = {
      id: Date.now().toString(),
      label: recipe.title,
      protein: recipe.protein * multiplier,
      carbs: recipe.carbs * multiplier,
      fat: recipe.fat * multiplier,
      timestamp: Date.now(),
      recipeId: recipe.id,
      multiplier: multiplier
    };
    setManualLogs(prev => [...prev, newLog]);
    showToast("DODANO DO KORYTA!");
  };

  const isGridView = selectedCategory === 'DOPYCHACZ' || selectedCategory === 'OBIADY_AKCJA' || selectedCategory === 'CHEMIA_DZIKA';

  if (isAdminMode) {
    return <AdminDashboard 
      recipes={allAvailableRecipes} 
      settings={settings}
      categories={categories}
      onUpdateSettings={setSettings}
      onUpdateCategories={setCategories}
      onDeleteRecipe={(id) => setCustomRecipes(prev => prev.filter(r => r.id !== id))}
      onEditRecipe={(r) => { setEditingRecipe(r); setIsAdminMode(false); }}
      onClose={() => setIsAdminMode(false)} 
    />;
  }

  return (
    <div className="relative h-screen max-w-md mx-auto overflow-hidden bg-black flex flex-col font-sans border-x border-zinc-900 shadow-2xl">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-[#CCFF00] text-black px-4 py-2 font-black uppercase italic text-xs shadow-[0_0_20px_#CCFF00]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="pt-4 px-4 pb-2 flex justify-between items-center z-[50] bg-black shrink-0">
        <div onDoubleClick={() => setIsAdminMode(true)} className="cursor-pointer active:scale-95 transition-transform">
          <h1 className="text-3xl font-black italic tracking-tighter text-white leading-none">
            KORYTO<span className="text-[#CCFF00]">DZIKA</span>
          </h1>
        </div>
        
        <div className="flex gap-1">
          <button onClick={() => setIsStatsModalOpen(true)} className="p-2 text-zinc-500 hover:text-[#CCFF00] transition-colors">
            <Activity size={20} />
          </button>
          <button onClick={() => setIsFavoritesOpen(true)} className="relative p-2 text-zinc-500 hover:text-red-500 transition-colors">
            <Heart size={20} fill={likedRecipes.length > 0 ? "currentColor" : "none"} className={likedRecipes.length > 0 ? "text-red-600" : ""} />
          </button>
          <button onClick={() => setIsShoppingListOpen(true)} className="relative p-2 text-zinc-500 hover:text-[#CCFF00] transition-colors">
            <ShoppingBasket size={20} />
            {likedRecipes.length > 0 && (
              <span className="absolute top-1 right-1 bg-[#CCFF00] text-black text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full border border-black">
                {likedRecipes.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="px-4 py-1 z-[50] bg-black shrink-0">
        <MacroTracker consumed={currentMacros} userStats={userStats} onOpenQuickLog={() => setIsQuickLogOpen(true)} />
        <CategoryFilters categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      <main className={`flex-1 relative mx-4 mb-20 mt-2 ${isGridView ? 'overflow-y-auto no-scrollbar' : ''}`}>
        <AnimatePresence mode="popLayout">
          {isGridView ? (
            <SOSGrid items={recipes} onAdd={(r) => handleLogToKoryto(r, 1)} onView={(r) => setViewingRecipeDetail(r)} />
          ) : recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <SwipeCard 
                key={`${selectedCategory}-${recipe.id}`}
                recipe={recipe}
                onSwipe={handleSwipe}
                onEdit={() => setEditingRecipe(recipe)}
                isTop={index === recipes.length - 1}
                index={index}
              />
            ))
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border-4 border-dashed border-zinc-900 rounded-[32px]">
              <Trophy size={64} className="text-zinc-800 mb-4" />
              <h3 className="text-2xl font-black text-zinc-600 uppercase italic leading-none">MISKA PUSTA!</h3>
              <p className="text-[10px] text-zinc-700 font-bold mt-2 uppercase">Zmień рубрику albo dodaj własne koryto</p>
              <button onClick={() => setSelectedCategory('WSZYSTKO')} className="mt-6 bg-[#CCFF00] text-black font-black py-4 px-8 uppercase italic active:scale-95 transition-transform">RESETUJ FILTRY</button>
            </div>
          )}
        </AnimatePresence>
      </main>

      {!isGridView && recipes.length > 0 && (
        <div className="absolute bottom-3 left-0 right-0 px-10 flex justify-between items-center z-[60] pointer-events-none">
          <button 
            onClick={() => handleSwipe(SwipeDirection.LEFT)} 
            className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-xl border-2 border-red-600/40 flex items-center justify-center text-red-600 active:scale-90 pointer-events-auto shadow-2xl"
          >
            <X size={28} strokeWidth={3} />
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 flex items-center justify-center text-zinc-500 active:scale-90 pointer-events-auto"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
          <button 
            onClick={() => handleSwipe(SwipeDirection.RIGHT)} 
            className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-xl border-2 border-[#CCFF00]/40 flex items-center justify-center text-[#CCFF00] active:scale-95 pointer-events-auto shadow-2xl"
          >
            <Dumbbell size={28} strokeWidth={3} />
          </button>
        </div>
      )}

      <AnimatePresence>
        {isStatsModalOpen && <BodyStatsModal stats={userStats} onSave={setUserStats} onClose={() => setIsStatsModalOpen(false)} />}
        {isQuickLogOpen && <QuickLogModal onAdd={(log) => { setManualLogs(prev => [...prev, {...log, id: Date.now().toString(), timestamp: Date.now()}]); setIsQuickLogOpen(false); showToast("SZYBKI WRZUT!"); }} onClose={() => setIsQuickLogOpen(false)} recentLogs={manualLogs} onClearLogs={() => setManualLogs([])} />}
        {isShoppingListOpen && <ShoppingList likedRecipes={likedRecipes.map(i => ({...i.recipe, multiplier: i.multiplier}))} onClear={() => setLikedRecipes([])} onRemoveRecipe={id => setLikedRecipes(l => l.filter(i => i.recipe.id !== id))} onViewRecipe={setViewingRecipeDetail} onLogToKoryto={(r) => handleLogToKoryto(r, 1)} onClose={() => setIsShoppingListOpen(false)} />}
        {isFavoritesOpen && (
            <div className="fixed inset-0 z-[110] bg-black/95 p-6 overflow-y-auto no-scrollbar">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-red-600 flex items-center gap-2"><Heart size={24} fill="currentColor" /> MOJA ZDOBYCZ</h2>
                    <button onClick={() => setIsFavoritesOpen(false)} className="text-zinc-500"><X size={24} /></button>
                </header>
                <div className="grid grid-cols-2 gap-2">
                    {likedRecipes.map(item => (
                        <div key={item.recipe.id} onClick={() => setViewingRecipeDetail(item.recipe)} className="aspect-square bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
                            <img src={item.recipe.image_url} className="w-full h-full object-cover opacity-60" alt="" />
                            <div className="absolute inset-0 p-3 flex flex-col justify-end">
                                <span className="text-[10px] font-black uppercase italic leading-none">{item.recipe.title}</span>
                            </div>
                        </div>
                    ))}
                    {likedRecipes.length === 0 && <p className="col-span-2 text-center text-zinc-700 py-20 font-black uppercase italic text-xs">Pusto tutaj. Dodaj coś!</p>}
                </div>
            </div>
        )}
        {(isAddModalOpen || editingRecipe) && (
          <AddRecipeModal initialData={editingRecipe || undefined} onAdd={r => setCustomRecipes(prev => [r, ...prev])} onUpdate={r => setCustomRecipes(prev => prev.map(old => old.id === r.id ? r : old))} onBatchAdd={recs => setCustomRecipes(prev => [...recs, ...prev])} onClose={() => { setIsAddModalOpen(false); setEditingRecipe(null); }} />
        )}
        {viewingRecipeDetail && <RecipeDetail recipe={viewingRecipeDetail} userStats={userStats} onLogPortion={(m) => handleLogToKoryto(viewingRecipeDetail, m)} onNavigateToCategory={setSelectedCategory} onClose={() => setViewingRecipeDetail(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
