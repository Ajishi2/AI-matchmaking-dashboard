'use client';

import type { Participant } from '@/types/dashboard';

interface TopParticipantsProps {
  participants: Participant[];
}

export default function TopParticipants({ participants }: TopParticipantsProps) {
  // Sort participants by some matching score or activity level
  const topParticipants = participants
    .slice()
    .sort((a, b) => (b.match_score || 0) - (a.match_score || 0))
    .slice(0, 5);

  // Always use backend data, no sample fallback
  const displayParticipants = topParticipants;

  const getAvatarColor = (index: number) => {
    const colors = ['bg-yellow-500', 'bg-purple-500', 'bg-green-500', 'bg-gray-800', 'bg-blue-500'];
    return colors[index % colors.length];
  };

  // Show only the first letter of the first name
  const getFirstLetter = (name: string) => {
    return name.split(' ')[0][0].toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Matching TOP 5</h3>
      
      <div className="space-y-4">
        {displayParticipants.map((participant, index) => (
          <div key={participant.id} className="flex items-center space-x-3">
            <span className="text-sm font-medium text-slate-500 w-4">
              {index + 1}.
            </span>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getAvatarColor(index)}`}>
              {getFirstLetter(participant.name)}
            </div>
            
            <span className="text-sm font-medium text-slate-900 flex-1">
              {participant.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}