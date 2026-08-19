import React, { useState, useEffect } from 'react';
import { Sparkles, Check, X, Loader2, ArrowRight, Zap, Award, Target } from 'lucide-react';
import { generateAISuggestions } from '../utils/aiEnhancer';

export default function AISuggestionModal({ isOpen, onClose, originalText, jobTitle, onAccept }) {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState(null);
  const [selectedTone, setSelectedTone] = useState('quantified');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setSuggestions(null);
      generateAISuggestions(originalText, jobTitle)
        .then((res) => {
          setSuggestions(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isOpen, originalText, jobTitle]);

  if (!isOpen) return null;

  const currentSuggestionText = suggestions ? suggestions[selectedTone] || '' : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                ✨ AI Bullet Enhancer
              </h2>
              <p className="text-xs text-slate-400">Rewriting resume bullets for maximum impact & metrics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Original Text Box */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Original Text:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs leading-relaxed italic">
              "{originalText || 'No text entered yet. AI generated fallback suggestions based on your job title.'}"
            </div>
          </div>

          {loading ? (
            /* Loading State */
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                <Sparkles className="w-5 h-5 text-amber-400 absolute inset-0 m-auto" />
              </div>
              <p className="text-sm font-semibold text-slate-200">Analyzing bullet & engineering metrics...</p>
              <p className="text-xs text-slate-400">Applying action verbs and quantification rules</p>
            </div>
          ) : (
            /* Suggestions View */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
                  Select AI Style:
                </span>
              </div>

              {/* Tone Selection Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTone('quantified')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                    selectedTone === 'quantified'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Target className="w-4 h-4 text-emerald-400 mb-1" />
                  <span>Metric-Driven</span>
                  <span className="text-[10px] text-slate-400">Quantified % & $</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTone('executive')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                    selectedTone === 'executive'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Award className="w-4 h-4 text-purple-400 mb-1" />
                  <span>Executive</span>
                  <span className="text-[10px] text-slate-400">Leadership tone</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTone('concise')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                    selectedTone === 'concise'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-400 mb-1" />
                  <span>Direct & Punchy</span>
                  <span className="text-[10px] text-slate-400">Action verbs</span>
                </button>
              </div>

              {/* Improved Output Display Box */}
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border border-indigo-500/30 text-slate-100 text-sm leading-relaxed shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ✨ Recommended AI Rewrite
                  </span>
                </div>
                <p className="text-slate-100 font-medium">{currentSuggestionText}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900/90">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Reject & Keep Original
          </button>

          <button
            type="button"
            onClick={() => {
              if (currentSuggestionText) {
                onAccept(currentSuggestionText);
                onClose();
              }
            }}
            disabled={loading || !currentSuggestionText}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer border border-emerald-400/30"
          >
            <Check className="w-4 h-4" />
            <span>Accept AI Suggestion</span>
          </button>
        </div>
      </div>
    </div>
  );
}
