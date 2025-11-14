import React, { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { HardDriveIcon, FolderIcon, ImageIcon, VideoIcon, MusicIcon, FileTextIcon, TrashIcon } from 'lucide-react';
export interface StorageManagerProps {
  onClose: () => void;
}
export function StorageManager({
  onClose
}: StorageManagerProps) {
  const [optimizing, setOptimizing] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);
  const [trashEmptied, setTrashEmptied] = useState(false);
  const [storageCategories, setStorageCategories] = useState([{
    label: 'System',
    size: 45,
    color: '#A8D5BA',
    icon: '⚙️'
  }, {
    label: 'Applications',
    size: 120,
    color: '#A8C5E0',
    icon: '📱'
  }, {
    label: 'Documents',
    size: 28,
    color: '#C5B8E0',
    icon: '📄'
  }, {
    label: 'Photos',
    size: 85,
    color: '#E0B8D5',
    icon: '🖼️'
  }, {
    label: 'Videos',
    size: 156,
    color: '#FBD38D',
    icon: '🎬'
  }, {
    label: 'Music',
    size: 42,
    color: '#9AE6B4',
    icon: '🎵'
  }, {
    label: 'Other',
    size: 64,
    color: '#B8BCC8',
    icon: '📦'
  }]);
  const [largeFiles, setLargeFiles] = useState([{
    name: 'Project_Video_Final.mp4',
    size: '8.4 GB',
    type: 'video',
    path: '/Videos'
  }, {
    name: 'System_Backup.dmg',
    size: '6.2 GB',
    type: 'system',
    path: '/Backups'
  }, {
    name: 'Photo_Library.photoslibrary',
    size: '4.8 GB',
    type: 'photos',
    path: '/Pictures'
  }, {
    name: 'Game_Install.app',
    size: '3.9 GB',
    type: 'app',
    path: '/Applications'
  }]);
  const totalUsed = storageCategories.reduce((sum, cat) => sum + cat.size, 0);
  const totalCapacity = 1000;
  const usedPercent = totalUsed / totalCapacity * 100;
  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2000);
  };
  const handleEmptyTrash = () => {
    setTrashEmptied(true);
    setTimeout(() => setTrashEmptied(false), 2000);
  };
  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      // Simulate freeing space
      setStorageCategories(prev => prev.map(cat => ({
        ...cat,
        size: cat.size * 0.9
      })));
    }, 3000);
  };
  const handleDeleteFile = (fileName: string) => {
    setLargeFiles(largeFiles.filter(f => f.name !== fileName));
  };
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Storage Manager" onClose={onClose} onMinimize={() => {}} onMaximize={() => {}} width="w-full max-w-5xl" height="h-[80vh]">
        <div className="p-6 space-y-6">
          {/* Storage Overview */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col items-center justify-center">
              <ProgressRing progress={usedPercent} size={160} strokeWidth={12} />
              <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted mt-4">
                {Math.round(totalUsed)} GB of {totalCapacity} GB used
              </p>
            </Card>

            <Card className="col-span-2 p-6">
              <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
                Storage Breakdown
              </h3>
              <div className="space-y-3">
                {storageCategories.map((cat, i) => <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
                          {cat.label}
                        </span>
                      </div>
                      <span className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                        {Math.round(cat.size)} GB
                      </span>
                    </div>
                    <div className="h-2 bg-cloud-gray/30 dark:bg-dark-bg-lighter rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{
                    width: `${cat.size / totalCapacity * 100}%`,
                    backgroundColor: cat.color
                  }} />
                    </div>
                  </div>)}
              </div>
            </Card>
          </div>

          {/* Large Files */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-4">
              Largest Files
            </h3>
            <div className="space-y-3">
              {largeFiles.map((file, i) => <div key={i} className="flex items-center justify-between p-4 bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 rounded-cloud-lg hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-cloud bg-cloud-purple/20 flex items-center justify-center">
                      {file.type === 'video' ? <VideoIcon size={20} className="text-cloud-purple" /> : file.type === 'photos' ? <ImageIcon size={20} className="text-cloud-pink" /> : <FileTextIcon size={20} className="text-cloud-blue" />}
                    </div>
                    <div>
                      <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                        {file.name}
                      </p>
                      <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                        {file.path}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                      {file.size}
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteFile(file.name)}>
                      <TrashIcon size={16} />
                    </Button>
                  </div>
                </div>)}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4">
            <Button variant="secondary" className="w-full" onClick={handleClearCache} disabled={cacheCleared}>
              {cacheCleared ? 'Cache Cleared! ✓' : 'Clear Cache (1.2 GB)'}
            </Button>
            <Button variant="secondary" className="w-full" onClick={handleEmptyTrash} disabled={trashEmptied}>
              {trashEmptied ? 'Trash Emptied! ✓' : 'Empty Trash (450 MB)'}
            </Button>
            <Button variant="primary" className="w-full" onClick={handleOptimize} disabled={optimizing}>
              {optimizing ? 'Optimizing...' : 'Optimize Storage'}
            </Button>
          </div>

          {optimizing && <Card className="p-4 bg-cloud-blue/10">
              <div className="flex items-center gap-3">
                <div className="animate-spin">⚙️</div>
                <div className="flex-1">
                  <p className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                    Optimizing storage...
                  </p>
                  <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                    This may take a few moments
                  </p>
                </div>
              </div>
            </Card>}
        </div>
      </Window>
    </div>;
}