// Perfect Deterministic ATS Scoring Engine (100 Points Total)
// Evaluates Contact (20), Summary (15), Experience (25), Metrics (20), Skills (10), Education & Projects (10)

export function calculateATSScore(resume = {}) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [] } = resume;

  const breakdown = {
    contact: 0,
    summary: 0,
    experience: 0,
    metrics: 0,
    skills: 0,
    education: 0
  };

  const feedbackTips = [];

  // 1. Personal Contact Info (20 Pts Max - 4 pts per field)
  const name = (personalInfo?.fullName || '').trim();
  const title = (personalInfo?.jobTitle || '').trim();
  const email = (personalInfo?.email || '').trim();
  const phone = (personalInfo?.phone || '').trim();
  const location = (personalInfo?.location || '').trim();
  const links = ((personalInfo?.linkedin || '') + (personalInfo?.github || '') + (personalInfo?.website || '')).trim();

  if (name.length >= 2) breakdown.contact += 4;
  else feedbackTips.push({ category: "Contact", tip: "Add your full name (+4 pts)" });

  if (title.length >= 2) breakdown.contact += 4;
  else feedbackTips.push({ category: "Contact", tip: "Add a target professional job title (+4 pts)" });

  if (email.length >= 5 && email.includes('@')) breakdown.contact += 4;
  else feedbackTips.push({ category: "Contact", tip: "Add a valid email address (+4 pts)" });

  if (phone.length >= 5) breakdown.contact += 4;
  else feedbackTips.push({ category: "Contact", tip: "Add a contact phone number (+4 pts)" });

  if (location.length >= 2 || links.length >= 5) breakdown.contact += 4;
  else feedbackTips.push({ category: "Contact", tip: "Add city/location or LinkedIn/GitHub link (+4 pts)" });

  // 2. Professional Profile Summary (15 Pts Max)
  const summary = (personalInfo?.summary || '').trim();
  if (summary.length >= 80) {
    breakdown.summary = 15;
  } else if (summary.length >= 30) {
    breakdown.summary = 8;
    feedbackTips.push({ category: "Summary", tip: "Expand your summary to 2-3 sentences for full score (+7 pts)" });
  } else if (summary.length > 0) {
    breakdown.summary = 4;
    feedbackTips.push({ category: "Summary", tip: "Write a detailed profile summary (+11 pts)" });
  } else {
    breakdown.summary = 0;
    feedbackTips.push({ category: "Summary", tip: "Add a 2-3 sentence Professional Profile summary (+15 pts)" });
  }

  // 3. Work Experience Quality & Action Verbs (25 Pts Max)
  const actionVerbsRegex = /\b(engineered|spearheaded|developed|architected|led|built|optimized|managed|reduced|increased|launched|orchestrated|designed|streamlined|implemented|created|expanded|delivered)\b/gi;
  
  const validExp = Array.isArray(experience) ? experience.filter(e => e && ((e.title || '').trim().length > 0 || (e.company || '').trim().length > 0)) : [];
  
  if (validExp.length > 0) {
    breakdown.experience += 10; // Has job entries

    let totalBulletsLength = 0;
    let verbHits = 0;

    validExp.forEach(e => {
      const desc = (e.description || '').trim();
      totalBulletsLength += desc.length;
      if (desc.length > 0) {
        const matches = desc.match(actionVerbsRegex);
        if (matches) verbHits += matches.length;
      }
    });

    if (totalBulletsLength >= 100) breakdown.experience += 8;
    else if (totalBulletsLength > 0) breakdown.experience += 4;

    if (verbHits >= 2) breakdown.experience += 7;
    else if (verbHits >= 1) breakdown.experience += 4;
    else feedbackTips.push({ category: "Experience", tip: "Use action verbs like 'Engineered', 'Optimized', 'Spearheaded' in bullets (+7 pts)" });
  } else {
    feedbackTips.push({ category: "Experience", tip: "Add at least 1 work experience entry with title and bullet points (+25 pts)" });
  }

  // 4. Quantified Metrics & Numbers (20 Pts Max - 5 pts per metric)
  const metricRegex = /(\d+%|\$\d+|\d+\+|\b\d+\b|users|latency|revenue|ms|fps|reduced|increased|growth|scale)/gi;
  let metricHits = 0;

  if (Array.isArray(experience)) {
    experience.forEach(e => {
      const desc = (e?.description || '').trim();
      if (desc.length > 0) {
        const matches = desc.match(metricRegex);
        if (matches) metricHits += matches.length;
      }
    });
  }

  if (metricHits >= 4) breakdown.metrics = 20;
  else if (metricHits === 3) breakdown.metrics = 15;
  else if (metricHits === 2) breakdown.metrics = 10;
  else if (metricHits === 1) breakdown.metrics = 5;
  else breakdown.metrics = 0;

  if (breakdown.metrics < 20) {
    feedbackTips.push({ category: "Metrics", tip: `Add ${4 - Math.min(4, metricHits)} more quantified metrics (%, $, numbers, latency) to experience (+${20 - breakdown.metrics} pts)` });
  }

  // 5. Skills & Expertise (10 Pts Max)
  const validSkills = Array.isArray(skills) 
    ? skills.filter(s => s && ((typeof s === 'string' && s.trim().length > 0) || (s.name && s.name.trim().length > 0)))
    : [];

  if (validSkills.length >= 5) breakdown.skills = 10;
  else if (validSkills.length >= 3) breakdown.skills = 7;
  else if (validSkills.length >= 1) breakdown.skills = 4;
  else breakdown.skills = 0;

  if (breakdown.skills < 10) {
    feedbackTips.push({ category: "Skills", tip: "List at least 5 technical or domain skills (+10 pts)" });
  }

  // 6. Education & Key Projects (10 Pts Max - 5 pts each)
  const validEdu = Array.isArray(education) ? education.filter(e => e && (e.degree || e.school || '').trim().length > 0) : [];
  const validProj = Array.isArray(projects) ? projects.filter(p => p && (p.name || p.description || '').trim().length > 0) : [];

  if (validEdu.length > 0) breakdown.education += 5;
  else feedbackTips.push({ category: "Education", tip: "Add degree and school name under Education (+5 pts)" });

  if (validProj.length > 0) breakdown.education += 5;
  else feedbackTips.push({ category: "Projects", tip: "Add at least 1 Key Project with description (+5 pts)" });

  // Total Score = Sum of all 6 categories (Exact 100 Max)
  const totalScore = Math.min(100, Math.max(0, 
    breakdown.contact + 
    breakdown.summary + 
    breakdown.experience + 
    breakdown.metrics + 
    breakdown.skills + 
    breakdown.education
  ));

  let badgeColor = "text-red-400 bg-red-950/40 border-red-500/50";
  let statusText = "Needs Improvement";

  if (totalScore >= 85) {
    badgeColor = "text-emerald-400 bg-emerald-950/40 border-emerald-500/50";
    statusText = "ATS Ready";
  } else if (totalScore >= 60) {
    badgeColor = "text-amber-400 bg-amber-950/40 border-amber-500/50";
    statusText = "Good Match";
  }

  return {
    score: totalScore,
    statusText,
    badgeColor,
    breakdown,
    feedbackTips
  };
}
