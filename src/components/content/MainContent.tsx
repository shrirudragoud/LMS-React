import React from 'react';
import { PageContent } from '../../types/models';
import { Loader } from 'lucide-react';

interface MainContentProps {
  page: PageContent | null;
  content: string;
  loading: boolean;
  error: string | null;
  onNext: () => void;
  onPrevious: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  page,
  content,
  loading,
  error,
  onNext,
  onPrevious,
}) => {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Error Loading Content</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Select a topic to begin</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Content Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-xl font-semibold text-gray-900">{page.title}</h1>
        {page.description && (
          <p className="mt-1 text-gray-600">{page.description}</p>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={onPrevious}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={onNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};