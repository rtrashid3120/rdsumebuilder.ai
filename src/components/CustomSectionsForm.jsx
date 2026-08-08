import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Award, Globe, Heart, BookOpen, Mic, LayoutGrid, Check, FolderPlus } from 'lucide-react';
import { generateAISuggestions } from '../utils/aiEnhancer';

export default function CustomSectionsForm({ resume, onChange, onOpenAIModal }) {
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('itemList'); // itemList, badgeGrid, bulletList
  const [activeSectionId, setActiveSectionId] = useState(null);

  const customSections = resume.customSections || [];

  const presetTemplates = [
    { title: 'Certifications & Licenses', icon: Award, type: 'itemList', defaultItem: { title: 'AWS Certified Solutions Architect', subtitle: 'Amazon Web Services', date: '2024', description: 'Credential ID: AWS-892347' } },
    { title: 'Languages Spoken', icon: Globe, type: 'badgeGrid', defaultItem: { title: 'English', subtitle: 'Native / Fluent' } },
    { title: 'Volunteer Work', icon: Heart, type: 'itemList', defaultItem: { title: 'STEM Mentor', subtitle: 'Code.org', date: '2022 - Present', description: 'Mentored 20+ high school students in modern JavaScript and Python fundamentals.' } },
    { title: 'Publications & Papers', icon: BookOpen, type: 'itemList', defaultItem: { title: 'Scalable Microservices Architecture', subtitle: 'IEEE Software Journal', date: '2023', description: 'Co-authored research paper on serverless edge computing.' } },
    { title: 'Speaking & Conferences', icon: Mic, type: 'itemList', defaultItem: { title: 'Keynote Speaker at ReactConf', subtitle: 'React Global Summit', date: '2023', description: 'Delivered presentation on Next.js Server Components to 1,500+ attendees.' } },
  ];

  const handleAddSection = (titleToAdd, typeToAdd, defaultItemToUse) => {
    const title = titleToAdd || newTitle.trim();
    if (!title) return;

    const newSecId = `custom-sec-${Date.now()}`;
    const newSec = {
      id: newSecId,
      title,
      type: typeToAdd || newType,
      items: defaultItemToUse ? [ { ...defaultItemToUse, id: `item-${Date.now()}` } ] : []
    };

    const updated = {
      ...resume,
      customSections: [...customSections, newSec]
    };

    onChange(updated);
    setActiveSectionId(newSecId);
    setNewTitle('');
  };

  const handleRemoveSection = (secId) => {
    const updatedSections = customSections.filter(s => s.id !== secId);
    onChange({ ...resume, customSections: updatedSections });
    if (activeSectionId === secId) {
      setActiveSectionId(updatedSections[0]?.id || null);
    }
  };

  const handleAddItem = (secId) => {
    const updatedSections = customSections.map(sec => {
      if (sec.id === secId) {
        const newItem = { id: `item-${Date.now()}`, title: '', subtitle: '', date: '', description: '' };
        return { ...sec, items: [...sec.items, newItem] };
      }
      return sec;
    });
    onChange({ ...resume, customSections: updatedSections });
  };

  const handleUpdateItem = (secId, itemId, field, value) => {
    const updatedSections = customSections.map(sec => {
      if (sec.id === secId) {
        const updatedItems = sec.items.map(item => {
          if (item.id === itemId) {
            return { ...item, [field]: value };
          }
          return item;
        });
        return { ...sec, items: updatedItems };
      }
      return sec;
    });
    onChange({ ...resume, customSections: updatedSections });
  };

  const handleRemoveItem = (secId, itemId) => {
    const updatedSections = customSections.map(sec => {
      if (sec.id === secId) {
        return { ...sec, items: sec.items.filter(item => item.id !== itemId) };
      }
      return sec;
    });
    onChange({ ...resume, customSections: updatedSections });
  };

  const activeSection = customSections.find(s => s.id === activeSectionId) || customSections[0];

  return (
    <div className="space-y-5 text-white">
      
      {/* 1. Perfect 1-Click Preset Templates Grid (No Truncation) */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-red-500" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              Add Custom Resume Section
            </h3>
          </div>
          <span className="text-[11px] font-bold text-amber-400">1-Click Presets</span>
        </div>

        {/* Preset Buttons Wrap Naturally */}
        <div className="flex flex-wrap gap-2">
          {presetTemplates.map((preset) => {
            const Icon = preset.icon;
            const isAlreadyAdded = customSections.some(s => s.title.toLowerCase() === preset.title.toLowerCase());

            return (
              <button
                key={preset.title}
                onClick={() => !isAlreadyAdded && handleAddSection(preset.title, preset.type, preset.defaultItem)}
                disabled={isAlreadyAdded}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isAlreadyAdded
                    ? 'bg-slate-950 text-slate-500 border border-slate-800 cursor-not-allowed opacity-60'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-red-500/50 hover:text-yellow-400 shadow-sm'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isAlreadyAdded ? 'text-slate-600' : 'text-yellow-400'}`} />
                <span>{preset.title}</span>
                {isAlreadyAdded && <Check className="w-3 h-3 text-emerald-400 ml-1" />}
              </button>
            );
          })}
        </div>

        {/* 2. Responsive Custom Title & Type Creator Input Row */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
          <div className="md:col-span-6">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Or type custom title (e.g. Awards, Patents)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="itemList">Item List (Title + Date + Desc)</option>
              <option value="badgeGrid">Badge Grid (Skill / Language)</option>
              <option value="bulletList">Bullet Points</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={() => handleAddSection()}
              disabled={!newTitle.trim()}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-yellow-400 text-xs font-black text-black transition-all disabled:opacity-40 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Created Section Tabs */}
      {customSections.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800">
          {customSections.map((sec) => {
            const isActive = activeSection?.id === sec.id;
            return (
              <div key={sec.id} className="flex items-center">
                <button
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{sec.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/40 text-yellow-400">
                    {sec.items?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => handleRemoveSection(sec.id)}
                  className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors ml-1"
                  title={`Delete ${sec.title}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Active Section Editor Item Cards with Perfect Grid Layout */}
      {activeSection && (
        <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-amber-400" />
                Editing: <span className="text-yellow-400 font-black">{activeSection.title}</span>
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 capitalize">Format: {activeSection.type}</p>
            </div>

            <button
              onClick={() => handleAddItem(activeSection.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-bold text-yellow-400 border border-slate-700 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          {/* Item List Cards */}
          <div className="space-y-3">
            {activeSection.items.map((item, idx) => (
              <div key={item.id || idx} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Item #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(activeSection.id, item.id)}
                    className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-900 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Grid Fields with Generous Widths */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Title / Role / Name</label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleUpdateItem(activeSection.id, item.id, 'title', e.target.value)}
                      placeholder="e.g. AWS Certified"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {activeSection.type !== 'bulletList' && (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">
                        {activeSection.type === 'badgeGrid' ? 'Proficiency / Subtitle' : 'Issuer / Organization'}
                      </label>
                      <input
                        type="text"
                        value={item.subtitle || ''}
                        onChange={(e) => handleUpdateItem(activeSection.id, item.id, 'subtitle', e.target.value)}
                        placeholder="e.g. Amazon Web Services"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  )}

                  {activeSection.type === 'itemList' && (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">Date / Year</label>
                      <input
                        type="text"
                        value={item.date || ''}
                        onChange={(e) => handleUpdateItem(activeSection.id, item.id, 'date', e.target.value)}
                        placeholder="e.g. 2024"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  )}
                </div>

                {/* Description for Item List */}
                {activeSection.type === 'itemList' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-bold text-slate-400">Description / Details</label>
                      {onOpenAIModal && (
                        <button
                          onClick={() => onOpenAIModal(-1, item.description, activeSection.title)}
                          className="flex items-center gap-1 text-[10px] font-bold text-yellow-400 hover:text-yellow-300"
                        >
                          <Sparkles className="w-3 h-3 text-yellow-400" />
                          <span>AI Rewrite</span>
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={2}
                      value={item.description || ''}
                      onChange={(e) => handleUpdateItem(activeSection.id, item.id, 'description', e.target.value)}
                      placeholder="Credential details, key takeaway, or summary..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-red-500 leading-relaxed"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => handleAddItem(activeSection.id)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-yellow-400" />
            <span>Add Item to {activeSection.title}</span>
          </button>
        </div>
      )}
    </div>
  );
}
