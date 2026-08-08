import React from 'react';

export default function ExecutiveLogo({ className = "w-11 h-11" }) {
  return (
    <div className={`relative group cursor-pointer select-none ${className}`}>
      
      {/* 1. Multi-Layered Glowing Pulsing Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 rounded-2xl blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse" />
      
      {/* 2. Interactive Outer Glassmorphism Shield Container */}
      <div className="relative w-full h-full bg-slate-950 rounded-2xl border-2 border-yellow-400/40 group-hover:border-yellow-400 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-105 group-active:scale-95">
        
        {/* Subtle Metallic Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:8px_8px] opacity-20" />

        {/* 3. Broad-Shouldered Corporate Suit Silhouette SVG */}
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 relative z-10 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 drop-shadow-[0_4px_10px_rgba(220,38,38,0.5)]"
        >
          <defs>
            {/* Suit Gold-Crimson Luxury Gradient */}
            <linearGradient id="execSuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="45%" stopColor="#dc2626" />
              <stop offset="85%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>

            {/* Tie Gold Gradient */}
            <linearGradient id="execTieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#facc15" />
              <stop offset="80%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            {/* Peak Lapel Accent Gradient */}
            <linearGradient id="lapelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            <filter id="execGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Dark Ambient Oval Background */}
          <ellipse cx="20" cy="20" rx="18" ry="18" fill="#070a12" />

          {/* Powerful Executive Head & Confidence Stance */}
          <path 
            d="M20 5C17.2 5 15 7.2 15 10C15 12.8 17.2 15 20 15C22.8 15 25 12.8 25 10C25 7.2 22.8 5 20 5Z" 
            fill="url(#execSuitGrad)" 
            filter="url(#execGlow)"
          />

          {/* BROAD-SHOULDERED CORPORATE SUIT (Wide Athletic Executive Posture) */}
          <path 
            d="M3 34C3 24 10 19 20 19C30 19 37 24 37 34V36H3V34Z" 
            fill="url(#execSuitGrad)"
          />

          {/* Sharp Tailored Shoulder Pads Line Highlights */}
          <path 
            d="M3 33L11 22.5M37 33L29 22.5" 
            stroke="url(#lapelGrad)" 
            strokeWidth="1.2" 
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* V-Neck Corporate Shirt Opening */}
          <path 
            d="M13 19L20 27L27 19H13Z" 
            fill="#090d16" 
          />

          {/* Crisp White Executive Shirt Collar Peak */}
          <path 
            d="M15 19L20 23L25 19" 
            stroke="#f8fafc" 
            strokeWidth="1" 
            strokeLinecap="round"
          />

          {/* LUXURY GOLD EXECUTIVE TIE WITH TIE CLIP */}
          <path 
            d="M18.8 19.5H21.2L22 21.5L20 32L18 21.5L18.8 19.5Z" 
            fill="url(#execTieGrad)" 
            filter="url(#execGlow)"
          />

          {/* Gold Tie Knot */}
          <polygon 
            points="18.5,19.2 21.5,19.2 20.8,21 19.2,21" 
            fill="#fef08a" 
          />

          {/* Metallic Gold Tie Bar Clip */}
          <line 
            x1="18.2" y1="24" x2="21.8" y2="24" 
            stroke="#ffffff" 
            strokeWidth="1.2" 
            strokeLinecap="round"
          />

          {/* AI Executive Crown / Sparkle Emblem Top Right */}
          <path 
            d="M30 6L30.8 7.8L32.6 8.6L30.8 9.4L30 11.2L29.2 9.4L27.4 8.6L29.2 7.8L30 6Z" 
            fill="#fef08a" 
            className="animate-pulse"
          />
        </svg>

        {/* Glossy Glass Specular Reflection Highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
