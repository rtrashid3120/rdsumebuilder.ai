import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Download, Eye, RotateCcw, FileCheck, LayoutTemplate, Palette, Type, ChevronDown, FileText, FileCode, Database, FileSpreadsheet, Zap, Sun, Moon, Laptop, Check, Pipette } from 'lucide-react';
import { exportAsPlainText, exportAsJSON, exportAsHTML, exportAsDocx } from '../utils/exportHelpers';

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
  setThemeMode
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
    <header className="no-print sticky top-0 z-40 bg-slate-950/95 dark:bg-black/95 backdrop-blur-md border-b border-slate-800 text-white px-4 lg:px-8 py-2.5 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-red-600/30 border border-yellow-400/40 shrink-0">
            <Zap className="w-4 h-4 text-black fill-black animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white leading-none">
                ResuCraft<span className="text-red-500">.ai</span>
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                <Sparkles className="w-2.5 h-2.5 text-yellow-400 animate-spin-slow" />
                AI Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block mt-0.5">Smart Resume Builder</p>
          </div>
        </div>

        {/* Compact, Neat Customization Toolbar */}
        <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 shadow-inner">
          
          {/* Template Selector Dropdown */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <LayoutTemplate className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <select
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs px-2 py-1 text-white font-medium focus:outline-none focus:border-red-500 cursor-pointer max-w-[130px] sm:max-w-none"
            >
              <option value="modern">Modern Slate</option>
              <option value="executive">Executive Classic</option>
              <option value="minimal">Tech Minimalist</option>
              <option value="creative">Creative Split</option>
              <option value="compact">Compact ATS</option>
              <option value="elegant">Luxe Serif</option>
            </select>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Font Selector Dropdown */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Type className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <select
              value={activeFont}
              onChange={(e) => setActiveFont(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs px-2 py-1 text-white font-medium focus:outline-none focus:border-yellow-400 cursor-pointer"
            >
              {fonts.map(f => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* NEW: Compact Accent Color Dropdown Menu */}
          <div className="relative" ref={colorMenuRef}>
            <button
              onClick={() => setShowColorMenu(!showColorMenu)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-white border border-slate-800 transition-all cursor-pointer"
              title="Accent Color Selection"
            >
              <Palette className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <div 
                className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs shrink-0" 
                style={{ backgroundColor: accentColor }}
              />
              <span className="hidden md:inline truncate max-w-[90px]">{currentColorObj.name}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showColorMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Compact Color Picker Dropdown Panel */}
            {showColorMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-fade-in space-y-2 text-white">
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
                        onClick={() => {
                          setAccentColor(c.value);
                          setShowColorMenu(false);
                        }}
                        className={`flex items-center gap-2 p-1.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-950/40 border-red-500 text-yellow-400 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: c.value }}
                        />
                        <span className="truncate text-[11px]">{c.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-yellow-400 ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Hex Color Input Row */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-1">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <Pipette className="w-3 h-3 text-red-400" /> Custom Hex:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-6 h-6 rounded-md border-0 p-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-16 bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-[11px] text-white font-mono text-center focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-2 relative">
          
          {/* Dynamic Theme Mode Switcher */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Theme Mode: Light / Dark / System Adaptive"
            >
              <ThemeIcon className="w-3.5 h-3.5 text-yellow-400" />
              <span className="hidden lg:inline capitalize">{themeMode}</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-50 animate-fade-in space-y-0.5">
                <button
                  onClick={() => {
                    setThemeMode('system');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
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
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
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
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
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
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-800 transition-colors cursor-pointer"
            title="Populate with sample data"
          >
            <FileCheck className="w-3.5 h-3.5 text-yellow-400" />
            <span className="hidden sm:inline">Sample Data</span>
          </button>

          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            title="Reset form"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isPreviewMode 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPreviewMode ? 'Edit Mode' : 'Full Preview'}</span>
          </button>

          {/* Export Dropdown Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-xs font-extrabold text-black shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Download</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 animate-fade-in space-y-0.5 text-white">
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 border-b border-slate-800 mb-1">
                  Select Export Format:
                </div>

                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    onDownloadPDF();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-red-950/50 hover:text-yellow-400 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <Download className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="font-bold">PDF Document (.pdf)</p>
                    <p className="text-[10px] text-slate-400 font-normal">Printable Vector PDF Layout</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    exportAsDocx(resume);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-red-950/50 hover:text-yellow-400 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="font-bold">Microsoft Word (.doc)</p>
                    <p className="text-[10px] text-slate-400 font-normal">Editable Word Document</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    exportAsPlainText(resume);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-red-950/50 hover:text-yellow-400 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="font-bold">Plain Text ATS (.txt)</p>
                    <p className="text-[10px] text-slate-400 font-normal">Clean Text for Job Portals</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    exportAsJSON(resume);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-red-950/50 hover:text-yellow-400 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <Database className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="font-bold">JSON Data Backup (.json)</p>
                    <p className="text-[10px] text-slate-400 font-normal">Full Data Object Backup</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    exportAsHTML('printable-resume', resume.personalInfo.fullName);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-red-950/50 hover:text-yellow-400 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-purple-400" />
                  <div>
                    <p className="font-bold">HTML Web Page (.html)</p>
                    <p className="text-[10px] text-slate-400 font-normal">Self-contained Web Resume</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
