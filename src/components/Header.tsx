import React from 'react';
import { Calendar, Users } from 'lucide-react';

interface HeaderProps {
  selectedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ selectedCount }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <Calendar size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">NDC Copenhagen 2025</h1>
              <p className="text-blue-100 mt-1">Conference Session Manager</p>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Users size={20} />
              <span>{selectedCount} Sessions Selected</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};