import { useState } from 'react';
import { Window } from '../components/layout/Window';
import { WifiOff, Globe, Search, Home, ArrowRight } from 'lucide-react';

interface BrowserProps {
  wifiEnabled: boolean;
  onClose: () => void;
  onMaximize: () => void;
  maximized: boolean;
  zIndex?: number;
}

type BrowserPage = 'home' | 'results' | 'webpage';

export function Browser({ wifiEnabled, onClose, onMaximize, maximized, zIndex = 40 }: BrowserProps) {
  const [currentPage, setCurrentPage] = useState<BrowserPage>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchQuery, setLastSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setLastSearchQuery(query);
      setSearchQuery(query);
      setCurrentPage('results');
    }
  };

  const handleVisitResult = () => {
    setCurrentPage('webpage');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    setSearchQuery('');
  };

  const renderSearchBar = () => (
    <div className="w-full bg-white/80 dark:bg-dark-bg-light/80 border-t border-cloud-gray/20 dark:border-dark-border p-4">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }} className="flex gap-2 max-w-2xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter URL or search..."
          className="flex-1 px-4 py-2 rounded-cloud-lg bg-cloud-gray/10 dark:bg-dark-bg-lighter border border-cloud-gray/20 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cloud-blue"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-cloud-lg bg-cloud-blue hover:bg-cloud-blue-dark text-white font-medium transition-colors flex items-center gap-2"
        >
          <Search size={16} />
          Search
        </button>
      </form>
    </div>
  );

  return (
    <Window title="Browser" onClose={onClose} onMaximize={onMaximize} maximized={maximized} zIndex={zIndex} width="w-2/3" height="h-2/3">
      <div className="flex flex-col h-full">
        {wifiEnabled ? (
          <>
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-auto">
              {currentPage === 'home' && (
                <div className="flex flex-col items-center justify-center h-full">
                  <Globe size={64} className="text-cloud-blue mb-4" />
                  <h2 className="text-3xl font-bold mb-2">Strato Browser</h2>
                  <p className="text-cloud-gray-dark mb-6">This is a simulated browser for CloudOS. Try searching for something.</p>
                  <div className="w-full max-w-xl bg-white/80 dark:bg-dark-bg-light/80 rounded-cloud-lg shadow-cloud p-6">
                    <div className="text-cloud-gray-dark text-center">
                      <p className="font-semibold mb-2">Welcome to Strato!</p>
                      <p className="text-sm">Use the search bar below to browse simulated results.</p>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 'results' && (
                <div className="w-full max-w-2xl">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Search Results for "{lastSearchQuery}"</h2>
                    <p className="text-cloud-gray-dark mb-4">1 result found • Results are simulated</p>
                  </div>
                  
                  <div
                    onClick={handleVisitResult}
                    className="bg-white/80 dark:bg-dark-bg-light/80 rounded-cloud-lg shadow-cloud p-6 cursor-pointer hover:shadow-cloud-hover hover:bg-white/90 dark:hover:bg-dark-bg-light/90 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-cloud-blue mb-1">{lastSearchQuery}</h3>
                        <p className="text-sm text-cloud-gray-dark mb-2">strato.cloudos.dev/search?q={lastSearchQuery.replace(/\s/g, '+')}</p>
                        <p className="text-cloud-gray-darker dark:text-dark-text-muted">
                          Discover information about {lastSearchQuery}. This is a simulated search result from Strato.
                        </p>
                      </div>
                      <ArrowRight size={20} className="text-cloud-blue mt-1 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 'webpage' && (
                <div className="w-full max-w-2xl">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">{lastSearchQuery}</h1>
                    <p className="text-sm text-cloud-blue">https://strato.cloudos.dev/{lastSearchQuery.replace(/\s/g, '-')}</p>
                  </div>

                  <div className="bg-white/80 dark:bg-dark-bg-light/80 rounded-cloud-lg shadow-cloud p-6 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold mb-2">About {lastSearchQuery}</h2>
                      <p className="text-cloud-gray-darker dark:text-dark-text-muted mb-3">
                        Welcome to the simulated webpage for "{lastSearchQuery}". This is a demonstration of the Strato browser's search capabilities within CloudOS.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Bar */}
            <div className="flex items-center gap-2 bg-white/80 dark:bg-dark-bg-light/80 border-t border-cloud-gray/20 dark:border-dark-border px-4 py-2">
              <button
                onClick={handleGoHome}
                className="p-2 rounded-cloud hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-colors text-cloud-blue hover:text-cloud-blue-dark"
                title="Go Home"
              >
                <Home size={20} />
              </button>
            </div>

            {/* Search Bar */}
            {renderSearchBar()}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <WifiOff size={64} className="text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">No Connection</h2>
            <p className="text-cloud-gray-dark">Wi-Fi is turned off. Please enable Wi-Fi to use the browser simulation.</p>
          </div>
        )}
      </div>
    </Window>
  );
}
