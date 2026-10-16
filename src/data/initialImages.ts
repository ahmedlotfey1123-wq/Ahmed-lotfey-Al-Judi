import { ImageItem } from '../types';
import { generateSeoKeywords } from '../utils/seoHelper';

const rawSampleData = [
  {
    id: 'vid-1',
    title: 'مقطع فيديو جبال الألب السويسرية الخلابة في شروق الشمس 4K',
    description: 'أجمل مقطع فيديو وثائقي لقمم جبال الألب المغطاة بالثلوج مع انعكاس أشعة الشمس الذهبية، فيديو فائق الدقة متاح للمشاهدة والتحميل 4K.',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    category: 'طبيعة ومناظر',
    tags: ['طبيعة', 'جبال', 'سويسرا', 'شروق الشمس', 'فيديوهات 4K', 'مناظر طبيعية'],
    altText: 'مقطع فيديو جبال الألب المغطاة بالثلوج وقت الشروق بجودة 4K فائقة الوضوح',
    views: 1420,
    clicks: 348,
    downloads: 184,
    createdAt: '2026-09-12T10:00:00Z',
    author: 'Markus Spiske'
  },
  {
    id: 'vid-2',
    title: 'فيديو سيارة سوبر سبورت فارهة تنطلق بسرعة في الليل 4K',
    description: 'مقطع فيديو سيارة رياضية خارقة بإضاءات نيون ليلية ودقة عالية جداً لمحبي السرعة والسيارات الرياضية الفاخرة.',
    url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=80',
    category: 'سيارات وسرعة',
    tags: ['سيارات', 'سوبر كار', 'رياضية', 'نيون', 'فيديوهات سيارات', 'فخامة'],
    altText: 'فيديو سيارة رياضية سوداء خارقة بإضاءة ليلية زرقاء عالية الدقة',
    views: 2150,
    clicks: 610,
    downloads: 412,
    createdAt: '2026-09-15T14:30:00Z',
    author: 'Stefan Rodriguez'
  },
  {
    id: 'vid-3',
    title: 'مقطع فيديو أفق مدينة نيويورك ليلاً مع أضواء ناطحات السحاب 4K',
    description: 'مشهد فيديو بانورامي ساحر لأفق مدينة نيويورك وأضواء مانهاتن المتلألئة المنعكسة على النهر في منتصف الليل.',
    url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1920&q=80',
    category: 'مدن وعمارة',
    tags: ['نيويورك', 'مدن', 'أبراج', 'ليل', 'أفق المدينة', 'عمارة حديثة'],
    altText: 'فيديو أفق مدينة نيويورك ليلاً مع ناطحات السحاب وأضواء الجسور المعلقة',
    views: 1890,
    clicks: 430,
    downloads: 290,
    createdAt: '2026-09-18T09:15:00Z',
    author: 'Pedro Lastra'
  },
  {
    id: 'vid-4',
    title: 'فيديو موشن جرافيك ثلاثي الأبعاد بألوان نيون سايبربانك 4K',
    description: 'مقطع فيديو فني تجريدي ثلاثي الأبعاد بأمواج متدفقة من درجات البنفسجي والأزرق والوردي المشع، مناسب للمصممين وعشاق الفن الرقمي.',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80',
    category: 'فن تجريدي',
    tags: ['فن تجريدي', 'سايبربانك', 'ألوان متدرجة', 'تصميم 3D', 'فيديو موشن'],
    altText: 'فيديو تموجات ثلاثية الأبعاد بألوان نيون تدرجات البنفسجي والوردي بجودة فائقة',
    views: 3200,
    clicks: 890,
    downloads: 560,
    createdAt: '2026-09-20T16:45:00Z',
    author: 'Milad Fakurian'
  },
  {
    id: 'vid-5',
    title: 'مقطع فيديو شاطئ استوائي مع رمال بيضاء ومياه فيروزية 4K',
    description: 'أروع مقطع فيديو استرخاء لشاطئ جزر المالديف مع أشجار النخيل المتمايلة والمياه الصافية البلورية للاسترخاء والهدوء النفسي.',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    category: 'طبيعة ومناظر',
    tags: ['بحر', 'شاطئ', 'المالديف', 'صيف', 'نخيل', 'سياحة وسفر'],
    altText: 'فيديو شاطئ استوائي برمال بيضاء ومياه بحر فيروزية نقية مع نخيل أخضر',
    views: 1650,
    clicks: 410,
    downloads: 235,
    createdAt: '2026-09-22T11:20:00Z',
    author: 'Sean Oulashin'
  },
  {
    id: 'vid-6',
    title: 'فيديو تايم لابس سماء مرصعة بالنجوم ومجرة درب التبانة 4K',
    description: 'لقطة فيديو فلكية مذهلة للنجوم المتلألئة وحزام مجرة درب التبانة في ليلة مظلمة وصافية، فيديو ساحر ومريح للأعصاب.',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80',
    category: 'فضاء وكون',
    tags: ['فضاء', 'نجوم', 'مجرة درب التبانة', 'سماء الليل', 'فيديو فلكي'],
    altText: 'فيديو مجرة درب التبانة والنجوم الساطعة فوق جبال وصحراء في ظلام الليل',
    views: 2410,
    clicks: 580,
    downloads: 380,
    createdAt: '2026-09-25T20:10:00Z',
    author: 'Benjamin Davies'
  },
  {
    id: 'vid-7',
    title: 'مقطع فيديو شريحة إلكترونية متطورة مع شبكات الذكاء الاصطناعي 4K',
    description: 'معالج كمبيوتر متقدم بتوهج نانو إلكتروني يمثل التطور التكنولوجي والذكاء الاصطناعي والحوسبة السحابية.',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80',
    category: 'تقنية وذكاء اصطناعي',
    tags: ['تكنولوجيا', 'ذكاء اصطناعي', 'رقائق إلكترونية', 'حاسوب', 'برمجة'],
    altText: 'فيديو لوحة إلكترونية مضيئة بمعالج دقيق وخطوط دوائر كهربائية مضيئة',
    views: 1980,
    clicks: 470,
    downloads: 310,
    createdAt: '2026-09-28T08:00:00Z',
    author: 'Alexandre Debiève'
  },
  {
    id: 'vid-8',
    title: 'فيديو وثائقي لنمر بنغالي مهيب في الغابة الاستوائية 4K',
    description: 'مقطع فيديو وثائقي مدهش لوجه نمر بري بتفاصيل دقيقة في العيون والفرو بين أوراق الأشجار الخضراء الكثيفة.',
    url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1920&q=80',
    category: 'حيوانات وبرية',
    tags: ['حيوانات', 'نمر', 'غابة', 'حياة برية', 'فيديوهات وثائقية'],
    altText: 'فيديو وجه نمر بري مهيب ذو عينين ثاقبتين في بيئة غابية طبيعية خضراء',
    views: 2780,
    clicks: 690,
    downloads: 420,
    createdAt: '2026-09-30T12:00:00Z',
    author: 'Gary Bendig'
  }
];

export const CATEGORIES = [
  'الكل',
  'طبيعة ومناظر',
  'سيارات وسرعة',
  'مدن وعمارة',
  'فن تجريدي',
  'فضاء وكون',
  'تقنية وذكاء اصطناعي',
  'حيوانات وبرية'
];

export const INITIAL_IMAGES: ImageItem[] = rawSampleData.map((item) => ({
  ...item,
  keywords: generateSeoKeywords(item.title, item.category, item.description)
}));
