import React, { useState } from 'react';
import { Save, Zap, ExternalLink, Sliders, CheckCircle2, ShieldAlert, Code2, Globe, Play } from 'lucide-react';
import { AdSettings, AdTriggerMode } from '../../types';

interface AdSettingsFormProps {
  settings: AdSettings;
  onSave: (newSettings: AdSettings) => void;
}

export const AdSettingsForm: React.FC<AdSettingsFormProps> = ({
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState<AdSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleApplyPreset = (network: 'adsterra' | 'propellerads' | 'monetag') => {
    let sampleUrl = '';
    if (network === 'adsterra') {
      sampleUrl = 'https://beta.adsterra.com/direct-link-publisher-demo';
    } else if (network === 'propellerads') {
      sampleUrl = 'https://propellerads.com/smartlink-monetization-demo';
    } else if (network === 'monetag') {
      sampleUrl = 'https://monetag.com/multitag-publisher-demo';
    }
    setFormData({
      ...formData,
      globalDirectAdUrl: sampleUrl,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Save status notification */}
      {isSaved && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-emerald-300 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>تم حفظ إعدادات الإعلانات وتحديث آلية التحويل في الموقع بنجاح!</span>
        </div>
      )}

      {/* Global Direct Ad URL Section */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-indigo-700/50 space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>الرابط الإعلاني المباشر العام (Direct Link / Smartlink) *</span>
          </label>
          <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
            أعلى وسيلة ربح للصور
          </span>
        </div>

        <p className="text-xs text-slate-300">
          هذا هو الرابط الذي سيتم توجيه الزائر إليه عند النقر على أي صورة في المعرض (من شبكة Adsterra أو PropellerAds أو Monetag أو أي رابط ترويجي تختاره).
        </p>

        <input
          type="url"
          required
          value={formData.globalDirectAdUrl}
          onChange={(e) => setFormData({ ...formData, globalDirectAdUrl: e.target.value })}
          placeholder="https://your-ad-network-smartlink.com/?ref=12345"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400">تطبيق نموذج تجريبي سريع:</span>
          <button
            type="button"
            onClick={() => handleApplyPreset('adsterra')}
            className="bg-slate-800 hover:bg-indigo-900 text-indigo-300 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            Adsterra Direct Link
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('propellerads')}
            className="bg-slate-800 hover:bg-purple-900 text-purple-300 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            PropellerAds Smartlink
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('monetag')}
            className="bg-slate-800 hover:bg-emerald-900 text-emerald-300 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            Monetag Smartlink
          </button>
        </div>
      </div>

      {/* Ad Trigger Mode Strategy */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
        <label className="block text-sm font-bold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>سلوك توجيه الزائر عند النقر على الصورة (Ad Trigger Strategy)</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Mode 1 */}
          <label className={`p-4 rounded-xl border cursor-pointer transition-all ${
            formData.triggerMode === 'new_tab_and_open'
              ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-500 text-white'
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}>
            <input
              type="radio"
              name="triggerMode"
              value="new_tab_and_open"
              checked={formData.triggerMode === 'new_tab_and_open'}
              onChange={() => setFormData({ ...formData, triggerMode: 'new_tab_and_open' })}
              className="hidden"
            />
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-indigo-400">الخيار الموصى به ⭐</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <h4 className="font-bold text-sm mb-1">تبويب إعلاني + فتح الصورة</h4>
            <p className="text-xs text-slate-400">
              يفتح الرابط الإعلاني في تبويب جديد وفي نفس الوقت يفتح تفاصيل الصورة للزائر. ممتاز للموازنة بين الأرباح وتجربة المستخدم.
            </p>
          </label>

          {/* Mode 2 */}
          <label className={`p-4 rounded-xl border cursor-pointer transition-all ${
            formData.triggerMode === 'interstitial_countdown'
              ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-500 text-white'
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}>
            <input
              type="radio"
              name="triggerMode"
              value="interstitial_countdown"
              checked={formData.triggerMode === 'interstitial_countdown'}
              onChange={() => setFormData({ ...formData, triggerMode: 'interstitial_countdown' })}
              className="hidden"
            />
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-amber-400">شاشة انتظار ⏳</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            </div>
            <h4 className="font-bold text-sm mb-1">صفحة إعلانية وسيطة</h4>
            <p className="text-xs text-slate-400">
              ظهور نافذة إعلان مع عداد تنازلي (5 ثوانٍ) قبل إمكانية عرض أو تحميل الصورة بدقة 4K.
            </p>
          </label>

          {/* Mode 3 */}
          <label className={`p-4 rounded-xl border cursor-pointer transition-all ${
            formData.triggerMode === 'direct_redirect'
              ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-500 text-white'
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}>
            <input
              type="radio"
              name="triggerMode"
              value="direct_redirect"
              checked={formData.triggerMode === 'direct_redirect'}
              onChange={() => setFormData({ ...formData, triggerMode: 'direct_redirect' })}
              className="hidden"
            />
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-rose-400">تحويل فوري ⚡</span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            </div>
            <h4 className="font-bold text-sm mb-1">تحويل مباشر للإعلان</h4>
            <p className="text-xs text-slate-400">
              تحويل الزائر مباشرة للرابط الإعلاني بمجرد النقر على بطاقة الصورة لتحقيق أقصى نسبة CTR.
            </p>
          </label>

        </div>
      </div>

      {/* Grid Native Ads & Banners Options */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>توزيع الإعلانات التلقائية في المعرض</span>
        </h4>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-slate-200 block">
                تضمين بطاقات إعلانية مدمجة داخل شبكة الصور (Native Ads)
              </span>
              <span className="text-xs text-slate-400">
                يظهر كارت إعلاني متناسق وسط الصور كل 4 أو 6 صور لزيادة الأرباح
              </span>
            </div>
            <input
              type="checkbox"
              checked={formData.enableNativeAdsInGrid}
              onChange={(e) => setFormData({ ...formData, enableNativeAdsInGrid: e.target.checked })}
              className="w-5 h-5 accent-indigo-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-slate-200 block">
                تفعيل بانر إعلاني عريض في أعلى الصفحة (Top Leaderboard 728x90)
              </span>
              <span className="text-xs text-slate-400">
                يظهر أعلى المعرض ويحصل على أعلى نسبة مشاهدات
              </span>
            </div>
            <input
              type="checkbox"
              checked={formData.enableBannerTop}
              onChange={(e) => setFormData({ ...formData, enableBannerTop: e.target.checked })}
              className="w-5 h-5 accent-indigo-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-slate-200 block">
                تفعيل بانر إعلاني في أسفل الصفحة قبل التذييل
              </span>
            </div>
            <input
              type="checkbox"
              checked={formData.enableBannerBottom}
              onChange={(e) => setFormData({ ...formData, enableBannerBottom: e.target.checked })}
              className="w-5 h-5 accent-indigo-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* Video Mockup & Distortion Overlay Settings */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-rose-600/40 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Play className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>مظهر الفيديو والتشويش التلقائي (Video Mockup & Blur Overlay)</span>
          </h4>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
            أعلى نسبة نقرات CTR 🔥
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          تقوم هذه الميزة بإظهار الصور وكأنها مقاطع فيديو حقيقية مع علامة تشغيل متحركة (Play Button)، شريط تشغيل أحمر، ومدة زمنية، مع إضافة تشويش لافت لكي ينقر الزائر لمشاهدة الفيديو فيتم توجيهه للإعلان مباشرة.
        </p>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3.5 bg-slate-900 rounded-xl cursor-pointer border border-slate-800 hover:border-slate-700">
            <div>
              <span className="text-sm font-bold text-white block">
                تفعيل مظهر الفيديو على جميع الصور تلقائياً
              </span>
              <span className="text-xs text-slate-400">
                إظهار زر التشغيل Play والمدة الزمنية وشريط الفيديو على بطاقات المعرض
              </span>
            </div>
            <input
              type="checkbox"
              checked={formData.enableVideoMockupOverlay}
              onChange={(e) => setFormData({ ...formData, enableVideoMockupOverlay: e.target.checked })}
              className="w-5 h-5 accent-rose-600 rounded"
            />
          </label>

          {formData.enableVideoMockupOverlay && (
            <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <label className="block text-xs font-bold text-slate-200">
                درجة التشويش على الصورة (Blur Effect Level):
              </label>
              <select
                value={formData.videoBlurEffect || 'light'}
                onChange={(e) => setFormData({ ...formData, videoBlurEffect: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="none">بدون تشويش (صورة واضحة مع زر التشغيل وشريط الفيديو)</option>
                <option value="light">تشويش خفيف (موصى به - يثير الفضول وتبدو الصورة جذابة)</option>
                <option value="medium">تشويش متوسط (Blur متوسط)</option>
                <option value="heavy">تشويش قوي (يحث الزائر على النقر لمعرفة محتوى الفيديو)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Custom Ad Script Injection */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
        <label className="block text-sm font-bold text-white flex items-center gap-2">
          <Code2 className="w-4 h-4 text-purple-400" />
          <span>حقن أكواد وسكربتات شبكات الإعلانات (Ad Script HTML / JavaScript)</span>
        </label>
        <p className="text-xs text-slate-400">
          إذا أعطتك شبكة الإعلانات (مثل Adsterra Social Bar أو PopAds Popunder أو Google AdSense) كود سكربت، يمكنك وضعه هنا ليتم تفعيله في الموقع تلقائياً:
        </p>
        <textarea
          rows={3}
          value={formData.bannerHtmlOrScript}
          onChange={(e) => setFormData({ ...formData, bannerHtmlOrScript: e.target.value })}
          placeholder="<script ...></script>"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left"
          dir="ltr"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <Save className="w-4 h-4" />
        <span>حفظ إعدادات وتخصيصات الإعلانات</span>
      </button>

    </form>
  );
};
