import React from 'react';
import { SessionCard } from './SessionCard';
import { SessionWithId } from '../types/Session';

interface SessionGridProps {
  groupedSessions: Record<string, Record<string, SessionWithId[]>>;
  isSessionSelected: (sessionId: string) => boolean;
  toggleSession: (sessionId: string) => void;
  getSelectedSessionInTimeSlot: (session: SessionWithId) => SessionWithId | undefined;
}

export const SessionGrid: React.FC<SessionGridProps> = ({
  groupedSessions,
  isSessionSelected,
  toggleSession,
  getSelectedSessionInTimeSlot
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const sortedDays = Object.keys(groupedSessions).sort();

  if (sortedDays.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-300 mb-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">No sessions found</h3>
        <p className="text-gray-600 text-lg">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {sortedDays.map(day => (
        <div key={day} className="space-y-8">
          <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-white -mx-8 px-8 py-6 border-b-2 border-purple-200 z-10 shadow-sm">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
              {formatDate(day)}
            </h2>
          </div>

          {Object.entries(groupedSessions[day])
            .sort(([timeA], [timeB]) => timeA.localeCompare(timeB))
            .map(([time, sessions]) => (
              <div key={`${day}-${time}`} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                    {time}
                  </div>
                  <div className="h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 flex-1 rounded"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sessions.map(session => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      isSelected={isSessionSelected(session.id)}
                      onToggle={toggleSession}
                      selectedSessionInTimeSlot={getSelectedSessionInTimeSlot(session)}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};