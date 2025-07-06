'use client';

import { Users, Target, Link2, Star, Calendar, TrendingUp } from 'lucide-react';
import type { DashboardData } from '@/types/dashboard';

interface KPICardsProps {
  data: DashboardData | null;
}

export default function KPICards({ data }: KPICardsProps) {
  if (!data) return null;

  const totalParticipants = data.participants.length;
  const identifiedParticipants = data.participants.filter(p => p.status === 'identified').length;
  const identificationRate = totalParticipants > 0 ? Math.round((identifiedParticipants / totalParticipants) * 100) : 0;
  const totalMatches = data.matches.length;
  const maxMatches = Math.max(totalMatches, 160);
  const avgSatisfaction = data.matches.length > 0 
    ? Math.round(data.matches.reduce((sum, match) => sum + match.satisfaction_score, 0) / data.matches.length)
    : 0;
  const totalMeetings = data.meetings.filter(m => m.status === 'completed').length;
  const peakConnections = 4.3; // This would be calculated from activity data

  const kpis = [
    {
      title: 'Total Participants',
      value: totalParticipants.toString(),
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Real-Time Identified',
      value: `${identifiedParticipants} (${identificationRate}%)`,
      icon: Target,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Total Matches',
      value: `${totalMatches}`,
      subtitle: maxMatches.toString(),
      icon: Link2,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Average Satisfaction',
      value: `${avgSatisfaction}%`,
      icon: Star,
      color: 'pink',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    {
      title: 'Total Meetings',
      value: totalMeetings.toString(),
      icon: Calendar,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Peak Connections',
      value: peakConnections.toString(),
      icon: TrendingUp,
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-600">{kpi.title}</p>
              <div className="flex items-end space-x-1">
                <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                {kpi.subtitle && (
                  <p className="text-lg text-slate-500">/{kpi.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}