import React, { useState } from 'react';
import { Globe, Copy, Check, Download, FileCode, CheckCircle2, AlertTriangle, Search, Sparkles } from 'lucide-react';
import { ImageItem } from '../../types';
import { generateSitemapXml, calculateSeoScore } from '../../utils/seoHelper';

interface SeoToolsProps {
  images: ImageItem[];
}

export const SeoTools: React.FC<SeoToolsProps> = ({ images }) => {
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [copiedRobots, setCopiedRobots] = useState(false);

  const sitemapXml = generateSitemapXml(images, window.location.origin);

  const robotsTxt = `User-agent: *
Allow: /
Allow: /#image-*

# Sitemaps
Sitemap: ${window.location.origin}/sitemap.xml

# Image Crawling Optimization for Googlebot-Image
User-agent: Googlebot-Image
Allow: /
`;

  const handleCopySitemap = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2000);
  };

  const handleDownloadSitemap = () => {
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyRobots = () => {
    navigator.clipboard.writeText(robotsTxt);
    setCopiedRobots(true);
    setTimeout(() => setCopiedRobots(false), 2000);
  };

  // Calculate overall SEO Health
  const totalKeywords = images.reduce((acc, curr) => acc + (curr.keywords ? curr.keywords.length : 0), 0);
  const avgKeywords = images.length > 0 ? Math.round(totalKeywords / images.length) : 0;
  const passedScores = images.map(img => calculateSeoScore(img).score);
  const avgScore = passedScores.length > 0 ? Math.round(passedScores.reduce((a, b) => a + b, 0) / passedScores.length) : 95;

  return (
    <div className="space-y-6">
      
      {/* Top SEO Score Card */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 rounded-2xl border border-indigo-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
            تقرير الأرشفة الفورية لمحركات البحث
          </span>
          <h3 className="text-xl font-black text-white">
            جاهزية الموقع للأرشفة وظهور الفيديوهات في نتائج بحث Google: {avgScore}%
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            كل فيديو يمتلك كود Schema.org، كلمات مفتاحية غنية، نص بديل وخريطة موقع تلقائية جاهزة لـ Google Search Console.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-center p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-2xl font-black text-emerald-400 block">{images.length}</span>
            <span className="text-[11px] text-slate-400 font-semibold">فيديوهات مارشفة</span>
          </div>
          <div className="text-center p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-2xl font-black text-amber-400 block">{totalKeywords}</span>
            <span className="text-[11px] text-slate-400 font-semibold">كلمة مفتاحية</span>
          </div>
          <div className="text-center p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-2xl font-black text-indigo-400 block">+{avgKeywords}</span>
            <span className="text-[11px] text-slate-400 font-semibold">معدل/صورة</span>
          </div>
        </div>
      </div>

      {/* Sitemap.xml Generator Section */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>خريطة الموقع التلقائية للصور (Google Image Sitemap.xml)</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              تحتوي على عناوين، روابط وتراخيص كل الصور لتقديمها في Google Search Console ليتم أرشفتها فوراً.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySitemap}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copiedSitemap ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSitemap ? 'تم النسخ!' : 'نسخ الكود'}</span>
            </button>
            <button
              onClick={handleDownloadSitemap}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل sitemap.xml</span>
            </button>
          </div>
        </div>

        <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 max-h-52 overflow-y-auto text-left" dir="ltr">
          {sitemapXml}
        </pre>
      </div>

      {/* Robots.txt Configuration */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>ملف تهيئة عناكب البحث (robots.txt)</span>
          </h4>
          <button
            onClick={handleCopyRobots}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            {copiedRobots ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedRobots ? 'تم النسخ' : 'نسخ ملف robots.txt'}</span>
          </button>
        </div>

        <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 text-left" dir="ltr">
          {robotsTxt}
        </pre>
      </div>

      {/* SEO Golden Advice & Strategy */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>أسرار تصدر صور موقعك في أوائل نتائج بحث Google Images وجلب آلاف الزوار:</span>
        </h4>

        <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold shrink-0">1.</span>
            <span><strong>العنوان الغني:</strong> لا تسمّ الصورة "img1" بل استخدم صيغاً يبحث عنها المستخدمون مثل: "خلفيات طبيعة ساحرة 4K للجوال".</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold shrink-0">2.</span>
            <span><strong>الكلمات المفتاحية الطويلة (Long-Tail Keywords):</strong> روبوت السيو الذي طورناه لك يولد تلقائياً أكثر من 20 عبارة بحث بديلة لكل صورة.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold shrink-0">3.</span>
            <span><strong>بيانات Schema.org المنظمة:</strong> تجعل روبوت Googlebot-Image يفهم رخصة الصورة وأبعادها بدقة ويمنحها شارة "مرخصة / قابلة للتحميل".</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold shrink-0">4.</span>
            <span><strong>النشر المستمر:</strong> إضافة 5 إلى 10 صور يومياً تجعل عناكب البحث تزور موقعك كل بضع ساعات لأرشفة الصور الجديدة فوراً.</span>
          </li>
        </ul>
      </div>

    </div>
  );
};
