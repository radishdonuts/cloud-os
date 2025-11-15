import React, { useState } from 'react';
import { Window } from '../components/layout/Window';
import { FileTextIcon } from 'lucide-react';
export interface DocumentViewerProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  fileName?: string;
  zIndex?: number;
}
export function DocumentViewer({
  onClose,
  fileName,
  onMaximize,
  maximized = false,
  zIndex = 40
}: DocumentViewerProps) {
  const [content, setContent] = useState(`Sample Document: ${fileName}\n\nThis is a simulated document viewer and editor.\n\nYou can edit this text, but changes won't be saved when you close the window.\n\nIn a real application, this would be a full-featured text editor with formatting options, spell check, and the ability to save changes.`);
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title={fileName} onClose={onClose} onMaximize={onMaximize} maximized={maximized} zIndex={zIndex} width="w-full max-w-5xl" height="h-[85vh]">
        <div className="h-full flex flex-col">
          {/* Toolbar */}
          <div className="px-6 py-3 border-b border-cloud-gray/20 dark:border-dark-border flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileTextIcon size={20} className="text-blue-500" />
              <span className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                {fileName}
              </span>
            </div>
            <div className="flex-1" />
            <span className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
              Read-only preview
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-dark-bg-light rounded-cloud-lg shadow-cloud p-8">
              <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-full min-h-[500px] bg-transparent border-none outline-none resize-none text-cloud-gray-deeper dark:text-dark-text text-base leading-relaxed font-serif" placeholder="Start typing..." />
            </div>
          </div>
        </div>
      </Window>
    </div>;
}