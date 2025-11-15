import { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Button } from '../components/ui/Button';
import {
  Trash2Icon,
  CheckSquare,
  Square,
  FolderIcon,
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  Grid2x2,
  List,
} from 'lucide-react';

export interface TrashProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  initialItems?: Array<{ id: string; name: string; type: string }>;
  zIndex?: number;
}

// Default mock trash items
const DEFAULT_TRASH_ITEMS = [
  { id: '1', name: 'Old_Project_v2.zip', type: 'file' },
  { id: '2', name: 'Vacation_Photos.rar', type: 'file' },
  { id: '3', name: 'Screenshot_2024_12_10.png', type: 'image' },
  { id: '4', name: 'Meeting_Notes_Draft.docx', type: 'document' },
  { id: '5', name: 'Backup_Database.sql', type: 'database' },
  { id: '6', name: 'Draft_Presentation.key', type: 'file' },
  { id: '7', name: 'Temp_Files', type: 'folder' },
  { id: '8', name: 'broken_video.mp4', type: 'video' },
];

function getFileIcon(type: string) {
  switch (type) {
    case 'folder':
      return <FolderIcon className="text-cloud-green" size={24} />;
    case 'image':
      return <ImageIcon className="text-cloud-pink" size={24} />;
    case 'video':
      return <VideoIcon className="text-cloud-purple" size={24} />;
    case 'music':
      return <MusicIcon className="text-cloud-blue" size={24} />;
    default:
      return <FileTextIcon className="text-cloud-blue" size={24} />;
  }
}

export function Trash({
  onClose,
  onMaximize,
  maximized = false,
  initialItems = [],
  zIndex = 40,
}: TrashProps) {
  const [items, setItems] = useState<
    Array<{ id: string; name: string; type: string }>
  >(initialItems && initialItems.length > 0 ? initialItems : DEFAULT_TRASH_ITEMS);
  const [selected, setSelected] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState<'all' | 'selected' | null>(null);
  const [showRestore, setShowRestore] = useState<'all' | 'selected' | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleDeleteAll = () => {
    setShowConfirm('all');
  };

  const handleDeleteSelected = () => {
    setShowConfirm('selected');
  };

  const confirmDelete = () => {
    if (showConfirm === 'all') {
      setItems([]);
      setSelected([]);
    } else if (showConfirm === 'selected') {
      setItems(items.filter((item) => !selected.includes(item.id)));
      setSelected([]);
    }
    setShowConfirm(null);
  };

  const cancelDelete = () => setShowConfirm(null);

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleRestoreSelected = () => {
    setShowRestore('selected');
  };

  const handleRestoreAll = () => {
    setShowRestore('all');
  };

  const confirmRestore = () => {
    if (showRestore === 'all') {
      setItems([]);
      setSelected([]);
    } else if (showRestore === 'selected') {
      setItems(items.filter((item) => !selected.includes(item.id)));
      setSelected([]);
    }
    setShowRestore(null);
  };

  const cancelRestore = () => setShowRestore(null);

  const handleRowClick = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const renderListItem = (item: {
    id: string;
    name: string;
    type: string;
  }) => {
    const isSelected = selected.includes(item.id);

    return (
      <li
        key={item.id}
        onClick={() => handleRowClick(item.id)}
        className={`
          flex items-center gap-4 px-4 py-3
          bg-white/60 dark:bg-dark-bg-lighter/60
          hover:bg-white dark:hover:bg-dark-bg-lighter
          rounded-cloud-lg cursor-pointer transition-all
          ${isSelected ? 'ring-2 ring-cloud-green' : ''}
        `}
      >
        {/* Checkbox */}
        <button
          onClick={(e) => toggleSelection(item.id, e)}
          className="p-1 hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded"
        >
          {isSelected ? (
            <CheckSquare size={20} className="text-cloud-green" />
          ) : (
            <Square
              size={20}
              className="text-cloud-gray-deeper/50 dark:text-dark-text-muted"
            />
          )}
        </button>

        {/* File Icon */}
        <div className="w-10 h-10 rounded-cloud bg-cloud-gray/20 flex items-center justify-center">
          {getFileIcon(item.type)}
        </div>

        {/* File Info */}
        <div className="flex-1">
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm opacity-70">{item.type}</p>
        </div>
      </li>
    );
  };

  const renderGridItem = (item: {
    id: string;
    name: string;
    type: string;
  }) => {
    const isSelected = selected.includes(item.id);

    return (
      <div
        key={item.id}
        className={`
          relative p-4 flex flex-col items-center justify-center
          bg-white/70 dark:bg-dark-bg-lighter/70 rounded-cloud-lg
          hover:bg-white dark:hover:bg-dark-bg-lighter cursor-pointer
          transition-all shadow-cloud
          ${isSelected ? 'ring-2 ring-cloud-green' : ''}
        `}
        onClick={() => handleRowClick(item.id)}
      >
        {/* Checkbox (top right) */}
        <button
          onClick={(e) => toggleSelection(item.id, e)}
          className="absolute top-3 right-3 p-1 rounded hover:bg-cloud-gray/10"
        >
          {isSelected ? (
            <CheckSquare size={18} className="text-cloud-green" />
          ) : (
            <Square size={18} className="text-cloud-gray-deeper/50" />
          )}
        </button>

        {/* Icon */}
        <div className="w-14 h-14 bg-cloud-gray/20 rounded-cloud flex items-center justify-center mb-3">
          {getFileIcon(item.type)}
        </div>

        {/* Name */}
        <p className="text-sm font-semibold text-center">{item.name}</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window
        title="Trash"
        onClose={onClose}
        onMaximize={onMaximize}
        maximized={maximized}
        zIndex={zIndex}
        width="w-full max-w-4xl"
        height="h-[80vh]"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-cloud-green/10 text-cloud-green hover:bg-cloud-green/20 rounded-full px-4 disabled:opacity-40"
                disabled={selected.length === 0}
                onClick={handleRestoreSelected}
              >
                Restore Selected
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="bg-cloud-green/10 text-cloud-green hover:bg-cloud-green/20 rounded-full px-4 disabled:opacity-40"
                disabled={items.length === 0}
                onClick={handleRestoreAll}
              >
                Restore All
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-full px-4 disabled:opacity-40"
                onClick={handleDeleteSelected}
                disabled={selected.length === 0}
              >
                Delete Selected
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-full px-4 disabled:opacity-40"
                onClick={handleDeleteAll}
                disabled={items.length === 0}
              >
                Delete All
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text-muted">
                {items.length} item{items.length === 1 ? '' : 's'} in Trash
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg hover:bg-cloud-gray/10 dark:hover:bg-dark-bg-lighter ${
                    viewMode === 'grid'
                      ? 'bg-cloud-gray/20 dark:bg-dark-bg-lighter'
                      : ''
                  }`}
                >
                  <Grid2x2 size={18} />
                </button>

                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg hover:bg-cloud-gray/10 dark:hover:bg-dark-bg-lighter ${
                    viewMode === 'list'
                      ? 'bg-cloud-gray/20 dark:bg-dark-bg-lighter'
                      : ''
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto rounded-cloud-lg bg-white/70 dark:bg-dark-bg-lighter/70 border border-cloud-gray/20 dark:border-dark-border shadow-cloud">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Trash2Icon
                  size={56}
                  className="mb-4 text-cloud-gray-deeper/40 dark:text-dark-text-muted"
                />
                <p className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-1">
                  Trash is empty
                </p>
                <p className="text-sm text-cloud-gray-deeper/70 dark:text-dark-text-muted font-medium">
                  Deleted files will appear here before they're removed
                  permanently.
                </p>
              </div>
            ) : (
              <div className="w-full">
                {/* Header row */}
                <div className="grid grid-cols-[24px,1fr,120px] px-4 py-2 text-xs font-semibold text-cloud-gray-dark dark:text-dark-text-muted border-b border-cloud-gray/20 dark:border-dark-border bg-cloud-gray/10 dark:bg-dark-bg-lighter/40">
                  <span></span>
                  <span>Name</span>
                  <span>Type</span>
                </div>

                {/* Items */}
                {viewMode === 'list' ? (
                  <ul className="space-y-2 p-2">
                    {items.map((item) => renderListItem(item))}
                  </ul>
                ) : (
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {items.map((item) => renderGridItem(item))}
                  </div>
                )}
              </div>
            )}
          </div>

          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-white dark:bg-dark-bg-light rounded-cloud-xl p-8 shadow-lg flex flex-col items-center gap-4">
                <div className="text-lg font-semibold text-red-600">
                  Are you sure you want to delete{' '}
                  {showConfirm === 'all' ? 'all items' : 'selected items'}?
                </div>
                <div className="flex gap-4">
                  <Button variant="danger" onClick={confirmDelete}>
                    Yes, Delete
                  </Button>
                  <Button variant="secondary" onClick={cancelDelete}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showRestore && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-white dark:bg-dark-bg-light rounded-cloud-xl p-8 shadow-lg flex flex-col items-center gap-4">
                <div className="text-lg font-semibold text-cloud-green">
                  Restore {showRestore === 'all' ? 'all items' : 'selected items'} from trash?
                </div>
                <p className="text-sm text-cloud-gray-deeper/70 dark:text-dark-text-muted text-center">
                  {showRestore === 'all' 
                    ? 'All items will be moved back to their original locations.'
                    : 'Selected items will be moved back to their original locations.'}
                </p>
                <div className="flex gap-4">
                  <Button 
                    variant="secondary" 
                    onClick={confirmRestore}
                    className="bg-cloud-green/10 text-cloud-green hover:bg-cloud-green/20"
                  >
                    Restore
                  </Button>
                  <Button variant="secondary" onClick={cancelRestore}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Window>
    </div>
  );
}
