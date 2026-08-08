import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Award, Layers, Globe, BookOpen, ShieldCheck, Heart, Volume2 } from 'lucide-react';

export default function CustomSectionsForm({ customSections = [], onChange, onOpenAIModal }) {
  const [activeSectionId, setActiveSectionId] = useState(customSections[0]?.id || null);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionType, setNewSectionType] = useState('itemList');

  const presets = [
    { 
      title: "Certifications & Licenses", 
      type: "itemList",
      icon: ShieldCheck,
      defaultItems: [
        { id: `item-1`, title: "AWS Certified Solutions Architect", subtitle: "Amazon Web Services", date: "2024", description: "Credential ID: AWS-892347" }
      ]
    },
    { 
      title: "Languages Spoken", 
      type: "badgeGrid",
      icon: Globe,
      defaultItems: [
        { id: `item-1`, title: "English", subtitle: "Native / Fluent" },
        { id: `item-2`, title: "Spanish", subtitle: "Professional Working" }
      ]
    },
    { 
      title: "Volunteer Work", 
      type: "itemList",
      icon: Heart,
      defaultItems: [
        { id: `item-1`, title: "STEM Mentor", subtitle: "Code.org", date: "2023 - Present", description: "Mentored high school students in introductory Python & Web Development." }
      ]
    },
    { 
      title: "Publications & Patents", 
      type: "itemList",
      icon: BookOpen,
      defaultItems: [
        { id: `item-1`, title: "High-Throughput Microservice Caching Patterns", subtitle: "IEEE Tech Journal", date: "2023", description: "Published research on Redis caching optimization strategies." }
      ]
    },
    { 
      title: "Speaking Engagements", 
      type: "itemList",
      icon: Volume2,
      defaultItems: [
        { id: `item-1`, title: "Keynote: Scaling React Apps", subtitle: "JSConf Global", date: "2024", description: "Presented architecture patterns for enterprise React applications." }
      ]
    }
  ];

  // Add a new Custom Section with optional default pre-populated items
  const handleAddSection = (presetTitle, presetType, defaultItems) => {
    const title = presetTitle || newSectionTitle.trim();
    if (!title) return;

    // Prevent exact duplicates
    const alreadyExists = customSections.some(s => s.title.toLowerCase() === title.toLowerCase());
    if (alreadyExists) {
      const existing = customSections.find(s => s.title.toLowerCase() === title.toLowerCase());
      if (existing) setActiveSectionId(existing.id);
      return;
    }

    const initialItems = defaultItems ? defaultItems.map(item => ({ ...item, id: `item-${Date.now()}-${Math.random()}` })) : [
      { id: `item-${Date.now()}`, title: "", subtitle: "", date: "", description: "" }
    ];

    const newSec = {
      id: `custom-sec-${Date.now()}`,
      title: title,
      type: presetType || newSectionType,
      items: initialItems
    };

    const updated = [...customSections, newSec];
    onChange(updated);
    setActiveSectionId(newSec.id);
    setNewSectionTitle('');
  };

  const handleRemoveSection = (secId) => {
    const updated = customSections.filter(s => s.id !== secId);
    onChange(updated);
    if (activeSectionId === secId) {
      setActiveSectionId(updated[0]?.id || null);
    }
  };

  const handleAddItem = (secId) => {
    const updated = customSections.map(sec => {
      if (sec.id === secId) {
        return {
          ...sec,
          items: [
            ...sec.items,
            {
              id: `item-${Date.now()}`,
              title: "",
              subtitle: "",
              date: "",
              description: ""
            }
          ]
        };
      }
      return sec;
    });
    onChange(updated);
  };

  const handleUpdateItem = (secId, itemIndex, field, value) => {
    const updated = customSections.map(sec => {
      if (sec.id === secId) {
        const newItems = [...sec.items];
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          [field]: value
        };
        return { ...sec, items: newItems };
      }
      return sec;
    });
    onChange(updated);
  };

  const handleRemoveItem = (secId, itemIndex) => {
    const updated = customSections.map(sec => {
      if (sec.id === secId) {
        return {
          ...sec,
          items: sec.items.filter((_, idx) => idx !== itemIndex)
        };
      }
      return sec;
    });
    onChange(updated);
  };

  const activeSection = customSections.find(s => s.id === activeSectionId) || customSections[0];

  return (
    <div className="space-y-6">
      
      {/* 1. Quick Presets Bar - Highly Adaptive */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-400" />
            Add Custom Resume Section
          </span>
          <span className="text-[11px] text-indigo-400 font-semibold">1-Click Presets</span>
        </div>

        {/* Preset Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {presets.map((p) => {
            const Icon = p.icon;
            const isAdded = customSections.some(s => s.title.toLowerCase() === p.title.toLowerCase());
            return (
              <button
                key={p.title}
                type="button"
                onClick={() => handleAddSection(p.title, p.type, p.defaultItems)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500/60 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Section Title Entry */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Or type custom title (e.g. Honors & Awards, Hobbies)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={newSectionType}
            onChange={(e) => setNewSectionType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="itemList">Item List (Title + Date + Desc)</option>
            <option value="badgeGrid">Badge Grid (Key + Value)</option>
            <option value="bulletList">Freeform Bullets</option>
          </select>
          <button
            onClick={() => handleAddSection()}
            disabled={!newSectionTitle.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Create Section</span>
          </button>
        </div>
      </div>

      {/* 2. Active Custom Sections Tabs */}
      {customSections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800">
            {customSections.map((sec) => (
              <div key={sec.id} className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    (activeSection?.id === sec.id)
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span>{sec.title}</span>
                  <span className="text-[10px] opacity-70">({sec.items.length})</span>
                </button>
                <button
                  onClick={() => handleRemoveSection(sec.id)}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors ml-1 cursor-pointer"
                  title="Delete Section"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Active Section Editor */}
          {activeSection && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Editing: <span className="text-indigo-400">{activeSection.title}</span>
                </h3>
                <span className="text-[11px] text-slate-400 capitalize">
                  Layout: {activeSection.type === 'itemList' ? 'Item List' : activeSection.type === 'badgeGrid' ? 'Badge Grid' : 'Bullets'}
                </span>
              </div>

              {activeSection.items.length === 0 && (
                <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-xs text-slate-400">No items added to "{activeSection.title}" yet.</p>
                </div>
              )}

              {activeSection.items.map((item, itemIdx) => (
                <div key={item.id || itemIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 relative">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-[11px] font-bold text-indigo-400">Item #{itemIdx + 1}</span>
                    <button
                      onClick={() => handleRemoveItem(activeSection.id, itemIdx)}
                      className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {activeSection.type === 'itemList' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title / Role / Name</label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => handleUpdateItem(activeSection.id, itemIdx, 'title', e.target.value)}
                            placeholder="e.g. AWS Solutions Architect"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Issuer / Organization</label>
                          <input
                            type="text"
                            value={item.subtitle || ''}
                            onChange={(e) => handleUpdateItem(activeSection.id, itemIdx, 'subtitle', e.target.value)}
                            placeholder="e.g. Amazon Web Services"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Date / Year</label>
                          <input
                            type="text"
                            value={item.date || ''}
                            onChange={(e) => handleUpdateItem(activeSection.id, itemIdx, 'date', e.target.value)}
                            placeholder="e.g. Dec 2024"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-semibold text-slate-400">Description / Key Accomplishment</label>
                          {onOpenAIModal && (
                            <button
                              type="button"
                              onClick={() => onOpenAIModal(itemIdx, item.description, item.title)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3" /> ✨ AI Rewrite
                            </button>
                          )}
                        </div>
                        <textarea
                          rows={2}
                          value={item.description || ''}
                          onChange={(e) => handleUpdateItem(activeSection.id, itemIdx, 'description', e.target.value)}
                          placeholder="Brief details or credential verification info..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeSection.type === 'badgeGrid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Skill / Item Name</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => handleUpdateItem(activeSection.id, itemIdx, 'title', e.target.value)}
                          placeholder="e.g. English / Spanish"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Proficiency / Detail</label>
                        <input
                          type="text"
                          value={item.subtitle || ''}
                          onChange={(e) => handleUpdateItem(activeSection.id, itemIdx, 'subtitle', e.target.value)}
                          placeholder="e.g. Native / Professional Working"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeSection.type === 'bulletList' && (
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Bullet Achievement</label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => handleUpdateItem(activeSection.id, itemIdx, 'title', e.target.value)}
                        placeholder="e.g. Keynote Speaker at Global Tech Conference 2024"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddItem(activeSection.id)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-dashed border-slate-800 bg-slate-950/60 hover:bg-slate-950 text-xs font-bold text-indigo-400 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item to {activeSection.title}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
