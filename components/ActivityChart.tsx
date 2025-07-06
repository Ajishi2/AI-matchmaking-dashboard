'use client';

import { useMemo } from 'react';
import type { ActivityLog } from '@/types/dashboard';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
interface ActivityChartProps {
  data: ActivityLog[];
}

export default function ActivityChart({ data }: ActivityChartProps) {
  const chartData = useMemo(() => {
    const timeBuckets = [
      '02:00', '10:00', '11:00', '12:30', '13:00', '14:00', '15:00', '16:00'
    ];
    function formatTime(ts: string) {
      const date = new Date(ts);
      const h = date.getHours().toString().padStart(2, '0');
      const m = date.getMinutes();
      if (m < 15) return `${h}:00`;
      if (m < 45) return `${h}:30`;
      return `${(parseInt(h) + 1).toString().padStart(2, '0')}:00`;
    }
    const bucketMap: Record<string, { logins: number; meetings: number }> = {};
    for (const t of timeBuckets) bucketMap[t] = { logins: 0, meetings: 0 };
    data.forEach((log) => {
      const bucket = formatTime(log.timestamp);
      if (bucketMap[bucket]) {
        if (log.action_type === 'login') bucketMap[bucket].logins++;
        if (log.action_type === 'meeting') bucketMap[bucket].meetings++;
      }
    });
    return timeBuckets.map((time) => ({
      time,
      logins: bucketMap[time].logins,
      meetings: bucketMap[time].meetings
    }));
  }, [data]);


  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 sm:mb-6">Activity by Time</h3>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[500px] sm:min-w-0" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 40 }}>
              <CartesianGrid stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 140]} ticks={[0, 35, 70, 105, 140]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: 12 }} />
              <Line
                type="basis"
                dataKey="logins"
                name="Participant Login"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 5, fill: "#fff", stroke: "#3b82f6", strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="basis"
                dataKey="meetings"
                name="Meeting"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 5, fill: "#fff", stroke: "#10b981", strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}