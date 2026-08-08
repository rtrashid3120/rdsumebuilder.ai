import React from 'react';
import { Plus, Trash2, GraduationCap, Building, Calendar, Award } from 'lucide-react';

export default function EducationForm({ education = [], onChange }) {
  
  const handleItemChange = (index, field, value) => {
    const updated = [...education];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      degree: "",
      school: "",
      location: "",
      year: "",
      gpa: ""
    };
    onChange([...education, newItem]);
  };

  const handleRemove = (index) => {
    const updated = education.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {education.length === 0 && (
        <div className="text-center py-8 border border-dashed border-slate-700/80 rounded-xl bg-slate-900/40">
          <GraduationCap className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-300">No education entries added yet.</p>
        </div>
      )}

      {education.map((edu, index) => (
        <div 
          key={edu.id || index}
          className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 md:p-5 shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
              Degree #{index + 1}
            </span>
            <button
              onClick={() => handleRemove(index)}
              className="text-slate-400 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Degree */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                Degree / Qualification *
              </label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => handleItemChange(index, 'degree', e.target.value)}
                placeholder="e.g. B.S. in Computer Science"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* School / University */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                School / University *
              </label>
              <input
                type="text"
                value={edu.school || ''}
                onChange={(e) => handleItemChange(index, 'school', e.target.value)}
                placeholder="e.g. UC Berkeley"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Graduation Year / Dates
              </label>
              <input
                type="text"
                value={edu.year || ''}
                onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                placeholder="e.g. 2017 - 2021"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* GPA or Honors */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                GPA / Honors (Optional)
              </label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => handleItemChange(index, 'gpa', e.target.value)}
                placeholder="e.g. 3.85 GPA / Magna Cum Laude"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 text-xs font-bold text-indigo-400 transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>Add Education Entry</span>
      </button>
    </div>
  );
}
