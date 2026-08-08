import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function CoverLetterPreview({
  personalInfo = {},
  coverLetterData = {},
  accentColor = '#dc2626',
  fontFamily = 'sans',
  template = 'modern'
}) {
  const { recipientName, companyName, jobTitle, date, letterText } = coverLetterData;

  const fontClasses = {
    sans: 'font-sans',
    serif: 'font-serif',
    display: 'font-display'
  };

  const fontClass = fontClasses[fontFamily] || 'font-sans';

  const formattedDate = date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // TEMPLATE 1: CREATIVE SPLIT (Two-Tone Sidebar)
  if (template === 'creative') {
    return (
      <div 
        id="printable-cover-letter"
        className={`page-a4 bg-white text-slate-900 shadow-2xl rounded-sm transition-all overflow-hidden ${fontClass}`}
      >
        <div className="grid grid-cols-12 min-h-full">
          {/* Left Colored Sidebar */}
          <div 
            className="col-span-4 p-6 text-white space-y-6"
            style={{ backgroundColor: accentColor }}
          >
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mt-1">
                {personalInfo.jobTitle || 'Job Title'}
              </p>
            </div>

            <div className="space-y-2 text-[11px] text-white/90 border-t border-white/20 pt-4">
              {personalInfo.email && <div className="break-all">📧 {personalInfo.email}</div>}
              {personalInfo.phone && <div>📞 {personalInfo.phone}</div>}
              {personalInfo.location && <div>📍 {personalInfo.location}</div>}
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-8 p-8 space-y-6">
            <div className="text-xs text-slate-600 space-y-1">
              <p>{formattedDate}</p>
              <p className="font-bold text-slate-900 text-sm pt-2">{recipientName || 'Hiring Manager'}</p>
              <p className="font-semibold text-slate-700">{companyName || 'Target Company'}</p>
            </div>

            <div className="border-l-2 pl-3" style={{ borderColor: accentColor }}>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                RE: Cover Letter for {jobTitle || 'Target Role'} Position
              </h2>
            </div>

            <div className="text-xs text-slate-800 leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {letterText}
            </div>

            <div className="pt-6 text-xs text-slate-900 space-y-2">
              <p>Sincerely,</p>
              <p className="font-bold text-sm" style={{ color: accentColor }}>
                {personalInfo.fullName || 'Your Name'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TEMPLATE 2: EXECUTIVE CLASSIC (Centered Double-Border)
  if (template === 'executive') {
    return (
      <div 
        id="printable-cover-letter"
        className={`page-a4 bg-white text-slate-900 shadow-2xl rounded-sm p-8 md:p-12 space-y-6 ${fontClass}`}
      >
        <div className="text-center border-b-2 border-t-2 py-4 space-y-1" style={{ borderColor: accentColor }}>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-widest">
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600" style={{ color: accentColor }}>
            {personalInfo.jobTitle || 'Professional Job Title'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-600 pt-1 font-serif">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
          </div>
        </div>

        <div className="text-xs text-slate-600 space-y-1 font-serif">
          <p>{formattedDate}</p>
          <p className="font-bold text-slate-900 text-sm pt-2">{recipientName || 'Hiring Manager'}</p>
          <p className="font-semibold text-slate-700">{companyName || 'Target Company'}</p>
        </div>

        <div className="text-center border-b pb-2" style={{ borderColor: `${accentColor}33` }}>
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
            APPLICATION FOR {jobTitle || 'TARGET ROLE'}
          </h2>
        </div>

        <div className="text-xs text-slate-800 leading-relaxed space-y-4 whitespace-pre-line font-serif">
          {letterText}
        </div>

        <div className="pt-6 text-xs text-slate-900 space-y-2 font-serif">
          <p>Sincerely,</p>
          <p className="font-bold text-sm">{personalInfo.fullName || 'Your Full Name'}</p>
        </div>
      </div>
    );
  }

  // DEFAULT / MODERN SLATE COVER LETTER LAYOUT
  return (
    <div 
      id="printable-cover-letter"
      className={`page-a4 bg-white text-slate-900 shadow-2xl rounded-sm p-8 md:p-12 space-y-6 ${fontClass}`}
    >
      <div className="border-b-2 pb-4" style={{ borderColor: accentColor }}>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
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
        </div>
      </div>

      <div className="text-xs text-slate-600 space-y-1 font-medium">
        <p>{formattedDate}</p>
        <p className="font-bold text-slate-900 text-sm pt-2">{recipientName || 'Hiring Manager & Talent Acquisition Team'}</p>
        <p className="font-semibold text-slate-700">{companyName || 'Target Company'}</p>
      </div>

      <div className="pt-1">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-l-2 pl-3" style={{ borderColor: accentColor }}>
          RE: Application for {jobTitle || 'Target Role'} Position
        </h2>
      </div>

      <div className="text-xs text-slate-800 leading-relaxed space-y-4 whitespace-pre-line font-normal">
        {letterText}
      </div>

      <div className="pt-6 text-xs text-slate-900 space-y-2">
        <p>Sincerely,</p>
        <p className="font-bold text-sm" style={{ color: accentColor }}>
          {personalInfo.fullName || 'Your Full Name'}
        </p>
      </div>
    </div>
  );
}
