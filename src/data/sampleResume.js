export const sampleResume = {
  personalInfo: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Full Stack & AI Engineer",
    email: "alex.morgan@techmail.io",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan-dev",
    github: "github.com/alexmorgan-dev",
    summary: "Passionate Senior Full Stack Engineer with 6+ years of experience building high-scale cloud platforms and integrating AI LLM pipelines. Specialized in React, Node.js, and microservices architecture."
  },
  experience: [
    {
      id: "exp-1",
      title: "Senior Full Stack Engineer",
      company: "Nexus AI Labs",
      location: "San Francisco, CA",
      startDate: "2023 - Present",
      description: "Led the development of a real-time collaborative workspace serving 250,000+ monthly active users. Reduced initial API response latency by 45% using Node.js Redis caching and optimized GraphQL queries. Integrated OpenAI GPT-4 API to auto-generate summary insights for enterprise customers.",
      aiSuggestion: ""
    },
    {
      id: "exp-2",
      title: "Frontend Engineer",
      company: "CloudScale Systems",
      location: "Austin, TX",
      startDate: "2021 - 2023",
      description: "Built modular React component libraries using Tailwind CSS and TypeScript, adopted across 8 internal product teams. Engineered a dynamic analytics dashboard rendering 100k+ data points with 60 FPS performance using WebGL canvas rendering.",
      aiSuggestion: ""
    },
    {
      id: "exp-3",
      title: "Software Developer Intern",
      company: "InnoTech Solutions",
      location: "Seattle, WA",
      startDate: "2020 - 2021",
      description: "Assisted in migrating legacy monolithic Java application to Dockerized microservices on AWS EKS. Developed automated unit and integration test suites using Jest, increasing overall codebase test coverage from 60% to 88%.",
      aiSuggestion: ""
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      year: "2017 - 2021",
      gpa: "3.89 / 4.0 (Dean's List)"
    }
  ],
  skills: [
    { name: "JavaScript", level: "6 yrs" },
    { name: "TypeScript", level: "Expert" },
    { name: "React", level: "5 yrs" },
    { name: "Node.js", level: "Advanced" },
    { name: "OpenAI API", level: "Certified" },
    { name: "MongoDB", level: "4 yrs" },
    { name: "AWS", level: "Solutions Architect" },
    { name: "Docker", level: "Advanced" },
    { name: "Tailwind CSS", level: "Expert" }
  ],
  projects: [
    {
      id: "proj-1",
      name: "Smart Resume AI Builder",
      description: "Full-stack resume generator featuring dynamic bullet improvement via OpenAI API, live A4 preview, and pixel-perfect PDF export.",
      techStack: "React, Node.js, Express, MongoDB, OpenAI API"
    },
    {
      id: "proj-2",
      name: "DevStream Real-Time Analytics",
      description: "Open-source developer metrics dashboard tracking repository commit velocity and PR review cycles in real-time.",
      techStack: "TypeScript, React, Recharts, Websockets"
    }
  ],
  customSections: [
    {
      id: "custom-sec-certifications",
      title: "Certifications & Licenses",
      type: "itemList",
      items: [
        {
          id: "cert-1",
          title: "AWS Certified Solutions Architect – Associate",
          subtitle: "Amazon Web Services",
          date: "Dec 2024",
          description: "Credential ID: AWS-892347. Distributed cloud system architecture & security."
        }
      ]
    },
    {
      id: "custom-sec-languages",
      title: "Languages Spoken",
      type: "badgeGrid",
      items: [
        { id: "lang-1", title: "English", subtitle: "Native / Fluent" },
        { id: "lang-2", title: "Spanish", subtitle: "Professional Working" }
      ]
    }
  ]
};

export const emptyResume = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: ""
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  customSections: []
};
