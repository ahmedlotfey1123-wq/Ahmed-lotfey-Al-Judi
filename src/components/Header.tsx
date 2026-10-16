import React, { useEffect } from 'react';
import { Sparkles, Search, Layers, Lock } from 'lucide-react';
import { checkIsSecretPassphrase, getSecretPassphrase } from '../services/storage';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenAdmin: () => void;
  categories: string[];
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenAdmin,
  categories,
}) => {
  // Secret Admin Detection: when user types secret passphrase (e.g. Ahmed123123@#@#)
  const handleInputChange = (val: string) => {
    if (checkIsSecretPassphrase(val)) {
      onSearchChange('');
      onOpenAdmin();
      return;
    }
    onSearchChange(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (checkIsSecretPassphrase(searchQuery)) {
        e.preventDefault();
        onSearchChange('');
        onOpenAdmin();
      }
    }
  };

  // Keyboard shortcut listener (Alt+A or Ctrl+Shift+A) for admin convenience
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        onOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [onOpenAdmin]);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand - Clean & Professional */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => { onSearchChange(''); onSelectCategory('الكل'); }}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-indigo-100 to-amber-400 bg-clip-text text-transparent">
                xPic
              </span>
              <p className="text-xs text-slate-400 font-medium hidden md:block">
                منصة xPic لمقاطع الفيديو الحصرية عالية الدقة 4K
              </p>
            </div>
          </div>

          {/* Search Bar - With Secret Admin Access Detection */}
          <div className="flex-1 max-w-2xl mx-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ابحث في آلاف مقاطع الفيديو الحصرية بدقة 4K..."
                className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 text-sm rounded-full pl-4 pr-11 py-3 border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-inner"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Search className="w-4 h-4 text-indigo-400" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded-full"
                >
                  مسح
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Dynamic Categories Bar (Admin-Controlled) */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-800/60 text-xs">
          <span className="text-slate-400 font-bold flex items-center gap-1.5 ml-2 shrink-0">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            تصنيفات الفيديوهات:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
