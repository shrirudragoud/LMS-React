import React from 'react';
import { PageContent } from '../../types/models';
import { Settings, MessageCircle } from 'lucide-react';

interface SidebarProps {
  pages: PageContent[];
  currentPage: PageContent | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ pages, currentPage }) => {
  return (
    <div className="w-48 bg-[#2A2A42] text-white flex flex-col">
      {/* Top Actions */}
      <div className="p-4 space-y-2">
        <button className="w-full py-2 px-4 bg-green-500 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
          New Chat
        </button>
        <button className="w-full py-2 px-4 bg-blue-500 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
          Study Notes
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {pages.map((page) => (
          <button
            key={page.sequence}
            className={`w-full text-left px-4 py-2 rounded-lg mb-1 text-sm ${
              currentPage?.sequence === page.sequence
                ? 'bg-white/10'
                : 'hover:bg-white/5'
            }`}
          >
            {page.title}
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center px-4 py-2 text-sm hover:bg-white/5 rounded-lg">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
}