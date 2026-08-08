import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Globe, Code2, Link as LinkIcon, AlertTriangle } from 'lucide-react';

export default function ResumePreview({ 
  resume, 
  template = 'modern', 
  accentColor = '#dc2626',
  fontFamily = 'sans',
  sectionOrder = ['summary', 'education', 'experience', 'projects', 'skills'],
  onUpdateText
}) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], customSections = [] } = resume;
  
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [overflowPercentage, setOverflowPercentage] = useState(100);

  const fontClasses = {
    sans: 'font-sans',
    serif: 'font-serif',
    display: 'font-display'
  };

  const fontClass = fontClasses[fontFamily] || 'font-sans';

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
          className="text-xs text-slate-700 leading-relaxed font-normal focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
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
                <h3 className="text-xs font-bold text-slate-900">
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
                  className="text-[11px] font-semibold text-slate-500 whitespace-nowrap focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                >
                  {exp.startDate} {exp.location ? `| ${exp.location}` : ''}
                </span>
              </div>
              <p 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(`experience.${idx}.description`, e)}
                className="text-xs text-slate-700 whitespace-pre-line leading-relaxed focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
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
      <div key="projects" className="space-y-1.5 py-0.5">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-0.5 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Key Projects
        </h2>
        <div className="space-y-2">
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

  // Fix 1: Outline Badge Table Renderer for Skills - Eliminates html2canvas Overlap 100%!
  const renderSkillsSection = () => {
    if (!skills || skills.length === 0) return null;
    
    const half = Math.ceil(skills.length / 2);
    const col1 = skills.slice(0, half);
    const col2 = skills.slice(half);

    return (
      <div key="skills" className="space-y-2 py-0.5">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-0.5 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          Skills & Expertise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 text-xs">
          {/* Column 1 Table */}
          <table className="w-full border-collapse">
            <tbody>
              {col1.map((s, idx) => {
                const name = typeof s === 'string' ? s : s.name;
                const level = typeof s === 'object' ? s.level : '';
                return (
                  <tr key={idx} className="border-b border-slate-200">
                    <td className="py-1 font-bold text-slate-900 text-xs text-left align-middle">
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur(`skills.${idx}.name`, e)}
                        className="focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                      >
                        {name}
                      </span>
                    </td>
                    <td className="py-1 text-right align-middle">
                      {level && (
                        <span 
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleBlur(`skills.${idx}.level`, e)}
                          className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block font-sans shadow-2xs"
                          style={{ 
                            color: accentColor,
                            border: `1.5px solid ${accentColor}`,
                            backgroundColor: '#ffffff'
                          }}
                        >
                          {level}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Column 2 Table */}
          <table className="w-full border-collapse">
            <tbody>
              {col2.map((s, idx) => {
                const actualIdx = half + idx;
                const name = typeof s === 'string' ? s : s.name;
                const level = typeof s === 'object' ? s.level : '';
                return (
                  <tr key={actualIdx} className="border-b border-slate-200">
                    <td className="py-1 font-bold text-slate-900 text-xs text-left align-middle">
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur(`skills.${actualIdx}.name`, e)}
                        className="focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
                      >
                        {name}
                      </span>
                    </td>
                    <td className="py-1 text-right align-middle">
                      {level && (
                        <span 
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleBlur(`skills.${actualIdx}.level`, e)}
                          className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block font-sans shadow-2xs"
                          style={{ 
                            color: accentColor,
                            border: `1.5px solid ${accentColor}`,
                            backgroundColor: '#ffffff'
                          }}
                        >
                          {level}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCustomSection = (secId) => {
    const customSec = customSections.find(c => c.id === secId);
    if (!customSec || !customSec.items || customSec.items.length === 0) return null;

    return (
      <div key={secId} className="space-y-1.5 py-0.5">
        <h2 
          className="text-xs font-extrabold uppercase tracking-widest pb-0.5 border-b"
          style={{ color: accentColor, borderColor: `${accentColor}33` }}
        >
          {customSec.title}
        </h2>

        {customSec.type === 'itemList' && (
          <div className="space-y-2">
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
          <table className="w-full border-collapse text-xs">
            <tbody>
              {customSec.items.map((item, idx) => (
                <tr key={item.id || idx} className="border-b border-slate-200">
                  <td className="py-1 font-bold text-slate-900 text-left align-middle">{item.title}</td>
                  <td className="py-1 text-right text-[10px] text-slate-600 font-semibold align-middle">{item.subtitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

  return (
    <div className="relative flex flex-col items-center w-full">
      
      {/* Real-Time A4 Overflow Warning Indicator */}
      {isOverflowing && (
        <div className="no-print mb-3 w-full max-w-[210mm] bg-amber-950/90 border border-amber-500/80 rounded-xl p-3 text-white shadow-xl flex items-center justify-between text-xs animate-fade-in">
          <div className="flex items-center gap-2">
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
        {/* TEMPLATE LAYOUT 1: CREATIVE SPLIT */}
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
          /* TEMPLATE LAYOUT 2: EXECUTIVE CLASSIC */
          <div className="p-6 md:p-8 space-y-4">
            <div className="text-center border-b-2 border-t-2 py-3 space-y-1" style={{ borderColor: accentColor }}>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-widest">
                {personalInfo.fullName || 'Your Full Name'}
              </h1>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600" style={{ color: accentColor }}>
                {personalInfo.jobTitle || 'Professional Job Title'}
              </p>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-slate-600 pt-1 font-serif">
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
        ) : (
          /* DEFAULT / MODERN SLATE TEMPLATE */
          <div className="p-6 md:p-8 space-y-4 text-slate-800 leading-relaxed">
            <div className="border-b-2 pb-3" style={{ borderColor: accentColor }}>
              <h1 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur('personalInfo.fullName', e)}
                className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1 break-words focus:outline-none focus:bg-red-50/50 p-0.5 rounded"
              >
                {personalInfo.fullName || 'Your Full Name'}
              </h1>
              <p 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur('personalInfo.jobTitle', e)}
                className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 focus:outline-none focus:bg-red-50/50 p-0.5 rounded" 
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
