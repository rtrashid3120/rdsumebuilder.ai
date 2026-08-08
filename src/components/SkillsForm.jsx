import React, { useState } from 'react';
import { Plus, X, Wrench, Sparkles, FileText, Search, CheckCircle2, Award, Clock } from 'lucide-react';
import { analyzeJobDescriptionSkills } from '../utils/aiEnhancer';

export default function SkillsForm({ skills = [], onChange }) {
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  
  // Job Description Scanner State
  const [showScanner, setShowScanner] = useState(false);
  const [jdText, setJdText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Add Skill with Level
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;
    
    const newSkill = {
      name: skillName.trim(),
      level: skillLevel.trim() || 'Proficient'
    };

    // Prevent duplicates by name
    const exists = skills.some(s => 
      (typeof s === 'string' ? s.toLowerCase() : s.name.toLowerCase()) === newSkill.name.toLowerCase()
    );

    if (!exists) {
      onChange([...skills, newSkill]);
    }

    setSkillName('');
    setSkillLevel('');
  };

  const handleRemoveSkill = (indexToRemove) => {
    onChange(skills.filter((_, idx) => idx !== indexToRemove));
  };

  // Quick preset depth tags
  const depthPresets = ["3+ yrs", "5+ yrs", "Expert", "Advanced", "Certified"];

  // Handle JD Scan
  const handleScanJD = async () => {
    if (!jdText.trim()) return;
    setIsScanning(true);
    try {
      const result = await analyzeJobDescriptionSkills(jdText, skills);
      setScanResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  // Add recommended skill from scanner
  const handleAddRecommendedSkill = (recSkill) => {
    const newSkill = {
      name: recSkill.name,
      level: 'Recommended'
    };
    onChange([...skills, newSkill]);
    // Remove from active scanner result list
    if (scanResult) {
      setScanResult({
        ...scanResult,
        recommendedSkills: scanResult.recommendedSkills.filter(s => s.name !== recSkill.name)
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Skill Input Form with Experience Depth Tag */}
      <form onSubmit={handleAddSkill} className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-indigo-400" />
            Add Skill & Experience Depth Tag
          </span>
          <span className="text-[11px] text-slate-400">Feature #4: Depth Tags</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Skill Name */}
          <div className="md:col-span-6">
            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="Skill Name (e.g. React, AWS, Python)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Depth / Level Tag */}
          <div className="md:col-span-4">
            <input
              type="text"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              placeholder="Depth (e.g. 5 yrs, Certified)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-full flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Depth Presets */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-indigo-400" /> Quick depth tag:
          </span>
          <div className="flex flex-wrap gap-1">
            {depthPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setSkillLevel(preset)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                  skillLevel === preset 
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500' 
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Feature #2: AI Job Description Matcher Button / Drawer Trigger */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-4 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                ✨ AI Job Description Keyword Matcher
              </h3>
              <p className="text-[11px] text-slate-400">Scan any job post to extract missing skills & maximize ATS match</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowScanner(!showScanner)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition-all"
          >
            {showScanner ? 'Hide Scanner' : 'Open JD Scanner'}
          </button>
        </div>

        {/* Expandable Scanner Section */}
        {showScanner && (
          <div className="pt-3 border-t border-slate-800/80 space-y-3">
            <textarea
              rows={3}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste job description text here (e.g. from LinkedIn or Indeed)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />

            <button
              type="button"
              onClick={handleScanJD}
              disabled={isScanning || !jdText.trim()}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Scanning Job Description & Calculating Match Score...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>✨ Extract Missing Keywords</span>
                </>
              )}
            </button>

            {/* Scan Results View */}
            {scanResult && (
              <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ATS Target Keyword Match Score
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold">
                    {scanResult.matchScore}% Match
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                    Recommended Missing Skills to Add (1-Click Add):
                  </span>
                  {scanResult.recommendedSkills.length === 0 ? (
                    <p className="text-xs text-emerald-400 font-medium">🎉 Great coverage! Your skills cover the key job requirements.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {scanResult.recommendedSkills.map((rec, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddRecommendedSkill(rec)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold transition-all hover:scale-105"
                        >
                          <Plus className="w-3 h-3 text-emerald-400" />
                          <span>{rec.name}</span>
                          <span className="text-[9px] text-slate-400">({rec.category})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active Skills List with Depth Tags */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 min-h-[120px]">
        <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            Active Skills & Depth Badges ({skills.length})
          </span>
          <span className="text-[11px] text-slate-500">Live rendered on A4 preview</span>
        </div>

        {skills.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-3 text-center">
            No skills added yet. Use the form above to add your technical & soft skills.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => {
              const name = typeof skill === 'string' ? skill : skill.name;
              const level = typeof skill === 'object' ? skill.level : '';

              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 text-xs font-medium hover:border-indigo-500/80 transition-all shadow-sm"
                >
                  <span className="font-semibold text-slate-100">{name}</span>
                  {level && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {level}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-slate-400 hover:text-red-400 transition-colors ml-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
