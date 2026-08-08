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

  return (
    <div 
      id="printable-cover-letter"
      className={`page-a4 bg-white text-slate-900 shadow-2xl rounded-sm p-8 md:p-12 space-y-6 ${fontClass}`}
    >
      {/* Header Matching Resume Accent Color */}
      <div className="border-b-2 pb-4" style={{ borderColor: accentColor }}>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
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

      {/* Recipient & Date Meta Header */}
      <div className="text-xs text-slate-600 space-y-1 font-medium">
        <p>{date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <p className="font-bold text-slate-900 text-sm pt-2">{recipientName || 'Hiring Manager / Talent Acquisition Team'}</p>
        <p className="font-semibold text-slate-700">{companyName || 'Target Company'}</p>
      </div>

      {/* Subject Line */}
      <div className="pt-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-l-2 pl-3" style={{ borderColor: accentColor }}>
          RE: Application for {jobTitle || 'Target Role'} Position
        </h2>
      </div>

      {/* Cover Letter Body */}
      <div className="text-xs text-slate-800 leading-relaxed space-y-4 whitespace-pre-line font-normal">
        {letterText || `Dear Hiring Team,\n\nI am writing to express my strong enthusiasm for the ${jobTitle || 'Open Position'} role at ${companyName || 'your company'}.\n\nWith my background in ${personalInfo.jobTitle || 'software engineering'} and a proven track record of delivering high-impact projects, I am confident in my ability to bring immediate value to your team.\n\nThank you for your time and consideration. I look forward to the opportunity to discuss how my skills align with your goals.`}
      </div>

      {/* Sign-off */}
      <div className="pt-6 text-xs text-slate-900 space-y-3">
        <p>Sincerely,</p>
        <p className="font-bold text-sm" style={{ color: accentColor }}>
          {personalInfo.fullName || 'Your Full Name'}
        </p>
      </div>
    </div>
  );
}
