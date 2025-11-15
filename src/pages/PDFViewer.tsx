import { useState } from 'react';
import { Window } from '../components/layout/Window';
import {
  FileTextIcon,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
} from 'lucide-react';

export interface PDFViewerProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  fileName?: string;
  zIndex?: number;
}

const SAMPLE_PAGES: string[] = [
  `This is a simulated PDF viewer page. In a real application, this area would render the actual PDF content using a library such as PDF.js.

The goal of this mock viewer is to give you the feel of opening a document in a word processor or notes app — with a title bar, toolbar, page list, and a central "page" area — without providing editing capabilities.`,
  `You can use this layout as a visual prototype for how PDF documents will appear inside CloudOS.

Possible real features in the future:
• Actual PDF rendering (PDF.js)
• Text selection and copying
• Search within document
• Page thumbnails
• Annotations or comments (if desired)`,
  `For now, this component is read-only and simply presents placeholder content styled like a document page.

You can customize the fonts, line heights, and spacing to match your OS typography, or replace this sample text with a short preview snippet from the real PDF metadata if you wish.`,
];

export function PDFViewer({
  onClose,
  onMaximize,
  maximized = false,
  fileName = 'document.pdf',
  zIndex = 40
}: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(100);

  const totalPages = SAMPLE_PAGES.length;
  const displayName = fileName || 'Document.pdf';
  const baseTitle = displayName.replace(/\.pdf$/i, '');

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(50, prev - 10));
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(200, prev + 10));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in" style={{ zIndex }}>
      <Window
        title={displayName}
        onClose={onClose}
        onMaximize={onMaximize}
        maximized={maximized}
        width="w-full max-w-6xl"
        height="h-[85vh]"
        zIndex={zIndex}
      >
        <div className="flex h-full">
          {/* Sidebar – document info + pages list */}
          <div className="w-64 border-r border-cloud-gray/20 dark:border-dark-border p-4 flex flex-col bg-cloud-gray/5 dark:bg-dark-bg-lighter/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-red-500/15 flex items-center justify-center">
                <FileTextIcon size={20} className="text-red-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-cloud-gray-dark/70 dark:text-dark-text-muted font-semibold">
                  Document
                </p>
                <p className="text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text truncate">
                  {baseTitle}
                </p>
              </div>
            </div>

            <div className="mb-4 space-y-1 text-xs text-cloud-gray-dark dark:text-dark-text-muted">
              <p>
                <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                  Type:
                </span>{' '}
                PDF Document
              </p>
              <p>
                <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                  Pages:
                </span>{' '}
                {totalPages}
              </p>
              <p>
                <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                  Size:
                </span>{' '}
                ~2.3 MB (mock)
              </p>
              <p>
                <span className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                  Location:
                </span>{' '}
                /Documents
              </p>
            </div>

            <div className="mt-2 mb-2 text-xs font-semibold text-cloud-gray-deeper dark:text-dark-text uppercase tracking-[0.16em]">
              Pages
            </div>

            <div className="flex-1 overflow-auto space-y-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const isActive = idx === currentPage;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`
                      w-full flex items-center gap-3 p-2 rounded-cloud-lg text-left text-xs transition-all
                      ${
                        isActive
                          ? 'bg-cloud-green/15 border border-cloud-green text-cloud-gray-deeper dark:text-dark-text'
                          : 'bg-cloud-gray/10 dark:bg-dark-bg-lighter/60 hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter text-cloud-gray-dark dark:text-dark-text-muted border border-transparent'
                      }
                    `}
                  >
                    <div className="w-8 h-10 rounded-[6px] bg-white/80 dark:bg-dark-bg-light shadow-sm flex items-center justify-center text-[10px] text-cloud-gray-dark/70 dark:text-dark-text-muted">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        Page {idx + 1}
                      </p>
                      <p className="truncate text-[11px] opacity-80">
                        Preview of this page content...
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content – toolbar + page */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar (like Word/Notes but read-only) */}
            <div className="px-6 py-3 border-b border-cloud-gray/20 dark:border-dark-border flex items-center gap-4 bg-cloud-gray/5 dark:bg-dark-bg-lighter/30">
              {/* Page navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`p-1.5 rounded-cloud border text-xs flex items-center justify-center ${
                    currentPage === 0
                      ? 'border-cloud-gray/30 text-cloud-gray-dark/50 dark:text-dark-text-muted/50 cursor-not-allowed'
                      : 'border-cloud-gray/40 dark:border-dark-border hover:bg-cloud-gray/10 dark:hover:bg-dark-bg-light text-cloud-gray-deeper dark:text-dark-text'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs text-cloud-gray-deeper dark:text-dark-text whitespace-nowrap">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`p-1.5 rounded-cloud border text-xs flex items-center justify-center ${
                    currentPage === totalPages - 1
                      ? 'border-cloud-gray/30 text-cloud-gray-dark/50 dark:text-dark-text-muted/50 cursor-not-allowed'
                      : 'border-cloud-gray/40 dark:border-dark-border hover:bg-cloud-gray/10 dark:hover:bg-dark-bg-light text-cloud-gray-deeper dark:text-dark-text'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-cloud-gray/30 dark:bg-dark-border" />

              {/* Zoom controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-cloud border border-cloud-gray/40 dark:border-dark-border hover:bg-cloud-gray/10 dark:hover:bg-dark-bg-light text-cloud-gray-deeper dark:text-dark-text"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-xs text-cloud-gray-deeper dark:text-dark-text w-10 text-center">
                  {zoom}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-cloud border border-cloud-gray/40 dark:border-dark-border hover:bg-cloud-gray/10 dark:hover:bg-dark-bg-light text-cloud-gray-deeper dark:text-dark-text"
                >
                  <ZoomIn size={16} />
                </button>
              </div>

              <div className="flex-1" />

              {/* Download (visual only / non-functional placeholder) */}
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-cloud bg-white/60 dark:bg-dark-bg-light/70 border border-cloud-gray/30 dark:border-dark-border text-xs text-cloud-gray-deeper dark:text-dark-text hover:bg-white dark:hover:bg-dark-bg-light"
                type="button"
              >
                <DownloadIcon size={14} />
                Download (mock)
              </button>
            </div>

            {/* Page area */}
            <div className="flex-1 overflow-auto bg-cloud-gray/10 dark:bg-dark-bg-lighter/40 p-6">
              <div className="flex justify-center">
                <div
                  className="bg-white dark:bg-dark-bg-light rounded-cloud-xl shadow-cloud max-w-3xl w-full min-h-[70vh] mx-auto px-12 py-10"
                  style={{
                    fontSize: `${16 * (zoom / 100)}px`,
                    lineHeight: 1.6,
                  }}
                >
                  <h1 className="text-2xl font-semibold mb-4 text-cloud-gray-deeper dark:text-dark-text">
                    {baseTitle}
                  </h1>
                  <p className="text-xs text-cloud-gray-dark/80 dark:text-dark-text-muted mb-6">
                    Viewing page {currentPage + 1} of {totalPages} • Read-only preview
                  </p>

                  <div className="space-y-4 text-cloud-gray-deeper dark:text-dark-text">
                    {SAMPLE_PAGES[currentPage]
                      .split('\n\n')
                      .map((block, idx) => (
                        <p key={idx}>{block}</p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
}
