// AI Suggestion Helper - Extended with Job Description Skill Extraction & Keyword Gap Analysis

export const generateAISuggestions = async (text, jobTitle = "") => {
  try {
    const response = await fetch("http://localhost:5000/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, jobTitle })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log("Backend API offline. Using client AI generator fallback.");
  }

  await new Promise((resolve) => setTimeout(resolve, 1200));

  const trimmed = text.trim();
  if (!trimmed) {
    return {
      quantified: "Architected end-to-end system features, increasing overall platform user engagement by 35% and cutting load times by 400ms.",
      executive: "Spearheaded strategic technical initiatives, aligning engineering execution with business goals to boost revenue performance.",
      concise: "Engineered scalable features and optimized platform performance across key services."
    };
  }

  let quantified = "";
  let executive = "";
  let concise = "";

  if (trimmed.toLowerCase().includes("build") || trimmed.toLowerCase().includes("developed") || trimmed.toLowerCase().includes("code")) {
    quantified = `Engineered robust, production-ready modules, reducing deployment cycle times by 30% and maintaining 99.9% uptime.`;
    executive = `Directed core product development initiatives, collaborating with cross-functional partners to deliver key client milestones.`;
    concise = `Developed key software components and streamlined deployment workflows.`;
  } else if (trimmed.toLowerCase().includes("manage") || trimmed.toLowerCase().includes("led") || trimmed.toLowerCase().includes("team")) {
    quantified = `Led an agile team of 6+ engineers to deliver critical roadmap features 2 weeks ahead of schedule with zero high-severity bugs.`;
    executive = `Orchestrated team performance and technical direction, fostering a high-velocity engineering culture.`;
    concise = `Managed engineering team operations and drove key project deliverables.`;
  } else if (trimmed.toLowerCase().includes("test") || trimmed.toLowerCase().includes("fix") || trimmed.toLowerCase().includes("bug")) {
    quantified = `Identified and resolved critical system bottlenecks, improving application throughput by 42% and eliminating 90%+ regression bugs.`;
    executive = `Implemented comprehensive quality assurance frameworks to protect platform stability and user trust.`;
    concise = `Optimized bug resolution workflows and enhanced automated test coverage.`;
  } else {
    quantified = `Optimized ${trimmed.toLowerCase().replace(/\.$/, '')}, yielding a 35% improvement in operational efficiency and quantifying measurable team output.`;
    executive = `Spearheaded execution of ${trimmed.toLowerCase().replace(/\.$/, '')}, driving technical excellence and cross-department alignment.`;
    concise = `Streamlined ${trimmed.toLowerCase().replace(/\.$/, '')} to enhance overall execution speed and reliability.`;
  }

  return { quantified, executive, concise };
};

// Feature #2: AI Job Description Keyword & Skill Gap Analyzer
export const analyzeJobDescriptionSkills = async (jobDescriptionText, existingSkills = []) => {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const commonKeywords = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "GraphQL", category: "API" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "AWS", category: "Cloud" },
    { name: "Python", category: "Language" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "CI/CD Pipelines", category: "DevOps" },
    { name: "System Design", category: "Architecture" },
    { name: "Agile / Scrum", category: "Methodology" },
    { name: "Unit Testing (Jest)", category: "Testing" }
  ];

  const jdLower = jobDescriptionText.toLowerCase();
  
  // Existing skills normalizer
  const existingNames = existingSkills.map(s => typeof s === 'string' ? s.toLowerCase() : s.name.toLowerCase());

  // Find matches in JD that are missing from candidate's skills
  const extracted = commonKeywords.filter(kw => {
    const inJD = jdLower.includes(kw.name.toLowerCase()) || 
                 (kw.name === "React" && jdLower.includes("react")) ||
                 (kw.name === "AWS" && jdLower.includes("aws")) ||
                 (kw.name === "Python" && jdLower.includes("python")) ||
                 (kw.name === "Docker" && jdLower.includes("docker"));
    
    const alreadyAdded = existingNames.some(name => name.includes(kw.name.toLowerCase()));
    return inJD && !alreadyAdded;
  });

  // If JD is arbitrary or sparse, suggest 4 high-value default keywords
  if (extracted.length === 0) {
    const fallbackList = [
      { name: "GraphQL", category: "API" },
      { name: "Docker", category: "DevOps" },
      { name: "System Design", category: "Architecture" },
      { name: "CI/CD Pipelines", category: "DevOps" }
    ].filter(kw => !existingNames.some(n => n.includes(kw.name.toLowerCase())));

    return {
      matchScore: 82,
      recommendedSkills: fallbackList
    };
  }

  const matchScore = Math.min(95, 60 + (existingSkills.length * 3));

  return {
    matchScore,
    recommendedSkills: extracted
  };
};
