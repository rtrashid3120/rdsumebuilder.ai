import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck, Check } from 'lucide-react';

export default function GoogleAccountPickerModal({ isOpen, onClose, onSelectAccount }) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  if (!isOpen) return null;

  const defaultAccounts = [
    {
      name: 'Mohamed Rashid',
      email: 'mohamed.rashid@gmail.com',
      avatar: 'MR',
      color: 'bg-red-600'
    },
    {
      name: 'rtrashid3120',
      email: 'rtrashid3120@gmail.com',
      avatar: 'RT',
      color: 'bg-indigo-600'
    }
  ];

  const handleSelect = (account) => {
    onSelectAccount(account);
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail) return;
    const name = customName || customEmail.split('@')[0];
    onSelectAccount({
      name,
      email: customEmail,
      avatar: name.substring(0, 2).toUpperCase(),
      color: 'bg-amber-600'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Google G Icon */}
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 shadow-sm shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Choose an account</h2>
              <p className="text-xs text-slate-500">to continue to <strong className="text-slate-800">ResumeBuilder.ai</strong></p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {showCustomInput ? (
          /* Custom Gmail Input Mode */
          <form onSubmit={handleCustomSubmit} className="space-y-4 pt-2 animate-fade-in">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Enter your Gmail Address</label>
              <input
                type="email"
                required
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="your.name@gmail.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Display Name (Optional)</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Mohamed Rashid"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md"
              >
                Sign In with Gmail
              </button>
            </div>
          </form>
        ) : (
          /* Account Selector List */
          <div className="space-y-2">
            {defaultAccounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(acc)}
                className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${acc.color} text-white font-black text-sm flex items-center justify-center shadow-md`}>
                    {acc.avatar}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600">{acc.name}</h3>
                    <p className="text-[11px] text-slate-500">{acc.email}</p>
                  </div>
                </div>
                <Check className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}

            {/* Add Another Account Button */}
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-slate-50 text-left transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800">Use another Gmail account</h3>
                <p className="text-[11px] text-slate-500">Type any custom Gmail address</p>
              </div>
            </button>
          </div>
        )}

        {/* Footer Security Notice */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            To continue, Google will share your name, email address, and profile picture with ResumeBuilder.ai.
          </p>
        </div>
      </div>
    </div>
  );
}
