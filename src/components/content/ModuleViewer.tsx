import React from 'react';
import { Loader } from 'lucide-react';
import { PageContent as PageContentType } from '../../types/models';

interface ModuleViewerProps {
  page: PageContentType;
  content: string;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({ page, content }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = React.useState('500px');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      
      // Create a blob URL for the content
      const blob = new Blob([content], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      
      // Set the iframe src to the blob URL
      iframe.src = blobUrl;

      // Cleanup function to revoke the blob URL
      return () => URL.revokeObjectURL(blobUrl);
    }
  }, [content]);

  const handleIframeLoad = () => {
    setLoading(false);
    if (iframeRef.current) {
      // Adjust iframe height to content
      const height = iframeRef.current.contentWindow?.document.documentElement.scrollHeight;
      if (height) {
        setIframeHeight(`${height + 20}px`);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">{page.title}</h1>
        {page.description && (
          <p className="mt-2 text-gray-600">{page.description}</p>
        )}
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <Loader className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="w-full"
          style={{ height: iframeHeight }}
          onLoad={handleIframeLoad}
          sandbox="allow-same-origin allow-scripts"
          title={page.title}
        />
      </div>
    </div>
  );
};