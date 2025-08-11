import React from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import { ViewMode, FilterDay } from '../types/Session';

interface FilterBarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filterDay: FilterDay;
  setFilterDay: (day: FilterDay) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  viewMode,
  setViewMode,
  filterDay,
  setFilterDay,
  searchQuery,
  setSearchQuery,
  selectedCount
}) => {
  const dayOptions = [
    { value: 'all' as FilterDay, label: 'All Days' },
    { value: '2025-09-10' as FilterDay, label: 'Sep 10' },
    { value: '2025-09-11' as FilterDay, label: 'Sep 11' },
    { value: '2025-09-12' as FilterDay, label: 'Sep 12' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'all'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Sessions
          </button>
          <button
            onClick={() => setViewMode('selected')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'selected'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Schedule ({selectedCount})
          </button>
        </div>

        {/* Day Filter */}
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-500" />
          <select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value as FilterDay)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {dayOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search sessions, speakers, or rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};