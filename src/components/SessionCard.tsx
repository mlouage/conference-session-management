import React from 'react';
import { Clock, MapPin, Users, AlertTriangle } from 'lucide-react';
import { SessionWithId } from '../types/Session';

interface SessionCardProps {
  session: SessionWithId;
  isSelected: boolean;
  onToggle: (sessionId: string) => void;
  selectedSessionInTimeSlot: SessionWithId | undefined;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  isSelected,
  onToggle,
  selectedSessionInTimeSlot
}) => {
  const hasReplaceableSession = selectedSessionInTimeSlot && !isSelected;

  const getSessionTypeColor = (type: string) => {
    if (type.includes('Workshop')) return 'bg-purple-100 text-purple-800';
    if (type.includes('Keynote') || type.includes('Locknote')) return 'bg-yellow-100 text-yellow-800';
    if (type.includes('Lightning')) return 'bg-green-100 text-green-800';
    if (type.includes('Party')) return 'bg-pink-100 text-pink-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className={`
      relative bg-white rounded-lg shadow-md border-2 transition-all duration-200 hover:shadow-lg
      ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
    `}>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSessionTypeColor(session.type_duration)}`}>
            {session.type_duration}
          </span>
          <button
            onClick={() => onToggle(session.id)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors duration-200 min-w-[140px]
              ${isSelected 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : hasReplaceableSession
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {isSelected ? 'Remove' : hasReplaceableSession ? 'Replace' : 'Add to Schedule'}
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
          {session.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">{session.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">{session.room}</span>
          </div>
          <div className="flex items-start text-gray-600">
            <Users size={16} className="mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{session.speakers.join(', ')}</span>
          </div>
        </div>

        {hasReplaceableSession && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center text-orange-700 mb-1">
              <AlertTriangle size={14} className="mr-1" />
              <span className="text-xs font-medium">Will Replace</span>
            </div>
            <p className="text-xs text-orange-600">
              Will replace: {selectedSessionInTimeSlot.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};