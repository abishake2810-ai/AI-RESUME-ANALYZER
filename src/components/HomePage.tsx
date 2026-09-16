import React from "react";
import { 
  Sparkles, 
  ArrowRight, 
  FileCheck2, 
  Target, 
  Compass, 
  Bot, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  FileText, 
  Search, 
  Code2, 
  Cpu,
  Layers,
  ChevronRight
} from "lucide-react";

interface HomePageProps {
  onAnalyzeClick: () => void;
  onCheckScoreClick: () => void;
  onLoadSampleResume: (sampleId: string) => void;
  onOpenReport: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAnalyzeClick,
  onCheckScoreClick,
  onLoadSampleResume,
  onOpenReport,
}) => {
  const features = [
    {
      icon: Cpu,
      title: "AI Resume Parsing & Extraction",
      description: "Extracts contact information, education, technical & soft skills, work history, academic projects, and certifications automatically.",
      tag: "Gemini 3.8 Flash"
    },
    {
      icon: FileCheck2,
      title: "Intelligent ATS Scoring (100 pts)",
      description: "Calculates an objective ATS score across Content, Skills, Projects, Experience, Keywords, and Formatting metrics with circular gauge visualizers.",
      tag: "ATS Engine"
    },
    {
      icon: Target,
      title: "Job Description Matcher",
      description: "Compares your resume against specific employer job requirements with ✅ found and ❌ missing skill indicators plus match percentage.",
      tag: "Smart Match"
    },
    {
      icon: Compass,
      title: "AI Career Recommendations",
      description: "Discovers top job roles suited for your profile (e.g., Data Analyst, ML Intern, Software Developer) with required skills and salary indicators.",
      tag: "Career Advisory"
    },
    {
      icon: Sparkles,
      title: "AI Resume Improvement Studio",
      description: "Provides side-by-side Before & After wording rewrites for Objectives, Project descriptions, and Experience using quantifiable STAR metrics.",
      tag: "Wording Rewriter"
    },
    {
      icon: Bot,
      title: "Resume AI Assistant Chatbot",
      description: "Interactive 24/7 career chatbot to answer questions on interview preparation, missing skills, and resume structuring.",
      tag: "Interactive Coach"
    }
  ];

  const workflowSteps = [
    { step: "01", title: "Upload Resume", desc: "Upload PDF, DOC, DOCX, or paste resume text directly." },
    { step: "02", title: "AI Extraction", desc: "AI extracts skills, education, experience, and projects." },
    { step: "03", title: "ATS Score & Quality", desc: "View detailed category percentages and overall score out of 100." },
    { step: "04", title: "Job Match & Guidance", desc: "Compare against job descriptions and chat with Resume AI Assistant." },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Intelligent Resume Screening & Career Assistant</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15]">
              Build a Better Resume.{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 bg-clip-text text-transparent">
                Discover Your Skills.
              </span>{" "}
              Improve Your Career Opportunities.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              AI-powered web application that analyzes your resume, calculates an ATS readiness score, 
              matches job descriptions, detects missing skills, and guides your career trajectory with Gemini intelligence.
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                id="hero-analyze-resume-btn"
                onClick={onAnalyzeClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 hover:shadow-lg transition-all duration-150 group"
              >
                <span>Analyze My Resume</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-check-score-btn"
                onClick={onCheckScoreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs hover:border-slate-400 transition-all duration-150"
              >
                <FileCheck2 className="w-4 h-4 text-indigo-600" />
                <span>Check Resume Score</span>
              </button>
            </div>

            {/* Quick Demo Previews */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-600">Try Instant Sample Resumes:</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  id="sample-python-ml-btn"
                  onClick={() => onLoadSampleResume("python-ml")}
                  className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200/80 transition-colors"
                >
                  ⚡ Python & ML Candidate (82/100)
                </button>
                <button
                  id="sample-fullstack-btn"
                  onClick={() => onLoadSampleResume("fullstack-web")}
                  className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200/80 transition-colors"
                >
                  ⚡ Full Stack Web Developer (86/100)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-display">94.8%</p>
            <p className="text-xs font-semibold text-slate-700 mt-1">Extraction Precision</p>
            <p className="text-[11px] text-slate-400">PDF & DOC parsing</p>
          </div>
          <div className="text-center p-3 border-l border-slate-100">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">100 Pts</p>
            <p className="text-xs font-semibold text-slate-700 mt-1">Multi-Category ATS Audit</p>
            <p className="text-[11px] text-slate-400">Content, Skills, Projects</p>
          </div>
          <div className="text-center p-3 border-l border-slate-100">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-display">8 Core</p>
            <p className="text-xs font-semibold text-slate-700 mt-1">Integrated AI Modules</p>
            <p className="text-[11px] text-slate-400">End-to-end guidance</p>
          </div>
          <div className="text-center p-3 border-l border-slate-100">
            <p className="text-2xl sm:text-3xl font-extrabold text-violet-600 font-display">24/7</p>
            <p className="text-xs font-semibold text-slate-700 mt-1">Resume AI Assistant</p>
            <p className="text-[11px] text-slate-400">Personal career coach</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
            Comprehensive Resume Intelligence Features
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Engineered specifically to solve the limitations of standard keyword screeners with semantic AI understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              System Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mt-3">
              How AI Resume Analyzer Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              From raw document parsing to targeted career coaching in four seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((s, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs relative"
              >
                <div className="text-2xl font-black text-indigo-400 font-display mb-2">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 font-display">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              id="workflow-get-started-btn"
              onClick={onAnalyzeClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors"
            >
              <span>Start Analyzing Your Resume Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* College Project Submission Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-display">
                Need College AI Immersion Report Documentation?
              </h4>
              <p className="text-xs text-slate-600">
                Complete academic documentation with Abstract, System Architecture, Workflow, Module breakdown, and Future Scope.
              </p>
            </div>
          </div>
          <button
            id="home-open-report-btn"
            onClick={onOpenReport}
            className="shrink-0 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-indigo-700 font-semibold text-xs border border-indigo-200 shadow-xs transition-colors"
          >
            Open Project Report
          </button>
        </div>
      </section>
    </div>
  );
};
