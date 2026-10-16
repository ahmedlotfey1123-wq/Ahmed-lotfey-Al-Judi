import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Zap, Download, ShieldCheck, Clock } from 'lucide-react';
import { ImageItem, AdSettings } from '../types';
import { safeOpenUrl } from '../utils/navigation';

interface InterstitialAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  targetImage: ImageItem | null;
  adSettings: AdSettings;
  onAdClicked: () => void;
  actionType: 'view' | 'download';
}

export const InterstitialAdModal: React.FC<InterstitialAdModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  targetImage,
  adSettings,
  onAdClicked,
  actionType,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(adSettings.countdownSeconds || 5);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(adSettings.countdownSeconds || 5);
      return;
    }

    setSecondsLeft(adSettings.countdownSeconds || 5);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, adSettings.countdownSeconds]);

  if (!isOpen || !targetImage) return null;

  const handleOpenAd = () => {
    onAdClicked();
    const adUrl = targetImage.customAdUrl || adSettings.globalDirectAdUrl || 'https://adsterra.com';
    safeOpenUrl(adUrl, '_blank');
  };

  const handleSkipOrProceed = () => {
    onProceed();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-indigo-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
        
        {/* Close Button (if countdown is 0) */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 mb-4">
          <Zap className="w-3.5 h-3.5 text-rose-400" />
          <span>إعلان ممول • جاري تجهيز مقطع الفيديو بدقة 4K</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-white mb-2">
          {actionType === 'download' ? 'جاري تحضير ملف تحميل الفيديو بدقة 4K...' : 'جاري فتح مقطع الفيديو للتشغيل...'}
        </h3>
        <p className="text-xs text-slate-300 mb-6 line-clamp-1">
          {targetImage.title}
        </p>

        {/* Ad Box */}
        <div 
          onClick={handleOpenAd}
          className="group cursor-pointer bg-gradient-to-br from-indigo-950 via-slate-800 to-purple-950 border-2 border-indigo-500/50 hover:border-amber-400 rounded-2xl p-5 mb-6 text-center transition-all duration-300 hover:scale-[1.02] shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
              Sponsored Offer
            </span>
            <span className="text-xs text-indigo-300 flex items-center gap-1">
              <span>انقر للتخطي المباشر</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>

          <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
            🎁 أحدث عروض التسوق والتقنية الحصرية للمستخدمين
          </h4>
          <p className="text-xs text-slate-300 mb-4">
            انقر على هذا الإعلان لدعم الموقع والوصول الفوري للعرض الخاص بالناشرين.
          </p>

          <button
            type="button"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-400 group-hover:to-amber-500 text-slate-950 font-black text-sm py-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>مشاهدة العرض والرابط الإعلاني</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Countdown & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {secondsLeft > 0 ? (
            <div className="flex items-center gap-2 text-sm font-bold text-slate-300 bg-slate-800/90 px-5 py-2.5 rounded-xl border border-slate-700 w-full sm:w-auto justify-center">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
              <span>يمكنك المتابعة بعد <strong className="text-amber-400 text-base">{secondsLeft}</strong> ثوانٍ...</span>
            </div>
          ) : (
            <button
              onClick={handleSkipOrProceed}
              className="w-full sm:w-auto flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {actionType === 'download' ? (
                <>
                  <Download className="w-4 h-4" />
                  <span>تنزيل الصورة الآن (4K)</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>متابعة إلى الصورة الكاملة</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={handleOpenAd}
            className="w-full sm:w-auto text-xs text-amber-400 hover:text-amber-300 underline font-semibold py-2 px-3"
          >
            فتح الرابط الإعلاني المباشر ↗
          </button>
        </div>

      </div>
    </div>
  );
};
