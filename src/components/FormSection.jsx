import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Wrench, FolderGit2, ArrowUp, ArrowDown, Sparkles, SlidersHorizontal, GripVertical } from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';

export default function FormSection({ 
  resume, 
  onChange, 
  onOpenAIModal, 
  sectionOrder = ['summary', 'education', 'experience', 'projects', 'skills'],
  onUpdateSectionOrder
}) {
  const [activeTab, setActiveTab] = useState('personal');
  const [showOrderManager, setShowOrderManager] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User, count: null },
    { id: 'education', label: 'Education', icon: GraduationCap, count: resume.education?.length || 0 },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: resume.experience?.length || 0, badge: 'AI Ready' },
    { id: 'skills', label: 'Skills', icon: Wrench, count: resume.skills?.length || 0 },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: resume.projects?.length || 0 },
  ];

  const sectionLabels = {
    summary: 'Professional Profile Summary',
    education: 'Education',
    experience: 'Work Experience',
    projects: 'Key Projects',
    skills: 'Skills & Expertise'
  };

  // Move section position up or down
  const moveSection = (index, direction) => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    if (onUpdateSectionOrder) {
      onUpdateSectionOrder(newOrder);
    }
  };

  // HTML5 Drag & Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newOrder = [...sectionOrder];
    const draggedItem = newOrder[draggedIndex];

    // Remove item from original position
    newOrder.splice(draggedIndex, 1);
    // Insert item at target position
    newOrder.splice(targetIndex, 0, draggedItem);

    setDraggedIndex(null);

    if (onUpdateSectionOrder) {
      onUpdateSectionOrder(newOrder);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md space-y-0">
      
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 overflow-x-auto no-scrollbar">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                
                {tab.badge && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    <Sparkles className="w-2.5 h-2.5" />
                    {tab.badge}
                  </span>
                )}

                {tab.count !== null && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Section Reorder Toggle Button */}
        <button
          onClick={() => setShowOrderManager(!showOrderManager)}
          className="px-3 py-2 mr-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer"
          title="Reorder Resume Sections"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reorder Sections</span>
        </button>
      </div>

      {/* Expandable Section Order Manager with Drag & Drop */}
      {showOrderManager && (
        <div className="bg-slate-950 border-b border-slate-800 p-4 space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
            <span>📋 Drag & Drop or use arrows to rearrange sections on preview:</span>
            <span className="text-[11px] text-indigo-400 font-normal">Education is above Experience by default</span>
          </div>

          <div className="space-y-2">
            {sectionOrder.map((secKey, index) => (
              <div 
                key={secKey}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                className={`flex items-center justify-between bg-slate-900 border px-3 py-2.5 rounded-xl text-xs text-slate-200 transition-all cursor-grab active:cursor-grabbing ${
                  draggedIndex === index 
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-lg scale-[0.99]' 
                    : 'border-slate-800 hover:border-indigo-500/40'
                }`}
              >
                <div className="flex items-center gap-2.5 font-semibold">
                  <GripVertical className="w-4 h-4 text-slate-500 cursor-grab" />
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] font-bold">
                    {index + 1}
                  </span>
                  <span>{sectionLabels[secKey] || secKey}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => moveSection(index, 'up')}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === sectionOrder.length - 1}
                    onClick={() => moveSection(index, 'down')}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Tab Content Panel */}
      <div className="p-5 md:p-6">
        {activeTab === 'personal' && (
          <PersonalInfoForm
            data={resume.personalInfo}
            onChange={(personalInfo) => onChange({ ...resume, personalInfo })}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceForm
            experiences={resume.experience}
            onChange={(experience) => onChange({ ...resume, experience })}
            onOpenAIModal={onOpenAIModal}
          />
        )}

        {activeTab === 'education' && (
          <EducationForm
            education={resume.education}
            onChange={(education) => onChange({ ...resume, education })}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsForm
            skills={resume.skills}
            onChange={(skills) => onChange({ ...resume, skills })}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsForm
            projects={resume.projects}
            onChange={(projects) => onChange({ ...resume, projects })}
          />
        )}
      </div>
    </div>
  );
}
