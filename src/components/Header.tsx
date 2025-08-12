import React from 'react';
import { Calendar, Users, Star } from 'lucide-react';

interface HeaderProps {
  selectedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ selectedCount }) => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg">
              <Star size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                NDC Copenhagen 2025
              </h1>
              <p className="text-gray-300 mt-2 text-lg">Conference Session Manager</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20">
            <div className="flex items-center gap-3 text-xl font-semibold">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{selectedCount}</div>
                <div className="text-sm text-gray-300 -mt-1">Sessions Selected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};