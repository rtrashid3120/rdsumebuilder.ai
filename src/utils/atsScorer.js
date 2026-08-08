// ATS Scoring Engine - Evaluates resume completeness, action verbs, and quantified metrics

export function calculateATSScore(resume = {}) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [] } = resume;

  let score = 0;
  const feedbackTips = [];
  const breakdown = {
    contact: 0,
    summary: 0,
    metrics: 0,
    verbs: 0,
    skills: 0,
    education: 0
  };

  // 1. Contact Info Essentials (20 pts)
  let contactPts = 0;
  if (personalInfo.fullName) contactPts += 4;
  if (personalInfo.email) contactPts += 4;
  if (personalInfo.phone) contactPts += 4;
  if (personalInfo.location) contactPts += 4;
  if (personalInfo.linkedin || personalInfo.website || personalInfo.github) contactPts += 4;

  breakdown.contact = contactPts;
  score += contactPts;

  if (contactPts < 20) {
    feedbackTips.push({ category: "Contact", tip: "Add missing email, phone, location, or LinkedIn link (+4 pts each)", pts: 20 - contactPts });
  }

  // 2. Profile Summary (10 pts)
  if (personalInfo.summary && personalInfo.summary.length > 50) {
    breakdown.summary = 10;
    score += 10;
  } else {
    feedbackTips.push({ category: "Summary", tip: "Write a detailed 2-3 sentence Professional Profile summary (+10 pts)", pts: 10 });
  }

  // 3. Quantified Metrics in Experience (25 pts)
  let metricCount = 0;
  const metricRegex = /(\d+%|\$\d+|\d+\+|\b\d+\b|users|latency|revenue|ms|fps|reduced|increased)/gi;

  experience.forEach(exp => {
    if (exp.description) {
      const matches = exp.description.match(metricRegex);
      if (matches) metricCount += matches.length;
    }
  });

  if (metricCount >= 4) {
    breakdown.metrics = 25;
    score += 25;
  } else if (metricCount >= 2) {
    breakdown.metrics = 15;
    score += 15;
    feedbackTips.push({ category: "Metrics", tip: "Add 2 more quantified numbers (% / $ / scale) to Experience bullets (+10 pts)", pts: 10 });
  } else {
    breakdown.metrics = 5;
    score += 5;
    feedbackTips.push({ category: "Metrics", tip: "Include numbers, percentages, or metrics in Experience descriptions (+20 pts)", pts: 20 });
  }

  // 4. Action Verbs (20 pts)
  const actionVerbRegex = /\b(engineered|spearheaded|developed|architected|led|built|optimized|managed|reduced|increased|launched|orchestrated|designed|streamlined)\b/gi;
  let verbCount = 0;
  experience.forEach(exp => {
    if (exp.description) {
      const matches = exp.description.match(actionVerbRegex);
      if (matches) verbCount += matches.length;
    }
  });

  if (verbCount >= 3) {
    breakdown.verbs = 20;
    score += 20;
  } else if (verbCount >= 1) {
    breakdown.verbs = 10;
    score += 10;
    feedbackTips.push({ category: "Action Verbs", tip: "Use strong action verbs like 'Engineered', 'Spearheaded', 'Optimized' (+10 pts)", pts: 10 });
  } else {
    feedbackTips.push({ category: "Action Verbs", tip: "Start experience bullets with action verbs (+20 pts)", pts: 20 });
  }

  // 5. Skills Completeness (15 pts)
  if (skills.length >= 6) {
    breakdown.skills = 15;
    score += 15;
  } else if (skills.length >= 3) {
    breakdown.skills = 10;
    score += 10;
    feedbackTips.push({ category: "Skills", tip: "Add 3 more skills to reach 6+ categorized skills (+5 pts)", pts: 5 });
  } else {
    feedbackTips.push({ category: "Skills", tip: "List at least 5 technical or domain skills (+15 pts)", pts: 15 });
  }

  // 6. Education & Projects (10 pts)
  let eduPts = 0;
  if (education.length > 0) eduPts += 5;
  if (projects.length > 0) eduPts += 5;
  breakdown.education = eduPts;
  score += eduPts;

  if (eduPts < 10) {
    feedbackTips.push({ category: "Education/Projects", tip: "Ensure Education degree and at least 1 Key Project are added (+5 pts each)", pts: 10 - eduPts });
  }

  // Final score clamping
  const finalScore = Math.min(100, Math.max(0, score));

  let badgeColor = "text-red-400 bg-red-950/40 border-red-500/50";
  let statusText = "Needs Improvement";

  if (finalScore >= 85) {
    badgeColor = "text-emerald-400 bg-emerald-950/40 border-emerald-500/50";
    statusText = "ATS Ready";
  } else if (finalScore >= 65) {
    badgeColor = "text-amber-400 bg-amber-950/40 border-amber-500/50";
    statusText = "Good Match";
  }

  return {
    score: finalScore,
    statusText,
    badgeColor,
    breakdown,
    feedbackTips
  };
}
