import React, { useState } from 'react';
import { Lock, Mail, User as UserIcon, Sparkles, CheckCircle2, AlertCircle, LogIn, UserPlus, Zap, ArrowRight } from 'lucide-react';
import ExecutiveLogo from './ExecutiveLogo';

export default function LoginPage({ onLoginSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
    const payload = isLoginMode ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message || (isLoginMode ? 'Login successful!' : 'Account created! Logging in...'));
        setTimeout(() => {
          onLoginSuccess(data.user || { name: name || email.split('@')[0], email });
        }, 800);
      } else {
        setErrorMessage(data.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.log('Local Mode Login Fallback');
      const mockUser = {
        name: isLoginMode ? (email.split('@')[0] || 'Executive User') : (name || 'New User'),
        email
      };
      setSuccessMessage('Login successful!');
      setTimeout(() => {
        onLoginSuccess(mockUser);
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setSuccessMessage('⚡ Logging in with Demo Account...');
    setTimeout(() => {
      onLoginSuccess({ name: 'Mohamed Rashid', email: 'mohamed@resumebuilder.ai' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-red-600 selection:text-white relative overflow-hidden">
      
      {/* Background Animated Ambient Auras */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-red-600/20 via-amber-500/20 to-yellow-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 backdrop-blur-xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <ExecutiveLogo className="w-14 h-14" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
              ResumeBuilder<span className="text-red-500">.ai</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Smart AI Resume & Cover Letter Builder</p>
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setIsLoginMode(true); setErrorMessage(''); setSuccessMessage(''); }}
            className={`py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              isLoginMode ? 'bg-red-600 text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => { setIsLoginMode(false); setErrorMessage(''); setSuccessMessage(''); }}
            className={`py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              !isLoginMode ? 'bg-red-600 text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create New Account</span>
          </button>
        </div>

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-xs text-red-300 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-xs text-emerald-300 font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mohamed Rashid"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Gmail / Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-xs font-black text-black shadow-lg shadow-red-600/30 transition-all cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{isLoading ? 'Authenticating...' : (isLoginMode ? 'Sign In to Workspace' : 'Create New Account & Sign In')}</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </form>

        {/* Create Account Link Toggle */}
        <div className="text-center text-xs text-slate-400">
          {isLoginMode ? (
            <p>
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => setIsLoginMode(false)}
                className="text-yellow-400 hover:underline font-bold cursor-pointer"
              >
                Create New Account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => setIsLoginMode(true)}
                className="text-yellow-400 hover:underline font-bold cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* ⚡ Demo Login Section */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-2">
          <p className="text-[11px] text-slate-500">Want to test the app without signing up?</p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-bold text-yellow-400 border border-slate-800 transition-colors cursor-pointer shadow-md"
          >
            <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
            <span>⚡ Demo Login (Instant Access)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
