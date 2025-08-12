import { useState, useEffect, useMemo } from 'react';
import { SessionWithId, ViewMode, FilterDay } from '../types/Session';
import sessionsData from '../assets/schedule_parsed.json';

export const useSessionManager = () => {
  const [selectedSessions, setSelectedSessions] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [filterDay, setFilterDay] = useState<FilterDay>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load selected sessions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedSessions');
    if (saved) {
      setSelectedSessions(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save selected sessions to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedSessions', JSON.stringify([...selectedSessions]));
  }, [selectedSessions]);

  // Transform sessions data with IDs
  const allSessions: SessionWithId[] = useMemo(() => {
    return sessionsData.map((session, index) => ({
      ...session,
      id: `${session.day}-${session.time}-${session.room}-${index}`
    }));
  }, []);

  // Filter sessions based on current filters
  const filteredSessions = useMemo(() => {
    let sessions = viewMode === 'all' ? allSessions : allSessions.filter(s => selectedSessions.has(s.id));

    if (filterDay !== 'all') {
      sessions = sessions.filter(s => s.day === filterDay);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      sessions = sessions.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.speakers.some(speaker => speaker.toLowerCase().includes(query)) ||
        s.room.toLowerCase().includes(query)
      );
    }

    return sessions.sort((a, b) => {
      if (a.day !== b.day) return a.day.localeCompare(b.day);
      if (a.time !== b.time) return a.time.localeCompare(b.time);
      return a.room.localeCompare(b.room);
    });
  }, [allSessions, selectedSessions, viewMode, filterDay, searchQuery]);

  // Group sessions by day and time
  const groupedSessions = useMemo(() => {
    const groups: Record<string, Record<string, SessionWithId[]>> = {};
    
    filteredSessions.forEach(session => {
      if (!groups[session.day]) {
        groups[session.day] = {};
      }
      if (!groups[session.day][session.time]) {
        groups[session.day][session.time] = [];
      }
      groups[session.day][session.time].push(session);
    });

    return groups;
  }, [filteredSessions]);

  const toggleSession = (sessionId: string) => {
    setSelectedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        // Find the session being added
        const sessionToAdd = allSessions.find(s => s.id === sessionId);
        if (sessionToAdd) {
          // Remove any other selected session from the same time slot
          const conflictingSessions = allSessions.filter(s => 
            s.day === sessionToAdd.day && 
            s.time === sessionToAdd.time && 
            newSet.has(s.id)
          );
          conflictingSessions.forEach(s => newSet.delete(s.id));
        }
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  const isSessionSelected = (sessionId: string) => selectedSessions.has(sessionId);

  const getSelectedSessionInTimeSlot = (session: SessionWithId) => {
    return allSessions.find(s => 
      s.id !== session.id && 
      s.day === session.day && 
      s.time === session.time && 
      selectedSessions.has(s.id)
    );
  };

  return {
    filteredSessions,
    groupedSessions,
    selectedSessions,
    viewMode,
    setViewMode,
    filterDay,
    setFilterDay,
    searchQuery,
    setSearchQuery,
    toggleSession,
    isSessionSelected,
    getSelectedSessionInTimeSlot,
    selectedCount: selectedSessions.size
  };
};