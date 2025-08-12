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
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
        <p className="text-gray-500">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedDays.map(day => (
        <div key={day} className="space-y-6">
          <div className="sticky top-0 bg-gray-50 -mx-6 px-6 py-4 border-b border-gray-200 z-10">
            <h2 className="text-2xl font-bold text-gray-900">
              {formatDate(day)}
            </h2>
          </div>

          {Object.entries(groupedSessions[day])
            .sort(([timeA], [timeB]) => timeA.localeCompare(timeB))
            .map(([time, sessions]) => (
              <div key={`${day}-${time}`} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {time}
                  </div>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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