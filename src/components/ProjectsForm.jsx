import React from 'react';
import { Plus, Trash2, FolderGit2, Code, FileText } from 'lucide-react';

export default function ProjectsForm({ projects = [], onChange }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem = {
      id: `proj-${Date.now()}`,
      name: "",
      description: "",
      techStack: ""
    };
    onChange([...projects, newItem]);
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {projects.length === 0 && (
        <div className="text-center py-6 border border-dashed border-slate-700/80 rounded-xl bg-slate-900/40">
          <FolderGit2 className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-300">No portfolio projects added yet.</p>
        </div>
      )}

      {projects.map((proj, index) => (
        <div 
          key={proj.id || index}
          className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 md:p-5 shadow-lg space-y-3"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
              Project #{index + 1}
            </span>
            <button
              onClick={() => handleRemove(index)}
              className="text-slate-400 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                Project Name
              </label>
              <input
                type="text"
                value={proj.name || ''}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                placeholder="e.g. Smart Resume AI Builder"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-indigo-400" />
                Technologies Used
              </label>
              <input
                type="text"
                value={proj.techStack || ''}
                onChange={(e) => handleItemChange(index, 'techStack', e.target.value)}
                placeholder="e.g. React, Node.js, Express, MongoDB"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Project Summary & Achievements
            </label>
            <textarea
              rows={2}
              value={proj.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              placeholder="Brief description of feature set, user impact, or technical highlights..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 text-xs font-bold text-indigo-400 transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>Add Project Entry</span>
      </button>
    </div>
  );
}
