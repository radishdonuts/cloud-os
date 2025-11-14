import { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Button } from '../components/ui/Button';

export interface TrashProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  initialItems?: Array<{ id: string; name: string; type: string }>;
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

export function Trash({ onClose, onMaximize, maximized = false, initialItems = [] }: TrashProps) {
  const [items, setItems] = useState<Array<{ id: string; name: string; type: string }>>(
    initialItems && initialItems.length > 0 ? initialItems : DEFAULT_TRASH_ITEMS
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState<'all' | 'selected' | null>(null);

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
      setItems(items.filter(item => !selected.includes(item.id)));
      setSelected([]);
    }
    setShowConfirm(null);
  };
  const cancelDelete = () => setShowConfirm(null);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Trash" onClose={onClose} onMaximize={onMaximize} maximized={maximized} width="w-full max-w-6xl" height="h-[80vh]">
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
            <div className="space-x-2">
                <Button variant="danger" onClick={handleDeleteAll} disabled={items.length === 0}>
                Delete All
                </Button>
                <Button variant="danger" onClick={handleDeleteSelected} disabled={selected.length === 0}>
                Delete Selected
                </Button>
            </div>
            <div className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                {items.length} item{items.length === 1 ? '' : 's'} in Trash
            </div>
            </div>

            <div className="flex-1 overflow-auto border border-cloud-gray/20 dark:border-dark-border rounded-cloud-lg">
            {items.length === 0 ? (
                <div className="h-full flex items-center justify-center text-cloud-gray-dark dark:text-dark-text-muted">
                Trash is empty.
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
                <ul className="divide-y divide-cloud-gray/10 dark:divide-dark-border">
                    {items.map(item => (
                    <li
                        key={item.id}
                        className={`
                        grid grid-cols-[24px,1fr,120px] items-center px-4 py-2 cursor-pointer
                        ${selected.includes(item.id)
                            ? 'bg-red-50 dark:bg-red-500/10'
                            : 'hover:bg-cloud-gray/10 dark:hover:bg-dark-bg-lighter/60'}
                        `}
                        onClick={() => {
                        setSelected(sel =>
                            sel.includes(item.id) ? sel.filter(id => id !== item.id) : [...sel, item.id]
                        );
                        }}
                    >
                        <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={selected.includes(item.id)}
                        onChange={e => {
                            e.stopPropagation();
                            setSelected(sel =>
                            e.target.checked
                                ? [...sel, item.id]
                                : sel.filter(id => id !== item.id)
                            );
                        }}
                        />
                        <span className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                        {item.name}
                        </span>
                        <span className="text-xs text-cloud-gray-dark dark:text-dark-text-muted capitalize">
                        {item.type}
                        </span>
                    </li>
                    ))}
                </ul>
                </div>
            )}
            </div>

          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-white dark:bg-dark-bg-light rounded-cloud-xl p-8 shadow-lg flex flex-col items-center gap-4">
                <div className="text-lg font-semibold text-red-600">Are you sure you want to delete {showConfirm === 'all' ? 'all items' : 'selected items'}?</div>
                <div className="flex gap-4">
                  <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
                  <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Window>
    </div>
  );
}
