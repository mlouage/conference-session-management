import React from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { SessionGrid } from './components/SessionGrid';
import { useSessionManager } from './hooks/useSessionManager';

function App() {
  const {
    groupedSessions,
    viewMode,
    setViewMode,
    filterDay,
    setFilterDay,
    searchQuery,
    setSearchQuery,
    toggleSession,
    isSessionSelected,
    getSelectedSessionInTimeSlot,
    selectedCount
  } = useSessionManager();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Header selectedCount={selectedCount} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          filterDay={filterDay}
          setFilterDay={setFilterDay}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCount={selectedCount}
        />
        
        <SessionGrid
          groupedSessions={groupedSessions}
          isSessionSelected={isSessionSelected}
          toggleSession={toggleSession}
          getSelectedSessionInTimeSlot={getSelectedSessionInTimeSlot}
        />
      </main>
    </div>
  );
}

export default App;
