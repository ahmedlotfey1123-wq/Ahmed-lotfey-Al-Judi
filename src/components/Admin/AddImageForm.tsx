import React, { useState } from 'react';
import { Upload, Sparkles, Plus, Image as ImageIcon, CheckCircle, Tag, AlertCircle, Dices } from 'lucide-react';
import { ImageItem } from '../../types';
import { generateSeoKeywords, calculateSeoScore } from '../../utils/seoHelper';
import { getRandomVideoDuration } from '../../utils/videoHelper';
import { CATEGORIES } from '../../data/initialImages';

interface AddImageFormProps {
  onImageAdded: (image: ImageItem) => void;
  defaultAdUrl: string;
  categories: string[];
}

export const AddImageForm: React.FC<AddImageFormProps> = ({
  onImageAdded,
  defaultAdUrl,
  categories,
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const availableCategories = categories.filter(c => c !== 'الكل');
  const [category, setCategory] = useState(availableCategories[0] || 'طبيعة ومناظر');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [customAdUrl, setCustomAdUrl] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [author, setAuthor] = useState('');
  const [videoDuration, setVideoDuration] = useState(() => getRandomVideoDuration());
  const [isVideo, setIsVideo] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto SEO Generator: Generates 20+ keywords & Alt text instantly
  const handleAutoGenerateSeo = () => {
    setErrorMessage('');
    if (!title.trim()) {
      setErrorMessage('يرجى كتابة عنوان الصورة أولاً لتوليد الكلمات المفتاحية والسيو.');
      return;
    }

    const generated = generateSeoKeywords(title, category, description);
    setKeywords(generated);

    if (!altText.trim()) {
      setAltText(`صورة وخلفية ${title} بجودة فائقة 4K عالية الدقة`);
    }

    if (!description.trim()) {
      setDescription(`أحدث وأجمل ${title} متاحة للتحميل مجاناً بدون حقوق ملكية بدقة 4K فائقة الوضوح مناسبة لشاشات الهواتف وأجهزة الكمبيوتر ومصممي الجرافيك.`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
        if (!title) {
          const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setTitle(`خلفية ${fileNameWithoutExt} بجودة فائقة 4K`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomKeyword = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      if (!keywords.includes(keywordInput.trim())) {
        setKeywords([...keywords, keywordInput.trim()]);
      }
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (kwToRemove: string) => {
    setKeywords(keywords.filter(k => k !== kwToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!title.trim() || !url.trim()) {
      setErrorMessage('يرجى إدخال عنوان ورابط الصورة.');
      return;
    }

    // Ensure keywords exist
    const finalKeywords = keywords.length > 0 ? keywords : generateSeoKeywords(title, category, description);

    const newImage: ImageItem = {
      id: `img-${Date.now()}`,
      title: title.trim(),
      url: url.trim(),
      category,
      description: description.trim() || title.trim(),
      altText: altText.trim() || title.trim(),
      tags: [category, ...finalKeywords.slice(0, 5)],
      keywords: finalKeywords,
      customAdUrl: customAdUrl.trim() || undefined,
      isVideo,
      videoDuration: videoDuration.trim() || '03:45',
      views: 0,
      clicks: 0,
      downloads: 0,
      createdAt: new Date().toISOString(),
      author: author.trim() || 'xPic Creator'
    };

    onImageAdded(newImage);
    setIsSuccess(true);

    // Reset form after short delay
    setTimeout(() => {
      setTitle('');
      setUrl('');
      setDescription('');
      setAltText('');
      setCustomAdUrl('');
      setKeywords([]);
      setAuthor('');
      setIsSuccess(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Error Notice */}
      {errorMessage && (
        <div className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-2xl flex items-center gap-3 text-rose-300 text-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Notice */}
      {isSuccess && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-emerald-300 text-sm animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>تمت إضافة الصورة بنجاح وتهيئتها للأرشفة التلقائية وربط الإعلانات!</span>
        </div>
      )}

      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            عنوان الصورة (هام جداً للأرشفة وسيو جوجل) *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: خلفية سيارة فيراري حمراء في شوارع دبي ليلاً بدقة 4K"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            التصنيف *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {availableCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Author / Source */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            اسم المصور أو الناشر
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="مثال: أحمد لطفي / PicMaster"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

      </div>

      {/* Image Upload or URL */}
      <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
        <label className="block text-xs font-bold text-slate-300">
          مصدر الصورة (رابط مباشر أو رفع من جهازك) *
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-... أو رابط صورتك"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition-colors shrink-0">
            <Upload className="w-4 h-4 text-indigo-400" />
            <span>رفع من الجهاز</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Image Preview Thumbnail */}
        {url && (
          <div className="relative mt-2 w-full h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
            <img src={url} alt="معاينة" className="h-full w-full object-cover" />
            <div className="absolute top-2 right-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-bold">
              جاهزة للعرض
            </div>
          </div>
        )}
      </div>

      {/* Auto SEO Generator Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-right">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">توليد الكلمات المفتاحية والأرشفة الفورية تلقائياً</h4>
            <p className="text-xs text-slate-300">يولد +20 كلمة مفتاحية، نص بديل Alt، ووصف غني لمسح روبوتات محركات البحث</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAutoGenerateSeo}
          className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>توليد السيو بضغطة زر</span>
        </button>
      </div>

      {/* SEO Alt Text & Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            النص البديل (Alt Text لصور جوجل)
          </label>
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="وصف دقيق لما تحتويه الصورة"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            رابط إعلاني مخصص لهذه الصورة (اختياري)
          </label>
          <input
            type="url"
            value={customAdUrl}
            onChange={(e) => setCustomAdUrl(e.target.value)}
            placeholder="اتركه فارغاً لاستخدام الرابط العام"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-rose-300">
              المدة الزمنية للـ Video Mockup (تظهر على الفيديو)
            </label>
            <button
              type="button"
              onClick={() => setVideoDuration(getRandomVideoDuration())}
              className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold"
              title="توليد مدة عشوائية جديدة"
            >
              <Dices className="w-3.5 h-3.5" />
              <span>مدة عشوائية</span>
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={videoDuration}
              onChange={(e) => setVideoDuration(e.target.value)}
              placeholder="مثال: 04:18 أو 02:45"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-rose-300 font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            وصف الصورة (SEO Meta Description)
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="شرح توضيحي غني بالكلمات الافتتاحية يظهر في نتائج بحث جوجل"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Keywords Cloud Editor */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1.5">
          الكلمات المفتاحية للأرشفة ({keywords.length} كلمة) - اكتب واضغط Enter:
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleAddCustomKeyword}
            placeholder="أضف كلمة مفتاحية واضغط Enter"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-950/70 border border-slate-800 rounded-xl">
          {keywords.length === 0 ? (
            <span className="text-xs text-slate-500 italic p-1">
              لم تتم إضافة كلمات بعد. اضغط على زر "توليد السيو بضغطة زر" بالأعلى لملئها تلقائياً.
            </span>
          ) : (
            keywords.map((kw, i) => (
              <span
                key={i}
                className="text-[11px] bg-indigo-950/80 text-indigo-200 border border-indigo-700/60 px-2 py-0.5 rounded-md flex items-center gap-1"
              >
                <span>#{kw}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(kw)}
                  className="hover:text-rose-400 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>نشر الصورة وتفعيل أرشفة السيو والروابط الإعلانية</span>
        </button>
      </div>

    </form>
  );
};
