export interface CloudIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}
export function CloudIcon({
  size = 64,
  className = '',
  animated = false
}: CloudIconProps) {
  return <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${animated ? 'animate-float' : ''} ${className}`}>
      <path d="M52 36C54.7614 36 57 33.7614 57 31C57 28.2386 54.7614 26 52 26C51.8479 26 51.6971 26.0068 51.548 26.0201C51.1891 20.6088 46.6122 16.5 41 16.5C38.3643 16.5 36.0068 17.5784 34.2929 19.2929C32.5789 17.5784 30.2214 16.5 27.5857 16.5C21.9735 16.5 17.3966 20.6088 17.0377 26.0201C16.8886 26.0068 16.7378 26 16.5857 26C13.8243 26 11.5857 28.2386 11.5857 31C11.5857 33.7614 13.8243 36 16.5857 36H52Z" fill="url(#cloud-gradient)" className="drop-shadow-lg" />
      <defs>
        <linearGradient id="cloud-gradient" x1="11.5857" y1="16.5" x2="57" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A8D5BA" />
          <stop offset="1" stopColor="#7FB89E" />
        </linearGradient>
      </defs>
    </svg>;
}