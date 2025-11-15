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
import { Calculator } from './pages/Calculator';
import { Trash } from './pages/Trash';
import { GameLibrary } from './pages/GameLibrary';
import { Browser } from './pages/Browser';
import { Game } from './pages/Game';

type Screen = 'bios' | 'boot' | 'login' | 'account-creation' | 'desktop';
type App = 'files' | 'photos' | 'notes' | 'pdf-viewer' | 'document-viewer' | 'device-manager' | 'process-manager' | 'memory-manager' | 'storage-manager' | 'settings' | 
'app-store' | 'game-mode' | 'cloud-drive' | 'terminal' | 'calculator' | 'trash' | 'game-library' | 'browser' | 'game' | null;
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
  const [openApps, setOpenApps] = useState<App[]>([]);
  const [maximizedApp, setMaximizedApp] = useState<App | null>(null);
  const [cloudOSDriveIslandEnabled, setCloudOSDriveIslandEnabled] = useState(true);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [selectedGameTitle, setSelectedGameTitle] = useState<string>('Genshin Impact');

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
        { name: 'Work Notes', type: 'file', icon: 'note', image: '/icons/NotesIcon.png' }
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
    setOpenApps([]);
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
      setOpenApps(prev => prev.includes('files') ? prev : [...prev, 'files']);
      return;
    }
    if (appId === 'files-desktop') {
      setFileManagerCategory('desktop');
      setOpenApps(prev => prev.includes('files') ? prev : [...prev, 'files']);
      return;
    }
    // Add app to open apps if not already open
    let appToOpen: App = null;
    if (appId === 'files') appToOpen = 'files';
    else if (appId === 'photos') appToOpen = 'photos';
    else if (appId === 'notes') appToOpen = 'notes';
    else if (appId === 'calculator') appToOpen = 'calculator';
    else if (appId === 'device-manager') appToOpen = 'device-manager';
    else if (appId === 'process-manager') appToOpen = 'process-manager';
    else if (appId === 'memory-manager') appToOpen = 'memory-manager';
    else if (appId === 'storage-manager') appToOpen = 'storage-manager';
    else if (appId === 'settings') appToOpen = 'settings';
    else if (appId === 'app-store') appToOpen = 'app-store';
    else if (appId === 'game-mode') appToOpen = 'game-mode';
    else if (appId === 'terminal') appToOpen = 'terminal';
    else if (appId === 'trash') appToOpen = 'trash';
    else if (appId === 'game-library') appToOpen = 'game-library';
    else if (appId === 'browser') appToOpen = 'browser';
    else if (appId === 'game') appToOpen = 'game';

    if (appToOpen) {
      setOpenApps(prev => prev.includes(appToOpen) ? prev : [...prev, appToOpen]);
    }
  };
  const handleOpenPhoto = (folder: string) => {
    setPhotoFolder(folder);
    setOpenApps(prev => prev.includes('photos') ? prev : [...prev, 'photos']);
  };
  const handleOpenNote = (content: string, title: string) => {
    setNoteContent(content);
    setNoteTitle(title);
    setOpenApps(prev => prev.includes('notes') ? prev : [...prev, 'notes']);
  };
  const handleOpenPDF = (fileName: string) => {
    setPdfFileName(fileName);
    setOpenApps(prev => prev.includes('pdf-viewer') ? prev : [...prev, 'pdf-viewer']);
  };
  const handleOpenDocument = (fileName: string) => {
    setDocumentFileName(fileName);
    setOpenApps(prev => prev.includes('document-viewer') ? prev : [...prev, 'document-viewer']);
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setOpenApps([]);
    setShowLauncher(false);
  };
  const handleSleep = () => {
    alert('System going to sleep...');
  };
  const handleShutdown = () => {
    setCurrentScreen('bios');
    setOpenApps([]);
    setShowLauncher(false);
  };

  const handleMaximize = (app: App) => {
    setMaximizedApp(app === maximizedApp ? null : app);
  };
  const handleCloseApp = (app: App) => {
    setOpenApps(prev => prev.filter(a => a !== app));
    if (maximizedApp === app) {
      setMaximizedApp(null);
    }
  };

  const getZIndex = (app: App) => {
    const index = openApps.indexOf(app);
    return index === -1 ? 0 : 40 + index;
  };

  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [pairedDevices, setPairedDevices] = useState([
    { name: 'PlayStation 5 Controller', type: 'Game Controller', battery: 85, connected: true },
    { name: 'AirPods Pro', type: 'Audio', battery: 72, connected: true },
  ]);

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
          cloudOSDriveIslandEnabled={cloudOSDriveIslandEnabled}
        />
        {showQuickSettings && (
          <QuickSettings
            onClose={() => setShowQuickSettings(false)}
            onOpenSettings={() => {
              setShowQuickSettings(false);
              setOpenApps(prev => prev.includes('settings') ? prev : [...prev, 'settings']);
            }}
            darkMode={darkMode}
            onDarkModeChange={setDarkMode}
            cloudOSDriveIslandEnabled={cloudOSDriveIslandEnabled}
            onCloudOSDriveIslandChange={setCloudOSDriveIslandEnabled}
            wifiEnabled={wifiEnabled}
            onWifiChange={setWifiEnabled}
          />
        )}
        {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
        {showLauncher && <Launcher onClose={() => setShowLauncher(false)} onAppOpen={handleAppOpen} onLogout={handleLogout} onSwitchUser={handleSwitchUser} onSleep={handleSleep} onShutdown={handleShutdown} />}
        {openApps.includes('files') && <FileManager 
          onClose={() => { handleCloseApp('files'); setFileManagerCategory('home'); }} 
          initialCategory={fileManagerCategory} 
          onOpenPhoto={handleOpenPhoto} 
          onOpenNote={handleOpenNote} 
          onOpenPDF={handleOpenPDF} 
          onOpenDocument={handleOpenDocument}
          onMaximize={() => handleMaximize('files')}
          maximized={maximizedApp === 'files'}
          zIndex={getZIndex('files')}
        />}
        {openApps.includes('photos') && <Photos 
          onClose={() => handleCloseApp('photos')} 
          initialFolder={photoFolder}
          onMaximize={() => handleMaximize('photos')}
          maximized={maximizedApp === 'photos'}
          zIndex={getZIndex('photos')}
        />}
        {openApps.includes('notes') && <Notes 
          onClose={() => handleCloseApp('notes')} 
          initialContent={noteContent} 
          initialTitle={noteTitle}
          onMaximize={() => handleMaximize('notes')}
          maximized={maximizedApp === 'notes'}
          zIndex={getZIndex('notes')}
        />}
        {openApps.includes('calculator') && <Calculator 
          onClose={() => handleCloseApp('calculator')} 
          onMaximize={() => handleMaximize('calculator')}
          maximized={maximizedApp === 'calculator'}
          zIndex={getZIndex('calculator')}
        />}
        {openApps.includes('pdf-viewer') && <PDFViewer 
          onClose={() => handleCloseApp('pdf-viewer')} 
          fileName={pdfFileName}
          onMaximize={() => handleMaximize('pdf-viewer')}
          maximized={maximizedApp === 'pdf-viewer'}
          zIndex={getZIndex('pdf-viewer')}
        />}
        {openApps.includes('document-viewer') && <DocumentViewer 
          onClose={() => handleCloseApp('document-viewer')} 
          fileName={documentFileName}
          onMaximize={() => handleMaximize('document-viewer')}
          maximized={maximizedApp === 'document-viewer'}
          zIndex={getZIndex('document-viewer')}
        />}
        {openApps.includes('device-manager') && <DeviceManager 
          onClose={() => handleCloseApp('device-manager')} 
          onMaximize={() => handleMaximize('device-manager')}
          maximized={maximizedApp === 'device-manager'}
          zIndex={getZIndex('device-manager')}
        />}
        {openApps.includes('process-manager') && <ProcessManager 
          onClose={() => handleCloseApp('process-manager')} 
          onMaximize={() => handleMaximize('process-manager')}
          maximized={maximizedApp === 'process-manager'}
          zIndex={getZIndex('process-manager')}
        />}
        {openApps.includes('memory-manager') && <MemoryManager 
          onClose={() => handleCloseApp('memory-manager')} 
          onMaximize={() => handleMaximize('memory-manager')}
          maximized={maximizedApp === 'memory-manager'}
          zIndex={getZIndex('memory-manager')}
        />}
        {openApps.includes('storage-manager') && <StorageManager 
          onClose={() => handleCloseApp('storage-manager')} 
          onMaximize={() => handleMaximize('storage-manager')}
          maximized={maximizedApp === 'storage-manager'}
          zIndex={getZIndex('storage-manager')}
        />}
        {openApps.includes('settings') && <Settings 
          onClose={() => handleCloseApp('settings')} 
          onOpenStorageManager={() => setOpenApps(prev => prev.includes('storage-manager') ? prev : [...prev, 'storage-manager'])} 
          onOpenTerminal={() => setOpenApps(prev => prev.includes('terminal') ? prev : [...prev, 'terminal'])}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
          accentColor={accentColor}
          onAccentColorChange={setAccentColor}
          selectedWallpaper={selectedWallpaper}
          onWallpaperChange={handleWallpaperChange}
          onMaximize={() => handleMaximize('settings')}
          maximized={maximizedApp === 'settings'}
          cloudOSDriveIslandEnabled={cloudOSDriveIslandEnabled}
          onCloudOSDriveIslandChange={setCloudOSDriveIslandEnabled}
          wifiEnabled={wifiEnabled}
          onWifiChange={setWifiEnabled}
          zIndex={getZIndex('settings')}
          bluetoothEnabled={bluetoothEnabled}
          onBluetoothChange={setBluetoothEnabled}
          pairedDevices={pairedDevices}
          onPairedDevicesChange={setPairedDevices}
        />}
        {openApps.includes('terminal') && <Terminal 
          onClose={() => handleCloseApp('terminal')} 
          onMaximize={() => handleMaximize('terminal')}
          maximized={maximizedApp === 'terminal'}
          zIndex={getZIndex('terminal')}
        />}
        {openApps.includes('app-store') && <AppStore 
          onClose={() => handleCloseApp('app-store')} 
          onMaximize={() => handleMaximize('app-store')}
          maximized={maximizedApp === 'app-store'}
          zIndex={getZIndex('app-store')}
        />}
        {openApps.includes('game-mode') && <GameMode 
          onClose={() => handleCloseApp('game-mode')} 
          onMaximize={() => handleMaximize('game-mode')}
          maximized={maximizedApp === 'game-mode'}
          zIndex={getZIndex('game-mode')}
          bluetoothEnabled={bluetoothEnabled}
          controllers={pairedDevices}
          onToggleController={(name) => {
            setPairedDevices(prev =>
              prev.map(d =>
                d.name === name
                  ? { ...d, connected: !d.connected }
                  : d
              )
            );
          }}
        />}
        {openApps.includes('cloud-drive') && <CloudDrive 
          onClose={() => handleCloseApp('cloud-drive')}
          zIndex={getZIndex('cloud-drive')}
        />}
        {openApps.includes('trash') && (
          <Trash
            onClose={() => handleCloseApp('trash')}
            onMaximize={() => handleMaximize('trash')}
            maximized={maximizedApp === 'trash'}
            zIndex={getZIndex('trash')}
          />
        )}
        {openApps.includes('game-library') && (
          <GameLibrary
            onClose={() => handleCloseApp('game-library')}
            onMaximize={() => handleMaximize('game-library')}
            maximized={maximizedApp === 'game-library'}
            onPlayGame={(gameName) => {
              setSelectedGameTitle(gameName);
              setOpenApps(prev => prev.includes('game') ? prev : [...prev, 'game']);
              setMaximizedApp('game');
            }}
            zIndex={getZIndex('game-library')}
          />
        )}
        {openApps.includes('browser') && (
          <Browser
            wifiEnabled={wifiEnabled}
            onClose={() => handleCloseApp('browser')}
            onMaximize={() => handleMaximize('browser')}
            maximized={maximizedApp === 'browser'}
            zIndex={getZIndex('browser')}
          />
        )}
        {openApps.includes('game') && (
          <Game
            gameTitle={selectedGameTitle}
            onClose={() => handleCloseApp('game')}
            onMaximize={() => handleMaximize('game')}
            maximized={maximizedApp === 'game'}
            zIndex={getZIndex('game')}
          />
        )}
      </>}
    </div>
  );
}