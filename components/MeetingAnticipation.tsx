'use client';

import type { Meeting, Participant } from '@/types/dashboard';

interface MeetingAnticipationProps {
  meetings: Meeting[];
  participants: Participant[];
}

export default function MeetingAnticipation({ meetings, participants }: MeetingAnticipationProps) {
  // Filter upcoming meetings
  const upcomingMeetings = meetings
    .filter(m => m.status === 'scheduled')
    .slice(0, 5);

  // Always use backend data, no sample fallback
  const displayMeetings = upcomingMeetings;

  const getAvatarColor = (index: number) => {
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-600', 'bg-gray-800'];
    return colors[index % colors.length];
  };

  // Show only the first letter of the first name
  const getFirstLetter = (name: string) => {
    return name.split(' ')[0][0].toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Meeting in Anticipation</h3>
      
      <div className="space-y-4">
        {displayMeetings.map((meeting, index) => (
          <div key={meeting.id} className="flex items-center space-x-3">
            <span className="text-sm font-medium text-slate-500 w-4">
              {index + 1}.
            </span>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getAvatarColor(index)}`}>
              {getFirstLetter(meeting.participant_name || 'Unknown')}
            </div>
            
            <span className="text-sm font-medium text-slate-900 flex-1">
              {meeting.participant_name || 'Unknown Participant'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}