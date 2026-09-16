import React, { useEffect } from "react";
import { 
  FileCheck2, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  AlertCircle,
  BarChart3,
  Layers,
  Briefcase,
  FileText
} from "lucide-react";
import confetti from "canvas-confetti";
import { ScoreCategoryBreakdown } from "../types";

interface ResumeScoreViewProps {
  score: number;
  breakdown: ScoreCategoryBreakdown;
  candidateName: string;
  onNavigateToMatcher: () => void;
  onNavigateToImprovement: () => void;
}

export const ResumeScoreView: React.FC<ResumeScoreViewProps> = ({
  score,
  breakdown,
  candidateName,
  onNavigateToMatcher,
  onNavigateToImprovement,
}) => {
  useEffect(() => {
    if (score >= 75) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [score]);

  // Circumference calculation for circular SVG gauge
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreRating = (val: number) => {
    if (val >= 90) return { title: "Elite ATS Tier", desc: "Top 5% of candidate resumes. Highly competitive.", color: "text-emerald-600", bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-800" };
    if (val >= 80) return { title: "Strong Candidate", desc: "Well-structured. Will pass ATS screening for most mid-tier & top firms.", color: "text-indigo-600", bg: "bg-indigo-50", badge: "bg-indigo-100 text-indigo-800" };
    if (val >= 70) return { title: "Competitive", desc: "Good baseline, but needs quantifiable metrics and targeted keywords.", color: "text-blue-600", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-800" };
    return { title: "Needs Revision", desc: "Lacks critical formatting, quantifiable outcomes, or tech stack clarity.", color: "text-amber-600", bg: "bg-amber-50", badge: "bg-amber-100 text-amber-800" };
  };

  const rating = getScoreRating(score);

  const metrics = [
    { label: "Content", score: breakdown.content, max: 100, desc: "Clarity, bullet conciseness & value statements", icon: FileText },
    { label: "Skills", score: breakdown.skills, max: 100, desc: "Technical & soft skills alignment with industry", icon: Award },
    { label: "Projects", score: breakdown.projects, max: 100, desc: "Technological depth & demonstrable deliverables", icon: Layers },
    { label: "Experience", score: breakdown.experience, max: 100, desc: "Work history, responsibilities & accomplishments", icon: Briefcase },
    { label: "Keywords", score: breakdown.keywords, max: 100, desc: "Search density for automated recruiter filters", icon: Sparkles },
    { label: "Formatting", score: breakdown.formatting, max: 100, desc: "Typography, layout balance & ATS parsability", icon: FileCheck2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>AI-Generated Screening Metric</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          AI Resume Score
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Evaluated against 150+ ATS screening criteria including keyword density, formatting parsability, and achievement quantification.
        </p>
      </div>

      {/* Main Score Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Circular Gauge */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-52 h-52 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="104"
                cy="104"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth="14"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="104"
                cy="104"
                r={radius}
                stroke="url(#scoreGradient)"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Score in center */}
            <div className="absolute text-center">
              <span className="text-5xl font-black text-slate-900 font-display tracking-tight">
                {score}
              </span>
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          {/* Qualitative Feedback */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
              <span className={`w-2 h-2 rounded-full ${score >= 80 ? "bg-emerald-500" : "bg-amber-500"}`} />
              <span className={rating.color}>{rating.title}</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Resume Score: {score}/100
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {rating.desc} Based on automated keyword benchmarks and standard recruiter scanning patterns for {candidateName}.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              <button
                id="confetti-celebrate-btn"
                type="button"
                onClick={() => {
                  try {
                    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
                  } catch (e) {}
                }}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Celebrate Score</span>
              </button>

              <button
                id="score-to-job-matcher-btn"
                onClick={onNavigateToMatcher}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Test Job Match (78%)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Breakdown Cards */}
      <div className="max-w-5xl mx-auto space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display">
          Score Breakdown by Evaluation Pillar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            const pct = Math.round((item.score / item.max) * 100);

            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm font-display">{item.label}</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-900 font-display">
                    {item.score}
                    <span className="text-xs font-normal text-slate-400">/100</span>
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Banner */}
      <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Want to push your score to 95+?
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Use the AI Resume Improvement Studio to convert weak bullet points into measurable, action-oriented impact statements.
          </p>
        </div>
        <button
          id="score-improve-cta-btn"
          onClick={onNavigateToImprovement}
          className="shrink-0 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>Open Improvement Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
