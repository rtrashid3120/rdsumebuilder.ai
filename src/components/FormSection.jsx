import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, GraduationCap, Wrench, FolderGit2, ArrowUp, ArrowDown, Sparkles, SlidersHorizontal, GripVertical, Layers, X } from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CustomSectionsForm from './CustomSectionsForm';

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
  const orderManagerRef = useRef(null);

  // Fix Item 2: Click-outside listener so clicking anywhere outside auto-closes the Reorder panel!
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (orderManagerRef.current && !orderManagerRef.current.contains(event.target)) {
        setShowOrderManager(false);
      }
    };

    if (showOrderManager) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOrderManager]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User, count: null },
    { id: 'education', label: 'Education', icon: GraduationCap, count: resume.education?.length || 0 },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: resume.experience?.length || 0, badge: 'AI Ready' },
    { id: 'skills', label: 'Skills', icon: Wrench, count: resume.skills?.length || 0 },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: resume.projects?.length || 0 },
    { id: 'custom', label: 'Custom Sections', icon: Layers, count: resume.customSections?.length || 0 },
  ];

  const getSectionLabel = (secKey) => {
    const builtInLabels = {
      summary: 'Professional Profile Summary',
      education: 'Education',
      experience: 'Work Experience',
      projects: 'Key Projects',
      skills: 'Skills & Expertise'
    };

    if (builtInLabels[secKey]) return builtInLabels[secKey];
    
    const foundCustom = resume.customSections?.find(c => c.id === secKey);
    if (foundCustom) return `➕ ${foundCustom.title}`;
    
    return secKey;
  };

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

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newOrder = [...sectionOrder];
    const draggedItem = newOrder[draggedIndex];

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    setDraggedIndex(null);

    if (onUpdateSectionOrder) {
      onUpdateSectionOrder(newOrder);
    }
  };

  // Switch tab and auto-close order manager
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setShowOrderManager(false);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md space-y-0 relative">
      
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 overflow-x-auto no-scrollbar">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
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
          className={`px-3 py-2 mr-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            showOrderManager 
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20' 
              : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
          }`}
          title="Reorder Resume Sections"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reorder Sections</span>
        </button>
      </div>

      {/* Item 2 Fix: Auto-Dismissing Section Order Manager Popup */}
      {showOrderManager && (
        <div 
          ref={orderManagerRef}
          className="bg-slate-950 border-b border-slate-800 p-4 space-y-2 animate-fade-in shadow-2xl z-30"
        >
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
            <span className="flex items-center gap-1.5 text-indigo-300">
              📋 Drag & Drop or use arrows to rearrange sections on preview:
            </span>
            <button 
              onClick={() => setShowOrderManager(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
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
                  <span>{getSectionLabel(secKey)}</span>
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

        {activeTab === 'education' && (
          <EducationForm
            education={resume.education}
            onChange={(education) => onChange({ ...resume, education })}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceForm
            experiences={resume.experience}
            onChange={(experience) => onChange({ ...resume, experience })}
            onOpenAIModal={onOpenAIModal}
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

        {activeTab === 'custom' && (
          <CustomSectionsForm
            customSections={resume.customSections || []}
            onChange={(customSections) => {
              const newSecIds = customSections.map(c => c.id);
              const missingIds = newSecIds.filter(id => !sectionOrder.includes(id));
              if (missingIds.length > 0 && onUpdateSectionOrder) {
                onUpdateSectionOrder([...sectionOrder, ...missingIds]);
              }
              onChange({ ...resume, customSections });
            }}
            onOpenAIModal={onOpenAIModal}
          />
        )}
      </div>
    </div>
  );
}
