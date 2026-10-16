import { ImageItem } from '../types';

/**
 * Intelligent Keyword & SEO Tags Generator for Image Galleries
 * Automatically expands any Arabic/English image title into high-ranking search engine keywords
 */
export function generateSeoKeywords(title: string, category: string, description?: string): string[] {
  const cleanTitle = title.trim();
  const lowerTitle = cleanTitle.toLowerCase();
  
  const keywordsSet = new Set<string>();

  // Base title phrases
  keywordsSet.add(cleanTitle);
  if (category) {
    keywordsSet.add(category);
    keywordsSet.add(`صور ${category}`);
    keywordsSet.add(`خلفيات ${category}`);
    keywordsSet.add(`أجمل صور ${category}`);
    keywordsSet.add(`${category} HD 4K`);
    keywordsSet.add(`${category} wallpapers`);
  }

  // Common high-traffic search terms in Arabic for images
  const arabicImageModifiers = [
    'خلفيات بدقة عالية',
    'صور بجودة 4K',
    'تحميل مجاني بدون علامة مائية',
    'خلفيات فخمة للجوال',
    'صور للتصميم فوتوشوب',
    'خلفيات كمبيوتر ولابتوب',
    'صور رمزيات حديثة',
    'أفضل صور العام',
    'خلفيات شاشة بدقة Ultra HD',
    'صور بدون حقوق ملكية'
  ];

  // Common English modifiers for international traffic
  const englishImageModifiers = [
    'HD wallpaper download',
    '4K ultra high resolution image',
    'free stock photo',
    'aesthetic wallpaper for phone',
    'desktop background 1080p',
    'royalty free pictures',
    'high quality photography'
  ];

  // Category specific intelligent enrichment
  if (category.includes('طبيعة') || category.toLowerCase().includes('nature')) {
    keywordsSet.add('مناظر طبيعية خلابة');
    keywordsSet.add('خلفيات جبال وبحار');
    keywordsSet.add('nature wallpaper 4k');
    keywordsSet.add('beautiful landscape photography');
    keywordsSet.add('طبيعة ساحرة بجودة فائقة');
  } else if (category.includes('سيارات') || category.toLowerCase().includes('cars')) {
    keywordsSet.add('خلفيات سيارات فارهة');
    keywordsSet.add('supercars wallpapers 4k');
    keywordsSet.add('صور سيارات رياضية حديثة');
    keywordsSet.add('luxury cars background');
  } else if (category.includes('تقنية') || category.toLowerCase().includes('tech')) {
    keywordsSet.add('خلفيات ذكاء اصطناعي');
    keywordsSet.add('صور تكنولوجيا حديثة');
    keywordsSet.add('cyberpunk wallpaper');
    keywordsSet.add('technology background abstract');
  } else if (category.includes('فن') || category.toLowerCase().includes('art')) {
    keywordsSet.add('لوحات فنية رقمية');
    keywordsSet.add('digital art wallpaper');
    keywordsSet.add('تصاميم إبداعية وفنون');
    keywordsSet.add('abstract artwork');
  } else if (category.includes('مدن') || category.toLowerCase().includes('city')) {
    keywordsSet.add('صور مدن وأبراج ليلاً');
    keywordsSet.add('city lights skyline wallpaper');
    keywordsSet.add('عواصم العالم السياحية');
  }

  // Add modifiers
  arabicImageModifiers.forEach(m => keywordsSet.add(`${cleanTitle} - ${m}`));
  englishImageModifiers.forEach(m => keywordsSet.add(`${cleanTitle} ${m}`));

  // Extract individual strong words
  const words = cleanTitle.split(/\s+/).filter(w => w.length > 2);
  words.forEach(w => keywordsSet.add(w));

  return Array.from(keywordsSet).slice(0, 25);
}

/**
 * Generate Schema.org ImageObject structured data for Google Image Search
 */
export function generateImageSchema(image: ImageItem, siteUrl: string = 'https://picmaster.io') {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "name": image.title,
    "caption": image.description || image.title,
    "description": image.description || `${image.title} - صور وخلفيات عالية الدقة جاهزة للتحميل والاستخدام`,
    "contentUrl": image.url,
    "thumbnailUrl": image.thumbnailUrl || image.url,
    "url": `${siteUrl}/image/${image.id}`,
    "uploadDate": image.createdAt,
    "keywords": image.keywords.join(', '),
    "representativeOfPage": true,
    "width": image.width || 1920,
    "height": image.height || 1080,
    "author": {
      "@type": "Person",
      "name": image.author || "PicMaster Contributor"
    },
    "acquireLicensePage": `${siteUrl}/license`
  };
}

/**
 * Generate XML Sitemap with Google Image extensions (sitemap.xml)
 */
export function generateSitemapXml(images: ImageItem[], baseUrl: string = 'https://picmaster.io'): string {
  const dateStr = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Main Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  images.forEach(img => {
    const safeTitle = escapeXml(img.title);
    const safeCaption = escapeXml(img.description || img.title);
    const safeUrl = escapeXml(img.url);

    xml += `
  <!-- Image: ${safeTitle} -->
  <url>
    <loc>${baseUrl}/#image-${img.id}</loc>
    <lastmod>${img.createdAt.split('T')[0] || dateStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${safeUrl}</image:loc>
      <image:title>${safeTitle}</image:title>
      <image:caption>${safeCaption}</image:caption>
      <image:geo_location>Worldwide</image:geo_location>
      <image:license>https://creativecommons.org/licenses/by/4.0/</image:license>
    </image:image>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Calculate SEO audit score out of 100 for an image
 */
export function calculateSeoScore(image: ImageItem): { score: number; checks: { label: string; passed: boolean }[] } {
  const checks = [
    { label: 'عنوان مناسب (بين 10 و 70 حرف)', passed: image.title.length >= 10 && image.title.length <= 70 },
    { label: 'وصف غني بالكلمات التوضيحية', passed: (image.description || '').length >= 30 },
    { label: 'نص بديل للصور (Alt Text) لمحركات بحث الصور', passed: (image.altText || '').length >= 10 },
    { label: 'وجود 10 كلمات مفتاحية على الأقل (SEO Tags)', passed: (image.keywords || []).length >= 10 },
    { label: 'تصنيف الصورة محدد بدقة', passed: Boolean(image.category && image.category.length > 2) },
    { label: 'رابط الصورة عالي الدقة (HD URL)', passed: image.url.startsWith('http') || image.url.startsWith('data:') }
  ];

  const passedCount = checks.filter(c => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return { score, checks };
}
