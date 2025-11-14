import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CloudIcon } from '../components/ui/CloudIcon';
import { PowerIcon, KeyboardIcon, EyeIcon, EyeOffIcon, ArrowLeftIcon, PlusIcon } from 'lucide-react';
import { User } from '../App';

export function LoginScreen({
  users,
  onLogin,
  onCreateAccount
}: {
  users: User[];
  onLogin: (user: User) => void;
  onCreateAccount: () => void;
}) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPowerMenu, setShowPowerMenu] = useState(false);

  const handleLogin = () => {
    if (selectedUser) {
      onLogin(selectedUser);
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setPassword('');
  };

  const handleBack = () => {
    setSelectedUser(null);
    setPassword('');
  };
  return <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/icons/hills.jpg')" }}
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => <div key={i} className="absolute opacity-5" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${10 + Math.random() * 5}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 3}s`
      }}>
            <CloudIcon size={60 + Math.random() * 80} />
          </div>)}
      </div>

      {/* Top Bar */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
        <button className="w-12 h-12 rounded-cloud bg-white/60 backdrop-blur-sm hover:bg-white/80 flex items-center justify-center transition-all duration-200 shadow-cloud">
          <KeyboardIcon size={20} className="text-cloud-gray-deeper" />
        </button>
        <div className="relative">
          <button onClick={() => setShowPowerMenu(!showPowerMenu)} className="w-12 h-12 rounded-cloud bg-white/60 backdrop-blur-sm hover:bg-white/80 flex items-center justify-center transition-all duration-200 shadow-cloud">
            <PowerIcon size={20} className="text-cloud-gray-deeper" />
          </button>

          {showPowerMenu && <div className="absolute top-14 right-0 bg-white/90 backdrop-blur-cloud rounded-cloud-lg shadow-cloud-lg p-2 min-w-[160px] animate-scale-in">
              <button className="w-full px-4 py-3 text-left rounded-cloud hover:bg-cloud-gray/30 transition-colors text-cloud-gray-deeper font-medium">
                Sleep
              </button>
              <button className="w-full px-4 py-3 text-left rounded-cloud hover:bg-cloud-gray/30 transition-colors text-cloud-gray-deeper font-medium">
                Restart
              </button>
              <button className="w-full px-4 py-3 text-left rounded-cloud hover:bg-red-50 transition-colors text-red-600 font-medium">
                Shutdown
              </button>
            </div>}
        </div>
      </div>

      {/* macOS-Style User Selection */}
      {!selectedUser ? (
        <div className="relative z-10 w-full max-w-5xl px-6 animate-fade-in">
          {/* User Grid - macOS Style */}
          <div className="flex items-center justify-center gap-8 mb-8">
            {users.map(user => (
              <button
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="group flex flex-col items-center gap-4 p-8 rounded-cloud-xl bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 hover:scale-105 hover:shadow-cloud-lg min-w-[200px]"
              >
                {/* Large Avatar */}
                <div className="relative">
                  {user.profilePhoto ? (
                    <div className="w-32 h-32 rounded-full shadow-cloud-lg group-hover:shadow-cloud-xl transition-all duration-300 overflow-hidden">
                      <img 
                        src={user.profilePhoto} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${user.wallpaper.gradient} flex items-center justify-center text-white text-4xl font-bold shadow-cloud-lg group-hover:shadow-cloud-xl transition-all duration-300`}>
                      {user.avatar}
                    </div>
                  )}
                </div>

                {/* User Name */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-cloud-gray-deeper group-hover:text-cloud-green transition-colors">
                    {user.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Create Account - Bottom Center */}
          <div className="text-center">
            <button 
              onClick={onCreateAccount} 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-cloud-lg bg-white/40 backdrop-blur-sm hover:bg-white/60 text-cloud-gray-deeper hover:text-cloud-green font-semibold transition-all duration-200 shadow-cloud hover:shadow-cloud-lg"
            >
              <PlusIcon size={20} />
              Create a new account
            </button>
          </div>
        </div>
      ) : (
        /* Password Entry Screen */
        <div className="relative z-10 w-full max-w-md px-6 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg p-8 border border-cloud-gray/20">
            {/* Back Button */}
            <button 
              onClick={handleBack}
              className="absolute top-4 left-4 p-2 hover:bg-cloud-gray/20 rounded-cloud transition-colors"
            >
              <ArrowLeftIcon size={20} className="text-cloud-gray-deeper" />
            </button>

            {/* User Avatar */}
            <div className="flex justify-center mb-4 mt-4">
              {selectedUser.profilePhoto ? (
                <div className="w-24 h-24 rounded-full shadow-cloud-lg overflow-hidden">
                  <img 
                    src={selectedUser.profilePhoto} 
                    alt={selectedUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedUser.wallpaper.gradient} flex items-center justify-center text-white text-3xl font-bold shadow-cloud-lg`}>
                  {selectedUser.avatar}
                </div>
              )}
            </div>

            {/* User Name */}
            <h2 className="text-2xl font-semibold text-center text-cloud-gray-deeper mb-2">
              {selectedUser.name}
            </h2>
            <p className="text-center text-cloud-gray-deeper/70 mb-6 font-medium">
              Welcome back to CloudOS
            </p>

            {/* Password Input */}
            <div className="mb-6 relative">
              <Input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter your password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
                autoFocus
              />
              <button 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cloud-gray-deeper/70 hover:text-cloud-gray-deeper transition-colors"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>

            {/* Login Button */}
            <Button variant="primary" className="w-full mb-4" onClick={handleLogin}>
              Sign In
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <button className="text-cloud-gray-deeper/70 hover:text-cloud-green transition-colors text-sm font-medium">
                Forgot password?
              </button>
            </div>
          </div>
        </div>
      )}
    </div>;
}