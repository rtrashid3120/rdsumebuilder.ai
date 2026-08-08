import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function ResumePreview({ 
  resume, 
  template = 'modern', 
  accentColor = '#dc2626',
  fontFamily = 'sans',
  sectionOrder = ['summary', 'education', 'experience', 'projects', 'skills'],
  onUpdateText
}) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], customSections = [] } = resume;

  const fontClasses = {
    sans: 'font-sans',
    serif: 'font-serif',
    display: 'font-display'
  };

  const fontClass = fontClasses[fontFamily] || 'font-sans';

  const handleBlur = (fieldPath, e) => {
    if (!onUpdateText) return;
    const value = e.target.innerText;
    onUpdateText(fieldPath, value);
  };

  const getInitials = (name) => {
    if (!name) return 'CV';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Section Renderers
  const renderSummarySection = () => {
    if (!personalInfo.summary) return null;
    return (
      <div key="summary" className="space-y-1">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-1 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Professional Profile
        </h2>
        <p 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlur('personalInfo.summary', e)}
          className="text-xs text-slate-700 leading-relaxed font-normal focus:outline-none focus:bg-red-50/50 p-1 rounded"
        >
          {personalInfo.summary}
        </p>
      </div>
    );
  };

  const renderEducationSection = () => {
    if (!education || education.length === 0) return null;
    return (
      <div key="education" className="space-y-2">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-1 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Education
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education.map((edu, idx) => (
            <div key={edu.id || idx}>
              <h3 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(`education.${idx}.degree`, e)}
                className="text-xs font-bold text-slate-900 focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
              >
                {edu.degree || 'Degree'}
              </h3>
              <p className="text-xs text-slate-600">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`education.${idx}.school`, e)}
                  className="focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                >
                  {edu.school}
                </span>{' '}
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`education.${idx}.year`, e)}
                  className="focus:outline-none focus:bg-red-50/50 p-0.5 rounded font-medium"
                >
                  {edu.year ? `(${edu.year})` : ''}
                </span>
              </p>
              {edu.gpa && (
                <p 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`education.${idx}.gpa`, e)}
                  className="text-[11px] text-slate-500 font-medium focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                >
                  {edu.gpa}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExperienceSection = () => {
    if (!experience || experience.length === 0) return null;
    return (
      <div key="experience" className="space-y-3">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-1 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Work Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div key={exp.id || idx} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900">
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(`experience.${idx}.title`, e)}
                    className="focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                  >
                    {exp.title || 'Position Title'}
                  </span>{' '}
                  <span className="font-medium text-slate-500">at</span>{' '}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(`experience.${idx}.company`, e)}
                    className="focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                  >
                    {exp.company || 'Company'}
                  </span>
                </h3>
                <span 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`experience.${idx}.startDate`, e)}
                  className="text-xs font-semibold text-slate-500 whitespace-nowrap focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                >
                  {exp.startDate} {exp.location ? `| ${exp.location}` : ''}
                </span>
              </div>
              <p 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(`experience.${idx}.description`, e)}
                className="text-xs text-slate-700 whitespace-pre-line leading-relaxed focus:outline-none focus:bg-red-50/50 p-1 rounded"
              >
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjectsSection = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <div key="projects" className="space-y-2">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-1 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Key Projects
        </h2>
        <div className="space-y-3">
          {projects.map((proj, idx) => (
            <div key={proj.id || idx}>
              <div className="flex items-baseline justify-between">
                <h3 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`projects.${idx}.name`, e)}
                  className="text-xs font-bold text-slate-900 focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                >
                  {proj.name}
                </h3>
                {proj.techStack && (
                  <span 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(`projects.${idx}.techStack`, e)}
                    className="text-[11px] font-semibold text-slate-500 focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                  >
                    {proj.techStack}
                  </span>
                )}
              </div>
              {proj.description && (
                <p 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`projects.${idx}.description`, e)}
                  className="text-xs text-slate-700 mt-0.5 focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                >
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSkillsSection = () => {
    if (!skills || skills.length === 0) return null;
    return (
      <div key="skills" className="space-y-2">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-1 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
          {skills.map((s, idx) => {
            const name = typeof s === 'string' ? s : s.name;
            const level = typeof s === 'object' ? s.level : '';

            return (
              <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-1 min-w-0">
                <span 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`skills.${idx}.name`, e)}
                  className="font-bold text-slate-800 truncate mr-2 focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                >
                  {name}
                </span>
                {level && (
                  <span 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(`skills.${idx}.level`, e)}
                    className="text-[9px] font-black px-2 py-0.5 rounded text-white uppercase tracking-wider whitespace-nowrap shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    {level}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCustomSection = (secId) => {
    const customSec = customSections.find(c => c.id === secId);
    if (!customSec || !customSec.items || customSec.items.length === 0) return null;

    return (
      <div key={secId} className="space-y-2">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-1 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          {customSec.title}
        </h2>

        {customSec.type === 'itemList' && (
          <div className="space-y-3">
            {customSec.items.map((item, idx) => (
              <div key={item.id || idx}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-bold text-slate-900">
                    {item.title} {item.subtitle ? <span className="font-normal text-slate-500">| {item.subtitle}</span> : ''}
                  </h3>
                  {item.date && <span className="text-[11px] font-semibold text-slate-500">{item.date}</span>}
                </div>
                {item.description && <p className="text-xs text-slate-700 mt-0.5">{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {customSec.type === 'badgeGrid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
            {customSec.items.map((item, idx) => (
              <div key={item.id || idx} className="flex items-center justify-between border-b border-slate-100 pb-1">
                <span className="font-semibold text-slate-800">{item.title}</span>
                {item.subtitle && <span className="text-[10px] text-slate-500 font-medium">{item.subtitle}</span>}
              </div>
            ))}
          </div>
        )}

        {customSec.type === 'bulletList' && (
          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
            {customSec.items.map((item, idx) => (
              <li key={item.id || idx}>{item.title}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderSection = (secKey) => {
    if (secKey === 'summary') return renderSummarySection();
    if (secKey === 'education') return renderEducationSection();
    if (secKey === 'experience') return renderExperienceSection();
    if (secKey === 'projects') return renderProjectsSection();
    if (secKey === 'skills') return renderSkillsSection();
    if (secKey.startsWith('custom-sec-')) return renderCustomSection(secKey);
    return null;
  };

  // --------------------------------------------------------------------------
  // TEMPLATE LAYOUT 1: CREATIVE SPLIT (Two-Tone Sidebar)
  // --------------------------------------------------------------------------
  if (template === 'creative') {
    return (
      <div 
        id="printable-resume" 
        className={`resume-preview-container page-a4 bg-white text-slate-900 shadow-2xl rounded-sm transition-all overflow-hidden ${fontClass}`}
      >
        <div className="grid grid-cols-12 min-h-full">
          {/* Left Colored Sidebar */}
          <div 
            className="col-span-4 p-6 text-white space-y-6"
            style={{ backgroundColor: accentColor }}
          >
            {/* Initials Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-black text-white border border-white/30 shadow-inner">
              {getInitials(personalInfo.fullName)}
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mt-1">
                {personalInfo.jobTitle || 'Job Title'}
              </p>
            </div>

            {/* Sidebar Contact Info */}
            <div className="space-y-2 text-[11px] text-white/90 border-t border-white/20 pt-4">
              {personalInfo.email && <div className="break-all">📧 {personalInfo.email}</div>}
              {personalInfo.phone && <div>📞 {personalInfo.phone}</div>}
              {personalInfo.location && <div>📍 {personalInfo.location}</div>}
              {personalInfo.website && <div className="break-all">🌐 {personalInfo.website}</div>}
            </div>

            {/* Sidebar Skills */}
            {skills.length > 0 && (
              <div className="space-y-2 border-t border-white/20 pt-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">Skills</h3>
                <div className="space-y-1.5 text-xs">
                  {skills.map((s, idx) => (
                    <div key={idx} className="bg-white/10 px-2 py-1 rounded text-[11px] font-semibold flex justify-between">
                      <span>{typeof s === 'string' ? s : s.name}</span>
                      <span className="opacity-80">{typeof s === 'object' ? s.level : ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content Right Column */}
          <div className="col-span-8 p-8 space-y-6">
            {sectionOrder
              .filter(sec => sec !== 'skills') // Skills shown in sidebar
              .map(sectionKey => renderSection(sectionKey))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // TEMPLATE LAYOUT 2: EXECUTIVE CLASSIC (Centered Double-Border)
  // --------------------------------------------------------------------------
  if (template === 'executive') {
    return (
      <div 
        id="printable-resume" 
        className={`resume-preview-container page-a4 bg-white text-slate-900 shadow-2xl rounded-sm transition-all overflow-hidden ${fontClass}`}
      >
        <div className="p-8 md:p-10 space-y-6">
          {/* Centered Classic Header */}
          <div className="text-center border-b-2 border-t-2 py-4 space-y-1" style={{ borderColor: accentColor }}>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-widest">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-sm font-bold uppercase tracking-wider text-slate-600" style={{ color: accentColor }}>
              {personalInfo.jobTitle || 'Professional Job Title'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-600 pt-1 font-serif">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.website && <span>• {personalInfo.website}</span>}
            </div>
          </div>

          <div className="space-y-6">
            {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // TEMPLATE LAYOUT 3: TECH MINIMALIST (Clean Left Border Accents)
  // --------------------------------------------------------------------------
  if (template === 'minimal') {
    return (
      <div 
        id="printable-resume" 
        className={`resume-preview-container page-a4 bg-white text-slate-900 shadow-2xl rounded-sm transition-all overflow-hidden ${fontClass}`}
      >
        <div className="p-8 md:p-10 space-y-6">
          <div className="border-l-4 pl-4 space-y-1" style={{ borderColor: accentColor }}>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {personalInfo.jobTitle || 'Professional Job Title'}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </div>

          <div className="space-y-6">
            {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // TEMPLATE LAYOUT 4: ELEGANT LUXE SERIF (Classy Crest Header)
  // --------------------------------------------------------------------------
  if (template === 'elegant') {
    return (
      <div 
        id="printable-resume" 
        className={`resume-preview-container page-a4 bg-white text-slate-900 shadow-2xl rounded-sm transition-all overflow-hidden font-serif`}
      >
        <div className="p-8 md:p-10 space-y-6">
          <div className="text-center space-y-2 border-b pb-4" style={{ borderColor: `${accentColor}44` }}>
            <div 
              className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-sm font-black text-white shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              {getInitials(personalInfo.fullName)}
            </div>
            <h1 className="text-2xl font-bold tracking-wide text-slate-900">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentColor }}>
              {personalInfo.jobTitle || 'Professional Job Title'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-600">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>| {personalInfo.phone}</span>}
              {personalInfo.location && <span>| {personalInfo.location}</span>}
            </div>
          </div>

          <div className="space-y-6">
            {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // DEFAULT / MODERN SLATE TEMPLATE
  // --------------------------------------------------------------------------
  return (
    <div 
      id="printable-resume" 
      className={`resume-preview-container page-a4 bg-white text-slate-900 shadow-2xl rounded-sm transition-all overflow-hidden ${fontClass}`}
    >
      <div className="p-8 md:p-10 space-y-6 text-slate-800 leading-relaxed">
        {/* Modern Top Header */}
        <div className="border-b-2 pb-4" style={{ borderColor: accentColor }}>
          <h1 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('personalInfo.fullName', e)}
            className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1 break-words focus:outline-none focus:bg-red-50/50 p-1 rounded"
          >
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('personalInfo.jobTitle', e)}
            className="text-sm md:text-base font-semibold uppercase tracking-wider mb-3 focus:outline-none focus:bg-red-50/50 p-1 rounded" 
            style={{ color: accentColor }}
          >
            {personalInfo.jobTitle || 'Professional Job Title'}
          </p>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span>{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span>{personalInfo.website}</span>
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Reorderable Sections */}
        <div className="space-y-6">
          {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
        </div>
      </div>
    </div>
  );
}
