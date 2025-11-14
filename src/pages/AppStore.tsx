import React, { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SearchIcon, StarIcon, DownloadIcon } from 'lucide-react';
export interface AppStoreProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
}
export function AppStore({
  onClose,
  onMinimize,
  onMaximize,
  maximized = false
}: AppStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [installed, setInstalled] = useState<Record<string, boolean>>({});
  const [confirmBuy, setConfirmBuy] = useState<null | { appName: string; price: string }>(null);
  const categories = [{
    id: 'featured',
    label: 'Featured'
  }, {
    id: 'productivity',
    label: 'Productivity'
  }, {
    id: 'creative',
    label: 'Creative'
  }, {
    id: 'games',
    label: 'Games'
  }];
  const appsByCategory: Record<string, any[]> = {
    featured: [{
      name: 'CloudEdit Pro',
      category: 'Productivity',
      icon: '✏️',
      rating: 4.8,
      downloads: '2.4M',
      price: 'Free'
    }, {
      name: 'Photo Studio',
      category: 'Creative',
      icon: '🎨',
      rating: 4.9,
      downloads: '1.8M',
      price: '$9.99'
    }, {
      name: 'Code Master',
      category: 'Tools',
      icon: '💻',
      rating: 4.7,
      downloads: '980K',
      price: 'Free'
    }, {
      name: 'Music Maker',
      category: 'Creative',
      icon: '🎵',
      rating: 4.6,
      downloads: '1.2M',
      price: '$14.99'
    }, {
      name: 'Task Manager Pro',
      category: 'Productivity',
      icon: '✅',
      rating: 4.8,
      downloads: '3.1M',
      price: 'Free'
    }, {
      name: 'Video Editor',
      category: 'Creative',
      icon: '🎬',
      rating: 4.9,
      downloads: '2.7M',
      price: '$19.99'
    }],
    productivity: [{
      name: 'CloudEdit Pro',
      category: 'Productivity',
      icon: '✏️',
      rating: 4.8,
      downloads: '2.4M',
      price: 'Free'
    }, {
      name: 'Task Manager Pro',
      category: 'Productivity',
      icon: '✅',
      rating: 4.8,
      downloads: '3.1M',
      price: 'Free'
    }, {
      name: 'Calendar Plus',
      category: 'Productivity',
      icon: '📅',
      rating: 4.7,
      downloads: '1.5M',
      price: '$4.99'
    }, {
      name: 'Notes Ultra',
      category: 'Productivity',
      icon: '📝',
      rating: 4.6,
      downloads: '890K',
      price: 'Free'
    }, {
      name: 'Email Pro',
      category: 'Productivity',
      icon: '📧',
      rating: 4.9,
      downloads: '2.1M',
      price: '$7.99'
    }, {
      name: 'PDF Master',
      category: 'Productivity',
      icon: '📄',
      rating: 4.5,
      downloads: '1.3M',
      price: '$12.99'
    }],
    creative: [{
      name: 'Photo Studio',
      category: 'Creative',
      icon: '🎨',
      rating: 4.9,
      downloads: '1.8M',
      price: '$9.99'
    }, {
      name: 'Music Maker',
      category: 'Creative',
      icon: '🎵',
      rating: 4.6,
      downloads: '1.2M',
      price: '$14.99'
    }, {
      name: 'Video Editor',
      category: 'Creative',
      icon: '🎬',
      rating: 4.9,
      downloads: '2.7M',
      price: '$19.99'
    }, {
      name: 'Design Studio',
      category: 'Creative',
      icon: '🖌️',
      rating: 4.8,
      downloads: '1.4M',
      price: '$24.99'
    }, {
      name: '3D Modeler',
      category: 'Creative',
      icon: '🎭',
      rating: 4.7,
      downloads: '780K',
      price: '$29.99'
    }, {
      name: 'Audio Editor',
      category: 'Creative',
      icon: '🎧',
      rating: 4.6,
      downloads: '920K',
      price: '$16.99'
    }],
    games: [{
      name: 'Cloud Racer',
      category: 'Games',
      icon: '🏎️',
      rating: 4.5,
      downloads: '5.2M',
      price: 'Free'
    }, {
      name: 'Sky Warriors',
      category: 'Games',
      icon: '✈️',
      rating: 4.7,
      downloads: '3.8M',
      price: '$4.99'
    }, {
      name: 'Puzzle Master',
      category: 'Games',
      icon: '🧩',
      rating: 4.8,
      downloads: '2.9M',
      price: 'Free'
    }, {
      name: 'Adventure Quest',
      category: 'Games',
      icon: '⚔️',
      rating: 4.9,
      downloads: '4.1M',
      price: '$9.99'
    }, {
      name: 'Space Explorer',
      category: 'Games',
      icon: '🚀',
      rating: 4.6,
      downloads: '1.7M',
      price: '$7.99'
    }, {
      name: 'Card Battle',
      category: 'Games',
      icon: '🃏',
      rating: 4.4,
      downloads: '2.3M',
      price: 'Free'
    }]
  };
  const apps = appsByCategory[selectedCategory] || [];
  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.category.toLowerCase().includes(searchQuery.toLowerCase()));
  const formatPrice = (p: string) => {
    if (!p) return p;
    if (p.startsWith('$')) return '₱' + p.slice(1);
    return p.replace('$', '₱');
  };
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="App Store" onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} maximized={maximized} width="w-full max-w-6xl" height="h-[85vh]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 border-b border-cloud-gray/20 dark:border-dark-border">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {categories.map(cat => <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`
                      px-4 py-2 rounded-cloud-lg font-medium transition-all duration-200
                      ${selectedCategory === cat.id ? 'bg-cloud-green/20 text-cloud-green' : 'text-cloud-gray-dark dark:text-dark-text-muted hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter'}
                    `}>
                    {cat.label}
                  </button>)}
              </div>
              <div className="flex-1" />
              <div className="relative w-64">
                <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cloud-gray-dark" />
                <Input placeholder="Search apps..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {filteredApps.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-6xl mb-4 opacity-50">🔍</div>
                <p className="text-lg font-medium text-cloud-gray-deeper dark:text-dark-text mb-2">
                  No apps found
                </p>
                <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                  Try a different search term
                </p>
              </div> : <div className="grid grid-cols-3 gap-6">
                {filteredApps.map((app, i) => <Card key={i} hover className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-cloud-lg bg-gradient-to-br from-cloud-green to-cloud-blue flex items-center justify-center text-3xl shadow-cloud">
                        {app.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-cloud-gray-deeper dark:text-dark-text mb-1">
                          {app.name}
                        </h3>
                        <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                          {app.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <StarIcon size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-cloud-gray-deeper dark:text-dark-text">
                          {app.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-cloud-gray-dark dark:text-dark-text-muted">
                        <DownloadIcon size={14} />
                        <span>{app.downloads}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-cloud-green">
                        {formatPrice(app.price)}
                      </span>
                      {!installed[app.name] ? (
                        <>{app.price === 'Free' ? <Button variant="primary" size="sm" onClick={() => setInstalled(prev => ({ ...prev, [app.name]: true }))}>Get</Button> : <Button variant="primary" size="sm" onClick={() => setConfirmBuy({ appName: app.name, price: app.price })}>Buy</Button>}</>
                      ) : (
                        <Button variant="secondary" size="sm" disabled>Installed</Button>
                      )}
                    </div>
                  </Card>)}
        {confirmBuy && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setConfirmBuy(null)}>
            <div className="w-full max-w-md" onClick={e => e.stopPropagation()}>
              <Window title={`Buy ${confirmBuy.appName}`} onClose={() => setConfirmBuy(null)} width="w-full" height="h-auto">
                <div className="p-4">
                  <p className="mb-4">Buy <strong>{confirmBuy.appName}</strong> for <strong>{formatPrice(confirmBuy.price)}</strong>?</p>
                  <div className="flex gap-3 justify-end">
                    <Button variant="ghost" onClick={() => setConfirmBuy(null)}>Cancel</Button>
                    <Button variant="primary" onClick={() => {
                      setInstalled(prev => ({ ...prev, [confirmBuy.appName]: true }));
                      setConfirmBuy(null);
                    }}>Buy</Button>
                  </div>
                </div>
              </Window>
            </div>
          </div>}
              </div>}
          </div>
        </div>
      </Window>
    </div>;
}