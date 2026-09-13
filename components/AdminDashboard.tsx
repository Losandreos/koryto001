
import React, { useState } from 'react';
import { X, Save, Trash2, Edit, LayoutDashboard, Settings as SettingsIcon, Database, ShieldCheck, RefreshCw, Globe, Github, Terminal, FileCode, CheckSquare, Rocket, Clock, AlertCircle, ArrowRight, MousePointer2, Move, MousePointerClick, Tags, Plus } from 'lucide-react';
import { Recipe, AppSettings, Category } from '../types';

interface AdminDashboardProps {
  recipes: Recipe[];
  settings: AppSettings;
  categories: Category[];
  onUpdateSettings: (s: AppSettings) => void;
  onUpdateCategories: (c: Category[]) => void;
  onDeleteRecipe: (id: number) => void;
  onEditRecipe: (r: Recipe) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  recipes, 
  settings, 
  categories,
  onUpdateSettings, 
  onUpdateCategories,
  onDeleteRecipe, 
  onEditRecipe, 
  onClose 
}) => {
  const [tempSettings, setTempSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'CONFIG' | 'CATEGORIES' | 'DEPLOY'>('CONTENT');
  const [newCatLabel, setNewCatLabel] = useState('');

  const handleSaveSettings = () => {
    onUpdateSettings(tempSettings);
    alert("USTAWIENIA ZAPISANE!");
  };

  const handleAddCategory = () => {
    if (!newCatLabel.trim()) return;
    const newId = newCatLabel.trim().toUpperCase().replace(/\s+/g, '_');
    if (categories.find(c => c.id === newId)) {
        alert("TAKA RUBRYKA JUŻ JEST!");
        return;
    }
    onUpdateCategories([...categories, { id: newId, label: newCatLabel.trim().toUpperCase() }]);
    setNewCatLabel('');
  };

  const handleDeleteCategory = (id: string) => {
    if (id === 'WSZYSTKO') {
        alert("TEJ RUBRYKI NIE MOŻESZ USUNĄĆ!");
        return;
    }
    if (confirm(`NA PEWNO USUNĄĆ RUBRYKĘ: ${id}?`)) {
        onUpdateCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 z-[300] bg-zinc-950 flex flex-col font-sans">
      <header className="p-6 border-b-2 border-[#CCFF00] bg-black flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#CCFF00]" size={32} />
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">PANEL STEROWANIA MASY</h2>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Admin Access Only</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 bg-zinc-900 border border-zinc-700 text-white active:scale-90 transition-transform">
          <X size={24} />
        </button>
      </header>

      <nav className="flex bg-zinc-900 p-1 shrink-0 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('CONTENT')}
          className={`px-6 py-3 flex items-center justify-center gap-2 font-black uppercase italic text-[10px] transition-all shrink-0 ${activeTab === 'CONTENT' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
        >
          <Database size={14} /> BAZA
        </button>
        <button 
          onClick={() => setActiveTab('CATEGORIES')}
          className={`px-6 py-3 flex items-center justify-center gap-2 font-black uppercase italic text-[10px] transition-all shrink-0 ${activeTab === 'CATEGORIES' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
        >
          <Tags size={14} /> RUBRYKI
        </button>
        <button 
          onClick={() => setActiveTab('CONFIG')}
          className={`px-6 py-3 flex items-center justify-center gap-2 font-black uppercase italic text-[10px] transition-all shrink-0 ${activeTab === 'CONFIG' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
        >
          <SettingsIcon size={14} /> CONFIG
        </button>
        <button 
          onClick={() => setActiveTab('DEPLOY')}
          className={`px-6 py-3 flex items-center justify-center gap-2 font-black uppercase italic text-[10px] transition-all shrink-0 ${activeTab === 'DEPLOY' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
        >
          <Globe size={14} /> DEPLOY
        </button>
      </nav>

      <main className="flex-1 overflow-y-auto p-6 pb-24 no-scrollbar">
        {activeTab === 'CONTENT' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-black italic uppercase text-lg text-white">WSZYSTKIE RECEPTURY ({recipes.length})</h3>
            <div className="grid grid-cols-1 gap-2">
              {recipes.map(recipe => (
                <div key={recipe.id} className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={recipe.image_url} className="w-12 h-12 object-cover border border-zinc-700" alt="" />
                    <div>
                      <h4 className="font-black uppercase text-sm text-white">{recipe.title}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase">{recipe.store} • {recipe.protein}g BIAŁKA</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => onEditRecipe(recipe)} className="p-2 bg-zinc-800 text-blue-500 border border-zinc-700 active:scale-90"><Edit size={16} /></button>
                    <button onClick={() => { if(confirm('USUNĄĆ?')) onDeleteRecipe(recipe.id); }} className="p-2 bg-zinc-800 text-red-500 border border-zinc-700 active:scale-90"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'CATEGORIES' && (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="bg-zinc-900 p-4 border border-zinc-800 space-y-4">
                <h3 className="font-black italic uppercase text-[#CCFF00] flex items-center gap-2"><Plus size={16} /> NOWA RUBRYKA</h3>
                <div className="flex gap-2">
                   <input 
                    placeholder="NP. 🥗 KOLACJE"
                    value={newCatLabel}
                    onChange={e => setNewCatLabel(e.target.value)}
                    className="flex-1 bg-black border border-zinc-800 p-4 font-black italic text-white outline-none focus:border-[#CCFF00]"
                   />
                   <button onClick={handleAddCategory} className="bg-[#CCFF00] text-black px-6 font-black uppercase italic active:scale-95 transition-all">DODAJ</button>
                </div>
             </div>

             <div className="space-y-2">
                <h3 className="font-black italic uppercase text-zinc-500 text-xs tracking-widest">ISTNIEJĄCE RUBRYKI</h3>
                <div className="grid grid-cols-1 gap-1">
                   {categories.map(cat => (
                     <div key={cat.id} className="bg-zinc-900 border border-zinc-800 p-4 flex justify-between items-center">
                        <span className="font-black italic uppercase text-sm text-white">{cat.label}</span>
                        {cat.id !== 'WSZYSTKO' && (
                           <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-400 p-1">
                             <Trash2 size={18} />
                           </button>
                        )}
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'CONFIG' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-4 bg-zinc-900 p-6 border border-zinc-800">
              <h3 className="font-black italic uppercase text-[#CCFF00] flex items-center gap-2"><SettingsIcon size={16} /> TEKSTY APKI</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-500">Nazwa</label>
                  <input value={tempSettings.appName} onChange={e => setTempSettings({...tempSettings, appName: e.target.value.toUpperCase()})} className="w-full bg-black border border-zinc-800 p-3 font-black text-[#CCFF00] outline-none focus:border-[#CCFF00]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-500">Slogan</label>
                  <input value={tempSettings.slogan} onChange={e => setTempSettings({...tempSettings, slogan: e.target.value})} className="w-full bg-black border border-zinc-800 p-3 font-bold italic text-white outline-none focus:border-[#CCFF00]" />
                </div>
              </div>
            </div>
            <button onClick={handleSaveSettings} className="w-full bg-[#CCFF00] text-black py-4 font-black uppercase italic shadow-[0_0_20px_rgba(204,255,0,0.3)] active:scale-95 transition-transform"><Save className="inline-block mr-2" /> ZAPISZ ZMIANY</button>
          </div>
        )}

        {activeTab === 'DEPLOY' && (
           <div className="space-y-6 text-zinc-400 font-bold uppercase italic text-[10px]">
              <p>ZARZĄDZANIE KODEM GITHUB JEST W TWOICH RĘKACH.</p>
              <button onClick={() => window.open('https://github.com/Losandreos/koryto/upload/main', '_blank')} className="bg-white text-black p-4 w-full font-black">OTWÓRZ GITHUB</button>
           </div>
        )}
      </main>
    </div>
  );
};
