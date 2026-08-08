import React, { useState, useEffect, useRef } from 'react';
import CoverLetterPreview from './CoverLetterPreview';
import { Sparkles, Download, Copy, Check, X, Building2, Briefcase, FileSignature, Edit3, Eye } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function CoverLetterModal({ 
  isOpen, 
  onClose, 
  resume = {}, 
  accentColor = '#dc2626', 
  fontFamily = 'sans', 
  template = 'modern' 
}) {
  const [companyName, setCompanyName] = useState('Nexus AI Labs');
  const [jobTitle, setJobTitle] = useState(resume.personalInfo?.jobTitle || 'Senior Engineer');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview'

  const modalBoxRef = useRef(null);

  const [coverLetterData, setCoverLetterData] = useState({
    recipientName: 'Hiring Manager',
    companyName: 'Nexus AI Labs',
    jobTitle: resume.personalInfo?.jobTitle || 'Senior Engineer',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    letterText: `Dear Hiring Team,\n\nI am writing to express my enthusiastic interest in the ${resume.personalInfo?.jobTitle || 'Senior Engineer'} position at Nexus AI Labs. Having followed your company's technical innovations, I am excited about the prospect of bringing my experience to your engineering team.\n\nThroughout my career, I have specialized in building high-throughput systems, optimizing backend performance, and collaborating closely with product teams. At my previous roles, I successfully engineered scalable features that improved platform performance by over 35% while maintaining strict quality standards.\n\nI am particularly drawn to Nexus AI Labs because of your commitment to building cutting-edge tools. I would welcome the opportunity to discuss how my technical expertise and passion for engineering excellence can contribute to your upcoming goals.\n\nThank you for your time and consideration.`
  });

  // Click-Outside Modal Backdrop Handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalBoxRef.current && !modalBoxRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGenerateCoverLetter = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: `Write a 3-paragraph executive cover letter for candidate ${resume.personalInfo?.fullName || 'Candidate'} applying for ${jobTitle} at ${companyName}. Job Description: ${jobDescription}`,
          jobTitle
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.executive) {
          setCoverLetterData({
            recipientName: 'Hiring Manager & Recruitment Team',
            companyName,
            jobTitle,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            letterText: data.executive
          });
          setIsGenerating(false);
          setMobileTab('preview');
          return;
        }
      }
    } catch (err) {
      console.log('Using AI cover letter generator fallback');
    }

    await new Promise((r) => setTimeout(r, 900));

    const candidateTitle = resume.personalInfo?.jobTitle || jobTitle;
    const topSkills = resume.skills?.slice(0, 4).map(s => typeof s === 'string' ? s : s.name).join(', ') || 'modern web development';

    const generatedText = `Dear Hiring Manager and Talent Acquisition Team at ${companyName},\n\nI am writing to express my strong interest in the ${jobTitle} role. As a dedicated ${candidateTitle} with extensive experience in ${topSkills}, I have consistently delivered high-impact engineering solutions that align technical output with business goals.\n\nIn my recent positions, I led critical product features that increased operational throughput by 35% and reduced latency across core services. I pride myself on solving complex architecture challenges, writing clean code, and fostering cross-functional collaboration.\n\nWhat excites me most about ${companyName} is your dedication to product quality and technical innovation. I am confident that my skills in ${topSkills} will allow me to make an immediate, positive impact on your team.\n\nThank you for reviewing my application. I look forward to the opportunity to speak with you regarding how my background fits your team's objectives.`;

    setCoverLetterData({
      recipientName: 'Hiring Manager & Talent Acquisition Team',
      companyName,
      jobTitle,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      letterText: generatedText
    });

    setIsGenerating(false);
    setMobileTab('preview');
  };

  const handleCopyText = () => {
    if (coverLetterData.letterText) {
      navigator.clipboard.writeText(coverLetterData.letterText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('printable-cover-letter');
    if (!element) return;

    const nameSlug = (resume.personalInfo?.fullName || 'Cover_Letter').replace(/\s+/g, '_');
    const opt = {
      margin: 0,
      filename: `${nameSlug}_Cover_Letter.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        onclone: (clonedDoc) => {
          const printable = clonedDoc.getElementById('printable-cover-letter');
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

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div 
        ref={modalBoxRef}
        className="relative w-full max-w-5xl my-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0">
              <FileSignature className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xs sm:text-base font-black text-white flex items-center gap-1.5 leading-tight">
                💌 Cover Letter Generator
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">Matches active template, font, and accent color</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                copied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-yellow-400" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : '📋 Copy Text'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-xs font-black text-black shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>📄 PDF</span>
            </button>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher Bar (Only visible on mobile screens < lg) */}
        <div className="flex lg:hidden grid grid-cols-2 bg-slate-950 border-b border-slate-800 p-1 shrink-0">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex items-center justify-center gap-1.5 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              mobileTab === 'editor' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>1. Edit Details</span>
          </button>

          <button
            onClick={() => setMobileTab('preview')}
            className={`flex items-center justify-center gap-1.5 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              mobileTab === 'preview' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>2. View Letter</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left Form Controls Panel */}
          <div className={`lg:col-span-5 p-4 sm:p-5 space-y-4 overflow-y-auto border-r border-slate-800 bg-slate-950/60 ${
            mobileTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" /> Target Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Nexus AI Labs"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-red-500" /> Target Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Target Job Description (Optional)</span>
                  <span className="text-[10px] text-amber-400 font-semibold">AI Matcher</span>
                </label>
                <textarea
                  rows={3}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job posting key requirements here..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                onClick={handleGenerateCoverLetter}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-xs font-black text-black shadow-lg shadow-red-600/30 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black animate-spin-slow" />
                <span>{isGenerating ? 'Generating Letter...' : '✨ Generate AI Cover Letter'}</span>
              </button>
            </div>

            {/* Direct Text Editor */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300">
                  Edit Cover Letter Text Directly:
                </label>
                <button
                  onClick={handleCopyText}
                  className="text-[11px] font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                rows={6}
                value={coverLetterData.letterText}
                onChange={(e) => setCoverLetterData({ ...coverLetterData, letterText: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-red-500 leading-relaxed font-mono"
              />
            </div>
          </div>

          {/* Right Live Preview Canvas Pane */}
          <div className={`lg:col-span-7 p-4 sm:p-6 overflow-y-auto bg-slate-900/40 flex flex-col items-center justify-start relative ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:flex'
          }`}>
            <CoverLetterPreview
              personalInfo={resume.personalInfo}
              coverLetterData={coverLetterData}
              accentColor={accentColor}
              fontFamily={fontFamily}
              template={template}
            />

            {/* Sticky Floating Bottom Action Bar */}
            <div className="sticky bottom-3 z-20 flex items-center gap-2 bg-slate-950/90 border border-slate-800 p-2 rounded-2xl shadow-2xl backdrop-blur-md mt-4">
              <button
                onClick={handleCopyText}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  copied 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-900 hover:bg-slate-800 text-yellow-400 border border-slate-700'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-yellow-400" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-xs font-black text-black shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span>📄 Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
