import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import AISuggestionModal from './components/AISuggestionModal';
import LoginPage from './components/LoginPage';
import { sampleResume, emptyResume } from './data/sampleResume';
import html2pdf from 'html2pdf.js';
import { Info } from 'lucide-react';

export default function App() {
  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('resumeBuilderUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [resume, setResume] = useState(sampleResume);
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [accentColor, setAccentColor] = useState('#dc2626');
  const [activeFont, setActiveFont] = useState('sans');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const [themeMode, setThemeMode] = useState('system');

  const [sectionOrder, setSectionOrder] = useState([
    'summary', 
    'education', 
    'experience', 
    'projects', 
    'skills'
  ]);

  const [aiModalState, setAiModalState] = useState({
    isOpen: false,
    experienceIndex: null,
    originalText: '',
    jobTitle: ''
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      let activeIsDark = true;

      if (themeMode === 'system') {
        activeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        activeIsDark = (themeMode === 'dark');
      }

      if (activeIsDark) {
        root.classList.remove('theme-light');
        root.classList.add('theme-dark');
      } else {
        root.classList.remove('theme-dark');
        root.classList.add('theme-light');
      }
    };

    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (themeMode === 'system') applyTheme();
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themeMode]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('resumeBuilderUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('resumeBuilderUser');
  };

  // Safe Deep Field Path Updater
  const handleUpdateText = (fieldPath, newValue) => {
    if (!fieldPath) return;

    try {
      const parts = fieldPath.split('.');
      const updated = JSON.parse(JSON.stringify(resume));

      let current = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        if (current[key] === undefined || current[key] === null) {
          return;
        }
        current = current[key];
      }

      const lastKey = parts[parts.length - 1];
      current[lastKey] = newValue;

      setResume(updated);
    } catch (err) {
      console.error('Error updating text field path:', fieldPath, err);
    }
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

  // Direct Vector PDF Export Handler
  const handleDownloadPDF = () => {
    setIsExporting(true);
    const element = document.getElementById('printable-resume');

    if (!element) {
      setIsExporting(false);
      return;
    }

    const nameSlug = (resume.personalInfo.fullName || 'Resume').replace(/\s+/g, '_');
    const opt = {
      margin: [0, 0, 0, 0],
      filename: `${nameSlug}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        onclone: (clonedDoc) => {
          const printable = clonedDoc.getElementById('printable-resume');
          if (printable) {
            printable.style.backgroundColor = '#ffffff';
            printable.style.color = '#0f172a';
            const allElements = printable.getElementsByTagName('*');
            for (let el of allElements) {
              const bg = el.style.backgroundColor;
              const col = el.style.color;
              const border = el.style.borderColor;

              if (bg && (bg.includes('oklch') || bg.includes('oklab'))) {
                el.style.backgroundColor = '#ffffff';
              }
              if (col && (col.includes('oklch') || col.includes('oklab'))) {
                el.style.color = '#0f172a';
              }
              if (border && (border.includes('oklch') || border.includes('oklab'))) {
                el.style.borderColor = '#e2e8f0';
              }
            }
          }
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true }
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

  // IF USER IS NOT LOGGED IN, RENDER DEDICATED LOGIN PAGE GATE FIRST
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-red-600 selection:text-white transition-colors duration-300">
      
      {/* App Header Bar with Top-Right Log Out Button */}
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
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        
        {/* Full Preview Mode View */}
        {isPreviewMode ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="no-print bg-[var(--bg-card)] border border-[var(--border-color)] p-4 rounded-xl flex items-center justify-between w-full max-w-4xl shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Full Preview & Direct In-Place Edit Mode — Click any text on the resume to edit directly</span>
              </div>
              <button
                onClick={() => setIsPreviewMode(false)}
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-md cursor-pointer"
              >
                Back to Editor
              </button>
            </div>

            <div className="w-full flex justify-center py-6 overflow-x-auto">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Interactive Forms */}
            <div className="lg:col-span-5 space-y-4 no-print z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
                  Resume Form Editor
                </h2>
                <span className="text-xs font-medium text-[var(--text-secondary)]">Live Auto-Syncing</span>
              </div>

              <FormSection
                resume={resume}
                onChange={setResume}
                onOpenAIModal={handleOpenAIModal}
                sectionOrder={sectionOrder}
                onUpdateSectionOrder={setSectionOrder}
              />
            </div>

            {/* Right Column: Live A4 Canvas Preview */}
            <div className="lg:col-span-7 sticky top-20 space-y-4 z-0 min-w-0">
              <div className="no-print flex items-center justify-between bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-primary)] font-semibold shadow-md">
                <span>✨ <strong>Direct Edit Mode</strong>: Click any text on the A4 resume to edit live</span>
                <span className="capitalize text-yellow-400 font-bold">{activeTemplate}</span>
              </div>

              {/* A4 Canvas Scroll Container */}
              <div className="w-full overflow-x-auto p-3 sm:p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex justify-center backdrop-blur-sm min-h-[700px]">
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
