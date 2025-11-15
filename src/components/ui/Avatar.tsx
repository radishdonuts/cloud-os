import { UserIcon } from 'lucide-react';
export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  online?: boolean;
}
export function Avatar({
  src,
  alt,
  size = 'md',
  fallback,
  online
}: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  };
  return <div className="relative inline-block">
      <div className={`
        ${sizes[size]} 
        rounded-full 
        overflow-hidden 
        bg-gradient-to-br from-cloud-green to-cloud-blue
        flex items-center justify-center
        shadow-cloud
        border-2 border-white dark:border-dark-bg
      `}>
        {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : fallback ? <span className="text-white font-semibold text-lg">{fallback}</span> : <UserIcon size={iconSizes[size]} className="text-white" />}
      </div>
      {online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-cloud-green rounded-full border-2 border-white dark:border-dark-bg" />}
    </div>;
}