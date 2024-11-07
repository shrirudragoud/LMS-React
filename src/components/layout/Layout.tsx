import React from 'react';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Learning Management System</h1>
          <div className="w-12"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {sidebar && (
            <aside
              className={`w-64 transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } fixed md:relative md:translate-x-0 z-10 transition-transform duration-300 ease-in-out h-[calc(100vh-4rem)] overflow-y-auto bg-white md:block border-r`}
            >
              {sidebar}
            </aside>
          )}
          <main
            className={`flex-1 py-6 ${
              isSidebarOpen ? 'md:ml-64' : ''
            } transition-margin duration-300 ease-in-out`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};