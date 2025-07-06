'use client';

import { TrendingUp, AlertTriangle, Info, CheckCircle, ArrowRight } from 'lucide-react';
import type { Insight } from '@/types/dashboard';

interface RealTimeInsightsProps {
  insights: Insight[];
}

export default function RealTimeInsights({ insights }: RealTimeInsightsProps) {
  // Filter only active insights and only show the first two (surge and warning)
  const activeInsights = insights.filter(insight => insight.is_active && (insight.type === 'surge' || insight.type === 'warning')).slice(0, 2);

  // If no active insights, show a message
  if (activeInsights.length === 0) {
    return (
      <div className="space-y-3 max-w-screen-md mx-auto">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Real-Time Insights</h3>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-slate-600 text-center">No active insights at the moment</p>
        </div>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'surge':
        return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'info':
        return <Info className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <Info className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const getIconColor = (iconColor: string, type: string) => {
    switch (iconColor) {
      case 'yellow':
        return 'text-yellow-600';
      case 'blue':
        return 'text-blue-600';
      case 'green':
        return 'text-green-600';
      case 'red':
        return 'text-red-600';
      default:
        // Fallback based on type if icon_color is not set
        switch (type) {
          case 'surge':
            return 'text-yellow-600';
          case 'warning':
            return 'text-yellow-600';
          case 'info':
            return 'text-blue-600';
          case 'success':
            return 'text-green-600';
          default:
            return 'text-blue-600';
        }
    }
  };

  const getBgColor = (iconColor: string, type: string) => {
    switch (iconColor) {
      case 'yellow':
        return 'bg-yellow-100';
      case 'blue':
        return 'bg-blue-100';
      case 'green':
        return 'bg-green-100';
      case 'red':
        return 'bg-red-100';
      default:
        // Fallback based on type if icon_color is not set
        switch (type) {
          case 'surge':
            return 'bg-yellow-100';
          case 'warning':
            return 'bg-yellow-100';
          case 'info':
            return 'bg-blue-100';
          case 'success':
            return 'bg-green-100';
          default:
            return 'bg-blue-100';
        }
    }
  };

  return (
    <div className="space-y-3 max-w-screen-md mx-auto">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900">Real-Time Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeInsights.map((insight) => (
          <div key={insight.id} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className={`p-2 sm:p-3 ${getBgColor(insight.icon_color, insight.type)} rounded-lg flex-shrink-0`}>
                <div className={getIconColor(insight.icon_color, insight.type)}>
                  {getIcon(insight.type)}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">
                  {insight.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-4">
                  {insight.description}
                </p>
                <button className="flex items-center text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors">
                  {insight.action_text}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}