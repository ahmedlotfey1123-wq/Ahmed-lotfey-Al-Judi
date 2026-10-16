import React, { useState } from 'react';
import { Trash2, Edit3, ExternalLink, Zap, Eye, Check, X, Tag, Sparkles } from 'lucide-react';
import { ImageItem } from '../../types';
import { calculateSeoScore, generateSeoKeywords } from '../../utils/seoHelper';

interface ImageManagementListProps {
  images: ImageItem[];
  onUpdateImage: (id: string, updates: Partial<ImageItem>) => void;
  onDeleteImage: (id: string) => void;
  onRestoreDefaults: () => void;
}

export const ImageManagementList: React.FC<ImageManagementListProps> = ({
  images,
  onUpdateImage,
  onDeleteImage,
  onRestoreDefaults,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCustomAdUrl, setEditCustomAdUrl] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = images.filter(img => 
    img.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    img.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const startEdit = (img: ImageItem) => {
    setEditingId(img.id);
    setEditTitle(img.title);
    setEditCustomAdUrl(img.customAdUrl || '');
  };

  const saveEdit = (id: string) => {
    onUpdateImage(id, {
      title: editTitle.trim(),
      customAdUrl: editCustomAdUrl.trim() || undefined,
      // refresh keywords if title changed
      keywords: generateSeoKeywords(editTitle.trim(), images.find(i => i.id === id)?.category || '')
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="ابحث في مقاطع الفيديو لإدارتها وتعديل روابطها الإعلانية..."
          className="w-full sm:w-80 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs text-slate-400 font-medium">
            إجمالي: <strong className="text-white">{images.length}</strong> فيديو
          </span>
          <button
            onClick={onRestoreDefaults}
            className="text-xs text-indigo-400 hover:text-indigo-300 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
          >
            استعادة باقة الفيديوهات النموذجية
          </button>
        </div>
      </div>

      {/* Videos List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            لا توجد مقاطع فيديو مطابقة لبحثك.
          </div>
        ) : (
          filtered.map((img) => {
            const isEditing = editingId === img.id;
            const { score } = calculateSeoScore(img);

            return (
              <div
                key={img.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-slate-700"
              >
                {/* Thumbnail & Title */}
                <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                  <img
                    src={img.thumbnailUrl || img.url}
                    alt={img.title}
                    className="w-16 h-12 object-cover rounded-xl bg-slate-900 shrink-0 border border-slate-800"
                  />

                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-indigo-500 rounded-lg px-2.5 py-1 text-xs text-white"
                          placeholder="عنوان الصورة"
                        />
                        <input
                          type="url"
                          value={editCustomAdUrl}
                          onChange={(e) => setEditCustomAdUrl(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200"
                          placeholder="رابط إعلاني مخصص (اتركه فارغاً للافتراضي)"
                        />
                      </div>
                    ) : (
                      <>
                        <h4 className="text-sm font-bold text-white truncate" title={img.title}>
                          {img.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span className="bg-slate-900 px-2 py-0.5 rounded text-indigo-300 font-medium">
                            {img.category}
                          </span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Eye className="w-3 h-3" />
                            {img.views}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                            <Zap className="w-3 h-3" />
                            {img.clicks} نقرة
                          </span>
                          <span className="text-[10px] text-amber-300">
                            {img.customAdUrl ? '🔗 رابط إعلان مخصص' : '⚡ رابط إعلان عام'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* SEO Score Badge & Actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  
                  {/* SEO badge */}
                  <span className={`text-[11px] font-bold px-2 py-1 rounded-lg border ${
                    score >= 90 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    سيو: {score}%
                  </span>

                  {isEditing ? (
                    <>
                      <button
                        onClick={() => saveEdit(img.id)}
                        className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                        title="حفظ"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="إلغاء"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(img)}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700 transition-colors"
                        title="تعديل العنوان والرابط الإعلاني"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {confirmDeleteId === img.id ? (
                        <div className="flex items-center gap-1 bg-rose-950/80 border border-rose-600/60 p-1 rounded-xl">
                          <span className="text-[10px] text-rose-300 font-bold px-1">تأكيد الحذف؟</span>
                          <button
                            onClick={() => {
                              onDeleteImage(img.id);
                              setConfirmDeleteId(null);
                            }}
                            className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold"
                          >
                            نعم
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                          >
                            إلغاء
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(img.id)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-700 hover:border-rose-800 transition-colors"
                          title="حذف الصورة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
