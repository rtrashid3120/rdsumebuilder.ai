import React, { useState } from 'react';
import Header from './components/Header';
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import AISuggestionModal from './components/AISuggestionModal';
import { sampleResume, emptyResume } from './data/sampleResume';
import html2pdf from 'html2pdf.js';
import { Eye, Info } from 'lucide-react';

export default function App() {
  const [resume, setResume] = useState(sampleResume);
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [accentColor, setAccentColor] = useState('#4f46e5');
  const [activeFont, setActiveFont] = useState('sans');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Reorderable Section Order State (Default: Education ABOVE Experience)
  const [sectionOrder, setSectionOrder] = useState([
    'summary', 
    'education', 
    'experience', 
    'projects', 
    'skills'
  ]);

  // AI Modal State
  const [aiModalState, setAiModalState] = useState({
    isOpen: false,
    experienceIndex: null,
    originalText: '',
    jobTitle: ''
  });

  // Handle direct in-place editing on the resume preview canvas
  const handleUpdateText = (fieldPath, newValue) => {
    const parts = fieldPath.split('.');
    const updated = JSON.parse(JSON.stringify(resume));

    if (parts.length === 2) {
      updated[parts[0]][parts[1]] = newValue;
    } else if (parts.length === 3) {
      const [arrName, idxStr, subProp] = parts;
      const index = parseInt(idxStr, 10);
      if (updated[arrName] && updated[arrName][index]) {
        if (arrName === 'skills' && typeof updated[arrName][index] === 'string') {
          updated[arrName][index] = { name: newValue, level: '' };
        } else {
          updated[arrName][index][subProp] = newValue;
        }
      }
    }

    setResume(updated);
  };

  const handleOpenAIModal = (index, originalText, jobTitle) => {
    setAiModalState({
      isOpen: true,
      experienceIndex: index,
      originalText: originalText || '',
      jobTitle: jobTitle || resume.personalInfo.jobTitle || ''
    });
  };

  const handleAcceptAISuggestion = (improvedText) => {
    const { experienceIndex } = aiModalState;
    if (experienceIndex !== null && experienceIndex >= 0) {
      const updatedExperience = [...resume.experience];
      updatedExperience[experienceIndex] = {
        ...updatedExperience[experienceIndex],
        description: improvedText,
        aiSuggestion: improvedText
      };
      setResume({
        ...resume,
        experience: updatedExperience
      });
    }
  };

  const handleDownloadPDF = () => {
    setIsExporting(true);
    const element = document.getElementById('printable-resume');

    if (!element) {
      setIsExporting(false);
      return;
    }

    const nameSlug = (resume.personalInfo.fullName || 'Resume').replace(/\s+/g, '_');
    const opt = {
      margin: 0,
      filename: `${nameSlug}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => setIsExporting(false))
      .catch((err) => {
        console.error('PDF Export Error:', err);
        window.print();
        setIsExporting(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* App Header Bar */}
      <Header
        onLoadSample={() => setResume(sampleResume)}
        onClear={() => setResume(emptyResume)}
        onDownloadPDF={handleDownloadPDF}
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        activeTemplate={activeTemplate}
        setActiveTemplate={setActiveTemplate}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        activeFont={activeFont}
        setActiveFont={setActiveFont}
        isExporting={isExporting}
        resume={resume}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        
        {/* Full Preview Mode View */}
        {isPreviewMode ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="no-print bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between w-full max-w-4xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Info className="w-4 h-4 text-indigo-400" />
                <span>Full Preview & Direct In-Place Edit Mode — Click any text on the resume to edit directly</span>
              </div>
              <button
                onClick={() => setIsPreviewMode(false)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow"
              >
                Back to Editor
              </button>
            </div>

            <div className="w-full flex justify-center py-6">
              <ResumePreview
                resume={resume}
                template={activeTemplate}
                accentColor={accentColor}
                fontFamily={activeFont}
                sectionOrder={sectionOrder}
                onUpdateText={handleUpdateText}
              />
            </div>
          </div>
        ) : (
          /* Dual-Pane Split Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Forms */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  Resume Form Editor
                </h2>
                <span className="text-xs text-slate-400">Live Auto-Syncing</span>
              </div>

              <FormSection
                resume={resume}
                onChange={setResume}
                onOpenAIModal={handleOpenAIModal}
                sectionOrder={sectionOrder}
                onUpdateSectionOrder={setSectionOrder}
              />
            </div>

            {/* Right Column: Live A4 Canvas Preview (With Direct In-Place Click to Edit) */}
            <div className="lg:col-span-6 xl:col-span-7 sticky top-24 space-y-4">
              <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span>✨ <strong>Direct Edit Mode</strong>: Click any text on the A4 resume to edit live</span>
                <span className="capitalize text-indigo-400 font-semibold">{activeTemplate}</span>
              </div>

              {/* A4 Canvas Container */}
              <div className="w-full overflow-x-auto p-4 md:p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-2xl flex justify-center backdrop-blur-sm min-h-[700px]">
                <ResumePreview
                  resume={resume}
                  template={activeTemplate}
                  accentColor={accentColor}
                  fontFamily={activeFont}
                  sectionOrder={sectionOrder}
                  onUpdateText={handleUpdateText}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Suggestion Popup Modal */}
      <AISuggestionModal
        isOpen={aiModalState.isOpen}
        onClose={() => setAiModalState({ ...aiModalState, isOpen: false })}
        originalText={aiModalState.originalText}
        jobTitle={aiModalState.jobTitle}
        onAccept={handleAcceptAISuggestion}
      />
    </div>
  );
}
