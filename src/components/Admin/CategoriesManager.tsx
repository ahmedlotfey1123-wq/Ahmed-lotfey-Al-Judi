import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Layers, AlertCircle, RefreshCw, FolderPlus } from 'lucide-react';
import { ImageItem } from '../../types';

interface CategoriesManagerProps {
  categories: string[];
  images: ImageItem[];
  onAddCategory: (name: string) => void;
  onUpdateCategory: (oldName: string, newName: string) => void;
  onDeleteCategory: (name: string) => void;
  onResetCategories: () => void;
}

export const CategoriesManager: React.FC<CategoriesManagerProps> = ({
  categories,
  images,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onResetCategories,
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [confirmDeleteCat, setConfirmDeleteCat] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      setErrorMessage('يرجى كتابة اسم التصنيف الجديد.');
      return;
    }
    if (categories.includes(trimmed)) {
      setErrorMessage('هذا التصنيف موجود بالفعل.');
      return;
    }

    onAddCategory(trimmed);
    setNewCategoryName('');
    setSuccessMessage(`تم إنشاء التصنيف "${trimmed}" بنجاح!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const startEdit = (cat: string) => {
    setEditingCategory(cat);
    setEditValue(cat);
    setConfirmDeleteCat(null);
  };

  const handleSaveEdit = (oldName: string) => {
    const trimmed = editValue.trim();
    if (!trimmed) return;
    if (trimmed !== oldName && categories.includes(trimmed)) {
      setErrorMessage('يوجد تصنيف آخر بنفس هذا الاسم.');
      return;
    }

    onUpdateCategory(oldName, trimmed);
    setEditingCategory(null);
    setSuccessMessage(`تم استبدال وتعديل التصنيف إلى "${trimmed}" وتحديث جميع الصور المرتبطة به!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = (catName: string) => {
    onDeleteCategory(catName);
    setConfirmDeleteCat(null);
    setSuccessMessage(`تم حذف التصنيف "${catName}" ونقل صوره بنجاح.`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Explanation */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-indigo-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-black text-white">إدارة وتخصيص تصنيفات الفيديوهات الكاملة</h3>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            يمكنك كمسؤول إنشاء تصنيفات جديدة، استبدال وتعديل الأسماء، أو حذف أي تصنيف بحرية تامة وتحديث فيديوهات الموقع تلقائياً.
          </p>
        </div>

        <button
          onClick={onResetCategories}
          className="text-xs text-indigo-300 hover:text-white bg-slate-900 border border-slate-700 hover:bg-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>استعادة التصنيفات الافتراضية</span>
        </button>
      </div>

      {/* Messages */}
      {errorMessage && (
        <div className="p-3 bg-rose-500/15 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Add New Category Form */}
      <form onSubmit={handleAdd} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => { setNewCategoryName(e.target.value); setErrorMessage(''); }}
          placeholder="أدخل اسم التصنيف الجديد (مثال: ألعاب وفيديو، خلفيات أيفون، أنمي...)"
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all shrink-0 active:scale-95"
        >
          <FolderPlus className="w-4 h-4" />
          <span>إنشاء وإضافة تصنيف</span>
        </button>
      </form>

      {/* Existing Categories Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>قائمة التصنيفات النشطة ({categories.length} تصنيف):</span>
          <span>التصنيف "الكل" افتراضي لعرض كامل المعرض</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((cat) => {
            const isEditing = editingCategory === cat;
            const isAll = cat === 'الكل';
            const count = images.filter(i => isAll ? true : i.category === cat).length;

            return (
              <div
                key={cat}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 transition-colors hover:border-slate-700"
              >
                {isEditing ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 bg-slate-900 border border-indigo-500 rounded-lg px-2.5 py-1 text-xs text-white"
                    />
                    <button
                      onClick={() => handleSaveEdit(cat)}
                      className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                      title="حفظ"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="إلغاء"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-bold shrink-0">
                        {cat[0]}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-white block">{cat}</span>
                        <span className="text-[11px] text-slate-400">{count} فيديو مرتبط</span>
                      </div>
                    </div>

                    {!isAll && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        {confirmDeleteCat === cat ? (
                          <div className="flex items-center gap-1 bg-rose-950/80 border border-rose-600/60 p-1 rounded-xl">
                            <span className="text-[10px] text-rose-300 font-bold px-1">حذف التصنيف؟</span>
                            <button
                              onClick={() => handleDelete(cat)}
                              className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold"
                            >
                              نعم
                            </button>
                            <button
                              onClick={() => setConfirmDeleteCat(null)}
                              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                            >
                              إلغاء
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(cat)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 transition-colors"
                              title="تعديل واستبدال اسم التصنيف"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-indigo-300" />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteCat(cat)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-700 hover:border-rose-900 transition-colors"
                              title="حذف التصنيف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
