import React from 'react';
import { Eye, Download, ExternalLink, Zap, Share2, Sparkles, Tag, Check, Play } from 'lucide-react';
import { ImageItem, AdSettings } from '../types';
import { getRandomVideoDuration, getRandomProgressWidth } from '../utils/videoHelper';

interface ImageCardProps {
  image: ImageItem;
  adSettings: AdSettings;
  onImageClick: (image: ImageItem) => void;
  onDownloadClick: (image: ImageItem) => void;
  onAdTriggered: (imageId: string) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  adSettings,
  onImageClick,
  onDownloadClick,
  onAdTriggered,
}) => {
  const handleCardClick = () => {
    onImageClick(image);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownloadClick(image);
  };

  const [copiedLink, setCopiedLink] = React.useState(false);
  const videoTimer = React.useMemo(() => image.videoDuration || getRandomVideoDuration(image.id), [image.id, image.videoDuration]);
  const progressWidth = React.useMemo(() => getRandomProgressWidth(image.id), [image.id]);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(image.url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <article 
      onClick={handleCardClick}
      className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/70 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      {/* Hidden SEO Schema microdata inside card */}
      <meta itemProp="name" content={image.title} />
      <meta itemProp="contentUrl" content={image.url} />
      <meta itemProp="thumbnail" content={image.thumbnailUrl || image.url} />
      <meta itemProp="description" content={image.description} />
      <meta itemProp="keywords" content={image.keywords.join(', ')} />

      {/* Image Preview Container with Video Player Mockup */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        {/* Main Image with Optional Blur/Distortion */}
        <img
          src={image.thumbnailUrl || image.url}
          alt={image.altText || image.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            adSettings.enableVideoMockupOverlay || image.isVideo
              ? adSettings.videoBlurEffect === 'heavy'
                ? 'blur-[6px] filter contrast-125'
                : adSettings.videoBlurEffect === 'medium'
                ? 'blur-[3.5px] filter contrast-110'
                : adSettings.videoBlurEffect === 'light'
                ? 'blur-[1.5px]'
                : ''
              : ''
          }`}
        />

        {/* Video Player Center Play Button (Triggering Ad on click) */}
        {(adSettings.enableVideoMockupOverlay || image.isVideo) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            {/* Pulsing Play Button */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full bg-rose-600/30 animate-ping pointer-events-none" />
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 flex items-center justify-center text-white shadow-2xl shadow-rose-600/50 border-2 border-white/60 group-hover:scale-110 group-hover:from-rose-500 group-hover:to-red-500 transition-transform">
                <Play className="w-7 h-7 fill-white text-white ml-0.5" />
              </div>
            </div>
            
            {/* Video Label */}
            <span className="mt-2 text-[11px] font-black text-white bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-700/80 shadow">
              انقر للمشاهدة والتشغيل
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-slate-200 border border-slate-700/60 shadow">
            {image.category}
          </span>

          {/* Video Duration or HD Badge */}
          {(adSettings.enableVideoMockupOverlay || image.isVideo) ? (
            <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-md bg-rose-600 text-white shadow flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <span>{videoTimer}</span>
            </span>
          ) : (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 shadow flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>ربح تلقائي</span>
            </span>
          )}
        </div>

        {/* Video Scrubber / Progress Bar at Bottom of Thumbnail with Randomized Progress */}
        {(adSettings.enableVideoMockupOverlay || image.isVideo) && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-800/80 z-20 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-rose-500 relative transition-all"
              style={{ width: `${progressWidth}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md"></div>
            </div>
          </div>
        )}

        {/* Hover Quick Action Buttons */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
          <button
            onClick={handleDownload}
            className="p-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-lg backdrop-blur-sm transition-transform active:scale-90"
            title="تحميل الفيديو بدقة 4K"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            className={`p-2.5 rounded-xl text-white shadow-lg backdrop-blur-sm transition-transform active:scale-90 ${
              copiedLink ? 'bg-emerald-600' : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200'
            }`}
            title={copiedLink ? 'تم نسخ الرابط!' : 'مشاركة الفيديو'}
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-200" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Resolution Badge */}
        <div className="absolute bottom-3 right-3 z-20">
          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-600/90 text-white backdrop-blur-md border border-indigo-400/40">
            {(adSettings.enableVideoMockupOverlay || image.isVideo) ? '4K VIDEO 60FPS' : '4K ULTRA HD'}
          </span>
        </div>
      </div>

      {/* Card Content & SEO Keywords */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="font-bold text-sm sm:text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
            {image.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {image.description}
          </p>
        </div>

        {/* SEO Tags snippet */}
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-wrap gap-1 mb-2.5">
            {image.keywords.slice(0, 3).map((kw, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50"
              >
                #{kw}
              </span>
            ))}
            {image.keywords.length > 3 && (
              <span className="text-[10px] text-indigo-400 font-semibold self-center">
                +{image.keywords.length - 3} سيو
              </span>
            )}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-400">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              {image.views} مشاهدة
            </span>

            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Zap className="w-3.5 h-3.5" />
              {image.clicks} نقرة إعلانية
            </span>

            <span className="flex items-center gap-1 text-indigo-300">
              <Download className="w-3.5 h-3.5" />
              {image.downloads}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
