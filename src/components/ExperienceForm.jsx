import React from 'react';
import { Plus, Trash2, Sparkles, Building2, Calendar, MapPin, Briefcase } from 'lucide-react';

export default function ExperienceForm({ experiences = [], onChange, onOpenAIModal }) {
  
  const handleItemChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      title: "",
      company: "",
      location: "",
      startDate: "",
      description: "",
      aiSuggestion: ""
    };
    onChange([...experiences, newItem]);
  };

  const handleRemove = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {experiences.length === 0 && (
        <div className="text-center py-8 border border-dashed border-slate-700/80 rounded-xl bg-slate-900/40">
          <Briefcase className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-300">No work experience added yet.</p>
          <p className="text-xs text-slate-500 mb-3">Add your previous roles to showcase your career accomplishments.</p>
        </div>
      )}

      {experiences.map((exp, index) => (
        <div 
          key={exp.id || index}
          className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 md:p-5 shadow-lg transition-all hover:border-slate-600/80 space-y-4"
        >
          {/* Header Action */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
              Position #{index + 1}
            </span>
            <button
              onClick={() => handleRemove(index)}
              className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
              title="Delete Position"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                Job Title / Role *
              </label>
              <input
                type="text"
                value={exp.title || ''}
                onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                Company / Organization *
              </label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => handleItemChange(index, 'company', e.target.value)}
                placeholder="e.g. Google / Acme Corp"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Dates */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Duration / Dates
              </label>
              <input
                type="text"
                value={exp.startDate || ''}
                onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                placeholder="e.g. 2022 - Present or Jan 2021 - Dec 2023"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                Location
              </label>
              <input
                type="text"
                value={exp.location || ''}
                onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                placeholder="e.g. Remote / New York, NY"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Description & AI Enhancer Button */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                Key Responsibilities & Impact Bullets
              </label>
              <button
                type="button"
                onClick={() => onOpenAIModal(index, exp.description, exp.title)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                <span>✨ Improve with AI</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={exp.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              placeholder="Describe your achievements, metrics, and key project contributions..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Tip: Click the <strong className="text-indigo-400 font-medium">✨ Improve with AI</strong> button to automatically quantify metrics and elevate bullet impact.
            </p>
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>Add Work Position</span>
      </button>
    </div>
  );
}
