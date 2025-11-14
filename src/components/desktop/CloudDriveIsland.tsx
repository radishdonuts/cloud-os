import { useState, useRef } from 'react';
import { CloudIcon, UploadCloudIcon, CheckCircleIcon, RefreshCwIcon } from 'lucide-react';

export interface CloudDriveIslandProps {
  onOpenManager: () => void;
  fileCount: number;
  syncStatus: 'idle' | 'syncing' | 'synced';
}

export function CloudDriveIsland({ onOpenManager, fileCount, syncStatus }: CloudDriveIslandProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
      setIsExpanded(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
      setIsExpanded(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files: File[]) => {
    // Trigger upload animation and open manager
    setIsExpanded(true);
    setTimeout(() => {
      setIsExpanded(false);
      onOpenManager();
    }, 800);
  };

  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <RefreshCwIcon size={16} className="animate-spin text-blue-500" />;
      case 'synced':
        return <CheckCircleIcon size={16} className="text-green-500" />;
      default:
        return <CloudIcon size={16} className="text-cloud-green" />;
    }
  };

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isExpanded ? 'scale-110' : 'scale-100'
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <button
        onClick={onOpenManager}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => !isDragging && setIsExpanded(false)}
        className={`
          flex items-center gap-3 px-6 py-3 rounded-full
          backdrop-blur-xl shadow-cloud-lg
          transition-all duration-300 ease-out
          ${isDragging 
            ? 'bg-cloud-green/90 text-white scale-110 ring-4 ring-cloud-green/30' 
            : 'bg-white/80 dark:bg-dark-bg/80 text-cloud-gray-deeper dark:text-dark-text hover:bg-white/90 dark:hover:bg-dark-bg/90'
          }
        `}
      >
        {/* Icon */}
        <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
          {isDragging ? (
            <UploadCloudIcon size={20} className="animate-bounce" />
          ) : (
            getSyncIcon()
          )}
        </div>

        {/* Text Content */}
        <div className={`flex items-center gap-2 transition-all duration-300 ${
          isExpanded ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'
        }`}>
          {isDragging ? (
            <span className="text-sm font-semibold whitespace-nowrap">
              Drop files to upload
            </span>
          ) : (
            <>
              <span className="text-sm font-semibold whitespace-nowrap">
                CloudOS Drive
              </span>
              {fileCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-cloud-green/20 text-cloud-green rounded-full">
                  {fileCount}
                </span>
              )}
            </>
          )}
        </div>

        {/* Pulse Animation for Active Sync */}
        {syncStatus === 'syncing' && (
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
        )}
      </button>

      {/* Helper Text */}
      {isExpanded && !isDragging && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="px-3 py-1 bg-dark-bg-light/90 backdrop-blur-md text-white text-xs rounded-cloud shadow-cloud">
            Drag files here to sync across devices
          </div>
        </div>
      )}
    </div>
  );
}

