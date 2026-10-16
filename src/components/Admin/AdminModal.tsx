import React, { useState } from 'react';
import { 
  X, Shield, PlusCircle, Layers, Zap, Globe, BarChart3, BookOpen, 
  Lock, LogOut, KeyRound, Sparkles, CheckCircle2, Key 
} from 'lucide-react';
import { ImageItem, AdSettings, SiteAnalytics } from '../../types';
import { AddImageForm } from './AddImageForm';
import { ImageManagementList } from './ImageManagementList';
import { CategoriesManager } from './CategoriesManager';
import { AdSettingsForm } from './AdSettingsForm';
import { SeoTools } from './SeoTools';
import { AdNetworksGuideView } from './AdNetworksGuideView';
import { AnalyticsView } from './AnalyticsView';
import { 
  verifyAdminPassword, 
  changeAdminPassword, 
  getSecretPassphrase, 
  setSecretPassphrase 
} from '../../services/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageItem[];
  adSettings: AdSettings;
  analytics: SiteAnalytics;
  categories: string[];
  onAddImage: (img: ImageItem) => void;
  onUpdateImage: (id: string, updates: Partial<ImageItem>) => void;
  onDeleteImage: (id: string) => void;
  onSaveAdSettings: (settings: AdSettings) => void;
  onResetStats: () => void;
  onRestoreDefaults: () => void;
  onAddCategory: (name: string) => void;
  onUpdateCategory: (oldName: string, newName: string) => void;
  onDeleteCategory: (name: string) => void;
  onResetCategories: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
}

type TabType = 'add_image' | 'manage_images' | 'categories' | 'ad_settings' | 'seo_tools' | 'networks_guide' | 'analytics';

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  images,
  adSettings,
  analytics,
  categories,
  onAddImage,
  onUpdateImage,
  onDeleteImage,
  onSaveAdSettings,
  onResetStats,
  onRestoreDefaults,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onResetCategories,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('categories');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangedNotice, setPasswordChangedNotice] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Secret passphrase state
  const [secretPassInput, setSecretPassInput] = useState(getSecretPassphrase());
  const [secretPassNotice, setSecretPassNotice] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPassword(passwordInput)) {
      setIsAdminLoggedIn(true);
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword.trim().length >= 4) {
      changeAdminPassword(newPassword.trim());
      setPasswordChangedNotice(true);
      setNewPassword('');
      setTimeout(() => setPasswordChangedNotice(false), 2500);
    } else {
      setPasswordError('كلمة المرور يجب أن تكون 4 أحرف على الأقل.');
      setTimeout(() => setPasswordError(''), 3000);
    }
  };

  const handleSaveSecretPassphrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretPassInput.trim()) {
      setSecretPassphrase(secretPassInput.trim());
      setSecretPassNotice(true);
      setTimeout(() => setSecretPassNotice(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  لوحة تحكم المسؤول الشاملة (Admin Control)
                </h2>
                {isAdminLoggedIn && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    صلاحية الأدمن كاملة
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                التحكم في التصنيفات، الصور، الروابط الإعلانية، الكلمات السرية والسيو
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={() => setIsAdminLoggedIn(false)}
                className="text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                title="تسجيل الخروج"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAdminLoggedIn ? (
          /* Password Authentication Gate */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white mb-1.5">
                تسجيل الدخول إلى لوحة تحكم الأدمن
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                يرجى إدخال كلمة المرور أو الكلمة السرية (<code className="text-indigo-400 font-mono">Ahmed123123@#@#</code>) للدخول.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input
                type="password"
                autoFocus
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
                placeholder="كلمة المرور أو الكلمة السرية"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-center text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {loginError && (
                <p className="text-xs text-rose-400 font-semibold animate-shake">
                  كلمة المرور غير صحيحة!
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
              >
                دخول إلى لوحة الإدارة
              </button>

              <button
                type="button"
                onClick={() => { setPasswordInput('admin'); setIsAdminLoggedIn(true); }}
                className="w-full text-xs text-indigo-400 hover:text-indigo-300 py-1"
              >
                الدخول السريع بحساب الإدارة
              </button>
            </form>
          </div>
        ) : (
          /* Full Admin Dashboard Tabs */
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-1 overflow-x-auto px-6 py-2.5 bg-slate-950/50 border-b border-slate-800 text-xs">
              
              <button
                onClick={() => setActiveTab('categories')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'categories'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>إدارة التصنيفات الكاملة ({categories.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('add_image')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'add_image'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>إضافة فيديو وسيو تلقائي</span>
              </button>

              <button
                onClick={() => setActiveTab('manage_images')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'manage_images'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>إدارة الفيديوهات والروابط ({images.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('ad_settings')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'ad_settings'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>إعدادات الإعلانات والتحويل</span>
              </button>

              <button
                onClick={() => setActiveTab('seo_tools')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'seo_tools'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>أدوات السيو و Sitemap</span>
              </button>

              <button
                onClick={() => setActiveTab('networks_guide')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'networks_guide'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>دليل أفضل الشبكات الإعلانية</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>الإحصائيات والأرباح (${analytics.estimatedEarningsUsd.toFixed(2)})</span>
              </button>

            </div>

            {/* Tab Content Panel */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'categories' && (
                <CategoriesManager
                  categories={categories}
                  images={images}
                  onAddCategory={onAddCategory}
                  onUpdateCategory={onUpdateCategory}
                  onDeleteCategory={onDeleteCategory}
                  onResetCategories={onResetCategories}
                />
              )}

              {activeTab === 'add_image' && (
                <AddImageForm
                  onImageAdded={onAddImage}
                  defaultAdUrl={adSettings.globalDirectAdUrl}
                  categories={categories}
                />
              )}

              {activeTab === 'manage_images' && (
                <ImageManagementList
                  images={images}
                  onUpdateImage={onUpdateImage}
                  onDeleteImage={onDeleteImage}
                  onRestoreDefaults={onRestoreDefaults}
                />
              )}

              {activeTab === 'ad_settings' && (
                <AdSettingsForm
                  settings={adSettings}
                  onSave={onSaveAdSettings}
                />
              )}

              {activeTab === 'seo_tools' && (
                <SeoTools images={images} />
              )}

              {activeTab === 'networks_guide' && (
                <AdNetworksGuideView
                  onSelectNetworkAsActive={(name) => {
                    setActiveTab('ad_settings');
                  }}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView
                  analytics={analytics}
                  images={images}
                  onResetStats={onResetStats}
                />
              )}
            </div>

            {/* Bottom Admin Security & Secret Passphrase Bar */}
            <div className="p-4 bg-slate-950/95 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              
              {/* Secret Passphrase Editor */}
              <form onSubmit={handleSaveSecretPassphrase} className="flex items-center gap-2 w-full md:w-auto">
                <Key className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-slate-300">الكلمة السرية في شريط البحث:</span>
                <input
                  type="text"
                  value={secretPassInput}
                  onChange={(e) => setSecretPassInput(e.target.value)}
                  placeholder="Ahmed123123@#@#"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-amber-300 font-mono w-44"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg font-bold"
                >
                  حفظ
                </button>
                {secretPassNotice && (
                  <span className="text-emerald-400 font-bold">تم حفظ الكلمة السرية!</span>
                )}
              </form>

              {/* Password Change */}
              <form onSubmit={handleChangePassword} className="flex items-center gap-2 w-full md:w-auto">
                <KeyRound className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>تغيير كلمة المرور:</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="كلمة المرور الجديدة"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                />
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-600"
                >
                  حفظ
                </button>
                {passwordChangedNotice && (
                  <span className="text-emerald-400 font-bold">تم التغيير!</span>
                )}
                {passwordError && (
                  <span className="text-rose-400 font-bold">{passwordError}</span>
                )}
              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
