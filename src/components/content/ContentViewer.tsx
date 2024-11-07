import React from 'react';
import { Loader } from 'lucide-react';
import { ContentItem } from '../../types/models';

interface ContentViewerProps {
  content: ContentItem | null;
  loading: boolean;
  error: string | null;
}

export const ContentViewer: React.FC<ContentViewerProps> = ({
  content,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="text-red-800 font-medium">Error loading content</h3>
        <p className="text-red-600 mt-1">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Select a topic from the syllabus to begin</p>
      </div>
    );
  }

  return (
    <article className="prose prose-blue max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h1>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
      {content.metadata && (
        <div className="mt-8 pt-4 border-t text-sm text-gray-500">
          {content.metadata.author && (
            <p>Author: {content.metadata.author}</p>
          )}
          {content.metadata.lastUpdated && (
            <p>Last updated: {content.metadata.lastUpdated}</p>
          )}
        </div>
      )}
    </article>
  );
};