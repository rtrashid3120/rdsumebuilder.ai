import React, { useState, useEffect, useRef } from 'react';
import { calculateATSScore } from '../utils/atsScorer';
import { ShieldCheck, ChevronDown, CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

export default function ATSScoreMeter({ resume }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const atsData = calculateATSScore(resume);
  const { score, statusText, badgeColor, breakdown, feedbackTips } = atsData;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Header Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-md ${badgeColor}`}
        title="Real-Time ATS Readiness Score Meter"
      >
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>ATS Score:</span>
        <span className="text-sm font-black tracking-tight">{score}</span>
        <span className="text-[10px] opacity-80 uppercase tracking-wider hidden md:inline">/100</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Expandable ATS Score Breakdown & Checklist Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in text-white space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-black text-white">ATS Readiness Meter</h3>
                <p className="text-[11px] text-slate-400">Scanned in real-time against recruiter ATS bots</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Meter Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">Overall ATS Score:</span>
              <span className="font-black text-amber-400">{score} / 100 ({statusText})</span>
            </div>

            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {/* Breakdown Progress Cards */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Contact Info</span>
              <span className="font-bold text-emerald-400">{breakdown.contact} / 20 pts</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Metrics & %</span>
              <span className="font-bold text-amber-400">{breakdown.metrics} / 25 pts</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Action Verbs</span>
              <span className="font-bold text-indigo-400">{breakdown.verbs} / 20 pts</span>
            </div>
          </div>

          {/* Actionable Feedback Checklist */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-300 block">
              💡 Actionable Tips to Reach 95+ Score:
            </span>

            {feedbackTips.length === 0 ? (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Perfect! Your resume is 100% ATS optimized.</span>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar pr-1">
                {feedbackTips.map((tip, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span>{tip.tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
