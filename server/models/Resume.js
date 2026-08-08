import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  startDate: String,
  description: String,
  aiSuggestion: String
});

const EducationSchema = new mongoose.Schema({
  degree: String,
  school: String,
  location: String,
  year: String,
  gpa: String
});

const SkillSchema = new mongoose.Schema({
  name: String,
  level: String
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  techStack: String
});

const CustomSectionSchema = new mongoose.Schema({
  id: String,
  title: String,
  type: String,
  items: [mongoose.Schema.Types.Mixed]
}, { _id: false });

const ResumeSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous-user' },
  personalInfo: {
    fullName: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    summary: { type: String, default: '' }
  },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [mongoose.Schema.Types.Mixed],
  projects: [ProjectSchema],
  customSections: [CustomSectionSchema],
  sectionOrder: [String],
  template: { type: String, default: 'modern' },
  accentColor: { type: String, default: '#4f46e5' },
  activeFont: { type: String, default: 'sans' }
}, {
  timestamps: true
});

export default mongoose.model('Resume', ResumeSchema);
