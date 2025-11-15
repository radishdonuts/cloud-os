import { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import {
  UploadCloudIcon,
  DownloadCloudIcon,
  SmartphoneIcon,
  MonitorIcon,
  TabletIcon,
  FileIcon,
  ImageIcon,
  FileTextIcon,
  FolderIcon,
  Trash2Icon,
  SearchIcon,
  CheckCircle2Icon,
  ClockIcon,
  HardDriveIcon
} from 'lucide-react';

interface CloudDriveProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  zIndex?: number;
}

interface CloudFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'folder' | 'other';
  size: string;
  uploadedAt: string;
  uploadedFrom: string;
  synced: boolean;
}

interface ConnectedDevice {
  id: string;
  name: string;
  type: 'phone' | 'tablet' | 'computer';
  lastSynced: string;
  online: boolean;
}

export function CloudDrive({ onClose, onMaximize, maximized = false, zIndex = 40 }: CloudDriveProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'files' | 'devices'>('files');

  // Mock cloud files data
  const [cloudFiles] = useState<CloudFile[]>([
    {
      id: '1',
      name: 'Project Proposal.pdf',
      type: 'document',
      size: '2.4 MB',
      uploadedAt: '2 hours ago',
      uploadedFrom: 'iPhone 15 Pro',
      synced: true
    },
    {
      id: '2',
      name: 'Vacation Photos',
      type: 'folder',
      size: '156 MB',
      uploadedAt: 'Yesterday',
      uploadedFrom: 'MacBook Pro',
      synced: true
    },
    {
      id: '3',
      name: 'Meeting Notes.txt',
      type: 'document',
      size: '48 KB',
      uploadedAt: '3 days ago',
      uploadedFrom: 'iPad Air',
      synced: true
    },
    {
      id: '4',
      name: 'Screenshot_2024.png',
      type: 'image',
      size: '1.8 MB',
      uploadedAt: '5 minutes ago',
      uploadedFrom: 'iPhone 15 Pro',
      synced: false
    }
  ]);

  // Mock connected devices
  const [connectedDevices] = useState<ConnectedDevice[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'phone',
      lastSynced: '5 minutes ago',
      online: true
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'computer',
      lastSynced: '2 hours ago',
      online: true
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      lastSynced: '3 days ago',
      online: false
    }
  ]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileTextIcon size={20} className="text-blue-500" />;
      case 'image':
        return <ImageIcon size={20} className="text-purple-500" />;
      case 'folder':
        return <FolderIcon size={20} className="text-cloud-green" />;
      default:
        return <FileIcon size={20} className="text-cloud-gray-dark" />;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <SmartphoneIcon size={24} className="text-cloud-green" />;
      case 'tablet':
        return <TabletIcon size={24} className="text-cloud-green" />;
      case 'computer':
        return <MonitorIcon size={24} className="text-cloud-green" />;
      default:
        return <HardDriveIcon size={24} className="text-cloud-gray-dark" />;
    }
  };

  const filteredFiles = cloudFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate storage used
  const totalFiles = cloudFiles.length;
  const storageUsed = '2.8 GB';
  const storageTotal = '15 GB';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window
        title="CloudOS Drive"
        onClose={onClose}
        onMaximize={onMaximize}
        maximized={maximized}
        zIndex={zIndex}
        width="w-full max-w-5xl"
        height="h-[85vh]"
      >
      <div className="flex flex-col h-full bg-cloud-cream dark:bg-dark-bg">
        {/* Header Stats */}
        <div className="p-6 border-b border-cloud-gray/20 dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                CloudOS Drive
              </h2>
              <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted mt-1">
                Sync files across all your devices seamlessly
              </p>
            </div>
            <Button variant="primary" size="sm">
              <UploadCloudIcon size={16} />
              <span className="ml-2">Upload Files</span>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cloud-green/10 rounded-cloud">
                  <FileIcon size={20} className="text-cloud-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                    {totalFiles}
                  </p>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                    Total Files
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-cloud">
                  <HardDriveIcon size={20} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                    {storageUsed}
                  </p>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                    of {storageTotal} used
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-cloud">
                  <SmartphoneIcon size={20} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                    {connectedDevices.filter(d => d.online).length}
                  </p>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                    Devices Online
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 px-6 pt-4 border-b border-cloud-gray/20 dark:border-dark-border">
          <button
            onClick={() => setSelectedTab('files')}
            className={`px-4 py-2 font-semibold transition-colors relative ${
              selectedTab === 'files'
                ? 'text-cloud-green dark:text-cloud-green'
                : 'text-cloud-gray-dark dark:text-dark-text-muted hover:text-cloud-gray-deeper dark:hover:text-dark-text'
            }`}
          >
            Files
            {selectedTab === 'files' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cloud-green" />
            )}
          </button>
          <button
            onClick={() => setSelectedTab('devices')}
            className={`px-4 py-2 font-semibold transition-colors relative ${
              selectedTab === 'devices'
                ? 'text-cloud-green dark:text-cloud-green'
                : 'text-cloud-gray-dark dark:text-dark-text-muted hover:text-cloud-gray-deeper dark:hover:text-dark-text'
            }`}
          >
            Connected Devices
            {selectedTab === 'devices' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cloud-green" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {selectedTab === 'files' ? (
            <div>
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <SearchIcon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-cloud-gray-dark dark:text-dark-text-muted"
                  />
                  <Input
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Files List */}
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <Card
                    key={file.id}
                    className="p-4 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {getFileIcon(file.type)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                            {file.name}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                              {file.size}
                            </span>
                            <span className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                              •
                            </span>
                            <span className="text-xs text-cloud-gray-dark dark:text-dark-text-muted flex items-center gap-1">
                              <ClockIcon size={12} />
                              {file.uploadedAt}
                            </span>
                            <span className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                              •
                            </span>
                            <span className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                              from {file.uploadedFrom}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {file.synced ? (
                          <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
                            <CheckCircle2Icon size={16} />
                            <span>Synced</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-blue-500 text-xs font-medium">
                            <UploadCloudIcon size={16} className="animate-pulse" />
                            <span>Syncing...</span>
                          </div>
                        )}
                        <Button variant="ghost" size="sm">
                          <DownloadCloudIcon size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2Icon size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Devices List */}
              {connectedDevices.map((device) => (
                <Card
                  key={device.id}
                  className="p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-cloud-gray/10 dark:bg-dark-bg-lighter rounded-cloud-lg">
                        {getDeviceIcon(device.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                            {device.name}
                          </h3>
                          {device.online && (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted mt-1">
                          Last synced: {device.lastSynced}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {device.online ? (
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
                          Online
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-cloud-gray/20 text-cloud-gray-dark dark:text-dark-text-muted text-xs font-semibold rounded-full">
                          Offline
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {/* Add Device Card */}
              <Card className="p-6 border-2 border-dashed border-cloud-gray/30 dark:border-dark-border hover:border-cloud-green dark:hover:border-cloud-green transition-colors cursor-pointer">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="p-4 bg-cloud-green/10 rounded-full mb-4">
                    <SmartphoneIcon size={32} className="text-cloud-green" />
                  </div>
                  <h3 className="font-semibold text-cloud-gray-deeper dark:text-dark-text mb-2">
                    Connect a New Device
                  </h3>
                  <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted mb-4">
                    Download CloudOS app on your phone or tablet to sync files
                  </p>
                  <Button variant="primary" size="sm">
                    Get CloudOS App
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      </Window>
    </div>
  );
}

