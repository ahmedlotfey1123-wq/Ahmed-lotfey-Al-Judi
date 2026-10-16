/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  loadImages, 
  saveImages, 
  addImage, 
  updateImage, 
  deleteImage,
  loadAdSettings, 
  saveAdSettings, 
  loadAnalytics, 
  recordAdClick, 
  recordImageView, 
  recordDownload,
  resetToDefaults,
  loadCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from './services/storage';
import { safeOpenUrl } from './utils/navigation';
import { ImageItem, AdSettings, SiteAnalytics } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ImageCard } from './components/ImageCard';
import { ImageModal } from './components/ImageModal';
import { InterstitialAdModal } from './components/InterstitialAdModal';
import { AdBanner } from './components/AdBanner';
import { AdminModal } from './components/Admin/AdminModal';
import { Footer } from './components/Footer';
import { ImageOff } from 'lucide-react';

export default function App() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [adSettings, setAdSettings] = useState<AdSettings>(loadAdSettings());
  const [analytics, setAnalytics] = useState<SiteAnalytics>(loadAnalytics());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // Modals state
  const [activeImageModal, setActiveImageModal] = useState<ImageItem | null>(null);
  const [interstitialData, setInterstitialData] = useState<{
    isOpen: boolean;
    image: ImageItem | null;
    action: 'view' | 'download';
  }>({
    isOpen: false,
    image: null,
    action: 'view',
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Initialize
  useEffect(() => {
    setImages(loadImages());
    setCategories(loadCategories());
    setAdSettings(loadAdSettings());
    setAnalytics(loadAnalytics());
  }, []);

  // Filter images based on search query and category
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchesCategory = selectedCategory === 'الكل' || img.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = img.title.toLowerCase().includes(q);
      const descMatch = (img.description || '').toLowerCase().includes(q);
      const categoryMatch = img.category.toLowerCase().includes(q);
      const tagMatch = img.tags.some(t => t.toLowerCase().includes(q));
      const keywordMatch = img.keywords.some(k => k.toLowerCase().includes(q));

      return titleMatch || descMatch || categoryMatch || tagMatch || keywordMatch;
    });
  }, [images, selectedCategory, searchQuery]);

  // Handle Card Click - Core Ad Monetization Logic
  const handleImageClick = (image: ImageItem) => {
    recordImageView(image.id);
    recordAdClick(image.id);
    setAnalytics(loadAnalytics());

    const targetAdUrl = image.customAdUrl || adSettings.globalDirectAdUrl || 'https://adsterra.com';

    if (adSettings.triggerMode === 'new_tab_and_open') {
      // Opens ad in background tab, opens image in app
      safeOpenUrl(targetAdUrl, '_blank');
      setActiveImageModal(image);
    } else if (adSettings.triggerMode === 'interstitial_countdown') {
      // Interstitial modal with countdown
      setInterstitialData({
        isOpen: true,
        image,
        action: 'view',
      });
    } else if (adSettings.triggerMode === 'direct_redirect') {
      // Immediate direct redirect
      window.location.href = targetAdUrl;
    }
  };

  // Handle Download Click
  const handleDownloadClick = (image: ImageItem) => {
    recordDownload(image.id);
    recordAdClick(image.id);
    setAnalytics(loadAnalytics());

    if (adSettings.triggerMode === 'interstitial_countdown') {
      setInterstitialData({
        isOpen: true,
        image,
        action: 'download',
      });
      return;
    }

    // Trigger ad in new tab safely
    const targetAdUrl = image.customAdUrl || adSettings.globalDirectAdUrl || 'https://adsterra.com';
    safeOpenUrl(targetAdUrl, '_blank');

    // Trigger high-res file download
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${image.title.replace(/\s+/g, '_')}_4K.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProceedAfterInterstitial = () => {
    if (!interstitialData.image) return;
    if (interstitialData.action === 'download') {
      const link = document.createElement('a');
      link.href = interstitialData.image.url;
      link.download = `${interstitialData.image.title.replace(/\s+/g, '_')}_4K.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setActiveImageModal(interstitialData.image);
    }
  };

  // Admin Actions for Images & Ads
  const handleAddImage = (newImage: ImageItem) => {
    const updated = addImage(newImage);
    setImages(updated);
  };

  const handleUpdateImage = (id: string, updates: Partial<ImageItem>) => {
    const updated = updateImage(id, updates);
    setImages(updated);
  };

  const handleDeleteImage = (id: string) => {
    const updated = deleteImage(id);
    setImages(updated);
  };

  const handleSaveAdSettings = (newSettings: AdSettings) => {
    saveAdSettings(newSettings);
    setAdSettings(newSettings);
  };

  const handleResetStats = () => {
    localStorage.removeItem('picmaster_analytics_v1');
    setAnalytics(loadAnalytics());
  };

  // Admin Actions for Categories
  const handleAddCategory = (name: string) => {
    const updated = addCategory(name);
    setCategories(updated);
  };

  const handleUpdateCategory = (oldName: string, newName: string) => {
    const updated = updateCategory(oldName, newName);
    setCategories(updated);
    setImages(loadImages());
  };

  const handleDeleteCategory = (name: string) => {
    const updated = deleteCategory(name);
    setCategories(updated);
    setImages(loadImages());
    if (selectedCategory === name) {
      setSelectedCategory('الكل');
    }
  };

  const handleRestoreDefaults = () => {
    resetToDefaults();
    setImages(loadImages());
    setCategories(loadCategories());
    setAdSettings(loadAdSettings());
    setAnalytics(loadAnalytics());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      
      {/* Header - Secret Passphrase triggers Admin */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenAdmin={() => {
          setIsAdminLoggedIn(true);
          setIsAdminOpen(true);
        }}
        categories={categories}
      />

      {/* Hero Banner - Clean keyword filtering tags without any giveaway text */}
      <HeroBanner
        onTagClick={(tag) => setSearchQuery(tag)}
      />

      {/* Top Leaderboard Ad Banner (if enabled) */}
      {adSettings.enableBannerTop && (
        <AdBanner
          type="leaderboard"
          adSettings={adSettings}
          onAdClicked={() => {
            recordAdClick();
            setAnalytics(loadAnalytics());
          }}
        />
      )}

      {/* Main Gallery Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Results Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-white">
              {selectedCategory === 'الكل' ? 'أحدث مقاطع الفيديو الحصرية' : `فيديوهات: ${selectedCategory}`}
            </h2>
            <span className="text-xs bg-slate-900 text-rose-400 font-bold px-2.5 py-0.5 rounded-full border border-slate-800">
              {filteredImages.length} فيديو
            </span>
          </div>

          {searchQuery && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>نتائج البحث عن: "<strong className="text-white">{searchQuery}</strong>"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-indigo-400 hover:underline"
              >
                إلغاء البحث
              </button>
            </div>
          )}
        </div>

        {/* Gallery Grid with Native Ad Insertion */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <ImageOff className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">لا توجد مقاطع فيديو مطابقة لبحثك</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              جرب البحث بكلمات أخرى أو اختر تصنيفاً آخر من شريط التصنيفات بالأعلى.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('الكل'); }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow"
              >
                عرض كل الفيديوهات
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => {
              const showNativeAd = adSettings.enableNativeAdsInGrid && 
                (index + 1) % adSettings.nativeAdInterval === 0;

              return (
                <React.Fragment key={image.id}>
                  <ImageCard
                    image={image}
                    adSettings={adSettings}
                    onImageClick={handleImageClick}
                    onDownloadClick={handleDownloadClick}
                    onAdTriggered={(id) => {
                      recordAdClick(id);
                      setAnalytics(loadAnalytics());
                    }}
                  />

                  {/* Interspersed Native Ad Card */}
                  {showNativeAd && (
                    <AdBanner
                      type="native_grid"
                      adSettings={adSettings}
                      onAdClicked={() => {
                        recordAdClick();
                        setAnalytics(loadAnalytics());
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

      </main>

      {/* Bottom Footer Ad Banner (if enabled) */}
      {adSettings.enableBannerBottom && (
        <AdBanner
          type="footer"
          adSettings={adSettings}
          onAdClicked={() => {
            recordAdClick();
            setAnalytics(loadAnalytics());
          }}
        />
      )}

      {/* Footer */}
      <Footer
        categories={categories}
        onCategoryClick={(cat) => setSelectedCategory(cat)}
        totalImages={images.length}
      />

      {/* Lightbox Modal */}
      <ImageModal
        image={activeImageModal}
        isOpen={Boolean(activeImageModal)}
        onClose={() => setActiveImageModal(null)}
        adSettings={adSettings}
        onDownload={handleDownloadClick}
        onAdClicked={(id) => {
          recordAdClick(id);
          setAnalytics(loadAnalytics());
        }}
      />

      {/* Interstitial Ad Countdown Modal */}
      <InterstitialAdModal
        isOpen={interstitialData.isOpen}
        onClose={() => setInterstitialData({ ...interstitialData, isOpen: false })}
        onProceed={handleProceedAfterInterstitial}
        targetImage={interstitialData.image}
        adSettings={adSettings}
        onAdClicked={() => {
          recordAdClick(interstitialData.image?.id);
          setAnalytics(loadAnalytics());
        }}
        actionType={interstitialData.action}
      />

      {/* Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        images={images}
        adSettings={adSettings}
        analytics={analytics}
        categories={categories}
        onAddImage={handleAddImage}
        onUpdateImage={handleUpdateImage}
        onDeleteImage={handleDeleteImage}
        onSaveAdSettings={handleSaveAdSettings}
        onResetStats={handleResetStats}
        onRestoreDefaults={handleRestoreDefaults}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        onResetCategories={handleRestoreDefaults}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      />

    </div>
  );
}
