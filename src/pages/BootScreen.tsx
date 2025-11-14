import { useEffect, useState } from 'react';

export function BootScreen({
  onComplete
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);
  return <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 flex flex-col items-center justify-center">
      {/* Main Content */}
      <div className="flex flex-col items-center animate-fade-in">
        <div className="mb-12">
          <img 
            src="/icons/CloudOS Icon.png" 
            alt="CloudOS" 
            className="w-[400px] h-auto"
          />
        </div>

        {/* Progress Bar */}
        <div className="w-80">
          <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-center">
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>;
}