import { useState, useRef, useEffect } from 'react';
import { Window } from '../components/layout/Window';
import { PlayIcon, PauseIcon, Volume2Icon, Maximize2Icon, SkipBackIcon, SkipForwardIcon, Settings } from 'lucide-react';

interface VideoPlayerProps {
  onClose: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  zIndex?: number;
  videoFileName?: string;
}

export function VideoPlayer({ onClose, onMaximize, maximized = false, zIndex = 40, videoFileName = 'Tutorial_Video.mp4' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sample videos
  const videos: { [key: string]: { title: string; url?: string; thumbnail?: string } } = {
    'Tutorial_Video.mp4': {
      title: 'Tutorial Video',
      url: undefined, // Simulated for now
      thumbnail: undefined
    },
    'Raiden.mp4': {
      title: 'Raiden Shogun',
      url: '/videos/Raiden.mp4',
      thumbnail: undefined
    }
  };

  const currentVideo = videos[videoFileName] || videos['Tutorial_Video.mp4'];

  // Audio event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Auto-hide controls
  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(err => console.error('Playback error:', err));
      setIsPlaying(true);
    }
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = (value / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSkipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const handleSkipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(duration, video.currentTime + 10);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window 
        title={`Video Player - ${currentVideo.title}`}
        onClose={onClose} 
        onMaximize={onMaximize} 
        maximized={maximized} 
        zIndex={zIndex}
        width="w-full max-w-6xl"
        height="h-[85vh]"
      >
        <div 
          className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden"
          onMouseMove={resetControlsTimeout}
          onClick={handlePlayPause}
        >
          {/* Video Element */}
          {currentVideo.url ? (
            <video
              ref={videoRef}
              src={currentVideo.url}
              className="w-full h-full object-contain"
              poster={currentVideo.thumbnail}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-white/80">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-cloud-xl shadow-cloud-lg mb-6 flex items-center justify-center">
                <span className="text-8xl">🎬</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
              <p className="text-white/60">Video player ready</p>
              <p className="text-sm text-white/40 mt-2">This is a simulated video player</p>
            </div>
          )}

          {/* Play/Pause Overlay (when paused) */}
          {!isPlaying && !currentVideo.url && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <PlayIcon size={48} className="text-white ml-2" />
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer hover:h-2 transition-all"
                style={{
                  background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.2) ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <div className="flex justify-between mt-1 text-xs text-white/80">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button
                  onClick={handlePlayPause}
                  className="p-2 rounded-cloud hover:bg-white/20 transition-all"
                >
                  {isPlaying ? (
                    <PauseIcon size={28} className="text-white" />
                  ) : (
                    <PlayIcon size={28} className="text-white" />
                  )}
                </button>

                {/* Skip Backward */}
                <button
                  onClick={handleSkipBackward}
                  className="p-2 rounded-cloud hover:bg-white/20 transition-all"
                  title="Rewind 10s"
                >
                  <SkipBackIcon size={24} className="text-white" />
                </button>

                {/* Skip Forward */}
                <button
                  onClick={handleSkipForward}
                  className="p-2 rounded-cloud hover:bg-white/20 transition-all"
                  title="Forward 10s"
                >
                  <SkipForwardIcon size={24} className="text-white" />
                </button>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <Volume2Icon size={20} className="text-white" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                  <span className="text-xs text-white/80 w-8">{volume}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Settings */}
                <button
                  className="p-2 rounded-cloud hover:bg-white/20 transition-all"
                  title="Settings"
                >
                  <Settings size={20} className="text-white" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-cloud hover:bg-white/20 transition-all"
                  title="Fullscreen"
                >
                  <Maximize2Icon size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
}

