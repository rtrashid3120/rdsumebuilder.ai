import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { calculateATSScore } from '../utils/atsScorer';
import { ShieldCheck, ChevronDown, CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

export default function ATSScoreMeter({ resume }) {
  const [isOpen, setIsOpen] = useState(false);

  const atsData = calculateATSScore(resume);
  const { score, statusText, badgeColor, breakdown, feedbackTips } = atsData;

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative">
      
      {/* Header Button Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-md ${badgeColor}`}
        title="Real-Time ATS Readiness Score Meter"
      >
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>ATS Score:</span>
        <span className="text-sm font-black tracking-tight">{score}</span>
        <span className="text-[10px] opacity-80 uppercase tracking-wider hidden md:inline">/100</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 🔴 REACT PORTAL: MOUNTED DIRECTLY TO DOCUMENT.BODY FOR 100% PERFECT VIEWPORT CENTERING */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          
          {/* Dark Blur Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Perfectly Centered Modal Card Box */}
          <div 
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-6 z-10 text-white space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">ATS Readiness Scanner</h3>
                  <p className="text-xs text-slate-400">Real-time scan against recruiter AI resume filters</p>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Gauge Meter Bar */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold">
                <span className="text-slate-300">Overall ATS Compatibility:</span>
                <span className="text-amber-400 font-black text-sm sm:text-base">{score} / 100 ({statusText})</span>
              </div>

              <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400"
                  style={{ width: `${Math.max(score, 8)}%` }}
                />
              </div>
            </div>

            {/* Breakdown Score Cards Grid (Exact 100 Points Sum) */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Contact Info</span>
                <span className="font-black text-emerald-400 text-xs block">{breakdown.contact} / 20</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Summary</span>
                <span className="font-black text-blue-400 text-xs block">{breakdown.summary} / 15</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Experience</span>
                <span className="font-black text-purple-400 text-xs block">{breakdown.experience} / 25</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Metrics %</span>
                <span className="font-black text-amber-400 text-xs block">{breakdown.metrics} / 20</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Skills</span>
                <span className="font-black text-teal-400 text-xs block">{breakdown.skills} / 10</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Edu & Proj</span>
                <span className="font-black text-yellow-400 text-xs block">{breakdown.education} / 10</span>
              </div>
            </div>

            {/* Actionable Recommendations List */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <span className="text-xs font-extrabold text-slate-200 block flex items-center gap-1.5">
                💡 Recommendations to reach 95+ Score:
              </span>

              {feedbackTips.length === 0 ? (
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Outstanding! Your resume is 100% ATS optimized.</span>
                </div>
              ) : (
                <div className="space-y-2 max-h-52 overflow-y-auto no-scrollbar pr-1">
                  {feedbackTips.map((tip, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{tip.tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-colors cursor-pointer"
              >
                Close Scanner
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
