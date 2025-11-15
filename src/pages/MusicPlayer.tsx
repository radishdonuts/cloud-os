import { useState, useRef, useEffect } from 'react';
import { Window } from '../components/layout/Window';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, Volume2Icon, RepeatIcon, ShuffleIcon, ListIcon, HeartIcon } from 'lucide-react';

interface MusicPlayerProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  zIndex?: number;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  audioUrl?: string;
}

export function MusicPlayer({ onClose, onMaximize, maximized = false, zIndex = 40 }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  // Sample songs
  const songs: Song[] = [
    {
      id: '1',
      title: 'Genshin Impact Main Theme',
      artist: 'HOYO-MiX',
      album: 'Genshin Impact',
      duration: '0:00',
      cover: '/music/Genshin Impact Main Theme.jpg',
      audioUrl: '/music/Genshin Impact Main Theme.mp3'
    },
    {
      id: '2',
      title: 'Electric Heart',
      artist: 'Synth Riders',
      album: 'Digital Love',
      duration: '4:12',
      cover: '🎶'
    },
    {
      id: '3',
      title: 'Sunset Boulevard',
      artist: 'Retro Future',
      album: 'City Lights',
      duration: '3:58',
      cover: '🎧'
    },
    {
      id: '4',
      title: 'Starlight',
      artist: 'Cosmic Dreams',
      album: 'Beyond',
      duration: '5:20',
      cover: '⭐'
    },
    {
      id: '5',
      title: 'Ocean Waves',
      artist: 'Ambient Sounds',
      album: 'Nature',
      duration: '6:15',
      cover: '🌊'
    }
  ];

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [likedSongs, setLikedSongs] = useState<string[]>(['1']);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeat]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Update audio source when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSong.audioUrl) {
      audio.src = currentSong.audioUrl;
      if (isPlaying) {
        audio.play().catch(err => console.error('Playback error:', err));
      }
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentSong.audioUrl) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(err => console.error('Playback error:', err));
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    setCurrentSong(songs[previousIndex]);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
    setCurrentSong(songs[nextIndex]);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleLike = (songId: string) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter(id => id !== songId));
    } else {
      setLikedSongs([...likedSongs, songId]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <audio ref={audioRef} />
      <Window 
        title="Music Player" 
        onClose={onClose} 
        onMaximize={onMaximize} 
        maximized={maximized} 
        zIndex={zIndex}
        width="w-full max-w-5xl"
        height="h-[85vh]"
      >
        <div className="flex h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-dark-bg to-dark-bg-light">
          {/* Main Content */}
          <div className="flex-1 flex flex-col p-8">
            {/* Now Playing */}
            <div className="flex-1 flex flex-col items-center justify-center mb-8">
              <div className="w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-cloud-xl shadow-cloud-lg mb-6 flex items-center justify-center overflow-hidden">
                {currentSong.cover.startsWith('/') ? (
                  <img 
                    src={currentSong.cover} 
                    alt={currentSong.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-8xl">{currentSong.cover}</span>
                )}
              </div>
              
              <h2 className="text-3xl font-bold text-cloud-gray-deeper dark:text-dark-text mb-2">
                {currentSong.title}
              </h2>
              <p className="text-lg text-cloud-gray-dark dark:text-dark-text-muted mb-1">
                {currentSong.artist}
              </p>
              <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                {currentSong.album}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-2 bg-cloud-gray/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${duration ? (currentTime / duration) * 100 : 0}%, rgb(226, 232, 240) ${duration ? (currentTime / duration) * 100 : 0}%, rgb(226, 232, 240) 100%)`
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <button
                onClick={() => setShuffle(!shuffle)}
                className={`p-2 rounded-cloud transition-all ${shuffle ? 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' : 'text-cloud-gray-dark hover:text-cloud-gray-deeper'}`}
              >
                <ShuffleIcon size={20} />
              </button>

              <button
                onClick={handlePrevious}
                className="p-3 rounded-cloud hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-all"
              >
                <SkipBackIcon size={28} className="text-cloud-gray-deeper dark:text-dark-text" />
              </button>

              <button
                onClick={handlePlayPause}
                className="p-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-cloud-lg transition-all hover:scale-105"
              >
                {isPlaying ? (
                  <PauseIcon size={32} className="text-white" />
                ) : (
                  <PlayIcon size={32} className="text-white" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-cloud hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter transition-all"
              >
                <SkipForwardIcon size={28} className="text-cloud-gray-deeper dark:text-dark-text" />
              </button>

              <button
                onClick={() => setRepeat(!repeat)}
                className={`p-2 rounded-cloud transition-all ${repeat ? 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' : 'text-cloud-gray-dark hover:text-cloud-gray-deeper'}`}
              >
                <RepeatIcon size={20} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Volume2Icon size={20} className="text-cloud-gray-dark" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-2 bg-cloud-gray/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${volume}%, rgb(226, 232, 240) ${volume}%, rgb(226, 232, 240) 100%)`
                }}
              />
              <span className="text-sm text-cloud-gray-dark dark:text-dark-text-muted w-10 text-right">
                {volume}%
              </span>
            </div>
          </div>

          {/* Playlist Sidebar */}
          {showPlaylist && (
            <div className="w-96 border-l border-cloud-gray/20 dark:border-dark-border bg-white/50 dark:bg-dark-bg-light/50 backdrop-blur-sm p-6 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cloud-gray-deeper dark:text-dark-text">
                  Playlist
                </h3>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="p-2 rounded-cloud hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter"
                >
                  <ListIcon size={20} />
                </button>
              </div>

              <div className="space-y-2">
                {songs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => handleSongSelect(song)}
                    className={`p-3 rounded-cloud-lg cursor-pointer transition-all ${
                      currentSong.id === song.id
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-400'
                        : 'bg-white/50 dark:bg-dark-bg-lighter/50 hover:bg-white/80 dark:hover:bg-dark-bg-lighter'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-cloud flex items-center justify-center text-2xl overflow-hidden">
                        {song.cover.startsWith('/') ? (
                          <img 
                            src={song.cover} 
                            alt={song.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{song.cover}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-cloud-gray-deeper dark:text-dark-text truncate">
                          {song.title}
                        </p>
                        <p className="text-sm text-cloud-gray-dark dark:text-dark-text-muted truncate">
                          {song.artist}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-cloud-gray-dark dark:text-dark-text-muted">
                          {song.duration}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(song.id);
                          }}
                          className="p-1"
                        >
                          <HeartIcon
                            size={18}
                            className={likedSongs.includes(song.id) ? 'fill-red-500 text-red-500' : 'text-cloud-gray-dark'}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show Playlist Button (when hidden) */}
          {!showPlaylist && (
            <button
              onClick={() => setShowPlaylist(true)}
              className="absolute top-4 right-4 p-2 rounded-cloud bg-white/50 dark:bg-dark-bg-light/50 hover:bg-white/80 dark:hover:bg-dark-bg-light shadow-cloud"
            >
              <ListIcon size={20} />
            </button>
          )}
        </div>
      </Window>
    </div>
  );
}

