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
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* View Mode Toggle */}
        <div className="flex bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-1.5 shadow-inner">
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Sessions
          </button>
          <button
            onClick={() => setViewMode('selected')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'selected'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Schedule ({selectedCount})
          </button>
        </div>

        {/* Day Filter */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-lg">
            <Calendar size={16} className="text-white" />
          </div>
          <select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value as FilterDay)}
            className="bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
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
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-400 to-gray-500 p-1 rounded">
            <Search size={14} className="text-white" />
          </div>
          <input
            type="text"
            placeholder="Search sessions, speakers, or rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-all"
          />
        </div>
      </div>
    </div>
  );
};