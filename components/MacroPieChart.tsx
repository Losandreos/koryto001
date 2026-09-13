import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface MacroChartData {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

interface MacroPieChartProps {
  targets: MacroChartData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      grams: number;
      calories: number;
      percentage: number;
      color: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-zinc-950 border border-zinc-700 p-2.5 shadow-xl text-xs font-mono">
        <div className="flex items-center gap-1.5 mb-1 font-black uppercase text-white">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: data.color }} />
          <span>{data.name}</span>
        </div>
        <p className="text-[#CCFF00] font-bold text-sm">{data.grams}g <span className="text-zinc-400 text-xs font-normal">({data.calories} kcal)</span></p>
        <p className="text-zinc-400 text-[10px]">{data.percentage}% dziennego zapotrzebowania</p>
      </div>
    );
  }
  return null;
};

export const MacroPieChart: React.FC<MacroPieChartProps> = ({ targets }) => {
  const proteinKcal = targets.protein * 4;
  const carbsKcal = Math.max(0, targets.carbs * 4);
  const fatKcal = targets.fat * 9;
  const totalKcal = proteinKcal + carbsKcal + fatKcal || 1;

  const data = [
    {
      name: 'Białko',
      value: proteinKcal,
      grams: targets.protein,
      calories: proteinKcal,
      percentage: Math.round((proteinKcal / totalKcal) * 100),
      color: '#CCFF00'
    },
    {
      name: 'Węglowodany',
      value: carbsKcal,
      grams: targets.carbs,
      calories: carbsKcal,
      percentage: Math.round((carbsKcal / totalKcal) * 100),
      color: '#3B82F6'
    },
    {
      name: 'Tłuszcze',
      value: fatKcal,
      grams: targets.fat,
      calories: fatKcal,
      percentage: Math.round((fatKcal / totalKcal) * 100),
      color: '#F97316'
    }
  ];

  return (
    <div className="p-5 bg-zinc-900 border border-zinc-800 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[#CCFF00] font-black italic uppercase text-sm tracking-widest flex items-center gap-2">
          📊 PODZIAŁ MAKROSKŁADNIKÓW
        </h3>
        <span className="text-xs font-bold text-zinc-400 italic">
          {targets.calories} KCAL
        </span>
      </div>

      <div className="relative w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
              stroke="#18181b"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label inside Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">DOBOWO</span>
          <span className="text-lg font-black italic text-white leading-none">{targets.calories}</span>
          <span className="text-[9px] font-black text-[#CCFF00] tracking-widest">KCAL</span>
        </div>
      </div>

      {/* Legend & Breakdown stats */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
        {data.map((item) => (
          <div key={item.name} className="bg-black/60 border border-zinc-800/80 p-2.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] font-black uppercase text-zinc-300 truncate">{item.name}</span>
            </div>
            <div>
              <div className="text-base font-black italic text-white leading-tight">
                {item.grams}<span className="text-[10px] text-zinc-400 font-bold ml-0.5">g</span>
              </div>
              <div className="text-[10px] font-bold text-zinc-400 mt-0.5 flex justify-between items-center">
                <span>{item.percentage}%</span>
                <span className="text-zinc-500 text-[9px]">{item.calories}kcal</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
