import React from 'react';

export default function ExecutiveLogo({ className = "w-11 h-11" }) {
  return (
    <div className={`relative group cursor-pointer select-none ${className}`}>
      
      {/* 1. Pulsing Ambient Crimson & Gold Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 rounded-2xl blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse" />
      
      {/* 2. Glassmorphism Shield Container */}
      <div className="relative w-full h-full bg-slate-950 rounded-2xl border-2 border-yellow-400/40 group-hover:border-yellow-400 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-105 group-active:scale-95">
        
        {/* Subtle Background Radial Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#dc2626_0%,transparent_70%)] opacity-30 group-hover:opacity-50 transition-opacity" />

        {/* 3. Vector Artwork Based Exactly on User's Uploaded Portrait Image */}
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 relative z-10 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 drop-shadow-[0_4px_12px_rgba(220,38,38,0.6)]"
        >
          <defs>
            {/* Hair & Suit Crimson Gradient */}
            <linearGradient id="execRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="40%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>

            {/* Tie Gold Gradient */}
            <linearGradient id="execGoldTie" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            {/* Lapel Highlight Gradient */}
            <linearGradient id="lapelHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            <filter id="execGlowFilter">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Dark Ambient Base Background */}
          <rect width="100" height="100" rx="20" fill="#090d16" />

          {/* SPREAD SUIT LAPELS & SHOULDERS (Matching User's Uploaded Image Silhouette) */}
          <path 
            d="M 22 66 L 38 78 L 48 95 L 2 95 L 2 80 Z" 
            fill="url(#execRedGrad)" 
          />
          <path 
            d="M 78 66 L 62 78 L 52 95 L 98 95 L 98 80 Z" 
            fill="url(#execRedGrad)" 
          />

          {/* Tailored Suit Peak Lapel Edges (Crimson & Gold Edge Lines) */}
          <path 
            d="M 22 66 L 38 78 L 48 95" 
            stroke="url(#lapelHighlight)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <path 
            d="M 78 66 L 62 78 L 52 95" 
            stroke="url(#lapelHighlight)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />

          {/* WHITE COLLARED SHIRT INSET (Matching Uploaded Image V-Neck) */}
          <polygon 
            points="38,58 62,58 50,88" 
            fill="#ffffff" 
          />

          {/* GLOWING GOLD EXECUTIVE NECKTIE */}
          <polygon 
            points="46,67 54,67 56,73 50,92 44,73" 
            fill="url(#execGoldTie)" 
            filter="url(#execGlowFilter)"
          />
          {/* Tie Knot */}
          <polygon 
            points="45.5,67 54.5,67 53,71 47,71" 
            fill="#fef08a" 
          />
          {/* Tie Bar Clip */}
          <line 
            x1="44.5" y1="77" x2="55.5" y2="77" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeLinecap="round"
          />

          {/* HIGH-CONTRAST PORTRAIT HEAD & SHADOW CONTOUR (Matching Uploaded Image Face & Jawline) */}
          {/* Left Shadow Face Silhouette */}
          <path 
            d="M 50 26 C 45 26 40 28 37 32 C 34 38 34 45 38 48 C 42 50 48 50 50 66 C 50 66 52 50 55 48 C 60 45 64 36 60 30 C 57 26 52 26 50 26 Z" 
            fill="url(#execRedGrad)"
          />

          {/* High-Contrast Face Shadow Inset (Right Half Shadow Matching Uploaded Image) */}
          <path 
            d="M 50 26 C 53 26 57 29 58 34 C 59 38 57 43 54 46 L 50 64 L 50 26 Z" 
            fill="#090d16" 
          />

          {/* STYLISH SWEPT HAIRSTYLE WAVES (Matching Exact Hair Silhouette from Uploaded Image) */}
          <path 
            d="M 50 10 C 40 10 33 16 33 24 C 33 28 36 32 37 34 C 36 29 38 23 43 20 C 48 17 56 18 61 14 C 66 10 68 14 71 14 C 68 18 64 22 64 26 C 67 22 71 18 70 14 C 70 10 64 10 50 10 Z" 
            fill="url(#execRedGrad)" 
            filter="url(#execGlowFilter)"
          />

          {/* Front Swept Hair Lock Wave Highlight */}
          <path 
            d="M 44 20 C 50 16 60 17 65 12 C 60 15 52 15 47 18 Z" 
            fill="#fef08a" 
          />

          {/* Smart AI Sparkle Lapel Pin (Connecting to ResumeBuilder.ai Theme) */}
          <path 
            d="M 75 70 L 76.2 72.4 L 78.6 73.6 L 76.2 74.8 L 75 77.2 L 73.8 74.8 L 71.4 73.6 L 73.8 72.4 L 75 70 Z" 
            fill="#fef08a" 
            className="animate-pulse"
          />
        </svg>

        {/* Specular Reflection Gloss Layer */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
