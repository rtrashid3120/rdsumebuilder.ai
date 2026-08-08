import React from 'react';

export default function ExecutiveLogo({ className = "w-9 h-9" }) {
  return (
    <div className={`relative group cursor-pointer ${className}`}>
      {/* Glow aura background animation */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300 group-hover:blur-md" />
      
      {/* Main Container Box */}
      <div className="relative w-full h-full bg-slate-950 rounded-xl border border-yellow-400/30 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-yellow-400 transition-all duration-300">
        {/* Sleek Executive Shadow Silhouette SVG */}
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300"
        >
          <defs>
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            <linearGradient id="tieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Ambient Shadow */}
          <circle cx="16" cy="16" r="14" fill="#090d16" />

          {/* Head & Collar Silhouette */}
          <circle 
            cx="16" 
            cy="10" 
            r="4.2" 
            fill="url(#suitGrad)"
          />

          {/* Suit Jacket Lapels / Shoulders */}
          <path 
            d="M7 26C7 21.5 10.5 18 16 18C21.5 18 25 21.5 25 26V27H7V26Z" 
            fill="url(#suitGrad)"
            opacity="0.95"
          />

          {/* Crisp V-Neck Suit Lapel Inset (Dark Inner V) */}
          <path 
            d="M12 18L16 23.5L20 18" 
            fill="#090d16" 
          />

          {/* Executive Necktie Icon */}
          <path 
            d="M15.1 18.5H16.9L17.4 20L16 25L14.6 20L15.1 18.5Z" 
            fill="url(#tieGrad)" 
            filter="url(#glow)"
          />

          {/* AI Sparkle Star on Collar */}
          <path 
            d="M22 8L22.6 9.4L24 10L22.6 10.6L22 12L21.4 10.6L20 10L21.4 9.4L22 8Z" 
            fill="#facc15" 
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
}
