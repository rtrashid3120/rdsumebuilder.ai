import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Download, Eye, RotateCcw, FileCheck, LayoutTemplate, Palette, Type, ChevronDown, FileText, FileCode, Database, FileSpreadsheet } from 'lucide-react';
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
  resume
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const menuRef = useRef(null);

  // Fix Item 4: Close dropdown when clicking outside so UI never gets stuck
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const colors = [
    { name: 'Royal Indigo', value: '#4f46e5' },
    { name: 'Emerald Teal', value: '#059669' },
    { name: 'Slate Navy', value: '#1e293b' },
    { name: 'Crimson Rose', value: '#dc2626' },
    { name: 'Deep Violet', value: '#7c3aed' },
    { name: 'Warm Amber', value: '#d97706' },
    { name: 'Rose Gold', value: '#e11d48' },
    { name: 'Cyan Tech', value: '#0891b2' },
    { name: 'Forest Green', value: '#15803d' },
    { name: 'Electric Purple', value: '#9333ea' },
  ];

  const fonts = [
    { id: 'sans', label: 'Inter (Clean Sans)' },
    { id: 'serif', label: 'Merriweather (Classic Serif)' },
    { id: 'display', label: 'Outfit (Modern Display)' },
  ];

  return (
    <header className="no-print sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white px-4 lg:px-8 py-3 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                ResuCraft<span className="text-indigo-400">.ai</span>
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                ✨ AI Active
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Smart Resume Builder & Real-Time Printable Preview</p>
          </div>
        </div>

        {/* Customization Toolbar */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-800 shadow-sm">
          
          {/* Template Selector */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <LayoutTemplate className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Template:</span>
            <select
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs px-2.5 py-1.5 text-white font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="modern">Modern Slate</option>
              <option value="executive">Executive Classic</option>
              <option value="minimal">Tech Minimalist</option>
              <option value="creative">Creative Split (Two-Tone)</option>
              <option value="compact">Compact Single-Page ATS</option>
              <option value="elegant">Elegant Luxe Serif</option>
            </select>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Font Selector */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Type className="w-4 h-4 text-purple-400" />
            <span>Font:</span>
            <select
              value={activeFont}
              onChange={(e) => setActiveFont(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs px-2.5 py-1.5 text-white font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {fonts.map(f => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block" />

          {/* Color Palette Dots */}
          <div className="flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-indigo-400 mr-1 hidden sm:block" />
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[180px] sm:max-w-none no-scrollbar py-0.5">
              {colors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => setAccentColor(c.value)}
                  style={{ backgroundColor: c.value }}
                  className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                    accentColor === c.value 
                      ? 'scale-125 opacity-100 shadow-sm' 
                      : 'opacity-60 hover:opacity-100 hover:scale-110'
                  }`}
                />
              ))}
            </div>

            {/* Custom Hex Color Picker */}
            <div className="relative flex items-center ml-1">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                title="Custom Hex Color Picker"
                className="w-5 h-5 rounded-full border-0 p-0 cursor-pointer bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right Actions & Multi-Format Download Dropdown */}
        <div className="flex items-center gap-2 relative" ref={menuRef}>
          <button
            onClick={onLoadSample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-200 border border-slate-800 transition-colors cursor-pointer"
            title="Populate with sample data"
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Sample Data</span>
          </button>

          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            title="Reset form"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isPreviewMode 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPreviewMode ? 'Edit Mode' : 'Full Preview'}</span>
          </button>

          {/* Export Options Button with 5 formats */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* 5 Export Format Options Menu */}
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 animate-fade-in space-y-0.5">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                  Select Export Format:
                </div>

                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    onDownloadPDF();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <Download className="w-4 h-4 text-indigo-400" />
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
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 rounded-lg transition-colors text-left cursor-pointer"
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
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 rounded-lg transition-colors text-left cursor-pointer"
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
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 rounded-lg transition-colors text-left cursor-pointer"
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
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 rounded-lg transition-colors text-left cursor-pointer"
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
