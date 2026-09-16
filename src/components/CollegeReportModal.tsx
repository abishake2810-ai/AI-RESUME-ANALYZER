import React, { useState } from "react";
import { 
  X, 
  BookOpen, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Cpu, 
  Layers, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2
} from "lucide-react";

interface CollegeReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollegeReportModal: React.FC<CollegeReportModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const reportText = `AI Resume Analyzer – AI Powered Resume Analysis and Career Guidance System
College Submission & AI Immersion Technical Documentation

1. Abstract
The AI Resume Analyzer is an intelligent screening and career advisory system powered by Google Gemini Large Language Models (LLM) and modern full-stack web architectures. It automates candidate credential extraction, calculates multi-dimensional ATS readiness scores, benchmarks candidate skills against employer job descriptions, highlights missing keywords, generates measurable before-and-after resume revisions, and provides interactive career coaching.

2. Problem Statement
Traditional ATS platforms rely on brittle keyword matchers that misinterpret candidate qualifications. Job seekers and students struggle to understand why their resumes are filtered out and lack guidance on bridging skill gaps.

3. Proposed System & Key Modules
- Resume Text & Skill Extraction Engine
- Multi-dimensional ATS Quality Scoring (0-100)
- Semantic Job Description Matcher (✅ Found, ❌ Missing)
- AI Resume Improvement Studio (Before & After quantifiable transformations)
- Personalized Career Path Recommendations
- Interactive 24/7 AI Career Coaching Chatbot

4. Architecture & Technology Stack
- Frontend: React 19, TypeScript, Tailwind CSS, Lucide Icons, Recharts
- AI Layer: Google Gemini 3.8 Flash SDK (@google/genai)
- Backend: Express.js REST API with Vite Middleware Integration
- Storage: Client Session State & Local Storage for User Privacy`;

    navigator.clipboard.writeText(reportText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display leading-tight">
                AI Immersion College Project Report
              </h3>
              <p className="text-xs text-slate-300">
                AI Resume Analyzer – AI Powered Resume Analysis and Career Guidance System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? "Copied" : "Copy Report"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors hidden sm:inline-flex"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-800 text-xs sm:text-sm leading-relaxed">
          {/* Cover Info */}
          <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 block mb-1">
              Final Year Engineering / AI Immersion Project
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              AI Resume Analyzer – AI Powered Resume Analysis and Career Guidance System
            </h1>
            <p className="text-xs text-slate-600 mt-2">
              Comprehensive submission report detailing problem statement, system architecture, methodology,
              AI models, and module evaluations.
            </p>
          </div>

          {/* Section: Abstract */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 font-display border-b border-slate-200 pb-1">
              1. Abstract
            </h2>
            <p className="text-slate-700">
              The modern hiring ecosystem relies heavily on Applicant Tracking Systems (ATS) to filter candidate submissions. However, traditional heuristic keyword parsers fail to comprehend semantic equivalence, contextual accomplishments, or project depth. This project presents <strong>AI Resume Analyzer</strong>, an intelligent screening and career assistant platform powered by <strong>Gemini 3.8 Flash</strong> and modern TypeScript full-stack architectures. The system ingests resumes in PDF, DOC, and DOCX formats, extracts key candidate attributes (education, skills, experience, projects, achievements), calculates a holistic resume score out of 100, conducts real-time job description matching with missing skill detection, generates quantifiable before/after resume wording transformations, and provides an interactive AI career coaching assistant.
            </p>
          </section>

          {/* Section: Problem Statement & Existing vs Proposed */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
              <h3 className="font-bold text-rose-950 font-display text-sm">
                2. Problem Statement & Existing Limitations
              </h3>
              <ul className="space-y-1.5 text-xs text-rose-900 list-disc list-inside">
                <li>Over 75% of candidate resumes are rejected by ATS filters before a recruiter sees them.</li>
                <li>Existing screeners rely on strict regex string matches rather than conceptual skills understanding.</li>
                <li>Job seekers receive zero constructive feedback regarding missing competencies.</li>
                <li>Descriptions often lack quantifiable metrics (Google XYZ formula).</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <h3 className="font-bold text-emerald-950 font-display text-sm">
                3. Proposed System & Objectives
              </h3>
              <ul className="space-y-1.5 text-xs text-emerald-900 list-disc list-inside">
                <li>Automated multi-modal parsing of PDF, DOC, and DOCX credentials.</li>
                <li>Objective scoring out of 100 across Content, Skills, Projects, Experience, Keywords, and Formatting.</li>
                <li>Direct JD comparison highlighting ✅ Found skills and ❌ Missing skills.</li>
                <li>Side-by-side action-oriented bullet point transformation engine.</li>
                <li>24/7 interactive Resume AI Assistant chatbot.</li>
              </ul>
            </div>
          </section>

          {/* Section: System Workflow Flowchart */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-display border-b border-slate-200 pb-1">
              4. Complete System Workflow
            </h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 overflow-x-auto whitespace-pre">
{`HOME PAGE
   ↓
UPLOAD RESUME (PDF / DOC / DOCX / Text)
   ↓
AI EXTRACTS RESUME INFORMATION (Contact, Skills, Education, Projects, Experience)
   ↓
RESUME ANALYSIS DASHBOARD (Category %: Skills 85%, Education 90%, Projects 75%, Experience 65%, Formatting 80%, Keywords 70%)
   ↓
RESUME SCORE (Circular Gauge: 82/100 across 6 pillars)
   ↓
JOB DESCRIPTION MATCHING (Python ✅, SQL ✅, Machine Learning ✅, Git ❌, Data Analysis ✅)
   ↓
MISSING SKILL DETECTION & RECOMMENDATIONS (Git/GitHub, Advanced SQL, Docker)
   ↓
AI RESUME IMPROVEMENT STUDIO (Side-by-side Before & After wording rewrites)
   ↓
AI CAREER RECOMMENDATIONS (Data Analyst, ML Intern, Software Developer)
   ↓
AI CAREER CHATBOT (Resume AI Assistant)`}
            </div>
          </section>

          {/* Section: Technology Stack */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-display border-b border-slate-200 pb-1">
              5. Technology Components & Architecture
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-1">Frontend Layer</span>
                <p className="text-slate-600">React 19, TypeScript, Tailwind CSS, Lucide React icons, Canvas Confetti, and SVG radial charts.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-1">AI Intelligence Layer</span>
                <p className="text-slate-600">Google Gemini 3.8 Flash (@google/genai SDK) utilizing JSON schema enforcement and semantic matching.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-1">Backend & Server</span>
                <p className="text-slate-600">Node.js with Express 4 REST endpoints (/api/analyze-resume, /api/match-job, /api/chat) & Vite middleware.</p>
              </div>
            </div>
          </section>

          {/* Section: Conclusion */}
          <section className="space-y-2 pt-2 border-t border-slate-200">
            <h2 className="text-base font-bold text-slate-900 font-display">
              6. Conclusion & Future Enhancements
            </h2>
            <p className="text-slate-700">
              The AI Resume Analyzer bridges the information gap between students, job candidates, and enterprise recruitment algorithms. Future enhancements include direct integration with live job boards (LinkedIn, Indeed APIs), multi-language resume translation, and automated LaTeX/PDF export for one-click optimized resumes.
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>AI Immersion Project Documentation</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
