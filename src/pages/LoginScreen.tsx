import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { CloudIcon } from '../components/ui/CloudIcon';
import { PowerIcon, KeyboardIcon, EyeIcon, EyeOffIcon, ChevronLeftIcon } from 'lucide-react';
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
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0] || null);
  const [showUserList, setShowUserList] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPowerMenu, setShowPowerMenu] = useState(false);

  const handleLogin = () => {
    if (selectedUser) {
      onLogin(selectedUser);
    }
  };

  const handleSwitchUser = () => {
    setShowUserList(true);
    setPassword('');
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setShowUserList(false);
    setPassword('');
  };
  return <div className="w-full min-h-screen bg-gradient-to-br from-cloud-cream via-cloud-green/20 to-cloud-blue/20 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => <div key={i} className="absolute opacity-10" style={{
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in">
        {!showUserList && selectedUser ? (
          <div className="bg-white/80 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg p-8 border border-cloud-gray/20">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <CloudIcon size={80} />
            </div>

            {/* User Avatar */}
            <div className="flex justify-center mb-6">
              <Avatar size="xl" fallback={selectedUser.avatar} online />
            </div>

            {/* User Name */}
            <h2 className="text-2xl font-semibold text-center text-cloud-gray-deeper mb-2">
              {selectedUser.name}
            </h2>
            <p className="text-center text-cloud-gray-dark mb-8">
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
              />
              <button 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cloud-gray-dark hover:text-cloud-gray-deeper transition-colors"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>

            {/* Login Button */}
            <Button variant="primary" className="w-full mb-4" onClick={handleLogin}>
              Sign In
            </Button>

            {/* Additional Options */}
            <div className="flex items-center justify-between text-sm">
              <button className="text-cloud-gray-dark hover:text-cloud-green transition-colors">
                Forgot password?
              </button>
              <button 
                onClick={handleSwitchUser}
                className="text-cloud-gray-dark hover:text-cloud-green transition-colors"
              >
                Switch user
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-cloud rounded-cloud-xl shadow-cloud-lg p-8 border border-cloud-gray/20">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <CloudIcon size={80} />
            </div>

            <h2 className="text-2xl font-semibold text-center text-cloud-gray-deeper mb-2">
              Select User
            </h2>
            <p className="text-center text-cloud-gray-dark mb-8">
              Who's using CloudOS?
            </p>

            {/* User List */}
            <div className="space-y-3 mb-6">
              {users.map(user => (
                <button
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="w-full flex items-center gap-4 p-4 rounded-cloud-lg bg-cloud-gray/10 hover:bg-cloud-green/20 transition-all duration-200 border-2 border-transparent hover:border-cloud-green"
                >
                  <Avatar size="md" fallback={user.avatar} />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-cloud-gray-deeper">{user.name}</div>
                    <div className="text-sm text-cloud-gray-dark">Click to sign in</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Back Button */}
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => setShowUserList(false)}
            >
              <ChevronLeftIcon size={18} className="mr-2" />
              Back
            </Button>
          </div>
        )}

        {/* Create Account */}
        {!showUserList && (
          <div className="mt-6 text-center">
            <button onClick={onCreateAccount} className="text-cloud-gray-deeper hover:text-cloud-green font-medium transition-colors">
              Create a new account
            </button>
          </div>
        )}
      </div>
    </div>;
}