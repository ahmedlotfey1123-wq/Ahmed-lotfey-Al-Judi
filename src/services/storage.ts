import { ImageItem, AdSettings, SiteAnalytics } from '../types';
import { INITIAL_IMAGES } from '../data/initialImages';

const STORAGE_KEYS = {
  IMAGES: 'picmaster_images_v1',
  AD_SETTINGS: 'picmaster_ad_settings_v1',
  ANALYTICS: 'picmaster_analytics_v1',
  ADMIN_AUTH: 'picmaster_admin_auth_v1',
};

export const DEFAULT_AD_SETTINGS: AdSettings = {
  // A demo direct link (user can replace this in 1 click with their Adsterra or PropellerAds direct link)
  globalDirectAdUrl: 'https://example-direct-ad.com/?ref=adsterra_smartlink_demo',
  triggerMode: 'new_tab_and_open',
  countdownSeconds: 5,
  enableNativeAdsInGrid: true,
  nativeAdInterval: 4,
  enableBannerTop: true,
  enableBannerBottom: true,
  bannerHtmlOrScript: `<!-- Banner 728x90 Ad Placement -->
<div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border: 1px solid #4338ca; padding: 14px; text-align: center; border-radius: 12px; color: #fff;">
  <span style="background: #eab308; color: #000; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">إعلان ممول / Sponsored</span>
  <h4 style="margin: 8px 0 4px; font-weight: 700; font-size: 15px;">🔥 احصل على أفضل العروض والخصومات الحصرية اليوم</h4>
  <p style="margin: 0; font-size: 12px; opacity: 0.85;">انقر هنا لمعرفة المزيد والاستفادة من العرض قبل انتهائه</p>
</div>`,
  popunderScript: `// Script will fire when user clicks outside or on images`,
  enableVideoMockupOverlay: true,
  videoBlurEffect: 'light',
  adNetworksConfigured: {
    adsterra: true,
    propellerads: true,
    monetag: false,
    custom: true,
  }
};

export const DEFAULT_ANALYTICS: SiteAnalytics = {
  totalImageImpressions: 15420,
  totalAdClicks: 4320,
  totalImageDownloads: 2450,
  estimatedEarningsUsd: 18.45,
  dailyStats: [
    { date: '2026-10-10', views: 2400, clicks: 680 },
    { date: '2026-10-11', views: 2950, clicks: 820 },
    { date: '2026-10-12', views: 3100, clicks: 890 },
    { date: '2026-10-13', views: 3350, clicks: 940 },
    { date: '2026-10-14', views: 3620, clicks: 990 }
  ]
};

// --- Images Management ---
export function loadImages(): ImageItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.IMAGES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load images from localStorage', e);
  }
  saveImages(INITIAL_IMAGES);
  return INITIAL_IMAGES;
}

export function saveImages(images: ImageItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
  } catch (e) {
    console.error('Failed to save images', e);
  }
}

export function addImage(newImage: ImageItem): ImageItem[] {
  const current = loadImages();
  const updated = [newImage, ...current];
  saveImages(updated);
  return updated;
}

export function updateImage(id: string, updates: Partial<ImageItem>): ImageItem[] {
  const current = loadImages();
  const updated = current.map(img => img.id === id ? { ...img, ...updates } : img);
  saveImages(updated);
  return updated;
}

export function deleteImage(id: string): ImageItem[] {
  const current = loadImages();
  const updated = current.filter(img => img.id !== id);
  saveImages(updated);
  return updated;
}

// --- Ad Settings ---
export function loadAdSettings(): AdSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AD_SETTINGS);
    if (raw) return { ...DEFAULT_AD_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load ad settings', e);
  }
  return DEFAULT_AD_SETTINGS;
}

export function saveAdSettings(settings: AdSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AD_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save ad settings', e);
  }
}

// --- Analytics ---
export function loadAnalytics(): SiteAnalytics {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    if (raw) return { ...DEFAULT_ANALYTICS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load analytics', e);
  }
  return DEFAULT_ANALYTICS;
}

export function recordAdClick(imageId?: string): void {
  try {
    const stats = loadAnalytics();
    stats.totalAdClicks += 1;
    // Estimate ~$4.20 CPM / $0.0042 per click
    stats.estimatedEarningsUsd = +(stats.estimatedEarningsUsd + 0.0042).toFixed(2);
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(stats));

    if (imageId) {
      const images = loadImages();
      const updated = images.map(img => img.id === imageId ? { ...img, clicks: img.clicks + 1 } : img);
      saveImages(updated);
    }
  } catch (e) {
    console.error('Failed to record ad click', e);
  }
}

export function recordImageView(imageId: string): void {
  try {
    const stats = loadAnalytics();
    stats.totalImageImpressions += 1;
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(stats));

    const images = loadImages();
    const updated = images.map(img => img.id === imageId ? { ...img, views: img.views + 1 } : img);
    saveImages(updated);
  } catch (e) {
    console.error('Failed to record image view', e);
  }
}

export function recordDownload(imageId: string): void {
  try {
    const stats = loadAnalytics();
    stats.totalImageDownloads += 1;
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(stats));

    const images = loadImages();
    const updated = images.map(img => img.id === imageId ? { ...img, downloads: img.downloads + 1 } : img);
    saveImages(updated);
  } catch (e) {
    console.error('Failed to record download', e);
  }
}

// --- Categories Management ---
export const INITIAL_CATEGORIES = [
  'الكل',
  'طبيعة ومناظر',
  'سيارات وسرعة',
  'مدن وعمارة',
  'فن تجريدي',
  'فضاء وكون',
  'تقنية وذكاء اصطناعي',
  'حيوانات وبرية'
];

export function loadCategories(): string[] {
  try {
    const raw = localStorage.getItem('picmaster_categories_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load categories', e);
  }
  saveCategories(INITIAL_CATEGORIES);
  return INITIAL_CATEGORIES;
}

export function saveCategories(categories: string[]): void {
  try {
    // Ensure 'الكل' is always first
    const list = ['الكل', ...categories.filter(c => c !== 'الكل')];
    localStorage.setItem('picmaster_categories_v1', JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save categories', e);
  }
}

export function addCategory(name: string): string[] {
  const current = loadCategories();
  const trimmed = name.trim();
  if (!trimmed || current.includes(trimmed)) return current;
  const updated = [...current, trimmed];
  saveCategories(updated);
  return updated;
}

export function updateCategory(oldName: string, newName: string): string[] {
  const trimmed = newName.trim();
  if (!trimmed || oldName === 'الكل') return loadCategories();
  
  const current = loadCategories();
  const updated = current.map(c => c === oldName ? trimmed : c);
  saveCategories(updated);

  // Update all images that had this category
  const images = loadImages();
  const updatedImages = images.map(img => img.category === oldName ? { ...img, category: trimmed } : img);
  saveImages(updatedImages);

  return updated;
}

export function deleteCategory(categoryName: string): string[] {
  if (categoryName === 'الكل') return loadCategories();
  const current = loadCategories();
  const updated = current.filter(c => c !== categoryName);
  saveCategories(updated);

  // Fallback images with deleted category to first available category
  const fallbackCat = updated.find(c => c !== 'الكل') || 'عام';
  const images = loadImages();
  const updatedImages = images.map(img => img.category === categoryName ? { ...img, category: fallbackCat } : img);
  saveImages(updatedImages);

  return updated;
}

// --- Secret Admin Passphrase (مثل Ahmed123123@#@#) ---
export const DEFAULT_SECRET_PASSPHRASE = 'Ahmed123123@#@#';

export function getSecretPassphrase(): string {
  return localStorage.getItem('picmaster_secret_passphrase_v1') || DEFAULT_SECRET_PASSPHRASE;
}

export function setSecretPassphrase(pass: string): void {
  localStorage.setItem('picmaster_secret_passphrase_v1', pass.trim());
}

export function checkIsSecretPassphrase(input: string): boolean {
  const secret = getSecretPassphrase().trim();
  return input.trim() === secret;
}

// --- Admin Credentials / Auth ---
const DEFAULT_ADMIN_PASSWORD = 'admin'; // Easy default with hint, customizable in dashboard

export function verifyAdminPassword(password: string): boolean {
  const stored = localStorage.getItem('picmaster_admin_pwd') || DEFAULT_ADMIN_PASSWORD;
  return password === stored || password === getSecretPassphrase();
}

export function changeAdminPassword(newPass: string): void {
  localStorage.setItem('picmaster_admin_pwd', newPass);
}

export function resetToDefaults(): void {
  saveImages(INITIAL_IMAGES);
  saveAdSettings(DEFAULT_AD_SETTINGS);
  saveCategories(INITIAL_CATEGORIES);
  setSecretPassphrase(DEFAULT_SECRET_PASSPHRASE);
  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(DEFAULT_ANALYTICS));
}

