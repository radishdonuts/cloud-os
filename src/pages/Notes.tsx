import React, { useEffect, useState } from 'react';
import { Window } from '../components/layout/Window';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Note, User, defaultUser } from '../Interfaces';
import { PlusIcon, TrashIcon, FileTextIcon, BoldIcon, ItalicIcon, UnderlineIcon, ListIcon, SaveIcon } from 'lucide-react';
import { firebase } from '../firebase';
export interface NotesProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  initialContent?: string;
  initialTitle?: string;
  zIndex?: number;
}

export function Notes({
  onClose,
  onMaximize,
  maximized = false,
  initialContent = '',
  initialTitle = 'Untitled',
  zIndex = 40
}: NotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(initialContent ? {
    id: 'temp',
    title: initialTitle,
    content: initialContent,
    modified: 'Just now',
    fontSize: 16,
    fontFamily: 'sans'
  } : notes[0]);
  const [currentUser, setCurrentUser] = useState<User>(defaultUser)
  useEffect(() => {
    firebase.getUser(localStorage.getItem("currentUser") ?? "").then(user => {
      if (user) {
        setCurrentUser(user);
        setNotes(user.notes);
        setSelectedNote(notes[0]|| null);
      }else {
        alert("no user!");
      }
    })
  }, []);
  const [editingTitle, setEditingTitle] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled',
      content: '',
      modified: 'Just now',
      fontSize: 16,
      fontFamily: 'sans'
    };
    setNotes([newNote, ...notes]);
    currentUser.notes = [newNote, ...notes];
    firebase.updateUser(currentUser);
    setSelectedNote(newNote);
    setIsSaved(true);
  };
  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
    currentUser.notes = notes.filter(n => n.id !== noteId);
    firebase.updateUser(currentUser)
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
    setIsSaved(false);
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
  const handleFontSizeChange = (size: number) => {
    if (!selectedNote) return;
    const updatedNote = {
      ...selectedNote,
      fontSize: size
    };
    setSelectedNote(updatedNote);
    setNotes(notes.map(n => n.id === selectedNote.id ? updatedNote : n));
  };
  const handleFontFamilyChange = (family: string) => {
    if (!selectedNote) return;
    const updatedNote = {
      ...selectedNote,
      fontFamily: family
    };
    setSelectedNote(updatedNote);
    setNotes(notes.map(n => n.id === selectedNote.id ? updatedNote : n));
  };
  const handleSave = () => {
    if (selectedNote) {
      const updatedNote = {
        ...selectedNote,
        modified: 'Just now'
      };
      setSelectedNote(updatedNote);
      setNotes(notes.map(n => n.id === selectedNote.id ? updatedNote : n));
      currentUser.notes = notes.map(n => n.id === selectedNote.id ? updatedNote : n);
      firebase.updateUser(currentUser);
      setIsSaved(true);
      // Simulate saving only (no download)
    }
  };

  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Notes" onClose={onClose} onMaximize={onMaximize} maximized={maximized} zIndex={zIndex} width="w-full max-w-6xl" height="h-[85vh]">
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
                      {selectedNote.modified} {!isSaved && '*'}
                    </span>
                    <Button variant="primary" size="sm" onClick={handleSave} className="flex items-center gap-2">
                      <SaveIcon size={16} />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteNote(selectedNote.id)}>
                      <TrashIcon size={18} />
                    </Button>
                  </div>
                </div>

                {/* Formatting Toolbar */}
                <div className="px-6 py-3 border-b border-cloud-gray/20 dark:border-dark-border flex items-center gap-4 flex-wrap bg-cloud-gray/5 dark:bg-dark-bg-lighter/30">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
                      Font:
                    </label>
                    <select
                      value={selectedNote.fontFamily}
                      onChange={e => handleFontFamilyChange(e.target.value)}
                      className="px-3 py-1 rounded-cloud bg-white/50 dark:bg-dark-bg-light/50 border border-cloud-gray/20 dark:border-dark-border text-sm text-cloud-gray-deeper dark:text-dark-text"
                    >
                      <option value="sans">Sans Serif</option>
                      <option value="serif">Serif</option>
                      <option value="mono">Monospace</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
                      Size:
                    </label>
                    <input
                      type="number"
                      min="8"
                      max="72"
                      value={selectedNote.fontSize}
                      onChange={e => handleFontSizeChange(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 rounded-cloud bg-white/50 dark:bg-dark-bg-light/50 border border-cloud-gray/20 dark:border-dark-border text-sm text-cloud-gray-deeper dark:text-dark-text"
                    />
                    <span className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">px</span>
                  </div>

                  <div className="flex-1" />

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                      Words: {selectedNote.content.split(/\s+/).filter(w => w).length}
                    </span>
                    <span className="text-xs text-cloud-gray-dark dark:text-dark-text-muted">
                      Characters: {selectedNote.content.length}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-auto">
                  <textarea
                    value={selectedNote.content}
                    onChange={e => handleContentChange(e.target.value)}
                    placeholder="Start typing..."
                    className="w-full h-full bg-transparent border-none outline-none resize-none text-cloud-gray-deeper dark:text-dark-text leading-relaxed"
                    style={{
                      fontSize: `${selectedNote.fontSize}px`,
                      fontFamily: selectedNote.fontFamily === 'serif' ? 'Georgia, serif' : selectedNote.fontFamily === 'mono' ? 'Menlo, monospace' : 'system-ui, sans-serif'
                    }}
                  />
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