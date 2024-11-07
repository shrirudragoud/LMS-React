import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { PageContent as PageContentType } from '../../types/models';

interface PageContentProps {
  page: PageContentType;
  content: string;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const PageContent: React.FC<PageContentProps> = ({
  page,
  content,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Title */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{page.title}</h1>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* GIF Preview */}
          {page.gifUrl && (
            <div className="mb-6">
              <img
                src={page.gifUrl}
                alt={page.title}
                className="rounded-lg w-full object-cover max-h-96"
              />
            </div>
          )}

          {/* Description */}
          <div className="prose max-w-none mb-6">
            <p>{page.description}</p>
          </div>

          {/* File Content */}
          <div 
            className="prose max-w-none mb-6 p-4 bg-gray-50 rounded-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Audio Player */}
          {page.audioUrl && (
            <div className="flex items-center space-x-4 py-4 border-t border-gray-200">
              <button
                onClick={toggleAudio}
                className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <audio
                ref={audioRef}
                src={page.audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="w-full"
                controls
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              hasPrevious
                ? 'text-blue-600 hover:bg-blue-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          <span className="text-sm text-gray-500">
            Page {page.sequence}
          </span>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              hasNext
                ? 'text-blue-600 hover:bg-blue-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};