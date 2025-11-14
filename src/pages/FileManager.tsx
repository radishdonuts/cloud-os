import React, { useState, Fragment } from 'react';
import { Window } from '../components/layout/Window';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { FolderIcon, FileTextIcon, ImageIcon, VideoIcon, MusicIcon, HomeIcon, DownloadIcon, CloudIcon, UsbIcon, ChevronRightIcon, Grid3x3Icon, ListIcon, SearchIcon, ChevronLeftIcon, TrashIcon, Edit2Icon, FolderPlusIcon, FilePlusIcon, CheckSquare, Square, Trash2Icon } from 'lucide-react';
export interface FileManagerProps {
  onClose: () => void;
  initialCategory?: Category;
  initialPath?: string[];
  onOpenPhoto?: (folder: string) => void;
  onOpenNote?: (content: string, title: string) => void;
  onOpenPDF?: (fileName: string) => void;
  onOpenDocument?: (fileName: string) => void;
}
type Category = 'home' | 'desktop' | 'documents' | 'pictures' | 'downloads' | 'cloud' | 'usb' | 'trash';
interface FileItem {
  name: string;
  type: 'folder' | 'pdf' | 'image' | 'video' | 'music' | 'text' | 'keynote' | 'doc';
  size?: string;
  items?: number;
  modified: string;
  synced: boolean;
  linkedCategory?: Category;
}
interface ContextMenu {
  x: number;
  y: number;
  file?: FileItem;
}
export function FileManager({
  onClose,
  initialCategory = 'home',
  initialPath = [],
  onOpenPhoto,
  onOpenNote,
  onOpenPDF,
  onOpenDocument
}: FileManagerProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [currentPath, setCurrentPath] = useState<string[]>(initialPath);
  const [history, setHistory] = useState<{
    category: Category;
    path: string[];
  }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [files, setFiles] = useState<Record<Category, Record<string, FileItem[]>>>({
    home: {
      '': [{
        name: 'Desktop',
        type: 'folder',
        items: 8,
        modified: 'Today',
        synced: true,
        linkedCategory: 'desktop'
      }, {
        name: 'Documents',
        type: 'folder',
        items: 156,
        modified: 'Yesterday',
        synced: true,
        linkedCategory: 'documents'
      }, {
        name: 'Pictures',
        type: 'folder',
        items: 2847,
        modified: 'Last week',
        synced: true,
        linkedCategory: 'pictures'
      }, {
        name: 'Downloads',
        type: 'folder',
        items: 42,
        modified: '2 days ago',
        synced: true,
        linkedCategory: 'downloads'
      }, {
        name: 'Music',
        type: 'folder',
        items: 89,
        modified: 'Last month',
        synced: true
      }, {
        name: 'Videos',
        type: 'folder',
        items: 24,
        modified: 'Last week',
        synced: true
      }]
    },
    desktop: {
      '': [{
        name: 'Projects',
        type: 'folder',
        items: 12,
        modified: 'Today',
        synced: true
      }, {
        name: 'Notes.txt',
        type: 'text',
        size: '4 KB',
        modified: '1 hour ago',
        synced: true
      }, {
        name: 'Screenshot.png',
        type: 'image',
        size: '2.1 MB',
        modified: 'Yesterday',
        synced: false
      }]
    },
    documents: {
      '': [{
        name: 'Work',
        type: 'folder',
        items: 48,
        modified: 'Today',
        synced: true
      }, {
        name: 'Personal',
        type: 'folder',
        items: 32,
        modified: 'Yesterday',
        synced: true
      }, {
        name: 'Report_2024.pdf',
        type: 'pdf',
        size: '2.4 MB',
        modified: '2 days ago',
        synced: true
      }, {
        name: 'Budget.xlsx',
        type: 'doc',
        size: '856 KB',
        modified: 'Last week',
        synced: true
      }, {
        name: 'Presentation.key',
        type: 'keynote',
        size: '8.1 MB',
        modified: 'Last week',
        synced: false
      }, {
        name: 'Meeting_Notes.doc',
        type: 'doc',
        size: '124 KB',
        modified: '3 days ago',
        synced: true
      }],
      Work: [{
        name: 'Client_Proposals',
        type: 'folder',
        items: 8,
        modified: 'Today',
        synced: true
      }, {
        name: 'Meeting_Notes',
        type: 'folder',
        items: 15,
        modified: 'Yesterday',
        synced: true
      }, {
        name: 'Q4_Report.pdf',
        type: 'pdf',
        size: '3.2 MB',
        modified: '3 days ago',
        synced: true
      }, {
        name: 'Project_Timeline.xlsx',
        type: 'doc',
        size: '124 KB',
        modified: 'Last week',
        synced: true
      }],
      Personal: [{
        name: 'Recipes',
        type: 'folder',
        items: 24,
        modified: 'Last month',
        synced: true
      }, {
        name: 'Travel_Plans.pdf',
        type: 'pdf',
        size: '1.8 MB',
        modified: 'Last week',
        synced: true
      }, {
        name: 'Shopping_List.txt',
        type: 'text',
        size: '2 KB',
        modified: 'Yesterday',
        synced: true
      }]
    },
    pictures: {
      '': [{
        name: 'Vacation 2024',
        type: 'folder',
        items: 156,
        modified: 'Last week',
        synced: true
      }, {
        name: 'Family Photos',
        type: 'folder',
        items: 428,
        modified: 'Last month',
        synced: true
      }, {
        name: 'Screenshots',
        type: 'folder',
        items: 89,
        modified: 'Yesterday',
        synced: false
      }, {
        name: 'Wallpapers',
        type: 'folder',
        items: 42,
        modified: '2 weeks ago',
        synced: true
      }],
      'Vacation 2024': [{
        name: 'Beach_Sunset.jpg',
        type: 'image',
        size: '4.2 MB',
        modified: 'Last week',
        synced: true
      }, {
        name: 'Mountain_View.jpg',
        type: 'image',
        size: '5.8 MB',
        modified: 'Last week',
        synced: true
      }, {
        name: 'City_Night.jpg',
        type: 'image',
        size: '3.9 MB',
        modified: 'Last week',
        synced: true
      }, {
        name: 'Food_Tour',
        type: 'folder',
        items: 48,
        modified: 'Last week',
        synced: true
      }]
    },
    downloads: {
      '': [{
        name: 'CloudOS_Installer.dmg',
        type: 'text',
        size: '2.4 GB',
        modified: 'Today',
        synced: false
      }, {
        name: 'Invoice_March.pdf',
        type: 'pdf',
        size: '186 KB',
        modified: 'Yesterday',
        synced: false
      }, {
        name: 'Song.mp3',
        type: 'music',
        size: '8.2 MB',
        modified: '2 days ago',
        synced: false
      }, {
        name: 'Tutorial_Video.mp4',
        type: 'video',
        size: '124 MB',
        modified: 'Last week',
        synced: false
      }]
    },
    cloud: {
      '': [{
        name: 'Shared with me',
        type: 'folder',
        items: 18,
        modified: 'Today',
        synced: true
      }, {
        name: 'Team Projects',
        type: 'folder',
        items: 64,
        modified: 'Yesterday',
        synced: true
      }, {
        name: 'Backup',
        type: 'folder',
        items: 128,
        modified: 'Last week',
        synced: true
      }, {
        name: 'Sync_Status.txt',
        type: 'text',
        size: '1 KB',
        modified: 'Today',
        synced: true
      }]
    },
    usb: {
      '': [{
        name: 'Backup_2024',
        type: 'folder',
        items: 256,
        modified: 'Last month',
        synced: false
      }, {
        name: 'Photos_Transfer',
        type: 'folder',
        items: 89,
        modified: 'Last week',
        synced: false
      }, {
        name: 'README.txt',
        type: 'text',
        size: '2 KB',
        modified: 'Last month',
        synced: false
      }]
    },
    trash: {
      '': []
    }
  });
  const categories = [{
    id: 'home' as Category,
    label: 'Home',
    icon: HomeIcon
  }, {
    id: 'desktop' as Category,
    label: 'Desktop',
    icon: FolderIcon
  }, {
    id: 'documents' as Category,
    label: 'Documents',
    icon: FileTextIcon
  }, {
    id: 'pictures' as Category,
    label: 'Pictures',
    icon: ImageIcon
  }, {
    id: 'downloads' as Category,
    label: 'Downloads',
    icon: DownloadIcon
  }, {
    id: 'cloud' as Category,
    label: 'Cloud Drive',
    icon: CloudIcon
  }, {
    id: 'usb' as Category,
    label: 'USB Drive',
    icon: UsbIcon
  }, {
    id: 'trash' as Category,
    label: 'Trash',
    icon: TrashIcon
  }];
  const getCurrentFiles = (): FileItem[] => {
    const pathKey = currentPath.join('/');
    return files[selectedCategory]?.[pathKey] || [];
  };
  const filteredFiles = getCurrentFiles().filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleCategoryChange = (category: Category) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      category: selectedCategory,
      path: [...currentPath]
    });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSelectedCategory(category);
    setCurrentPath([]);
    setSearchQuery('');
    setSelectedFiles(new Set());
  };
  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      if (file.linkedCategory) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({
          category: selectedCategory,
          path: [...currentPath]
        });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setSelectedCategory(file.linkedCategory);
        setCurrentPath([]);
        setSelectedFiles(new Set());
      } else {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({
          category: selectedCategory,
          path: [...currentPath]
        });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath([...currentPath, file.name]);
        setSelectedFiles(new Set());
      }
    } else if (file.type === 'text' && onOpenNote) {
      onOpenNote('Sample content for ' + file.name, file.name);
    } else if (file.type === 'image' && onOpenPhoto) {
      const folder = currentPath.length > 0 ? currentPath[currentPath.length - 1] : 'All Photos';
      onOpenPhoto(folder);
    } else if (file.type === 'pdf' && onOpenPDF) {
      onOpenPDF(file.name);
    } else if (file.type === 'doc' && onOpenDocument) {
      onOpenDocument(file.name);
    }
  };
  const handleContextMenu = (e: React.MouseEvent, file?: FileItem) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      file
    });
  };
  const handleCreateFolder = () => {
    const pathKey = currentPath.join('/');
    const newFolder: FileItem = {
      name: 'New Folder',
      type: 'folder',
      items: 0,
      modified: 'Just now',
      synced: false
    };
    setFiles({
      ...files,
      [selectedCategory]: {
        ...files[selectedCategory],
        [pathKey]: [...(files[selectedCategory][pathKey] || []), newFolder]
      }
    });
    setContextMenu(null);
  };
  const handleCreateFile = () => {
    const pathKey = currentPath.join('/');
    const newFile: FileItem = {
      name: 'Untitled.txt',
      type: 'text',
      size: '0 KB',
      modified: 'Just now',
      synced: false
    };
    setFiles({
      ...files,
      [selectedCategory]: {
        ...files[selectedCategory],
        [pathKey]: [...(files[selectedCategory][pathKey] || []), newFile]
      }
    });
    setContextMenu(null);
  };
  const handleDelete = (file: FileItem) => {
    const pathKey = currentPath.join('/');
    const currentFiles = files[selectedCategory][pathKey] || [];
    setFiles({
      ...files,
      [selectedCategory]: {
        ...files[selectedCategory],
        [pathKey]: currentFiles.filter(f => f.name !== file.name)
      },
      trash: {
        '': [...(files.trash[''] || []), {
          ...file,
          modified: 'Just now'
        }]
      }
    });
    setContextMenu(null);
  };
  const handleDeleteSelected = () => {
    if (selectedFiles.size === 0) return;
    const pathKey = currentPath.join('/');
    const currentFiles = files[selectedCategory][pathKey] || [];
    const filesToDelete = currentFiles.filter(f => selectedFiles.has(f.name));
    const remainingFiles = currentFiles.filter(f => !selectedFiles.has(f.name));
    setFiles({
      ...files,
      [selectedCategory]: {
        ...files[selectedCategory],
        [pathKey]: remainingFiles
      },
      trash: {
        '': [...(files.trash[''] || []), ...filesToDelete.map(f => ({
          ...f,
          modified: 'Just now'
        }))]
      }
    });
    setSelectedFiles(new Set());
  };
  const handleToggleSelection = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(fileName)) {
      newSelection.delete(fileName);
    } else {
      newSelection.add(fileName);
    }
    setSelectedFiles(newSelection);
  };
  const handleSelectAll = () => {
    const currentFiles = getCurrentFiles();
    if (selectedFiles.size === currentFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(currentFiles.map(f => f.name)));
    }
  };
  const handleRename = (file: FileItem) => {
    setRenamingFile(file.name);
    setNewName(file.name);
    setContextMenu(null);
  };
  const handleRenameSubmit = (oldName: string) => {
    if (!newName || newName === oldName) {
      setRenamingFile(null);
      return;
    }
    const pathKey = currentPath.join('/');
    const currentFiles = files[selectedCategory][pathKey] || [];
    setFiles({
      ...files,
      [selectedCategory]: {
        ...files[selectedCategory],
        [pathKey]: currentFiles.map(f => f.name === oldName ? {
          ...f,
          name: newName,
          modified: 'Just now'
        } : f)
      }
    });
    setRenamingFile(null);
  };
  const handleBack = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setSelectedCategory(prevState.category);
      setCurrentPath(prevState.path);
      setHistoryIndex(historyIndex - 1);
    }
  };
  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setSelectedCategory(nextState.category);
      setCurrentPath(nextState.path);
      setHistoryIndex(historyIndex + 1);
    }
  };
  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({
        category: selectedCategory,
        path: [...currentPath]
      });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentPath([]);
    } else {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({
        category: selectedCategory,
        path: [...currentPath]
      });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentPath(currentPath.slice(0, index + 1));
    }
  };
  const CategoryIcon = categories.find(c => c.id === selectedCategory)?.icon || HomeIcon;
  const trashCount = files.trash['']?.length || 0;
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in" onClick={() => setContextMenu(null)}>
      <Window title="Files" onClose={onClose} width="w-full max-w-6xl" height="h-[80vh]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-cloud-gray/20 dark:border-dark-border p-4 space-y-2">
            {categories.map(cat => {
            const Icon = cat.icon;
            const isTrash = cat.id === 'trash';
            return <button key={cat.id} onClick={() => handleCategoryChange(cat.id)} className={`
                    w-full flex items-center justify-between gap-3 px-4 py-3 rounded-cloud-lg transition-all duration-200
                    ${selectedCategory === cat.id ? 'bg-cloud-green/20 text-cloud-green font-semibold' : 'text-cloud-gray-deeper dark:text-dark-text hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter'}
                  `}>
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="font-medium">{cat.label}</span>
                  </div>
                  {isTrash && trashCount > 0 && <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-medium rounded-full">
                      {trashCount}
                    </span>}
                </button>;
          })}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-cloud-gray/20 dark:border-dark-border">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleBack} disabled={historyIndex <= 0} className="disabled:opacity-30">
                  <ChevronLeftIcon size={18} />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleForward} disabled={historyIndex >= history.length - 1} className="disabled:opacity-30">
                  <ChevronRightIcon size={18} />
                </Button>
              </div>

              {filteredFiles.length > 0 && (
                <button 
                  onClick={handleSelectAll}
                  className="p-2 hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded-cloud transition-colors"
                  title={selectedFiles.size === filteredFiles.length ? "Deselect all" : "Select all"}
                >
                  {selectedFiles.size === filteredFiles.length && filteredFiles.length > 0 ? (
                    <CheckSquare size={18} className="text-cloud-green" />
                  ) : (
                    <Square size={18} className="text-cloud-gray-deeper dark:text-dark-text" />
                  )}
                </button>
              )}

              {selectedFiles.size > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDeleteSelected}
                  className="text-red-500 hover:bg-red-500/10"
                >
                  <Trash2Icon size={18} />
                  <span className="ml-2">Delete ({selectedFiles.size})</span>
                </Button>
              )}

              <div className="flex items-center gap-2 text-sm text-cloud-gray-deeper dark:text-dark-text flex-1">
                <CategoryIcon size={16} />
                <button onClick={() => handleBreadcrumbClick(-1)} className="hover:text-cloud-green transition-colors font-medium">
                  {categories.find(c => c.id === selectedCategory)?.label}
                </button>
                {currentPath.map((folder, i) => <Fragment key={i}>
                    <ChevronRightIcon size={16} />
                    <button onClick={() => handleBreadcrumbClick(i)} className={`hover:text-cloud-green transition-colors ${i === currentPath.length - 1 ? 'font-semibold text-cloud-gray-deeper dark:text-dark-text' : 'font-medium'}`}>
                      {folder}
                    </button>
                  </Fragment>)}
              </div>

              <div className="relative w-64">
                <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cloud-gray-deeper dark:text-dark-text-muted" />
                <Input placeholder="Search files..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>

              <div className="flex gap-1 bg-cloud-gray/20 dark:bg-dark-bg-lighter rounded-cloud p-1">
                <button onClick={() => setView('grid')} className={`p-2 rounded-cloud transition-colors ${view === 'grid' ? 'bg-white dark:bg-dark-bg shadow-cloud' : ''}`}>
                  <Grid3x3Icon size={18} className="text-cloud-gray-deeper dark:text-dark-text" />
                </button>
                <button onClick={() => setView('list')} className={`p-2 rounded-cloud transition-colors ${view === 'list' ? 'bg-white dark:bg-dark-bg shadow-cloud' : ''}`}>
                  <ListIcon size={18} className="text-cloud-gray-deeper dark:text-dark-text" />
                </button>
              </div>
            </div>

            {/* Files Grid/List */}
            <div className="flex-1 overflow-auto p-6" onContextMenu={e => handleContextMenu(e)}>
              {filteredFiles.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-center">
                  <FolderIcon size={64} className="text-cloud-gray-deeper/40 dark:text-dark-text-muted mb-4" />
                  <p className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-2">
                    {searchQuery ? 'No files found' : 'This folder is empty'}
                  </p>
                  <p className="text-sm text-cloud-gray-deeper/70 dark:text-dark-text-muted mb-4 font-medium">
                    {searchQuery ? 'Try a different search term' : 'Right-click to create files or folders'}
                  </p>
                </div> : view === 'grid' ? <div className="grid grid-cols-4 gap-4">
                  {filteredFiles.map((file, i) => <div key={i} onContextMenu={(e: React.MouseEvent) => handleContextMenu(e, file)}>
                      <Card hover className={`p-4 cursor-pointer relative ${selectedFiles.has(file.name) ? 'ring-2 ring-cloud-green' : ''}`} onClick={() => handleFileClick(file)}>
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            onClick={(e) => handleToggleSelection(file.name, e)}
                            className="p-1 hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded"
                          >
                            {selectedFiles.has(file.name) ? (
                              <CheckSquare size={20} className="text-cloud-green" />
                            ) : (
                              <Square size={20} className="text-cloud-gray-deeper/50 dark:text-dark-text-muted" />
                            )}
                          </button>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          {renamingFile === file.name ? <Input value={newName} onChange={e => setNewName(e.target.value)} onBlur={() => handleRenameSubmit(file.name)} onKeyDown={e => {
                      if (e.key === 'Enter') handleRenameSubmit(file.name);
                      if (e.key === 'Escape') setRenamingFile(null);
                    }} autoFocus className="mb-3 text-center" onClick={e => e.stopPropagation()} /> : <>
                              <div className="w-16 h-16 rounded-cloud-lg bg-cloud-green/20 flex items-center justify-center mb-3">
                                {file.type === 'folder' ? <FolderIcon size={32} className="text-cloud-green" /> : file.type === 'pdf' ? <FileTextIcon size={32} className="text-red-500" /> : file.type === 'doc' ? <FileTextIcon size={32} className="text-blue-500" /> : file.type === 'image' ? <ImageIcon size={32} className="text-cloud-pink" /> : file.type === 'video' ? <VideoIcon size={32} className="text-cloud-purple" /> : file.type === 'music' ? <MusicIcon size={32} className="text-cloud-blue" /> : <FileTextIcon size={32} className="text-cloud-blue" />}
                              </div>
                              <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text text-sm mb-1 line-clamp-2">
                                {file.name}
                              </p>
                            </>}
                          <div className="flex items-center gap-2 text-xs text-cloud-gray-deeper/80 dark:text-dark-text-muted font-medium">
                            <span>
                              {file.type === 'folder' ? `${file.items} items` : file.size}
                            </span>
                            {file.synced && <CloudIcon size={12} className="text-cloud-green" />}
                          </div>
                        </div>
                      </Card>
                    </div>)}
                </div> : <div className="space-y-2">
                  {filteredFiles.map((file, i) => <div key={i} onClick={() => handleFileClick(file)} onContextMenu={(e: React.MouseEvent) => handleContextMenu(e, file)} className={`flex items-center gap-4 px-4 py-3 bg-white/50 dark:bg-dark-bg-lighter/50 hover:bg-white dark:hover:bg-dark-bg-lighter rounded-cloud-lg transition-colors cursor-pointer ${selectedFiles.has(file.name) ? 'ring-2 ring-cloud-green' : ''}`}>
                      <button
                        onClick={(e) => handleToggleSelection(file.name, e)}
                        className="p-1 hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter rounded"
                      >
                        {selectedFiles.has(file.name) ? (
                          <CheckSquare size={20} className="text-cloud-green" />
                        ) : (
                          <Square size={20} className="text-cloud-gray-deeper/50 dark:text-dark-text-muted" />
                        )}
                      </button>
                      <div className="w-10 h-10 rounded-cloud bg-cloud-green/20 flex items-center justify-center">
                        {file.type === 'folder' ? <FolderIcon size={20} className="text-cloud-green" /> : file.type === 'image' ? <ImageIcon size={20} className="text-cloud-pink" /> : file.type === 'pdf' ? <FileTextIcon size={20} className="text-red-500" /> : <FileTextIcon size={20} className="text-cloud-blue" />}
                      </div>
                      <div className="flex-1">
                        {renamingFile === file.name ? <Input value={newName} onChange={e => setNewName(e.target.value)} onBlur={() => handleRenameSubmit(file.name)} onKeyDown={e => {
                    if (e.key === 'Enter') handleRenameSubmit(file.name);
                    if (e.key === 'Escape') setRenamingFile(null);
                  }} autoFocus onClick={e => e.stopPropagation()} /> : <>
                            <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                              {file.name}
                            </p>
                            <p className="text-sm text-cloud-gray-deeper/70 dark:text-dark-text-muted font-medium">
                              {file.type === 'folder' ? `${file.items} items` : file.size}{' '}
                              • {file.modified}
                            </p>
                          </>}
                      </div>
                      {file.synced && <div className="px-3 py-1 bg-cloud-green/20 text-cloud-green text-xs font-medium rounded-full flex items-center gap-1">
                          <CloudIcon size={12} />
                          Synced
                        </div>}
                    </div>)}
                </div>}
            </div>
          </div>
        </div>
      </Window>

      {/* Context Menu */}
      {contextMenu && <div className="fixed bg-white/90 dark:bg-dark-bg-light/90 backdrop-blur-cloud rounded-cloud-lg shadow-cloud-lg border border-cloud-gray/20 dark:border-dark-border py-2 min-w-[200px] z-50" style={{
      left: contextMenu.x,
      top: contextMenu.y
    }} onClick={e => e.stopPropagation()}>
          {contextMenu.file ? <>
              <button onClick={() => handleFileClick(contextMenu.file!)} className="w-full px-4 py-2 text-left hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-colors text-cloud-gray-deeper dark:text-dark-text">
                Open
              </button>
              <button onClick={() => handleRename(contextMenu.file!)} className="w-full px-4 py-2 text-left hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-colors text-cloud-gray-deeper dark:text-dark-text flex items-center gap-2">
                <Edit2Icon size={16} />
                Rename
              </button>
              <button onClick={() => handleDelete(contextMenu.file!)} className="w-full px-4 py-2 text-left hover:bg-red-500/20 transition-colors text-red-500 flex items-center gap-2">
                <TrashIcon size={16} />
                Move to Trash
              </button>
            </> : <>
              <button onClick={handleCreateFolder} className="w-full px-4 py-2 text-left hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-colors text-cloud-gray-deeper dark:text-dark-text flex items-center gap-2">
                <FolderPlusIcon size={16} />
                New Folder
              </button>
              <button onClick={handleCreateFile} className="w-full px-4 py-2 text-left hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-colors text-cloud-gray-deeper dark:text-dark-text flex items-center gap-2">
                <FilePlusIcon size={16} />
                New Text File
              </button>
            </>}
        </div>}
    </div>;
}