import React from 'react';
import { Flame, Tag } from 'lucide-react';

interface HeroBannerProps {
  onTagClick: (tag: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onTagClick,
}) => {
  const trendingTags = [
    'فيديوهات 4K فائقة الدقة',
    'مقاطع سيارات وسرعة',
    'فيديوهات طبيعة ساحرة',
    'مقاطع سينمائية',
    'فيديوهات فضاء ونجوم',
    'فيديوهات مدن ليلية',
    'مقاطع ذكاء اصطناعي'
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border-b border-slate-800/80 py-5">
      {/* Background Subtle Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-40 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-40 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Popular Tags / Keywords Filter Only - Clean & Elegant */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 ml-2">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>الكلمات الأكثر بحثاً:</span>
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="text-xs bg-slate-900/90 hover:bg-indigo-950 text-slate-300 hover:text-indigo-200 px-3.5 py-1.5 rounded-full border border-slate-800 hover:border-indigo-600/60 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Tag className="w-3 h-3 text-indigo-400" />
              <span>{tag}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
