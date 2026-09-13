
import React from 'react';
import { UserStats } from '../types';
import { Activity, Plus } from 'lucide-react';

interface MacroTrackerProps {
  consumed: { protein: number; carbs: number; fat: number };
  userStats: UserStats;
  onOpenQuickLog: () => void;
}

export const MacroTracker: React.FC<MacroTrackerProps> = ({ consumed, userStats, onOpenQuickLog }) => {
  const bmr = 10 * userStats.weight + 6.25 * userStats.height - 5 * 25 + 5;
  const activityMult = userStats.isTrainingDay ? 1.6 : 1.2;
  let tdee = bmr * activityMult;

  if (userStats.goal === 'MASA') {
    tdee += 500;
  }

  const proteinGoal = Math.round(userStats.weight * 2.2);
  const fatGoal = Math.round(userStats.weight * 0.9);
  const carbsGoal = Math.round((tdee - (proteinGoal * 4 + fatGoal * 9)) / 4);

  const pProgress = Math.min(100, (consumed.protein / proteinGoal) * 100);
  const cProgress = Math.max(0, Math.min(100, (consumed.carbs / carbsGoal) * 100));

  return (
    <div className="bg-zinc-900/30 border-b border-zinc-800/50 p-1.5 px-3 flex items-center justify-between gap-4">
      <div className="flex-1 flex flex-col gap-1">
        {/* Protein Thin Bar */}
        <div className="flex items-center gap-2">
          <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#CCFF00] shadow-[0_0_5px_#CCFF00]" 
              style={{ width: `${pProgress}%` }}
            />
          </div>
          <span className="text-[9px] font-black text-[#CCFF00] italic whitespace-nowrap">{consumed.protein} / {proteinGoal}B</span>
        </div>

        {/* Carbs Thin Bar */}
        <div className="flex items-center gap-2">
          <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 shadow-[0_0_5px_#3b82f6]" 
              style={{ width: `${cProgress}%` }}
            />
          </div>
          <span className="text-[9px] font-black text-blue-500 italic whitespace-nowrap">{consumed.carbs} / {carbsGoal}W</span>
        </div>
      </div>

      <button 
        onClick={onOpenQuickLog}
        className="p-1.5 bg-[#CCFF00] text-black rounded-full active:scale-90 transition-transform"
      >
        <Plus size={12} strokeWidth={3} />
      </button>
    </div>
  );
};
