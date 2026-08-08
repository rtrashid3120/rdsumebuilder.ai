import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Link, Code2, Briefcase, FileText } from 'lucide-react';

export default function PersonalInfoForm({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={data.fullName || ''}
            onChange={handleChange}
            placeholder="e.g. Alex Morgan"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            Professional Job Title *
          </label>
          <input
            type="text"
            name="jobTitle"
            value={data.jobTitle || ''}
            onChange={handleChange}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            placeholder="alex.morgan@example.com"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-indigo-400" />
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={data.phone || ''}
            onChange={handleChange}
            placeholder="+1 (555) 234-5678"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            Location (City, Country)
          </label>
          <input
            type="text"
            name="location"
            value={data.location || ''}
            onChange={handleChange}
            placeholder="San Francisco, CA"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Website / Portfolio */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            Website / Portfolio
          </label>
          <input
            type="text"
            name="website"
            value={data.website || ''}
            onChange={handleChange}
            placeholder="alexmorgan.dev"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Link className="w-3.5 h-3.5 text-indigo-400" />
            LinkedIn Profile
          </label>
          <input
            type="text"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/alexmorgan"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            GitHub Profile
          </label>
          <input
            type="text"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            placeholder="github.com/alexmorgan"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          Professional Summary
        </label>
        <textarea
          name="summary"
          rows={3}
          value={data.summary || ''}
          onChange={handleChange}
          placeholder="Brief 2-3 sentence overview highlighting key strengths, career milestones, and technical focus..."
          className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
        />
      </div>
    </div>
  );
}
