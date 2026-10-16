import React from 'react';
import { ExternalLink, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { AdSettings } from '../types';
import { safeOpenUrl } from '../utils/navigation';

interface AdBannerProps {
  type: 'leaderboard' | 'native_grid' | 'footer';
  adSettings: AdSettings;
  onAdClicked: () => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  type,
  adSettings,
  onAdClicked,
}) => {
  const handleBannerClick = () => {
    onAdClicked();
    const targetUrl = adSettings.globalDirectAdUrl || 'https://adsterra.com';
    safeOpenUrl(targetUrl, '_blank');
  };

  if (type === 'leaderboard') {
    return (
      <div className="w-full my-6 max-w-5xl mx-auto px-4">
        <div 
          onClick={handleBannerClick}
          className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900 border border-indigo-700/40 p-4 sm:p-5 shadow-xl hover:border-indigo-500/70 transition-all hover:shadow-indigo-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                  إعلان ممول • Sponsored
                </span>
                <span className="text-xs text-indigo-300 font-semibold">شبكة الإعلانات الشريكة</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                🔥 أفضل منصات التداول والألعاب والعروض الحصرية بأعلى عوائد
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                انقر هنا للحصول على العروض الترويجية والاشتراكات المجانية الحصرية لليوم فقط
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-400 group-hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95">
            <span>زيارة الرابط الآن</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'native_grid') {
    return (
      <div 
        onClick={handleBannerClick}
        className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-amber-500/40 hover:border-amber-400 p-5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between h-full min-h-[360px]"
      >
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[10px] font-black uppercase px-2 py-1 rounded-md bg-amber-400 text-slate-950 shadow-md">
            إعلان مدفوع • Sponsored Ad
          </span>
        </div>

        <div className="mt-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20 mb-4 group-hover:scale-110 transition-transform">
            <Sparkles className="w-8 h-8" />
          </div>
          <h4 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
            تحميل مجاني لأقوى برامج التصميم وحزم خطوط وأيقونات 2026
          </h4>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            محتوى ترويجي خاص بالناشرين - انقر للوصول الفوري وتحميل الباقة الكاملة مجاناً بدون انتظار.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            نقرة واحدة للوصول
          </span>
          <div className="flex items-center gap-1 font-bold text-amber-400 group-hover:translate-x-[-2px] transition-transform">
            <span>انقر للمشاهدة</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  }

  // Footer banner
  return (
    <div className="w-full my-8 max-w-4xl mx-auto px-4">
      <div 
        onClick={handleBannerClick}
        className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-indigo-600/50 rounded-xl p-3.5 text-center transition-all flex items-center justify-center gap-3 text-xs text-slate-400 hover:text-slate-200"
      >
        <span className="bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded text-[10px]">AD</span>
        <span>🔥 استكشف أفضل عروض الاستضافة وتطوير المواقع وخدمات التسويق الإلكتروني</span>
        <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
      </div>
    </div>
  );
};
