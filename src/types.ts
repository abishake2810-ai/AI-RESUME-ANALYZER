export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  targetRole?: string;
  createdAt: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  scoreOrGpa?: string;
  details?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface ProjectItem {
  title: string;
  techStack: string[];
  description: string;
  highlights: string[];
}

export interface ExtractedResumeData {
  id: string;
  fileName: string;
  uploadedAt: string;
  rawTextPreview?: string;
  contactInfo: ContactInfo;
  summary: string;
  skills: {
    technical: string[];
    soft: string[];
    toolsAndFrameworks: string[];
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: string[];
  achievements: string[];
}

export interface ScoreCategoryBreakdown {
  content: number;
  skills: number;
  projects: number;
  experience: number;
  keywords: number;
  formatting: number;
}

export interface AnalysisPercentages {
  skills: number;
  education: number;
  projects: number;
  experience: number;
  formatting: number;
  keywords: number;
}

export interface MatchedSkillItem {
  skill: string;
  found: boolean;
  notes?: string;
}

export interface JobMatchResult {
  jobTitle: string;
  jobDescription: string;
  matchPercentage: number;
  skillsComparison: MatchedSkillItem[];
  missingSkills: string[];
  recommendedSkills: string[];
  feedbackNotes: string[];
}

export interface CareerRecommendation {
  role: string;
  matchPercentage: number;
  matchingSkills: string[];
  requiredSkills: string[];
  salaryRange: string;
  demandLevel: 'High Demand' | 'Very High' | 'Trending' | 'Steady';
  description: string;
}

export interface ResumeImprovementSuggestion {
  id: string;
  category: 'Objective' | 'Projects' | 'Skills' | 'Experience';
  title: string;
  before: string;
  after: string;
  reason: string;
  impact: string;
}

export interface FullResumeAnalysis {
  extracted: ExtractedResumeData;
  overallScore: number;
  scoreBreakdown: ScoreCategoryBreakdown;
  analysisPercentages: AnalysisPercentages;
  strengths: string[];
  areasForImprovement: string[];
  jobMatch: JobMatchResult;
  careerRecommendations: CareerRecommendation[];
  improvements: ResumeImprovementSuggestion[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}
