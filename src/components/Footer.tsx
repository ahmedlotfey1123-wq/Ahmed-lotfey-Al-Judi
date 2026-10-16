import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  totalImages: number;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  onCategoryClick,
  totalImages,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-10 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-black text-lg text-white">xPic</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              منصة xPic لمقاطع الفيديو الرقمية عالية الدقة 4K الحصرية. مقاطع فيديو ومحتوى مرئي فائق الوضوح جاهز للمشاهدة والتشغيل.
            </p>
          </div>

          {/* Categories Col (Dynamic) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">
              أقسام وتصنيفات الفيديوهات
            </h4>
            <div className="flex flex-wrap gap-2">
              {categories.filter(c => c !== 'الكل').map((cat) => (
                <button
                  key={cat}
                  onClick={() => { onCategoryClick(cat); scrollToTop(); }}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 text-xs transition-colors"
                >
                  فيديوهات {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Keywords Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">
              الكلمات الأكثر بحثاً
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                'مقاطع فيديو 4K',
                'مشاهدة فيديوهات HD',
                'فيديوهات سيارات وسرعة',
                'مقاطع سينمائية',
                'فيديوهات طبيعة ساحرة',
                'فيديوهات تقنية وذكاء اصطناعي'
              ].map((kw, i) => (
                <span
                  key={i}
                  className="bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded text-[11px]"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} xPic Gallery • مرخص للاستخدام الحر
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>العودة للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
