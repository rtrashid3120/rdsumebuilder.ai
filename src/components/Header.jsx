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
    { name: 'Crimson Red', value: '#dc2626' },
    { name: 'Neon Flame', value: '#ff2a55' },
    { name: 'Cyber Yellow', value: '#eab308' },
    { name: 'Amber Gold', value: '#d97706' },
    { name: 'Obsidian Black', value: '#0f172a' },
    { name: 'Royal Indigo', value: '#4f46e5' },
    { name: 'Emerald Teal', value: '#059669' },
    { name: 'Deep Violet', value: '#7c3aed' },
  ];

  const currentColorObj = colors.find(c => c.value.toLowerCase() === accentColor.toLowerCase()) || {
    name: 'Custom Color',
    value: accentColor
  };

  const fonts = [
    { id: 'sans', label: 'Inter (Sans)' },
    { id: 'serif', label: 'Merriweather (Serif)' },
    { id: 'display', label: 'Outfit (Display)' },
  ];

  const themeIcons = {
    dark: Moon,
    light: Sun,
    system: Laptop
  };

  const ThemeIcon = themeIcons[themeMode] || Laptop;

  return (
    <header className="no-print sticky top-0 z-40 bg-slate-950/95 dark:bg-black/95 backdrop-blur-md border-b border-slate-800 text-white px-3 sm:px-4 lg:px-8 py-2.5 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Brand Executive Logo & Header Info */}
        <div className="w-full md:w-auto flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2.5">
            <ExecutiveLogo className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" />
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-none">
                  ResumeBuilder<span className="text-red-500">.ai</span>
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-400 animate-spin-slow" />
                  AI Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block mt-0.5">Smart Resume & Cover Letter Builder</p>
            </div>
          </div>

          {/* Top Mobile Quick Actions (User Profile / Logout) */}
          <div className="flex items-center gap-2 md:hidden">
            {currentUser && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-600 text-white border border-red-500/50 text-xs font-extrabold transition-all cursor-pointer shadow-md"
                title="Log Out"
              >
                <User className="w-3.5 h-3.5 text-yellow-400" />
                <span className="truncate max-w-[65px] text-[11px]">{currentUser.name}</span>
                <LogOut className="w-3.5 h-3.5 text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Responsive Customization Toolbar */}
        <div className="w-full md:w-auto flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto no-scrollbar scroll-smooth">
          
          {/* ATS Readiness Score Badge */}
          <ATSScoreMeter resume={resume} />

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Cover Letter Generator Toggle Button */}
          <button
            onClick={onOpenCoverLetter}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 rounded-xl bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
            title="Generate Matching Cover Letter"
          >
            <FileSignature className="w-3.5 h-3.5 text-yellow-400" />
            <span>Cover Letter</span>
          </button>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Template Selector Dropdown */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-300 shrink-0">
            <LayoutTemplate className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <select
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl text-xs px-2.5 py-1.5 sm:py-1 text-white font-semibold focus:outline-none focus:border-red-500 cursor-pointer min-w-[120px] sm:min-w-[140px]"
            >
              <option value="modern">Modern Slate</option>
              <option value="executive">Executive Classic</option>
              <option value="minimal">Tech Minimalist</option>
              <option value="creative">Creative Split</option>
              <option value="compact">Compact ATS</option>
              <option value="elegant">Luxe Serif</option>
            </select>
          </div>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Font Selector Dropdown */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-300 shrink-0">
            <Type className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <select
              value={activeFont}
              onChange={(e) => setActiveFont(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl text-xs px-2 py-1.5 sm:py-1 text-white font-semibold focus:outline-none focus:border-yellow-400 cursor-pointer min-w-[110px]"
            >
              {fonts.map(f => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Accent Color Dropdown */}
          <div className="relative shrink-0" ref={colorMenuRef}>
            <button
              onClick={() => setShowColorMenu(!showColorMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-white border border-slate-800 transition-all cursor-pointer whitespace-nowrap"
              title="Accent Color Selection"
            >
              <Palette className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <div 
                className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs shrink-0" 
                style={{ backgroundColor: accentColor }}
              />
              <span className="hidden sm:inline truncate max-w-[90px]">{currentColorObj.name}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showColorMenu ? 'rotate-180' : ''}`} />
            </button>

            {showColorMenu && (
              <div className="fixed inset-x-4 top-20 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-[9999] animate-fade-in space-y-2.5 text-white backdrop-blur-xl">
                <div className="px-1 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-400 border-b border-slate-800 flex items-center justify-between">
                  <span>Select Color Accent</span>
                  <span className="text-[10px] text-slate-400 font-mono">{accentColor}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {colors.map((c) => {
                    const isSelected = accentColor.toLowerCase() === c.value.toLowerCase();
                    return (
                      <button
                        key={c.name}
                        onClick={() => {
                          setAccentColor(c.value);
                          setShowColorMenu(false);
                        }}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-950/60 border-red-500 text-yellow-400 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span 
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: c.value }}
                        />
                        <span className="truncate text-xs">{c.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-yellow-400 ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-1">
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Pipette className="w-3.5 h-3.5 text-red-400" /> Custom Hex:
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-7 h-7 rounded-lg border-0 p-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white font-mono text-center focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons & Export Controls */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-1.5 sm:gap-2 shrink-0">
          
          {/* Theme & Reset Controls */}
          <div className="flex items-center gap-1.5">
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                title="Theme Mode: Light / Dark / System Adaptive"
              >
                <ThemeIcon className="w-3.5 h-3.5 text-yellow-400" />
                <span className="hidden lg:inline capitalize">{themeMode}</span>
              </button>

              {showThemeMenu && (
                <div className="fixed inset-x-4 top-20 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-[9999] animate-fade-in space-y-1 backdrop-blur-xl">
                  <button
                    onClick={() => {
                      setThemeMode('system');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                      themeMode === 'system' ? 'bg-red-600/20 text-yellow-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Laptop className="w-4 h-4 text-yellow-400" />
                    <span>💻 System Auto</span>
                  </button>

                  <button
                    onClick={() => {
                      setThemeMode('dark');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                      themeMode === 'dark' ? 'bg-red-600/20 text-yellow-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span>🌙 Dark Mode</span>
                  </button>

                  <button
                    onClick={() => {
                      setThemeMode('light');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                      themeMode === 'light' ? 'bg-red-600/20 text-yellow-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>☀️ Light Mode</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onLoadSample}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-800 transition-colors cursor-pointer"
              title="Populate with sample data"
            >
              <FileCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span className="hidden sm:inline">Sample Data</span>
            </button>

            <button
              onClick={onClear}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors cursor-pointer"
              title="Reset form"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isPreviewMode 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
            </button>

            {/* Download Dropdown Button */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-xs font-extrabold text-black shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span>Download</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
              </button>

              {showExportMenu && (
                <div className="fixed inset-x-4 top-20 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-[9999] animate-fade-in space-y-1.5 text-white backdrop-blur-xl">
                  <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 border-b border-slate-800 mb-1">
                    Download Format:
                  </div>

                  <button
                    onClick={() => {
                      setShowExportMenu(false);
                      onDownloadPDF();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-100 hover:bg-red-950/60 hover:text-yellow-400 rounded-xl transition-colors text-left cursor-pointer border border-transparent hover:border-red-500/40"
                  >
                    <Download className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <p className="font-extrabold text-white">PDF Document (.pdf)</p>
                      <p className="text-[10px] text-slate-400 font-normal">Printable Vector PDF Layout</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowExportMenu(false);
                      exportAsDocx(resume);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-100 hover:bg-blue-950/60 hover:text-yellow-400 rounded-xl transition-colors text-left cursor-pointer border border-transparent hover:border-blue-500/40"
                  >
                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <p className="font-extrabold text-white">Microsoft Word (.docx)</p>
                      <p className="text-[10px] text-slate-400 font-normal">Editable Word Document</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Log Out Button */}
            {currentUser && (
              <button
                onClick={onLogout}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-600 text-white border border-red-500/50 text-xs font-extrabold transition-all cursor-pointer shadow-md ml-1"
                title="Log out and return to Login Screen"
              >
                <User className="w-3.5 h-3.5 text-yellow-400" />
                <span className="truncate max-w-[80px] text-xs">{currentUser.name}</span>
                <LogOut className="w-3.5 h-3.5 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
