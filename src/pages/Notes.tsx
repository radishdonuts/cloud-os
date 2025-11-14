import React, { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { PlusIcon, TrashIcon, FileTextIcon } from 'lucide-react';
export interface NotesProps {
  onClose: () => void;
  initialContent?: string;
  initialTitle?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
}
interface Note {
  id: string;
  title: string;
  content: string;
  modified: string;
}
export function Notes({
  onClose,
  initialContent = '',
  initialTitle = 'Untitled',
  onMinimize,
  onMaximize,
  maximized = false
}: NotesProps) {
  const [notes, setNotes] = useState<Note[]>([{
    id: '1',
    title: 'Meeting Notes',
    content: 'Discuss Q4 goals and project timeline...',
    modified: 'Today'
  }, {
    id: '2',
    title: 'Shopping List',
    content: 'Milk, Eggs, Bread, Coffee...',
    modified: 'Yesterday'
  }, {
    id: '3',
    title: 'Ideas',
    content: 'New app features to implement...',
    modified: 'Last week'
  }]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(initialContent ? {
    id: 'temp',
    title: initialTitle,
    content: initialContent,
    modified: 'Just now'
  } : notes[0]);
  const [editingTitle, setEditingTitle] = useState(false);
  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled',
      content: '',
      modified: 'Just now'
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };
  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(notes[0] || null);
    }
  };
  const handleContentChange = (content: string) => {
    if (!selectedNote) return;
    const updatedNote = {
      ...selectedNote,
      content,
      modified: 'Just now'
    };
    setSelectedNote(updatedNote);
    setNotes(notes.map(n => n.id === selectedNote.id ? updatedNote : n));
  };
  const handleTitleChange = (title: string) => {
    if (!selectedNote) return;
    const updatedNote = {
      ...selectedNote,
      title
    };
    setSelectedNote(updatedNote);
    setNotes(notes.map(n => n.id === selectedNote.id ? updatedNote : n));
  };
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Notes" onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} maximized={maximized} width="w-full max-w-6xl" height="h-[85vh]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-cloud-gray/20 dark:border-dark-border p-4 flex flex-col">
            <Button variant="primary" className="w-full mb-4" onClick={handleCreateNote}>
              <PlusIcon size={18} className="mr-2" />
              New Note
            </Button>

            <div className="flex-1 overflow-auto space-y-2">
              {notes.map(note => <button key={note.id} onClick={() => setSelectedNote(note)} className={`
                    w-full text-left p-3 rounded-cloud-lg transition-all duration-200
                    ${selectedNote?.id === note.id ? 'bg-cloud-green/20 border-2 border-cloud-green' : 'bg-cloud-gray/10 dark:bg-dark-bg-lighter/50 hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter'}
                  `}>
                  <p className="font-medium text-cloud-gray-deeper dark:text-dark-text truncate">
                    {note.title}
                  </p>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted truncate mt-1">
                    {note.content || 'Empty note'}
                  </p>
                  <p className="text-xs text-cloud-gray-dark dark:text-dark-text-muted mt-1">
                    {note.modified}
                  </p>
                </button>)}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 flex flex-col">
            {selectedNote ? <>
                {/* Title Bar */}
                <div className="px-6 py-4 border-b border-cloud-gray/20 dark:border-dark-border flex items-center justify-between">
                  {editingTitle ? <Input value={selectedNote.title} onChange={e => handleTitleChange(e.target.value)} onBlur={() => setEditingTitle(false)} autoFocus className="text-xl font-bold" /> : <h2 className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text cursor-pointer" onClick={() => setEditingTitle(true)}>
                      {selectedNote.title}
                    </h2>}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                      {selectedNote.modified}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteNote(selectedNote.id)}>
                      <TrashIcon size={18} />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <textarea value={selectedNote.content} onChange={e => handleContentChange(e.target.value)} placeholder="Start typing..." className="w-full h-full bg-transparent border-none outline-none resize-none text-cloud-gray-deeper dark:text-dark-text text-lg leading-relaxed" />
                </div>
              </> : <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <FileTextIcon size={64} className="text-cloud-gray-dark mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium text-cloud-gray-deeper dark:text-dark-text mb-2">
                    No note selected
                  </p>
                  <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                    Create a new note or select one from the sidebar
                  </p>
                </div>
              </div>}
          </div>
        </div>
      </Window>
    </div>;
}