import { useState, useMemo } from 'react';
import { Window } from '../components/layout/Window';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import {
  Gamepad2,
  Search as SearchIcon,
  Grid3x3Icon,
  ListIcon,
  Play,
  Pause,
  Star,
  Clock,
  Tag as TagIcon,
} from 'lucide-react';

export interface GameLibraryProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  onPlayGame?: (gameName: string) => void;
  zIndex?: number;
}

type GameStatus = 'Installed' | 'Updating';

interface Game {
  id: string;
  name: string;
  shortName: string;
  status: GameStatus;
  hoursPlayed: number;
  lastPlayed: string;
  genre: string;
  tag: string;
  accentFrom: string;
  accentTo: string;
  installProgress?: number;
  image: string;
}

const GAMES: Game[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    shortName: 'VALORANT',
    status: 'Updating',
    hoursPlayed: 142,
    lastPlayed: 'Updating...',
    genre: 'Tac FPS',
    tag: 'Competitive',
    accentFrom: 'from-pink-500',
    accentTo: 'to-red-500',
    installProgress: 45,
    image: 'public/images/valorant.jpg',
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    shortName: 'GENSHIN',
    status: 'Installed',
    hoursPlayed: 238,
    lastPlayed: '3 days ago',
    genre: 'Action RPG',
    tag: 'Open World',
    accentFrom: 'from-blue-500',
    accentTo: 'to-indigo-500',
    image: 'public/images/genshin.png',
  },
  {
    id: 'honkai',
    name: 'Honkai: Star Rail',
    shortName: 'HSR',
    status: 'Updating',
    hoursPlayed: 58,
    lastPlayed: 'Updating...',
    genre: 'Turn-based RPG',
    tag: 'Story',
    accentFrom: 'from-purple-500',
    accentTo: 'to-fuchsia-500',
    installProgress: 68,
    image: 'public/images/honkai.jpg',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    shortName: 'MINECRAFT',
    status: 'Updating',
    hoursPlayed: 0,
    lastPlayed: 'Updating...',
    genre: 'Sandbox',
    tag: 'Creative',
    accentFrom: 'from-emerald-500',
    accentTo: 'to-lime-500',
    installProgress: 32,
    image: 'public/images/minecraft.jpg',
  },
  {
    id: 'stardew',
    name: 'Stardew Valley',
    shortName: 'STARDEW',
    status: 'Updating',
    hoursPlayed: 91,
    lastPlayed: 'Updating...',
    genre: 'Farming Sim',
    tag: 'Cozy',
    accentFrom: 'from-amber-500',
    accentTo: 'to-orange-500',
    installProgress: 82,
    image: 'public/images/stardew.jpg',
  },
];

export function GameLibrary({
  onClose,
  onMaximize,
  maximized = false,
  onPlayGame,
  zIndex,
}: GameLibraryProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'installed' | 'updating'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameId, setSelectedGameId] = useState<string>(GAMES[0]?.id ?? '');
  const [playingGameId, setPlayingGameId] = useState<string | null>(null);
  // Track whether updates are paused per game (false = updating, true = paused)
  const [updatePaused, setUpdatePaused] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    GAMES.forEach((g) => {
      if (g.status === 'Updating') map[g.id] = false;
    });
    return map;
  });

  const toggleUpdatePause = (id: string) => {
    setUpdatePaused((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredGames = GAMES.filter((game) => {
    if (filter === 'installed' && game.status !== 'Installed') return false;
    if (filter === 'updating' && game.status !== 'Updating') return false;
    if (
      searchQuery &&
      !game.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !game.genre.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Memoize filtered games for performance to avoid recalculating on every render
  const memoFilteredGames = useMemo(() => filteredGames, [filter, searchQuery]);

  const selectedGame =
    GAMES.find((g) => g.id === selectedGameId) ?? memoFilteredGames[0] ?? GAMES[0];

  const getStatusBadgeClasses = (status: GameStatus) => {
    if (status === 'Installed') return 'bg-cloud-green/15 text-cloud-green';
    if (status === 'Updating') return 'bg-cloud-purple/15 text-cloud-purple';
    return '';
  };

  const renderPrimaryActionLabel = (game: Game) => {
    if (game.status === 'Installed') return 'Play';
    if (game.status === 'Updating') return updatePaused[game.id] ? 'Resume' : 'Pause';
    return '';
  };

  const renderPrimaryActionIcon = (game: Game) => {
    if (game.status === 'Installed') return <Play size={18} />;
    if (game.status === 'Updating') return updatePaused[game.id] ? <Play size={18} /> : <Pause size={18} />;
    return null;
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6 bg-black/20 animate-fade-in"
      style={{ zIndex: zIndex ?? 40, animationDuration: '120ms' }}
    >
      <Window
        title="Game Library"
        onClose={onClose}
        onMaximize={onMaximize}
        maximized={maximized}
        width="w-full max-w-6xl"
        height="h-[80vh]"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-4 px-6 py-4 border-b border-cloud-gray/20 dark:border-dark-border">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'installed' ? 'primary' : 'ghost'}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setFilter('installed')}
              >
                Installed
              </Button>
              <Button
                variant={filter === 'updating' ? 'primary' : 'ghost'}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setFilter('updating')}
              >
                Updating
              </Button>
            </div>

            <div className="flex-1" />

            <div className="relative w-64">
              <SearchIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-cloud-gray-deeper/70 dark:text-dark-text-muted"
              />
              <Input
                placeholder="Search games..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-1 bg-cloud-gray/20 dark:bg-dark-bg-lighter rounded-cloud p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-cloud transition-colors ${
                  view === 'grid' ? 'bg-white dark:bg-dark-bg shadow-cloud' : ''
                }`}
              >
                <Grid3x3Icon
                  size={18}
                  className="text-cloud-gray-deeper dark:text-dark-text"
                />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-cloud transition-colors ${
                  view === 'list' ? 'bg-white dark:bg-dark-bg shadow-cloud' : ''
                }`}
              >
                <ListIcon
                  size={18}
                  className="text-cloud-gray-deeper dark:text-dark-text"
                />
              </button>
            </div>
          </div>

          <div className="px-6 pt-4 pb-2 overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {memoFilteredGames.map((game) => {
                const isSelected = selectedGame?.id === game.id;
                return (
                  <Card
                    key={game.id}
                    hover
                    className={`cursor-pointer overflow-hidden rounded-cloud-lg shadow-cloud transition-all ${
                      isSelected
                        ? 'w-[360px] h-40 ring-2 ring-cloud-green'
                        : 'w-[200px] h-36'
                    }`}
                    onClick={() => setSelectedGameId(game.id)}
                  >
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </Card>
                );
              })}
            </div>
          </div>

          
          <div className="flex flex-1 min-h-0">
            <div className="w-[500px] border-r border-cloud-gray/20 dark:border-dark-border p-6 flex flex-col gap-4">

              {selectedGame && (
                <Card className="p-5 bg-gradient-to-br rounded-cloud-lg shadow-cloud from-cloud-gray/10 to-cloud-gray/0 dark:from-dark-bg-lighter/60 dark:to-dark-bg flex flex-col flex-1 min-h-[320px]">
                  <div className="mb-4">
                    <p className="text-xs tracking-[0.25em] uppercase opacity-70 mb-1 text-cloud-gray-deeper/80 dark:text-dark-text-muted">
                      {selectedGame.shortName}
                    </p>
                    <p className="text-5xl font-bold mb-1 text-cloud-gray-deeper dark:text-dark-text">
                      {selectedGame.name}
                    </p>
                    <p className="text-xs flex items-center gap-1 text-cloud-gray-deeper/80 dark:text-dark-text-muted">
                      <TagIcon size={12} />
                      {selectedGame.genre} • {selectedGame.tag}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-cloud-gray-deeper/70 dark:text-dark-text-muted">
                        Status
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusBadgeClasses(
                          selectedGame.status,
                        )}`}
                      >
                        {selectedGame.status}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-cloud-gray-deeper/70 dark:text-dark-text-muted flex items-center gap-1">
                        <Clock size={12} />
                        Playtime
                      </span>
                      <span className="text-sm font-semibold text-cloud-gray-deeper dark:text-dark-text">
                        {selectedGame.hoursPlayed} hrs
                      </span>
                    </div>
                  </div>

                  {selectedGame.status === 'Updating' &&
                    typeof selectedGame.installProgress === 'number' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-cloud-gray-deeper/70 dark:text-dark-text-muted mb-1">
                          <span>Updating</span>
                          <span>{selectedGame.installProgress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-cloud-gray/20 overflow-hidden">
                          <div
                            className="h-full bg-cloud-purple/70 rounded-full"
                            style={{ width: `${selectedGame.installProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-cloud-gray-deeper/70 dark:text-dark-text-muted">
                        Last played
                      </span>
                      <span className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text">
                        {selectedGame.lastPlayed}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-cloud-gray-deeper/70 dark:text-dark-text-muted">
                      <Star size={12} className="text-amber-400" />
                      <span>Favorite ready</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant={selectedGame.status === 'Updating' ? 'ghost' : 'primary'}
                      size="lg"
                      className="w-full py-3 text-sm md:text-base rounded-full flex items-center justify-center gap-2 shadow-cloud-lg"
                      onClick={() => {
                        if (selectedGame.status === 'Installed') {
                          if (playingGameId === selectedGame.id) {
                            setPlayingGameId(null);
                          } else {
                            setPlayingGameId(selectedGame.id);
                            if (onPlayGame) {
                              onPlayGame(selectedGame.name);
                            }
                          }
                        } else if (selectedGame.status === 'Updating') {
                          toggleUpdatePause(selectedGame.id);
                        }
                      }}
                    >
                      {playingGameId === selectedGame.id ? (
                        <>
                          <Pause size={20} />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          {renderPrimaryActionIcon(selectedGame)}
                          <span>{renderPrimaryActionLabel(selectedGame)}</span>
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              )}
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-auto p-6">
                {memoFilteredGames.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Gamepad2
                      size={64}
                      className="text-cloud-gray-deeper/40 dark:text-dark-text-muted mb-4"
                    />
                    <p className="text-lg font-semibold text-cloud-gray-deeper dark:text-dark-text mb-2">
                      No games match your filters
                    </p>
                    <p className="text-sm text-cloud-gray-deeper/70 dark:text-dark-text-muted font-medium">
                      Try clearing your search or switching to “All” games.
                    </p>
                  </div>
                  ) : view === 'grid' ? (
                  <div className="grid grid-cols-3 gap-4">
                    {memoFilteredGames.map((game) => {
                      const isSelected = selectedGame?.id === game.id;
                      return (
                        <Card
                          key={game.id}
                          hover
                          className={`p-4 cursor-pointer rounded-cloud-lg transition-all ${
                            isSelected ? 'ring-2 ring-cloud-green shadow-cloud-lg' : ''
                          }`}
                          onClick={() => setSelectedGameId(game.id)}
                        >
                          <div className="rounded-cloud-lg mb-3 h-28 overflow-hidden shadow-lg">
                            <img
                              src={game.image}
                              alt={game.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">
                                {game.shortName}
                              </p>
                              <p className="text-sm font-semibold line-clamp-1">
                                {game.name}
                              </p>
                            </div>
                            <span
                              className={`text-[10px] px-2 py-1 rounded-full font-medium bg-white/20 ${getStatusBadgeClasses(
                                game.status,
                              )}`}
                            >
                              {game.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-cloud-gray-deeper/80 dark:text-dark-text-muted">
                            <span>{game.genre}</span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {game.hoursPlayed} hrs
                            </span>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {memoFilteredGames.map((game) => {
                      const isSelected = selectedGame?.id === game.id;
                      return (
                        <div
                          key={game.id}
                          className={`flex items-center gap-4 px-4 py-3 rounded-cloud-lg bg-white/60 dark:bg-dark-bg-lighter/60 hover:bg-white dark:hover:bg-dark-bg-lighter cursor-pointer transition-all ${
                            isSelected ? 'ring-2 ring-cloud-green shadow-cloud' : ''
                          }`}
                          onClick={() => setSelectedGameId(game.id)}
                        >
                          <div className="w-12 h-12 rounded-cloud overflow-hidden">
                            <img
                              src={game.image}
                              alt={game.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-cloud-gray-deeper dark:text-dark-text">
                              {game.name}
                            </p>
                            <p className="text-xs text-cloud-gray-deeper/70 dark:text-dark-text-muted">
                              {game.genre} • {game.tag}
                            </p>
                          </div>
                          <div className="flex flex-col items-end text-xs text-cloud-gray-deeper/80 dark:text-dark-text-muted">
                            <span
                              className={`mb-1 px-2 py-1 rounded-full ${getStatusBadgeClasses(
                                game.status,
                              )}`}
                            >
                              {game.status}
                            </span>
                            <span>{game.hoursPlayed} hrs</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
}
