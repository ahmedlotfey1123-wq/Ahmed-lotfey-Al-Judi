import React, { useState } from 'react';
import { X, Download, Share2, Eye, ExternalLink, Zap, Tag, Copy, Check, Code, ShieldCheck, Heart, Play } from 'lucide-react';
import { ImageItem, AdSettings } from '../types';
import { generateImageSchema } from '../utils/seoHelper';
import { safeOpenUrl } from '../utils/navigation';
import { getRandomVideoDuration } from '../utils/videoHelper';

interface ImageModalProps {
  image: ImageItem | null;
  isOpen: boolean;
  onClose: () => void;
  adSettings: AdSettings;
  onDownload: (image: ImageItem) => void;
  onAdClicked: (imageId: string) => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  image,
  isOpen,
  onClose,
  adSettings,
  onDownload,
  onAdClicked,
}) => {
  const [copiedKeywords, setCopiedKeywords] = useState(false);
  const [showSchemaView, setShowSchemaView] = useState(false);

  if (!isOpen || !image) return null;

  const handleCopyKeywords = () => {
    navigator.clipboard.writeText(image.keywords.join(', '));
    setCopiedKeywords(true);
    setTimeout(() => setCopiedKeywords(false), 2000);
  };

  const handleAdBannerClick = () => {
    onAdClicked(image.id);
    const adUrl = image.customAdUrl || adSettings.globalDirectAdUrl || 'https://adsterra.com';
    safeOpenUrl(adUrl, '_blank');
  };

  const schemaJson = JSON.stringify(generateImageSchema(image), null, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
              {image.category}
            </span>
            <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              فيديو 4K Ultra HD 60FPS
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Big Image Preview */}
          {/* Big Image Preview with Video Mockup Player */}
          <div 
            onClick={handleAdBannerClick}
            className="group/modalImg cursor-pointer relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center max-h-[500px]"
          >
            <img
              src={image.url}
              alt={image.altText || image.title}
              className={`max-h-[500px] w-auto max-w-full object-contain transition-all ${
                adSettings.enableVideoMockupOverlay || image.isVideo
                  ? adSettings.videoBlurEffect === 'heavy'
                    ? 'blur-[4px]'
                    : adSettings.videoBlurEffect === 'medium'
                    ? 'blur-[2.5px]'
                    : adSettings.videoBlurEffect === 'light'
                    ? 'blur-[1px]'
                    : ''
                  : ''
              }`}
            />
            
            {/* Center Video Play Button for Lightbox */}
            {(adSettings.enableVideoMockupOverlay || image.isVideo) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-950/20 group-hover/modalImg:bg-slate-950/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 flex items-center justify-center text-white shadow-2xl shadow-rose-600/50 border-2 border-white/80 group-hover/modalImg:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-white text-white ml-0.5" />
                </div>
                <span className="mt-3 text-xs font-bold text-white bg-slate-950/85 px-3.5 py-1.5 rounded-full border border-slate-700 shadow-xl flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span>انقر لتشغيل الفيديو 4K ({image.videoDuration || getRandomVideoDuration(image.id)})</span>
                </span>
              </div>
            )}

            {/* Overlay Watermark/License */}
            <div className="absolute bottom-3 left-3 bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-slate-300 border border-slate-700 z-20">
              مرخصة عبر {image.author || 'xPic CC0'}
            </div>
          </div>

          {/* Ad Placement Inside Modal */}
          <div 
            onClick={handleAdBannerClick}
            className="cursor-pointer bg-gradient-to-r from-amber-500/10 via-indigo-950 to-purple-950 border border-amber-500/40 hover:border-amber-400 rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  إعلان شريك • Partner Offer
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  🔥 هل تبحث عن أدوات ذكاء اصطناعي وتصميم بدون حدود؟ انقر هنا الآن!
                </p>
              </div>
            </div>
            <button className="shrink-0 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl flex items-center gap-1.5 shadow">
              <span>انقر لفتح الرابط</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Title & Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {image.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                تاريخ النشر: {new Date(image.createdAt).toLocaleDateString('ar-EG')} • المشاهدات: {image.views} • النقرات: {image.clicks}
              </p>
            </div>

            {/* Download CTA Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onDownload(image)}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-xl shadow-rose-600/30 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الفيديو بدقة 4K</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              الوصف والأرشفة لمحركات البحث (SEO Meta Description):
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {image.description || image.title}
            </p>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              النص البديل (Alt Text): "{image.altText || image.title}"
            </p>
          </div>

          {/* SEO Keywords Cloud */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-indigo-400" />
                الكلمات الافتتاحية ومفاتيح الأرشفة الفورية ({image.keywords.length} كلمة مفتاحية):
              </span>
              <button
                onClick={handleCopyKeywords}
                className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg border border-slate-700 transition-colors"
              >
                {copiedKeywords ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKeywords ? 'تم النسخ!' : 'نسخ كل الكلمات'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {image.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-800/90 hover:bg-indigo-950 text-slate-300 hover:text-indigo-200 px-2.5 py-1 rounded-lg border border-slate-700/70 transition-colors"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Schema.org Structured Data Viewer Toggle */}
          <div className="pt-2">
            <button
              onClick={() => setShowSchemaView(!showSchemaView)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 underline"
            >
              <Code className="w-3.5 h-3.5 text-indigo-400" />
              <span>{showSchemaView ? 'إخفاء كود Schema.org JSON-LD' : 'معاينة كود أرشفة جوجل Schema.org ImageObject'}</span>
            </button>

            {showSchemaView && (
              <pre className="mt-3 p-4 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto text-left" dir="ltr">
                {schemaJson}
              </pre>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
