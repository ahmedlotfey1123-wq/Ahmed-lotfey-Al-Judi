import React, { useState } from 'react';
import { ExternalLink, Star, CheckCircle, AlertCircle, ShieldCheck, DollarSign, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { AD_NETWORKS_GUIDE } from '../../data/adNetworksGuide';

interface AdNetworksGuideViewProps {
  onSelectNetworkAsActive: (networkName: string) => void;
}

export const AdNetworksGuideView: React.FC<AdNetworksGuideViewProps> = ({
  onSelectNetworkAsActive,
}) => {
  const [expandedId, setExpandedId] = useState<string>('adsterra');

  return (
    <div className="space-y-6">
      
      {/* Important Advisory Box on Registration */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 p-5 rounded-2xl border border-amber-500/40 space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>توضيح هام وشفاف بشأن الاشتراك في شبكات الإعلانات:</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          الاشتراك في أي شبكة إعلانية كـ <strong>ناشر (Publisher)</strong> يتطلب قانونياً إدخال معلوماتك الشخصية، بريدك الإلكتروني، ورقم حسابك البنكي أو PayPal أو محفظتك الرقمية لاستلام الأرباح المالية باسمك. لذلك، لا يمكن لأي ذكاء اصطناعي أو مبرمج أن يقوم بإنشاء الحساب المالي نيابة عنك.
        </p>
        <p className="text-xs text-emerald-300 font-semibold leading-relaxed">
          ✅ <strong>لكن قمنا بتجهيز كل شيء لك برمجياً!</strong> اختر أي شبكة من القائمة أدناه، سجل مجاناً في دقيقتين (الموافقة فورية 100% وبدون أي شروط)، انسخ الرابط وضعْه في لوحة التحكم هنا وسيبدأ الموقع بجني الأرباح تلقائياً فوراً!
        </p>
      </div>

      {/* Networks List */}
      <div className="space-y-4">
        {AD_NETWORKS_GUIDE.map((network) => {
          const isExpanded = expandedId === network.id;

          return (
            <div
              key={network.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900 border-indigo-500/60 shadow-xl shadow-indigo-500/5'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header Card */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : network.id)}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
                    {network.name[0]}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {network.arabicName}
                      </h3>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {network.badge}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {network.rating} / 5.0
                      </span>
                      <span>الحد الأدنى للسحب: <strong className="text-slate-200">{network.minPayout}</strong></span>
                      <span>الموافقة: <strong className="text-emerald-400">{network.approvalType}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <a
                    href={network.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow"
                  >
                    <span>التسجيل في {network.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button className="p-2 text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800 space-y-4">
                  
                  {/* Best For Tagline */}
                  <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-200">
                    🎯 <strong>الأفضل لـ:</strong> {network.bestFor}
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        المميزات ونقاط القوة:
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5">
                        {network.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        ملاحظات وتنبيهات:
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5">
                        {network.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Payment Methods & Formats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-400 font-bold block mb-1">طرق استلام الأرباح:</span>
                      <div className="flex flex-wrap gap-1">
                        {network.paymentMethods.map((pm, idx) => (
                          <span key={idx} className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[11px]">
                            {pm}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold block mb-1">صيغ الإعلانات المتاحة:</span>
                      <div className="flex flex-wrap gap-1">
                        {network.adFormats.map((af, idx) => (
                          <span key={idx} className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-[11px]">
                            {af}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step by step guide to get the link */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-white">
                      خطوات استخراج الرابط الإعلاني ووضعه في موقعك خلال 60 ثانية:
                    </h4>
                    <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                      {network.guideSteps.map((step, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
