'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import ActivityChart from '@/components/ActivityChart';
import TopParticipants from '@/components/TopParticipants';
import MeetingAnticipation from '@/components/MeetingAnticipation';
import RealTimeInsights from '@/components/RealTimeInsights';
import { supabase, testConnection } from '@/lib/supabase';
import type { DashboardData } from '@/types/dashboard';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Initializing dashboard...');
      
      // Test connection first
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error('Failed to connect to Supabase database');
      }

      await fetchDashboardData();
      
      // Set up real-time subscription
      const subscription = supabase
        .channel('dashboard')
        .on('postgres_changes', { event: '*', schema: 'public' }, () => {
          console.log('Real-time update received');
          fetchDashboardData();
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Dashboard initialization error:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize dashboard');
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data...');
      
      // Fetch data with detailed error handling
      const participantsQuery = supabase.from('participants').select('*');
      const meetingsQuery = supabase.from('meetings').select('*');
      const matchesQuery = supabase.from('matches').select('*');
      const activityQuery = supabase.from('activity_logs').select('*').order('timestamp', { ascending: false });
      const insightsQuery = supabase.from('insights').select('*').eq('is_active', true);

      const [
        { data: participants, error: participantsError },
        { data: meetings, error: meetingsError },
        { data: matches, error: matchesError },
        { data: activityLogs, error: activityError },
        { data: insights, error: insightsError }
      ] = await Promise.all([
        participantsQuery,
        meetingsQuery,
        matchesQuery,
        activityQuery,
        insightsQuery
      ]);

      // Check for any errors
      const errors = [
        participantsError && `Participants: ${participantsError.message}`,
        meetingsError && `Meetings: ${meetingsError.message}`,
        matchesError && `Matches: ${matchesError.message}`,
        activityError && `Activity: ${activityError.message}`,
        insightsError && `Insights: ${insightsError.message}`
      ].filter(Boolean);

      if (errors.length > 0) {
        throw new Error(`Database errors: ${errors.join(', ')}`);
      }

      // Log successful data fetch
      console.log('Data fetched successfully:', {
        participants: participants?.length || 0,
        meetings: meetings?.length || 0,
        matches: matches?.length || 0,
        activityLogs: activityLogs?.length || 0,
        insights: insights?.length || 0
      });

      setData({
        participants: participants || [],
        meetings: meetings || [],
        matches: matches || [],
        activityLogs: activityLogs || [],
        insights: insights || []
      });
      
      setError(null);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Connecting to database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-2xl mb-4">⚠️ Connection Error</div>
          <p className="text-slate-600 mb-6 text-sm">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => initializeDashboard()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry Connection
            </button>
            <div className="text-xs text-slate-500">
              <p>Check browser console (F12) for detailed error logs</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64">
          <DashboardHeader />
          
          <div className="p-4 lg:p-6 space-y-6">
            <KPICards data={data} />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 flex flex-col gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <ActivityChart data={data?.activityLogs || []} />
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <RealTimeInsights insights={data?.insights || []} />
                </div>
              </div>
              <div className="space-y-6 xl:col-span-1">
                <TopParticipants participants={data?.participants || []} />
                <MeetingAnticipation meetings={data?.meetings || []} participants={data?.participants || []} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}