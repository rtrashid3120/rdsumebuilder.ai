import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Globe, Code2, Link as LinkIcon, AlertTriangle } from 'lucide-react';

export default function ResumePreview({ 
  resume, 
  template = 'modern', 
  accentColor = '#10b981',
  fontFamily = 'sans',
  sectionOrder = ['summary', 'education', 'experience', 'projects', 'skills'],
  onUpdateText
}) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], customSections = [] } = resume;
  
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [overflowPercentage, setOverflowPercentage] = useState(100);

  const fontClasses = {
    sans: 'font-sans-inter',
    roboto: 'font-sans-roboto',
    serif: 'font-serif-merriweather',
    playfair: 'font-serif-playfair',
    display: 'font-display-outfit',
    jakarta: 'font-sans-jakarta',
    fira: 'font-mono-fira',
    lora: 'font-serif-lora'
  };

  const fontClass = fontClasses[fontFamily] || 'font-sans-inter';

  // Real-Time A4 Height Monitor (Standard A4 is ~1123px at 96 DPI)
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const height = containerRef.current.scrollHeight;
        const targetA4Height = 1123;
        if (height > targetA4Height + 10) {
          setIsOverflowing(true);
          setOverflowPercentage(Math.round((height / targetA4Height) * 100));
        } else {
          setIsOverflowing(false);
          setOverflowPercentage(100);
        }
      }
    };

    checkOverflow();
    const timeout = setTimeout(checkOverflow, 300);
    return () => clearTimeout(timeout);
  }, [resume, template, fontFamily, sectionOrder]);

  const handleBlur = (fieldPath, e) => {
    if (!onUpdateText) return;
    const value = e.target.innerText;
    onUpdateText(fieldPath, value);
  };

  // Section Renderers
  const renderSummarySection = () => {
    if (!personalInfo.summary) return null;
    return (
      <div key="summary" className="space-y-1 py-0.5">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-0.5 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Profile Summary
        </h2>
        <p 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlur('personalInfo.summary', e)}
          className="text-xs text-slate-700 leading-relaxed font-normal focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded"
        >
          {personalInfo.summary}
        </p>
      </div>
    );
  };

  const renderEducationSection = () => {
    if (!education || education.length === 0) return null;
    return (
      <div key="education" className="space-y-1.5 py-0.5">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-0.5 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Education
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {education.map((edu, idx) => (
            <div key={edu.id || idx}>
              <h3 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(`education.${idx}.degree`, e)}
                className="text-xs font-bold text-slate-900 focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded"
              >
                {edu.degree || 'Degree'}
              </h3>
              <p className="text-xs text-slate-600">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`education.${idx}.school`, e)}
                  className="font-medium focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded"
                >
                  {edu.school || 'School/University'}
                </span>
                {edu.year && <span className="text-slate-400 font-normal"> ({edu.year})</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExperienceSection = () => {
    if (!experience || experience.length === 0) return null;
    return (
      <div key="experience" className="space-y-2 py-0.5">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-0.5 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Work Experience
        </h2>
        <div className="space-y-3">
          {experience.map((exp, idx) => (
            <div key={exp.id || idx} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div>
                  <h3 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(`experience.${idx}.title`, e)}
                    className="text-xs font-bold text-slate-900 inline focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded"
                  >
                    {exp.title || 'Job Title'}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium"> — </span>
                  <span 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(`experience.${idx}.company`, e)}
                    className="text-xs font-semibold text-slate-700 focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded"
                  >
                    {exp.company || 'Company'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{exp.startDate}</span>
              </div>
              <p 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(`experience.${idx}.description`, e)}
                className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-normal focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded"
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
      <div key="projects" className="space-y-2 py-0.5">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-0.5 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Key Projects
        </h2>
        <div className="space-y-2">
          {projects.map((proj, idx) => (
            <div key={proj.id || idx} className="space-y-0.5">
              <div className="flex items-baseline justify-between gap-1">
                <h3 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBlur(`projects.${idx}.name`, e)}
                  className="text-xs font-bold text-slate-900 focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded"
                >
                  {proj.name || 'Project Name'}
                </h3>
                {proj.techStack && (
                  <span className="text-[10px] font-mono text-slate-500">{proj.techStack}</span>
                )}
              </div>
              <p 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(`projects.${idx}.description`, e)}
                className="text-xs text-slate-700 leading-relaxed font-normal focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded"
              >
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSkillsSection = () => {
    if (!skills || skills.length === 0) return null;
    return (
      <div key="skills" className="space-y-1.5 py-0.5">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-0.5 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Skills & Expertise
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill, idx) => {
            const skillName = typeof skill === 'string' ? skill : skill.name;
            const skillLevel = typeof skill === 'object' ? skill.level : '';
            return (
              <span 
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
              >
                <span>{skillName}</span>
                {skillLevel && <span className="text-[10px] text-slate-500 font-normal">({skillLevel})</span>}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCustomSection = (sectionKey) => {
    const customSec = customSections.find(c => c.id === sectionKey);
    if (!customSec) return null;

    return (
      <div key={customSec.id} className="space-y-2 py-0.5">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-0.5 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          {customSec.title || 'Custom Section'}
        </h2>

        {customSec.type === 'badgeGrid' ? (
          <div className="flex flex-wrap gap-1.5">
            {customSec.items?.map((item, idx) => (
              <div key={item.id || idx} className="bg-slate-100 px-2.5 py-1 rounded text-xs border border-slate-200 flex items-center gap-1.5">
                <span className="font-bold text-slate-800">{item.title}</span>
                {item.subtitle && <span className="text-[10px] text-slate-500">• {item.subtitle}</span>}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {customSec.items?.map((item, idx) => (
              <div key={item.id || idx} className="space-y-0.5">
                <div className="flex items-baseline justify-between gap-1">
                  <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                  {item.date && <span className="text-[10px] text-slate-400">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-xs text-slate-600 font-medium">{item.subtitle}</p>}
                {item.description && <p className="text-xs text-slate-700 font-normal">{item.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    switch (sectionKey) {
      case 'summary': return renderSummarySection();
      case 'education': return renderEducationSection();
      case 'experience': return renderExperienceSection();
      case 'projects': return renderProjectsSection();
      case 'skills': return renderSkillsSection();
      default: return renderCustomSection(sectionKey);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Real-Time A4 Overflow Warning Indicator */}
      {isOverflowing && (
        <div className="no-print w-full max-w-2xl mb-3 animate-fade-in">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs font-semibold shadow-lg backdrop-blur-md">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
            <div>
              <span className="font-extrabold text-amber-300">⚠️ A4 Page Height Exceeded ({overflowPercentage}% of 1 Page)</span>
              <p className="text-[11px] text-slate-300">Content spills onto page 2. Trim 1-2 bullet points for a 1-page ATS layout.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Printable A4 Canvas */}
      <div 
        ref={containerRef}
        id="printable-resume" 
        className={`resume-preview-container page-a4 bg-white text-slate-900 shadow-2xl rounded-sm transition-all overflow-hidden ${fontClass}`}
      >
        {/* TEMPLATE 1: CREATIVE SPLIT */}
        {template === 'creative' ? (
          <div className="grid grid-cols-12 min-h-full">
            <div 
              className="col-span-4 p-6 text-white space-y-4"
              style={{ backgroundColor: accentColor }}
            >
              <div className="space-y-1">
                <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  {personalInfo.jobTitle || 'Job Title'}
                </p>
              </div>

              <div className="space-y-2 text-[11px] text-white/95 border-t border-white/20 pt-3">
                {personalInfo.email && <div className="break-all">✉️ {personalInfo.email}</div>}
                {personalInfo.phone && <div>📞 {personalInfo.phone}</div>}
                {personalInfo.location && <div>📍 {personalInfo.location}</div>}
                {personalInfo.website && <div className="break-all">🌐 {personalInfo.website}</div>}
                {personalInfo.linkedin && <div className="break-all flex items-center gap-1"><LinkIcon className="w-3 h-3 shrink-0" /> {personalInfo.linkedin}</div>}
                {personalInfo.github && <div className="break-all flex items-center gap-1"><Code2 className="w-3 h-3 shrink-0" /> {personalInfo.github}</div>}
              </div>

              {education.length > 0 && (
                <div className="space-y-2 border-t border-white/20 pt-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Education</h3>
                  <div className="space-y-2 text-xs">
                    {education.map((edu, idx) => (
                      <div key={edu.id || idx} className="text-white/95">
                        <p className="font-bold text-[11px] text-white">{edu.degree}</p>
                        <p className="text-[10px] text-white/80">{edu.school} {edu.year ? `(${edu.year})` : ''}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skills.length > 0 && (
                <div className="space-y-2 border-t border-white/20 pt-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Skills</h3>
                  <div className="space-y-1 text-xs">
                    {skills.map((s, idx) => (
                      <div key={idx} className="bg-white/10 px-2 py-1 rounded text-[11px] font-semibold flex justify-between">
                        <span className="truncate mr-1">{typeof s === 'string' ? s : s.name}</span>
                        <span className="opacity-80 shrink-0">{typeof s === 'object' ? s.level : ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-8 p-6 md:p-8 space-y-4">
              {sectionOrder
                .filter(sec => sec !== 'skills' && sec !== 'education')
                .map(sectionKey => renderSection(sectionKey))}
            </div>
          </div>
        ) : template === 'executive' ? (
          /* TEMPLATE 2: EXECUTIVE CLASSIC */
          <div className="p-6 md:p-8 space-y-4">
            <div className="text-center border-b-2 border-t-2 py-4 space-y-1" style={{ borderColor: accentColor }}>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-widest">
                {personalInfo.fullName || 'Your Full Name'}
              </h1>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600" style={{ color: accentColor }}>
                {personalInfo.jobTitle || 'Professional Job Title'}
              </p>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-slate-600 pt-1">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                {personalInfo.location && <span>• {personalInfo.location}</span>}
                {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                {personalInfo.github && <span>• {personalInfo.github}</span>}
                {personalInfo.website && <span>• {personalInfo.website}</span>}
              </div>
            </div>

            <div className="space-y-4">
              {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
            </div>
          </div>
        ) : template === 'minimal' ? (
          /* TEMPLATE 3: TECH MINIMALIST */
          <div className="p-6 md:p-8 space-y-4 font-mono text-slate-900">
            <div className="border-l-4 p-4 bg-slate-50 space-y-1" style={{ borderColor: accentColor }}>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-xs font-bold uppercase" style={{ color: accentColor }}>
                // {personalInfo.jobTitle || 'Developer'}
              </p>
              <p className="text-[11px] text-slate-600">
                {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.github].filter(Boolean).join(' | ')}
              </p>
            </div>

            <div className="space-y-4">
              {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
            </div>
          </div>
        ) : template === 'compact' ? (
          /* TEMPLATE 4: COMPACT ATS MAX */
          <div className="p-5 md:p-6 space-y-3 leading-tight text-slate-900">
            <div className="border-b pb-2">
              <h1 className="text-xl md:text-2xl font-black uppercase text-slate-900 tracking-wide">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-xs font-bold text-slate-700 uppercase" style={{ color: accentColor }}>
                {personalInfo.jobTitle || 'Job Title'}
              </p>
              <div className="text-[11px] text-slate-600 flex flex-wrap gap-2 pt-0.5">
                {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.website].filter(Boolean).join(' • ')}
              </div>
            </div>

            <div className="space-y-3">
              {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
            </div>
          </div>
        ) : template === 'elegant' ? (
          /* TEMPLATE 5: LUXE ELEGANT SERIF */
          <div className="p-6 md:p-8 space-y-4 text-slate-800">
            <div className="text-center border-b-4 border-double pb-4 space-y-1" style={{ borderColor: accentColor }}>
              <h1 className="text-3xl font-bold text-slate-900 tracking-widest uppercase">
                {personalInfo.fullName || 'Your Full Name'}
              </h1>
              <p className="text-xs italic tracking-widest uppercase text-slate-600" style={{ color: accentColor }}>
                {personalInfo.jobTitle || 'Executive Title'}
              </p>
              <div className="text-xs text-slate-500 pt-1 flex justify-center gap-3">
                {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin].filter(Boolean).join('  |  ')}
              </div>
            </div>

            <div className="space-y-4">
              {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
            </div>
          </div>
        ) : template === 'silicon' ? (
          /* TEMPLATE 6: SILICON VALLEY */
          <div className="p-6 md:p-8 space-y-4">
            <div className="flex justify-between items-start border-b-2 pb-4" style={{ borderColor: accentColor }}>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-sm font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                  {personalInfo.jobTitle || 'Software Engineer'}
                </p>
              </div>
              <div className="text-right text-xs text-slate-600 space-y-0.5">
                {personalInfo.email && <div>{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
                {personalInfo.github && <div className="font-mono text-[11px]">{personalInfo.github}</div>}
              </div>
            </div>

            <div className="space-y-4">
              {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
            </div>
          </div>
        ) : template === 'corporate' ? (
          /* TEMPLATE 7: CORPORATE GRID */
          <div className="space-y-4">
            <div className="p-6 text-white space-y-1" style={{ backgroundColor: accentColor }}>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-xs font-bold text-white/90 uppercase tracking-widest">
                {personalInfo.jobTitle || 'Corporate Professional'}
              </p>
              <div className="text-xs text-white/80 pt-2 flex flex-wrap gap-x-4 gap-y-1">
                {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
                {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
                {personalInfo.location && <span>📍 {personalInfo.location}</span>}
                {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
              </div>
            </div>

            <div className="p-6 space-y-4">
              {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
            </div>
          </div>
        ) : template === 'academic' ? (
          /* TEMPLATE 8: ACADEMIC CV */
          <div className="p-6 md:p-8 space-y-4 text-slate-900">
            <div className="border-b-2 pb-3 space-y-1" style={{ borderColor: accentColor }}>
              <h1 className="text-2xl font-bold text-slate-900">
                {personalInfo.fullName || 'Academic Curriculum Vitae'}
              </h1>
              <p className="text-xs font-semibold text-slate-600">
                {personalInfo.jobTitle || 'Researcher / Educator'}
              </p>
              <div className="text-xs text-slate-500 flex flex-wrap gap-x-3">
                {personalInfo.email && <span>Email: {personalInfo.email}</span>}
                {personalInfo.phone && <span>Tel: {personalInfo.phone}</span>}
                {personalInfo.location && <span>Location: {personalInfo.location}</span>}
              </div>
            </div>

            <div className="space-y-4">
              {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
            </div>
          </div>
        ) : template === 'pill' ? (
          /* TEMPLATE 9: MODERN PILL HEADER */
          <div className="p-6 md:p-8 space-y-4">
            <div className="p-5 rounded-2xl text-white space-y-2 shadow-md" style={{ backgroundColor: accentColor }}>
              <h1 className="text-2xl md:text-3xl font-black">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-xs font-bold text-white/90 uppercase tracking-wider">
                {personalInfo.jobTitle || 'Creative Specialist'}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin].filter(Boolean).map((info, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-semibold">
                    {info}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
            </div>
          </div>
        ) : (
          /* TEMPLATE 10: DEFAULT / MODERN SLATE */
          <div className="p-6 md:p-8 space-y-4 text-slate-800 leading-relaxed">
            <div className="border-b-2 pb-3" style={{ borderColor: accentColor }}>
              <h1 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur('personalInfo.fullName', e)}
                className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1 break-words focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded"
              >
                {personalInfo.fullName || 'Your Full Name'}
              </h1>
              <p 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur('personalInfo.jobTitle', e)}
                className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 focus:outline-none focus:bg-emerald-50/50 p-0.5 rounded" 
                style={{ color: accentColor }}
              >
                {personalInfo.jobTitle || 'Professional Job Title'}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
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
                {personalInfo.linkedin && (
                  <span className="flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                    <span>{personalInfo.linkedin}</span>
                  </span>
                )}
                {personalInfo.github && (
                  <span className="flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                    <span>{personalInfo.github}</span>
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

            <div className="space-y-4">
              {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
