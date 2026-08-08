import React from 'react';
import { Mail, Phone, MapPin, Globe, Link, Code2 } from 'lucide-react';

export default function ResumePreview({ 
  resume, 
  template = 'modern', 
  accentColor = '#4f46e5',
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

  // Helper for direct in-place editing on blur
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
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Professional Profile
        </h2>
        <p 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlur('personalInfo.summary', e)}
          className="text-xs text-slate-700 leading-relaxed font-normal focus:outline-none focus:bg-indigo-50/50 p-1 rounded"
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
          className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-slate-200"
          style={{ color: accentColor }}
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
                className="text-xs font-bold text-slate-900 focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
              >
                {edu.degree || 'Degree'}
              </h3>
              <p className="text-xs text-slate-600">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`education.${idx}.school`, e)}
                  className="focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                >
                  {edu.school}
                </span>{' '}
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`education.${idx}.year`, e)}
                  className="focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                >
                  {edu.year ? `(${edu.year})` : ''}
                </span>
              </p>
              {edu.gpa && (
                <p 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`education.${idx}.gpa`, e)}
                  className="text-[11px] text-slate-500 font-medium focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
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
          className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-slate-200"
          style={{ color: accentColor }}
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
                    className="focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                  >
                    {exp.title || 'Position Title'}
                  </span>{' '}
                  <span className="font-medium text-slate-500">at</span>{' '}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(`experience.${idx}.company`, e)}
                    className="focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                  >
                    {exp.company || 'Company'}
                  </span>
                </h3>
                <span 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`experience.${idx}.startDate`, e)}
                  className="text-xs font-medium text-slate-500 whitespace-nowrap focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                >
                  {exp.startDate} {exp.location ? `| ${exp.location}` : ''}
                </span>
              </div>
              <p 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(`experience.${idx}.description`, e)}
                className="text-xs text-slate-700 whitespace-pre-line leading-relaxed focus:outline-none focus:bg-indigo-50/50 p-1 rounded"
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
          className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-slate-200"
          style={{ color: accentColor }}
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
                  className="text-xs font-bold text-slate-900 focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                >
                  {proj.name}
                </h3>
                {proj.techStack && (
                  <span 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(`projects.${idx}.techStack`, e)}
                    className="text-[11px] font-semibold text-slate-500 focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
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
                  className="text-xs text-slate-700 mt-0.5 focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
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
          className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-slate-200"
          style={{ color: accentColor }}
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
                  className="font-semibold text-slate-800 truncate mr-2 focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                >
                  {name}
                </span>
                {level && (
                  <span 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(`skills.${idx}.level`, e)}
                    className="text-[9px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider whitespace-nowrap shrink-0 focus:outline-none"
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

  // Feature #7: Render Custom Section Dynamically by ID
  const renderCustomSection = (secId) => {
    const customSec = customSections.find(c => c.id === secId);
    if (!customSec || !customSec.items || customSec.items.length === 0) return null;

    return (
      <div key={secId} className="space-y-2">
        <h2 
          className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-slate-200"
          style={{ color: accentColor }}
        >
          {customSec.title}
        </h2>

        {/* Item List Layout */}
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

        {/* Badge Grid Layout */}
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

        {/* Bullet List Layout */}
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

  // Section Renderers Registry
  const renderSection = (secKey) => {
    if (secKey === 'summary') return renderSummarySection();
    if (secKey === 'education') return renderEducationSection();
    if (secKey === 'experience') return renderExperienceSection();
    if (secKey === 'projects') return renderProjectsSection();
    if (secKey === 'skills') return renderSkillsSection();
    if (secKey.startsWith('custom-sec-')) return renderCustomSection(secKey);
    return null;
  };

  return (
    <div 
      id="printable-resume" 
      className={`resume-preview-container page-a4 bg-white text-slate-900 shadow-2xl rounded-sm transition-all overflow-hidden ${fontClass} template-${template}`}
      style={{ '--accent-color': accentColor }}
    >
      <div className="p-8 md:p-10 space-y-6 text-slate-800 leading-relaxed">
        {/* Header */}
        <div className="border-b-2 pb-4" style={{ borderColor: accentColor }}>
          <h1 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('personalInfo.fullName', e)}
            className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1 break-words focus:outline-none focus:bg-indigo-50/50 p-1 rounded"
          >
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur('personalInfo.jobTitle', e)}
            className="text-sm md:text-base font-semibold uppercase tracking-wider mb-3 focus:outline-none focus:bg-indigo-50/50 p-1 rounded" 
            style={{ color: accentColor }}
          >
            {personalInfo.jobTitle || 'Professional Job Title'}
          </p>
          
          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur('personalInfo.email', e)}
                  className="break-all focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                >
                  {personalInfo.email}
                </span>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur('personalInfo.phone', e)}
                  className="focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                >
                  {personalInfo.phone}
                </span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur('personalInfo.location', e)}
                  className="focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                >
                  {personalInfo.location}
                </span>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur('personalInfo.website', e)}
                  className="focus:outline-none focus:bg-indigo-50/50 p-0.5 rounded"
                >
                  {personalInfo.website}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Reorderable Sections (Includes Custom Sections) */}
        <div className="space-y-6">
          {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
        </div>
      </div>
    </div>
  );
}
