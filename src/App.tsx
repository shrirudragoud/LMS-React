import React from 'react';
import { Layout } from './components/layout/Layout';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/content/MainContent';
import { ChatPanel } from './components/chat/ChatPanel';
import { useBookContent } from './hooks/useBookContent';

function App() {
  const {
    pages,
    currentPage,
    pageContent,
    loading,
    error,
    nextPage,
    previousPage,
  } = useBookContent();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content Area */}
      <div className="flex-1 flex">
        <Sidebar pages={pages} currentPage={currentPage} />
        
        <main className="flex-1 flex">
          <MainContent
            page={currentPage}
            content={pageContent}
            loading={loading}
            error={error}
            onNext={nextPage}
            onPrevious={previousPage}
          />
          
          {/* Chat Panel */}
          <ChatPanel />
        </main>
      </div>
    </div>
  );
}

export default App;