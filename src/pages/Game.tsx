import { useRef } from 'react';
import { Window } from '../components/layout/Window';
import './Game.css';

interface GameProps {
  gameTitle: string;
  onClose: () => void;
  onMaximize: () => void;
  maximized: boolean;
  zIndex?: number;
}

export function Game({ gameTitle, onClose, onMaximize, maximized, zIndex = 40 }: GameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    onClose();
  };

  return (
    <Window title={gameTitle} onClose={onClose} onMaximize={onMaximize} maximized={maximized} zIndex={zIndex}>
      <div className="relative w-full h-full bg-black">
        <video
          ref={videoRef}
          src="/videos/Game%20Start.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleVideoClick}
        />
        
        {/* Overlay with text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4 game-title">START GAME</h1>
            <h1 className="text-6xl font-bold text-white mb-4 game-title">⊱ ── ⋅✧⋅ ── ⊰</h1>
            <p className="text-2xl text-white game-subtitle">Simulation only </p>
            <p className="text-1xl text-white game-subtitle">Click to Quit</p>
          </div>
        </div>

        {/* Clickable overlay to exit */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={handleVideoClick}
          style={{ pointerEvents: 'auto', zIndex: 10 }}
        />
      </div>
    </Window>
  );
}
