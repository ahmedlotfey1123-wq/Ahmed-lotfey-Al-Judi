import React from 'react';
import { TrendingUp, DollarSign, Eye, MousePointerClick, Download, BarChart3, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';
import { SiteAnalytics, ImageItem } from '../../types';

interface AnalyticsViewProps {
  analytics: SiteAnalytics;
  images: ImageItem[];
  onResetStats: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  analytics,
  images,
  onResetStats,
}) => {
  const ctr = analytics.totalImageImpressions > 0 
    ? ((analytics.totalAdClicks / analytics.totalImageImpressions) * 100).toFixed(1)
    : '0';

  // Sort images by clicks (highest earning first)
  const sortedImages = [...images].sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="space-y-6">
      
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Earnings */}
        <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-600/40 p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400">الأرباح التقديرية (USD)</span>
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            ${analytics.estimatedEarningsUsd.toFixed(2)}
          </div>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            بناءً على متوسط CPM $4.20
          </p>
        </div>

        {/* Metric 2: Ad Clicks */}
        <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-600/40 p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-400">النقرات الإعلانية الناجحة</span>
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {analytics.totalAdClicks.toLocaleString()}
          </div>
          <p className="text-[11px] text-indigo-300 mt-1 font-semibold">
            معدل النقر CTR: <strong className="text-white">{ctr}%</strong>
          </p>
        </div>

        {/* Metric 3: Total Impressions */}
        <div className="bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-600/40 p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-400">مشاهدات وظهور الفيديوهات</span>
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {analytics.totalImageImpressions.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">
            زيارات محركات البحث والمنصة
          </p>
        </div>

        {/* Metric 4: Total Downloads */}
        <div className="bg-gradient-to-br from-amber-950/60 to-slate-900 border border-amber-600/40 p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400">تنزيلات الفيديوهات 4K</span>
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {analytics.totalImageDownloads.toLocaleString()}
          </div>
          <p className="text-[11px] text-amber-300 mt-1 font-medium">
            كل تنزيل يشغل تحويل إعلاني
          </p>
        </div>

      </div>

      {/* Top Performing Videos Table */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>مقاطع الفيديو الأكثر تحقيقاً للنقرات والأرباح الإعلانية</span>
          </h4>
          <span className="text-xs text-slate-400">مرتبة حسب عدد النقرات</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">الفيديو</th>
                <th className="py-2.5 px-3">العنوان</th>
                <th className="py-2.5 px-3">التصنيف</th>
                <th className="py-2.5 px-3">النقرات الإعلانية</th>
                <th className="py-2.5 px-3">المشاهدات</th>
                <th className="py-2.5 px-3">الأرباح المقدرة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedImages.slice(0, 8).map((img, idx) => {
                const estEarn = (img.clicks * 0.0042).toFixed(2);
                return (
                  <tr key={img.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-2 px-3">
                      <img src={img.thumbnailUrl || img.url} alt={img.title} className="w-10 h-8 object-cover rounded-md" />
                    </td>
                    <td className="py-2 px-3 font-semibold text-white max-w-xs truncate">
                      {img.title}
                    </td>
                    <td className="py-2 px-3 text-slate-300">
                      {img.category}
                    </td>
                    <td className="py-2 px-3 font-bold text-emerald-400">
                      {img.clicks} نقرة
                    </td>
                    <td className="py-2 px-3 text-slate-400">
                      {img.views}
                    </td>
                    <td className="py-2 px-3 font-mono text-amber-400 font-bold">
                      ${estEarn}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset Stats CTA */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onResetStats}
          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-900/40 hover:bg-rose-950/30 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة ضبط عداد الإحصائيات الافتراضية</span>
        </button>
      </div>

    </div>
  );
};
