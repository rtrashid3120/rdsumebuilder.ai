import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Download, Eye, RotateCcw, FileCheck, LayoutTemplate, Palette, Type, ChevronDown, FileText, Sun, Moon, Laptop, Check, Pipette, FileSignature, User, LogOut } from 'lucide-react';
import { exportAsDocx } from '../utils/exportHelpers';
import ATSScoreMeter from './ATSScoreMeter';
import ExecutiveLogo from './ExecutiveLogo';

export default function Header({ 
  onLoadSample, 
  onClear, 
  onDownloadPDF, 
  isPreviewMode, 
  setIsPreviewMode,
  activeTemplate,
  setActiveTemplate,
  accentColor,
  setAccentColor,
  activeFont,
  setActiveFont,
  isExporting,
  resume,
  themeMode,
  setThemeMode,
  currentUser,
  onLogout,
  onOpenCoverLetter
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  const menuRef = useRef(null);
  const themeMenuRef = useRef(null);
  const colorMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
      if (colorMenuRef.current && !colorMenuRef.current.contains(event.target)) {
        setShowColorMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const colors = [
    { name: 'Emerald Green', value: '#10b981' },
    { name: 'Teal Mint', value: '#14b8a6' },
    { name: 'Amber Gold', value: '#f59e0b' },
    { name: 'Royal Sapphire', value: '#3b82f6' },
    { name: 'Deep Violet', value: '#8b5cf6' },
    { name: 'Crimson Red', value: '#ef4444' },
    { name: 'Obsidian Black', value: '#0f172a' },
    { name: 'Sunset Coral', value: '#f97316' },
  ];

  const currentColorObj = colors.find(c => c.value.toLowerCase() === accentColor.toLowerCase()) || {
    name: 'Custom Color',
    value: accentColor
  };

  const fonts = [
    { id: 'sans', label: 'Inter (Modern Sans)' },
    { id: 'roboto', label: 'Roboto (Tech Sans)' },
    { id: 'serif', label: 'Merriweather (Classic Serif)' },
    { id: 'playfair', label: 'Playfair (Luxury Serif)' },
    { id: 'display', label: 'Outfit (Modern Display)' },
    { id: 'jakarta', label: 'Plus Jakarta (SaaS Sans)' },
    { id: 'fira', label: 'Fira Code (Tech Mono)' },
    { id: 'lora', label: 'Lora (Refined Serif)' },
  ];

  const themeIcons = {
    dark: Moon,
    light: Sun,
    system: Laptop
  };

  const ThemeIcon = themeIcons[themeMode] || Laptop;

  return (
    <header className="no-print sticky top-0 z-40 bg-slate-950/95 dark:bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800 text-white px-3 sm:px-4 lg:px-8 py-2.5 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        
        {/* Brand Executive Logo & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ExecutiveLogo className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-none">
                ResumeBuilder<span className="text-emerald-400">.ai</span>
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400/10 text-amber-400 border border-amber-400/30">
                <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-spin-slow" />
                AI Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block mt-0.5">Smart Resume & Cover Letter Builder</p>
          </div>
        </div>

        {/* Customization Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-slate-800 shadow-inner">
          
          {/* ATS Readiness Score Badge */}
          <ATSScoreMeter resume={resume} />

          <div className="h-4 w-px bg-slate-800" />

          {/* Cover Letter Generator Toggle Button */}
          <button
            type="button"
            onClick={onOpenCoverLetter}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0"
            title="Generate Matching Cover Letter"
          >
            <FileSignature className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cover Letter</span>
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Template Selector Dropdown (10 Premium Templates) */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-300 shrink-0">
            <LayoutTemplate className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <select
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs px-2 py-1 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer max-w-[110px] sm:max-w-none"
            >
              <option value="modern">Modern Slate</option>
              <option value="executive">Executive Classic</option>
              <option value="creative">Creative Split</option>
              <option value="minimal">Tech Minimalist</option>
              <option value="compact">Compact ATS Max</option>
              <option value="elegant">Luxe Serif</option>
              <option value="silicon">Silicon Valley</option>
              <option value="corporate">Corporate Grid</option>
              <option value="academic">Academic CV</option>
              <option value="pill">Modern Pill Header</option>
            </select>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block" />

          {/* Font Selector Dropdown (8 Professional Fonts) */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Type className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <select
              value={activeFont}
              onChange={(e) => setActiveFont(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs px-2 py-1 text-white font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {fonts.map(f => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block" />

          {/* Accent Color Dropdown */}
          <div className="relative shrink-0" ref={colorMenuRef}>
            <button
              type="button"
              onClick={() => setShowColorMenu(!showColorMenu)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-white border border-slate-800 transition-all cursor-pointer"
              title="Accent Color Selection"
            >
              <Palette className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div 
                className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs shrink-0" 
                style={{ backgroundColor: accentColor }}
              />
              <span className="hidden lg:inline truncate max-w-[90px]">{currentColorObj.name}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showColorMenu ? 'rotate-180' : ''}`} />
            </button>

            {showColorMenu && (
              <>
                {/* Mobile Blur Backdrop for easy dismissal */}
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9998] sm:hidden"
                  onClick={() => setShowColorMenu(false)}
                />
                <div className="fixed inset-x-4 top-20 z-[9999] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 sm:p-2 animate-fade-in space-y-2 text-white">
                  <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 border-b border-slate-800 flex items-center justify-between">
                    <span>Select Color Accent</span>
                    <span className="text-[9px] text-slate-400 font-mono">{accentColor}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {colors.map((c) => {
                      const isSelected = accentColor.toLowerCase() === c.value.toLowerCase();
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setAccentColor(c.value);
                            setShowColorMenu(false);
                          }}
                          className={`flex items-center gap-2 p-2 sm:p-1.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-950/40 border-emerald-500 text-amber-400 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span 
                            className="w-4 h-4 sm:w-3.5 sm:h-3.5 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: c.value }}
                          />
                          <span className="truncate text-xs sm:text-[11px]">{c.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-1">
                    <span className="text-xs sm:text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                      <Pipette className="w-3.5 h-3.5 text-emerald-400" /> Custom Hex:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-7 h-7 sm:w-6 sm:h-6 rounded-md border-0 p-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-18 sm:w-16 bg-slate-950 border border-slate-800 rounded px-1.5 py-1 sm:py-0.5 text-xs sm:text-[11px] text-white font-mono text-center focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons & Status Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2 relative shrink-0">
          
          {/* Silent Live Auto-Save Pill Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-bold text-emerald-400 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Auto-Saved</span>
          </div>

          {/* Dynamic Theme Switcher */}
          <div className="relative" ref={themeMenuRef}>
            <button
              type="button"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Theme Mode: Light / Dark / System Adaptive"
            >
              <ThemeIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline capitalize">{themeMode}</span>
            </button>

            {showThemeMenu && (
              <>
                {/* Mobile Blur Backdrop for easy dismissal */}
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9998] sm:hidden"
                  onClick={() => setShowThemeMenu(false)}
                />
                <div className="fixed inset-x-4 top-20 z-[9999] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 sm:p-1 animate-fade-in space-y-1 sm:space-y-0.5 text-white">
                  <button
                    type="button"
                    onClick={() => {
                      setThemeMode('system');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 sm:py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      themeMode === 'system' ? 'bg-emerald-600/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Laptop className="w-4 h-4 text-amber-400" />
                    <span>💻 System Auto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setThemeMode('dark');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 sm:py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      themeMode === 'dark' ? 'bg-emerald-600/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span>🌙 Dark Mode</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setThemeMode('light');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 sm:py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      themeMode === 'light' ? 'bg-emerald-600/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>☀️ Light Mode</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onLoadSample}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-800 transition-colors cursor-pointer"
            title="Populate with sample data"
          >
            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Sample Data</span>
          </button>

          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            title="Reset form"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isPreviewMode 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isPreviewMode ? 'Edit Mode' : 'Full Preview'}</span>
          </button>

          {/* Download Dropdown Button - Executive Emerald Gradient */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer border border-emerald-400/30 text-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>Download</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
            </button>

            {showExportMenu && (
              <>
                {/* Mobile Blur Backdrop for easy dismissal */}
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9998] sm:hidden"
                  onClick={() => setShowExportMenu(false)}
                />
                <div className="fixed inset-x-4 top-20 z-[9999] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 sm:p-1.5 animate-fade-in space-y-1 text-white">
                  <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 border-b border-slate-800 mb-1">
                    Download Format:
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowExportMenu(false);
                      onDownloadPDF();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 sm:py-2 text-xs font-bold text-slate-100 hover:bg-emerald-950/60 hover:text-emerald-300 rounded-lg transition-colors text-left cursor-pointer border border-transparent hover:border-emerald-500/40"
                  >
                    <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-extrabold text-white">PDF Document (.pdf)</p>
                      <p className="text-[10px] text-slate-400 font-normal">Printable Vector PDF Layout</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowExportMenu(false);
                      exportAsDocx(resume);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 sm:py-2 text-xs font-bold text-slate-100 hover:bg-blue-950/60 hover:text-teal-300 rounded-lg transition-colors text-left cursor-pointer border border-transparent hover:border-blue-500/40"
                  >
                    <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                    <div>
                      <p className="font-extrabold text-white">Microsoft Word (.docx)</p>
                      <p className="text-[10px] text-slate-400 font-normal">Editable Word Document</p>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Top-Right Corner Log Out Button */}
          {currentUser && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-600 text-white border border-red-500/50 text-xs font-extrabold transition-all cursor-pointer shadow-md ml-0.5"
              title="Log out and return to Login Screen"
            >
              <User className="w-3.5 h-3.5 text-yellow-400" />
              <span className="hidden md:inline truncate max-w-[80px]">{currentUser.name}</span>
              <LogOut className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
