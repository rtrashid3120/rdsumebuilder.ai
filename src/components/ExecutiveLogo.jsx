import React from 'react';

export default function ExecutiveLogo({ className = "w-11 h-11" }) {
  return (
    <div className={`relative group cursor-pointer select-none ${className}`}>
      
      {/* 1. Multi-Layer Pulsing Ambient Glow Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 rounded-2xl blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse" />
      
      {/* 2. Glassmorphism Shield Container */}
      <div className="relative w-full h-full bg-slate-950 rounded-2xl border-2 border-yellow-400/40 group-hover:border-yellow-400 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-105 group-active:scale-95 p-1">
        
        {/* Subtle Radial Glow Accent Behind Image */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#dc2626_0%,transparent_70%)] opacity-30 group-hover:opacity-60 transition-opacity" />

        {/* 3. EXACT UPLOADER PORTRAIT IMAGE */}
        <img 
          src="/executive-logo.png" 
          alt="Executive Shadow Portrait Logo"
          className="relative z-10 w-full h-full object-cover rounded-xl filter contrast-125 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(220,38,38,0.6)]"
        />

        {/* Specular Reflection Gloss Overlay */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
