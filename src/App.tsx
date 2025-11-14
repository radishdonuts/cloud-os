import { useState } from 'react';
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
import { Terminal } from './pages/Terminal';
import { AppStore } from './pages/AppStore';
import { GameMode } from './pages/GameMode';
import { CloudDrive } from './pages/CloudDrive';

type Screen = 'bios' | 'boot' | 'login' | 'account-creation' | 'desktop';
type App = 'files' | 'photos' | 'notes' | 'pdf-viewer' | 'document-viewer' | 'device-manager' | 'process-manager' | 'memory-manager' | 'storage-manager' | 'settings' | 'app-store' | 'game-mode' | 'cloud-drive' | 'terminal' | null;

export interface User {
  id: string;
  name: string;
  avatar: string;
  profilePhoto?: string; // Optional profile photo path
  wallpaper: {
    gradient: string;
    accent?: string;
    image?: string; // Optional wallpaper image
  };
  desktopApps: Array<{
    name: string;
    type: 'folder' | 'file' | 'app';
    icon?: string;
    image?: string; // PNG image path
  }>;
  notes: Array<{ title: string; content: string }>;
  photos: string[];
}

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('bios');
  const [openApp, setOpenApp] = useState<App>(null);
  const [minimizedApp, setMinimizedApp] = useState<App | null>(null);
  const [maximizedApp, setMaximizedApp] = useState<App | null>(null);

  // User management
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: 'JD',
      profilePhoto: '/icons/tiger1.png', // Add your photo here
      wallpaper: {
        gradient: 'from-blue-500 via-blue-400 to-cyan-400',
        accent: 'blue',
        image: '/icons/DesktopWallpaper5.png'
      },
      desktopApps: [
        { name: 'Documents', type: 'folder', icon: 'folder', image: '/icons/Folder2.png' },
        { name: 'Projects', type: 'folder', icon: 'folder', image: '/icons/Folder2.png' },
        { name: 'Photos', type: 'app', icon: 'image', image: '/icons/Frame.png' },
        { name: 'Work Notes', type: 'file', icon: 'note', image: '/icons/Note.png' }
      ],
      notes: [
        { title: 'Work Notes', content: 'Meeting with team at 3 PM\nReview project proposals\nUpdate documentation' },
        { title: 'Todo List', content: '- Finish CloudOS project\n- Review pull requests\n- Update README' }
      ],
      photos: ['Vacation 2024', 'Work Events', 'Family']
    },
    {
      id: '2',
      name: 'Juan Paolo',
      avatar: 'JP',
      profilePhoto: '/icons/profile2.jpg', // Add your photo here
      wallpaper: {
        gradient: 'from-pink-500 via-purple-500 to-indigo-500',
        accent: 'purple',
        image: '/icons/DesktopWallpaper1.jpg'
      },
      desktopApps: [
        { name: 'Design Files', type: 'folder', icon: 'folder', image: '/icons/Folder2.png' },
        { name: 'Artwork', type: 'folder', icon: 'folder', image: '/icons/Folder2.png' },
        { name: 'Creative Notes', type: 'file', icon: 'note', image: '/icons/Note.png' }
      ],
      notes: [
        { title: 'Creative Ideas', content: 'New design concepts:\n- Minimalist UI\n- Pastel color scheme\n- Animated transitions' },
        { title: 'Client Projects', content: 'Website redesign for Client A\nLogo design for Client B\nBrand guidelines update' }
      ],
      photos: ['Art Gallery', 'Design Inspiration', 'Portfolio']
    },
    {
      id: '3',
      name: 'Crispy Pata',
      avatar: 'CP',
      profilePhoto: '/icons/profile3.jpg', // Add your photo here
      wallpaper: {
        gradient: 'from-green-600 via-emerald-500 to-teal-500',
        accent: 'green'
      },
      desktopApps: [
        { name: 'Code', type: 'folder', icon: 'folder', image: '/icons/Folder2.png' },
        { name: 'DevOps', type: 'folder', icon: 'folder', image: '/icons/Folder2.png' },
        { name: 'Gaming', type: 'app', icon: 'game' },
        { name: 'Tech Notes', type: 'file', icon: 'note', image: '/icons/Note.png' }
      ],
      notes: [
        { title: 'Crispy Pata', content: 'Docker commands:\ndocker ps\ndocker-compose up\nkubectl get pods' },
        { title: 'Learning', content: 'Study topics:\n- Kubernetes\n- Rust programming\n- System design patterns' }
      ],
      photos: ['Tech Events', 'Gaming Screenshots', 'Hackathons']
    }
  ]);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);
  const [fileManagerCategory, setFileManagerCategory] = useState<'home' | 'desktop' | 'documents' | 'pictures' | 'downloads' | 'cloud' | 'usb' | 'trash'>('home');
  const [photoFolder, setPhotoFolder] = useState('All Photos');
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('Untitled');
  const [pdfFileName, setPdfFileName] = useState('');
  const [documentFileName, setDocumentFileName] = useState('');
  const [trashCount] = useState(0);
  
  // Cloud Drive state
  const [cloudFileCount] = useState(4);
  const [cloudSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('synced');
  
  // Theme state
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState('#A8D5BA');
  const [selectedWallpaper, setSelectedWallpaper] = useState(0);

  const handleUserLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('desktop');
  };

  const handleSwitchUser = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setOpenApp(null);
    setShowLauncher(false);
  };
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

    if (appId === 'terminal') setOpenApp('terminal');
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
    setCurrentUser(null);
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

  const handleMinimize = (app: App) => {
    setMinimizedApp(app);
  };
  const handleMaximize = (app: App) => {
    setMaximizedApp(app === maximizedApp ? null : app);
  };

  const handleWallpaperChange = (id: number) => {
  setSelectedWallpaper(id);

  const accentMap: Record<number, string> = {
    0: '#A8D5BA',
    1: '#60A5FA',
    2: '#F97316',
    3: '#22C55E',
    4: '#A855F7',
  };

  setAccentColor(accentMap[id] ?? '#A8D5BA');
  };


  const showAppWindow = (app: App) => openApp === app && minimizedApp !== app;

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'dark' : ''}`}>
      {currentScreen === 'bios' && <BIOSScreen onContinue={() => setCurrentScreen('boot')} />}
      {currentScreen === 'boot' && <BootScreen onComplete={() => setCurrentScreen('login')} />}
      {currentScreen === 'login' && <LoginScreen users={users} onLogin={handleUserLogin} onCreateAccount={() => setCurrentScreen('account-creation')} />}
      {currentScreen === 'account-creation' && <AccountCreation onComplete={() => setCurrentScreen('login')} />}
      {currentScreen === 'desktop' && currentUser && <>
        <Desktop 
          currentUser={currentUser}
          onAppOpen={handleAppOpen} 
          onQuickSettingsOpen={() => setShowQuickSettings(true)} 
          onNotificationsOpen={() => setShowNotifications(true)} 
          trashCount={trashCount}
          cloudFileCount={cloudFileCount}
          cloudSyncStatus={cloudSyncStatus}
          maximizedApp={maximizedApp}
        />
        {showQuickSettings && (
          <QuickSettings
            onClose={() => setShowQuickSettings(false)}
            onOpenSettings={() => {
              setShowQuickSettings(false);
              setOpenApp('settings');
            }}
            darkMode={darkMode}
            onDarkModeChange={setDarkMode}
          />
        )}
        {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
        {showLauncher && <Launcher onClose={() => setShowLauncher(false)} onAppOpen={handleAppOpen} onLogout={handleLogout} onSwitchUser={handleSwitchUser} onSleep={handleSleep} onShutdown={handleShutdown} />}
        {showAppWindow('files') && <FileManager 
          onClose={() => { setOpenApp(null); setFileManagerCategory('home'); }} 
          initialCategory={fileManagerCategory} 
          onOpenPhoto={handleOpenPhoto} 
          onOpenNote={handleOpenNote} 
          onOpenPDF={handleOpenPDF} 
          onOpenDocument={handleOpenDocument}
          onMinimize={() => handleMinimize('files')}
          onMaximize={() => handleMaximize('files')}
          maximized={maximizedApp === 'files'}
        />}
        {showAppWindow('photos') && <Photos 
          onClose={() => setOpenApp(null)} 
          initialFolder={photoFolder}
          onMinimize={() => handleMinimize('photos')}
          onMaximize={() => handleMaximize('photos')}
          maximized={maximizedApp === 'photos'}
        />}
        {showAppWindow('notes') && <Notes 
          onClose={() => setOpenApp(null)} 
          initialContent={noteContent} 
          initialTitle={noteTitle}
          onMinimize={() => handleMinimize('notes')}
          onMaximize={() => handleMaximize('notes')}
          maximized={maximizedApp === 'notes'}
        />}
        {showAppWindow('pdf-viewer') && <PDFViewer 
          onClose={() => setOpenApp(null)} 
          fileName={pdfFileName}
          onMinimize={() => handleMinimize('pdf-viewer')}
          onMaximize={() => handleMaximize('pdf-viewer')}
          maximized={maximizedApp === 'pdf-viewer'}
        />}
        {showAppWindow('document-viewer') && <DocumentViewer 
          onClose={() => setOpenApp(null)} 
          fileName={documentFileName}
          onMinimize={() => handleMinimize('document-viewer')}
          onMaximize={() => handleMaximize('document-viewer')}
          maximized={maximizedApp === 'document-viewer'}
        />}
        {showAppWindow('device-manager') && <DeviceManager 
          onClose={() => setOpenApp(null)} 
          onMinimize={() => handleMinimize('device-manager')}
          onMaximize={() => handleMaximize('device-manager')}
          maximized={maximizedApp === 'device-manager'}
        />}
        {showAppWindow('process-manager') && <ProcessManager 
          onClose={() => setOpenApp(null)} 
          onMinimize={() => handleMinimize('process-manager')}
          onMaximize={() => handleMaximize('process-manager')}
          maximized={maximizedApp === 'process-manager'}
        />}
        {showAppWindow('memory-manager') && <MemoryManager 
          onClose={() => setOpenApp(null)} 
          onMaximize={() => handleMaximize('memory-manager')}
          maximized={maximizedApp === 'memory-manager'}
        />}
        {showAppWindow('storage-manager') && <StorageManager 
          onClose={() => setOpenApp(null)} 
          onMaximize={() => handleMaximize('storage-manager')}
          maximized={maximizedApp === 'storage-manager'}
        />}
        {showAppWindow('settings') && <Settings 
          onClose={() => setOpenApp(null)} 
          onOpenStorageManager={() => setOpenApp('storage-manager')} 
          onOpenTerminal={() => setOpenApp('terminal')}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
          accentColor={accentColor}
          onAccentColorChange={setAccentColor}
          selectedWallpaper={selectedWallpaper}
          onWallpaperChange={handleWallpaperChange}
          onMaximize={() => handleMaximize('settings')}
          maximized={maximizedApp === 'settings'}
        />}
        {showAppWindow('terminal') && <Terminal 
          onClose={() => setOpenApp(null)} 
          onMaximize={() => handleMaximize('terminal')}
          maximized={maximizedApp === 'terminal'}
        />}
        {showAppWindow('app-store') && <AppStore 
          onClose={() => setOpenApp(null)} 
          onMaximize={() => handleMaximize('app-store')}
          maximized={maximizedApp === 'app-store'}
        />}
        {showAppWindow('game-mode') && <GameMode 
          onClose={() => setOpenApp(null)} 
          onMaximize={() => handleMaximize('game-mode')}
          maximized={maximizedApp === 'game-mode'}
        />}
        {showAppWindow('cloud-drive') && <CloudDrive 
          onClose={() => setOpenApp(null)} 
        />}
      </>}
    </div>
  );
}