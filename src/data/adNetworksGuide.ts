import { AdNetworkRecommendation } from '../types';

export const AD_NETWORKS_GUIDE: AdNetworkRecommendation[] = [
  {
    id: 'adsterra',
    name: 'Adsterra',
    arabicName: 'أدستيرا (Adsterra) - الخيار رقم 1 للمواقع الجديدة',
    badge: 'موافقة فورية 100% وبدون قيود',
    approvalType: 'قبول فوري وتلقائي (خلال 5 دقائق بدون شروط زيارات)',
    minPayout: '$5 عبر WebMoney / $100 عبر PayPal و Wire',
    paymentMethods: ['PayPal', 'WebMoney', 'Tether (USDT)', 'Bitcoin', 'Wire Transfer'],
    adFormats: ['Direct Link (رابط مباشر للصور)', 'Popunder (إعلانات منبثقة)', 'Social Bar', 'Native Banners', 'Banners 728x90 & 300x250'],
    rating: 4.9,
    pros: [
      'أفضل ميزة Direct Link: مثالية لمعارض الصور عند الضغط على أي صورة يتم تحويل الزائر مباشرة للرابط الإعلاني والربح منها.',
      'لا تشترط أي عدد محدد من الزيارات الشهرية لقبول الموقع.',
      'لا ترفض مواقع الصور أو الخلفيات أو الأدوات التقنية.',
      'دفعات منتظمة مرتين شهرياً مع دعم العملات الرقمية وPayPal.',
      'نسبة CPM مرتفعة للدول الخليجية والأجنبية.'
    ],
    cons: [
      'بعض الإعلانات المنبثقة قد تكون قوية، لذا يفضل اختيار خيار "Safe Ads" من لوحة التحكم.'
    ],
    bestFor: 'تحقيق أعلى أرباح من النقر المباشر على الصور (Direct Links) والبانرات دون انتظار الموافقة.',
    guideSteps: [
      '1. توجه إلى موقع adsterra.com وسجل حساباً كناشر (Publishers).',
      '2. من القائمة الجانبية اختر "Direct Links" واضغط على "Create Direct Link".',
      '3. اختر تصنيف الإعلانات المناسب لك واضغط إنشاء.',
      '4. انسخ الرابط المباشر الذي يعطيك إياه (يبدأ عادة بـ https://...).',
      '5. الصق هذا الرابط في لوحة تحكم موقعك هنا في قسم (الرابط الإعلاني العام) وسيتم تفعيله لجميع الصور تلقائياً!'
    ],
    websiteUrl: 'https://adsterra.com'
  },
  {
    id: 'propellerads',
    name: 'PropellerAds',
    arabicName: 'بروبيلر أدز (PropellerAds)',
    badge: 'عملاق الإعلانات المباشرة والـ Popunder',
    approvalType: 'قبول تلقائي بدون تعقيد',
    minPayout: '$5 فقط',
    paymentMethods: ['PayPal', 'Skrill', 'WebMoney', 'Payoneer', 'Wire'],
    adFormats: ['Direct Link / Smartlink', 'OnClick Popunder', 'Push Notifications', 'Interstitial'],
    rating: 4.8,
    pros: [
      'خوارزمية Smartlink فائقة الذكاء تختار أعلى إعلان سعراً لبلد الزائر.',
      'الحد الأدنى للسحب 5 دولارات فقط، مناسب جداً للبدايات السريعة.',
      'تغطية عالمية 100% لكل زيارة من أي دولة في العالم.',
      'نظام حماية ضد برامج حجب الإعلانات (AdBlock Bypass).'
    ],
    cons: [
      'لا تقدم بانرات صور تقليدية كثيرة، تركيزها الأكبر على الروابط الذكية والإشعارات والـ Popunder.'
    ],
    bestFor: 'معارض الصور التي تعتمد على تحويل الزائر عند النقر (Click Monetization).',
    guideSteps: [
      '1. سجل كـ Publisher في موقع propellerads.com.',
      '2. أضف نطاق موقعك أو اختر ميزة "Direct Link".',
      '3. ستمنحك المنصة رابط Smartlink مباشر.',
      '4. ضعه في لوحة تحكم PicMaster للبدء في جني الأرباح مع كل نقرة صورة.'
    ],
    websiteUrl: 'https://propellerads.com'
  },
  {
    id: 'monetag',
    name: 'Monetag (By Propeller)',
    arabicName: 'مونيتيج (Monetag)',
    badge: 'الأمثل لمواقع التحميل ومعارض الميديا',
    approvalType: 'موافقة سريعة جداً بدون مراجعات معقدة',
    minPayout: '$5',
    paymentMethods: ['PayPal', 'Payoneer', 'Skrill', 'Bank Transfer', 'WebMoney'],
    adFormats: ['Smartlink (Direct Link)', 'Popunder', 'Vignette Banner (شاشة كاملة)', 'In-Page Push'],
    rating: 4.7,
    pros: [
      'مصممة خصيصاً لمواقع المعارض ومحركات البحث ومواقع التنزيل.',
      'أداة MultiTag تضع كود واحد فقط في الموقع ليوزع الإعلانات بذكاء دون أن تبطئ التصفح.',
      'سحب الأرباح يبدأ من 5$ فقط أسبوعياً.',
      'متوافقة تماماً مع معايير محركات البحث (سيو) دون الإضرار بظهور الموقع.'
    ],
    cons: [
      'تتطلب التأكد من إيقاف الإعلانات الصاخبة في إعدادات المنصة للحفاظ على تجربة مستخدم نظيفة.'
    ],
    bestFor: 'الحصول على كود MultiTag شامل لجميع صيغ الإعلانات.',
    guideSteps: [
      '1. أنشئ حساب في موقع monetag.com.',
      '2. انسخ كود MultiTag وضعه في خانة "حقن السكربتات الإعلانية" في لوحة التحكم.',
      '3. أو أنشئ Smartlink وضعه كرابط النقر على الصور.'
    ],
    websiteUrl: 'https://monetag.com'
  },
  {
    id: 'popads',
    name: 'PopAds / PopCash',
    arabicName: 'بوب أدز / بوب كاش (PopAds & PopCash)',
    badge: 'الأسرع في الدفع اليومي',
    approvalType: 'قبول فوري للمواقع بمجرد إضافة الدومين',
    minPayout: '$5 - $10 (دفع يومي عند الطلب)',
    paymentMethods: ['PayPal', 'WebMoney', 'Cryptocurrency', 'Wire'],
    adFormats: ['Popunder (فتح نافذة إعلانية خلفية عند النقر)'],
    rating: 4.5,
    pros: [
      'تدفع يومياً بمجرد الوصول لـ 5 دولار دون انتظار نهاية الشهر!',
      'تقبل أي موقع جديد فوراً دون قيود على المحتوى.',
      'سعر نقرات ممتاز لحركات المرور الضخمة القادمة من جوجل وسوشيال ميديا.'
    ],
    cons: [
      'فقط إعلانات منبثقة، قد تزعج بعض الزوار إن تكررت في كل نقرة (لذلك نوفر في موقعنا ضبط تكرار النقرات).'
    ],
    bestFor: 'تحقيق دخل سريع فوري بدون أي تأخير في الدفع.',
    guideSteps: [
      '1. سجل في popads.net أو popcash.net.',
      '2. احصل على كود السكربت وضعه في لوحة التحكم وسيبدأ العمل فوراً.'
    ],
    websiteUrl: 'https://popads.net'
  },
  {
    id: 'adsense',
    name: 'Google AdSense',
    arabicName: 'جوجل أدسنس (Google AdSense)',
    badge: 'الخيار المستقبلي للبانرات النظيفة',
    approvalType: 'يتطلب مراجعة بشرية وشروط محتوى وزيارات كافية',
    minPayout: '$100 عبر الحساب البنكي',
    paymentMethods: ['تحويل بنكي مباشر (Wire Transfer)'],
    adFormats: ['بانرات متجاوبة', 'إعلانات تلقائية (Auto Ads)', 'إعلانات داخل المحتوى'],
    rating: 4.4,
    pros: [
      'إعلانات نظيفة وموثوقة بنسبة 100% ولا تزعج الزوار إطلاقاً.',
      'أعلى سعر للبانرات التقليدية في العالم.'
    ],
    cons: [
      'صعب القبول للمواقع الجديدة جداً ذات المحتوى الصوري الصرف.',
      'يتطلب كتابة نصوص ومقالات مع الصور لتجاوز شروط "محتوى ذو قيمة منخفضة".',
      'قد يغلق الحساب إذا تم إرسال زيارات نقر وهمية أو تحويل مباشر إجباري.'
    ],
    bestFor: 'المرحلة المتقدمة بعد أرشفة 100+ صفحة والحصول على زيارات بحث أورجانيك قوية من جوجل.',
    guideSteps: [
      'نوصي بالبدء أولاً مع Adsterra أو PropellerAds حتى تتأرشف صورك في جوجل ويصبح لديك زيارات يومية، ثم قدم على AdSense لاحقاً.'
    ],
    websiteUrl: 'https://adsense.google.com'
  }
];
