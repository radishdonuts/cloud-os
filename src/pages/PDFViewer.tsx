import React from 'react';
import { Window } from '../components/layout/Window';
import { FileTextIcon } from 'lucide-react';
export interface PDFViewerProps {
  onClose: () => void;
  fileName: string;
}
export function PDFViewer({
  onClose,
  fileName
}: PDFViewerProps) {
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title={fileName} onClose={onClose} width="w-full max-w-4xl" height="h-[85vh]">
        <div className="h-full flex flex-col items-center justify-center bg-cloud-gray/10 dark:bg-dark-bg-lighter/30">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-cloud-xl bg-red-500/20 flex items-center justify-center">
              <FileTextIcon size={64} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text mb-2">
              PDF Preview
            </h2>
            <p className="text-cloud-gray-dark dark:text-dark-text-muted mb-4">
              {fileName}
            </p>
            <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-dark-bg-light rounded-cloud-lg shadow-cloud">
              <div className="space-y-4 text-left">
                <p className="text-cloud-gray-deeper dark:text-dark-text">
                  <strong>Document Title:</strong>{' '}
                  {fileName.replace('.pdf', '')}
                </p>
                <p className="text-cloud-gray-dark dark:text-dark-text-muted">
                  This is a simulated PDF viewer. In a real application, this
                  would display the actual PDF content using a library like
                  PDF.js or similar.
                </p>
                <div className="border-t border-cloud-gray/20 dark:border-dark-border pt-4 mt-4">
                  <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                    <strong>Sample Content:</strong>
                  </p>
                  <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Window>
    </div>;
}