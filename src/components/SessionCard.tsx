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
    if (type.includes('Workshop')) return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white';
    if (type.includes('Keynote') || type.includes('Locknote')) return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    if (type.includes('Lightning')) return 'bg-gradient-to-r from-green-400 to-teal-500 text-white';
    if (type.includes('Party')) return 'bg-gradient-to-r from-pink-500 to-rose-600 text-white';
    return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white';
  };

  return (
    <div className={`
      relative bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
      ${isSelected 
        ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 shadow-purple-200/50' 
        : 'border-gray-200 hover:border-purple-200'
      }
    `}>
      
      <div className="p-8">
        <div className="flex items-start justify-between mb-3">
          <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg ${getSessionTypeColor(session.type_duration)}`}>
            {session.type_duration}
          </span>
          <button
            onClick={() => onToggle(session.id)}
            className={`
              px-6 py-3 rounded-xl font-bold transition-all duration-300 min-w-[140px] shadow-lg hover:shadow-xl transform hover:scale-105
              ${isSelected 
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700' 
                : hasReplaceableSession
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
              }
            `}
          >
            {isSelected ? 'Remove' : hasReplaceableSession ? 'Replace' : 'Add to Schedule'}
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
          {session.title}
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-700">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-lg mr-3">
              <Clock size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium">{session.time}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-1.5 rounded-lg mr-3">
              <MapPin size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium">{session.room}</span>
          </div>
          <div className="flex items-start text-gray-700">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-1.5 rounded-lg mr-3 mt-0.5">
              <Users size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium">{session.speakers.join(', ')}</span>
          </div>
        </div>

        {hasReplaceableSession && (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center text-orange-800 mb-2">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-1 rounded mr-2">
                <AlertTriangle size={12} className="text-white" />
              </div>
              <span className="text-xs font-bold">Will Replace</span>
            </div>
            <p className="text-xs text-orange-700 font-medium">
              Will replace: {selectedSessionInTimeSlot.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};