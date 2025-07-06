export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  status: 'active' | 'inactive' | 'identified';
  match_score?: number;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  participant_ids: string[];
  participant_name?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_at: string;
  duration_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  participant1_id: string;
  participant2_id: string;
  satisfaction_score: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  participant_id: string;
  action_type: 'login' | 'logout' | 'meeting' | 'match';
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Insight {
  id: string;
  type: 'surge' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  action_text: string;
  icon_color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardData {
  participants: Participant[];
  meetings: Meeting[];
  matches: Match[];
  activityLogs: ActivityLog[];
  insights: Insight[];
}