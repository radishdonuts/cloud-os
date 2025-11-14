import React, { useState, memo } from 'react';
import { BIOSScreen } from './pages/BIOSScreen';
import { BootScreen } from './pages/BootScreen';
import { LoginScreen } from './pages/LoginScreen';
import { AccountCreation } from './pages/AccountCreation';
import { Desktop } from './pages/Desktop';
import { QuickSettings } from './pages/QuickSettings';
import { Notifications } from './pages/Notifications';
import { Launcher } from './pages/Launcher';
import { FileManager } from './pages/FileManager';
import { Photos } from './pages/Photos';
import { Notes } from './pages/Notes';
import { PDFViewer } from './pages/PDFViewer';
import { DocumentViewer } from './pages/DocumentViewer';
import { DeviceManager } from './pages/DeviceManager';
import { ProcessManager } from './pages/ProcessManager';
import { MemoryManager } from './pages/MemoryManager';
import { StorageManager } from './pages/StorageManager';
import { Settings } from './pages/Settings';
import { AppStore } from './pages/AppStore';
import { GameMode } from './pages/GameMode';
type Screen = 'bios' | 'boot' | 'login' | 'account-creation' | 'desktop';
type App = 'files' | 'photos' | 'notes' | 'pdf-viewer' | 'document-viewer' | 'device-manager' | 'process-manager' | 'memory-manager' | 'storage-manager' | 'settings' | 'app-store' | 'game-mode' | null;
export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('bios');
  const [openApp, setOpenApp] = useState<App>(null);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);
  const [fileManagerCategory, setFileManagerCategory] = useState<'home' | 'desktop' | 'documents' | 'pictures' | 'downloads' | 'cloud' | 'usb' | 'trash'>('home');
  const [photoFolder, setPhotoFolder] = useState('All Photos');
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('Untitled');
  const [pdfFileName, setPdfFileName] = useState('');
  const [documentFileName, setDocumentFileName] = useState('');
  const [trashCount, setTrashCount] = useState(0);
  const handleAppOpen = (appId: string) => {
    if (appId === 'launcher') {
      setShowLauncher(true);
      return;
    }
    if (appId === 'app-grid') {
      setShowLauncher(true);
      return;
    }
    // Handle special file manager routes
    if (appId === 'files-documents') {
      setFileManagerCategory('documents');
      setOpenApp('files');
      return;
    }
    if (appId === 'files-desktop') {
      setFileManagerCategory('desktop');
      setOpenApp('files');
      return;
    }
    if (appId === 'trash') {
      setFileManagerCategory('trash');
      setOpenApp('files');
      return;
    }
    if (appId === 'files') setOpenApp('files');else if (appId === 'photos') setOpenApp('photos');else if (appId === 'notes') setOpenApp('notes');else if (appId === 'device-manager') setOpenApp('device-manager');else if (appId === 'process-manager') setOpenApp('process-manager');else if (appId === 'memory-manager') setOpenApp('memory-manager');else if (appId === 'storage-manager') setOpenApp('storage-manager');else if (appId === 'settings') setOpenApp('settings');else if (appId === 'app-store') setOpenApp('app-store');else if (appId === 'game-mode') setOpenApp('game-mode');
  };
  const handleOpenPhoto = (folder: string) => {
    setPhotoFolder(folder);
    setOpenApp('photos');
  };
  const handleOpenNote = (content: string, title: string) => {
    setNoteContent(content);
    setNoteTitle(title);
    setOpenApp('notes');
  };
  const handleOpenPDF = (fileName: string) => {
    setPdfFileName(fileName);
    setOpenApp('pdf-viewer');
  };
  const handleOpenDocument = (fileName: string) => {
    setDocumentFileName(fileName);
    setOpenApp('document-viewer');
  };
  const handleLogout = () => {
    setCurrentScreen('login');
    setOpenApp(null);
    setShowLauncher(false);
  };
  const handleSleep = () => {
    alert('System going to sleep...');
  };
  const handleShutdown = () => {
    setCurrentScreen('bios');
    setOpenApp(null);
    setShowLauncher(false);
  };
  return <div className="w-full min-h-screen">
      {currentScreen === 'bios' && <BIOSScreen onContinue={() => setCurrentScreen('boot')} />}

      {currentScreen === 'boot' && <BootScreen onComplete={() => setCurrentScreen('login')} />}

      {currentScreen === 'login' && <LoginScreen onLogin={() => setCurrentScreen('desktop')} onCreateAccount={() => setCurrentScreen('account-creation')} />}

      {currentScreen === 'account-creation' && <AccountCreation onComplete={() => setCurrentScreen('login')} />}

      {currentScreen === 'desktop' && <>
          <Desktop onAppOpen={handleAppOpen} onQuickSettingsOpen={() => setShowQuickSettings(true)} onNotificationsOpen={() => setShowNotifications(true)} trashCount={trashCount} />

          {showQuickSettings && <QuickSettings onClose={() => setShowQuickSettings(false)} onOpenSettings={() => {
        setShowQuickSettings(false);
        setOpenApp('settings');
      }} />}

          {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}

          {showLauncher && <Launcher onClose={() => setShowLauncher(false)} onAppOpen={handleAppOpen} onLogout={handleLogout} onSleep={handleSleep} onShutdown={handleShutdown} />}

          {openApp === 'files' && <FileManager onClose={() => {
        setOpenApp(null);
        setFileManagerCategory('home');
      }} initialCategory={fileManagerCategory} onOpenPhoto={handleOpenPhoto} onOpenNote={handleOpenNote} onOpenPDF={handleOpenPDF} onOpenDocument={handleOpenDocument} />}

          {openApp === 'photos' && <Photos onClose={() => setOpenApp(null)} initialFolder={photoFolder} />}

          {openApp === 'notes' && <Notes onClose={() => setOpenApp(null)} initialContent={noteContent} initialTitle={noteTitle} />}

          {openApp === 'pdf-viewer' && <PDFViewer onClose={() => setOpenApp(null)} fileName={pdfFileName} />}

          {openApp === 'document-viewer' && <DocumentViewer onClose={() => setOpenApp(null)} fileName={documentFileName} />}

          {openApp === 'device-manager' && <DeviceManager onClose={() => setOpenApp(null)} />}

          {openApp === 'process-manager' && <ProcessManager onClose={() => setOpenApp(null)} />}

          {openApp === 'memory-manager' && <MemoryManager onClose={() => setOpenApp(null)} />}

          {openApp === 'storage-manager' && <StorageManager onClose={() => setOpenApp(null)} />}

          {openApp === 'settings' && <Settings onClose={() => setOpenApp(null)} onOpenStorageManager={() => setOpenApp('storage-manager')} />}

          {openApp === 'app-store' && <AppStore onClose={() => setOpenApp(null)} />}

          {openApp === 'game-mode' && <GameMode onClose={() => setOpenApp(null)} />}
        </>}
    </div>;
}