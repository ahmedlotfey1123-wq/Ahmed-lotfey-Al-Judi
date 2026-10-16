export interface ImageItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
  keywords: string[]; // SEO keywords for indexing
  altText: string;
  customAdUrl?: string; // Optional specific ad link for this image
  views: number;
  clicks: number;
  downloads: number;
  createdAt: string;
  width?: number;
  height?: number;
  author?: string;
  isVideo?: boolean;
  videoDuration?: string;
  blurTeaser?: boolean;
}

export type AdTriggerMode = 
  | 'new_tab_and_open' // Open ad link in new tab, and open full image in app
  | 'interstitial_countdown' // Show 5s interstitial ad before opening/downloading
  | 'direct_redirect'; // Direct navigate to ad link

export interface AdSettings {
  globalDirectAdUrl: string; // The primary smartlink / direct link (Adsterra, PropellerAds, etc.)
  triggerMode: AdTriggerMode;
  countdownSeconds: number;
  enableNativeAdsInGrid: boolean;
  nativeAdInterval: number; // Insert an ad card every N items (e.g. 6)
  enableBannerTop: boolean;
  enableBannerBottom: boolean;
  bannerHtmlOrScript: string;
  popunderScript: string;
  enableVideoMockupOverlay: boolean; // Makes images look like video player with play icon & blur
  videoBlurEffect: 'none' | 'light' | 'medium' | 'heavy'; // Blur level on image
  adNetworksConfigured: {
    adsterra: boolean;
    propellerads: boolean;
    monetag: boolean;
    custom: boolean;
  };
}

export interface SiteAnalytics {
  totalImageImpressions: number;
  totalAdClicks: number;
  totalImageDownloads: number;
  estimatedEarningsUsd: number;
  dailyStats: {
    date: string;
    views: number;
    clicks: number;
  }[];
}

export interface AdNetworkRecommendation {
  id: string;
  name: string;
  arabicName: string;
  badge: string;
  approvalType: string;
  minPayout: string;
  paymentMethods: string[];
  adFormats: string[];
  rating: number;
  pros: string[];
  cons: string[];
  bestFor: string;
  guideSteps: string[];
  websiteUrl: string;
}
