import React from "react";
import { 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Briefcase, 
  GraduationCap, 
  FileCheck2, 
  Layers, 
  ArrowRight,
  Target
} from "lucide-react";
import { FullResumeAnalysis } from "../types";

interface AIAnalysisDashboardProps {
  analysis: FullResumeAnalysis;
  onNavigateToScore: () => void;
  onNavigateToMatcher: () => void;
  onNavigateToImprovement: () => void;
}

export const AIAnalysisDashboard: React.FC<AIAnalysisDashboardProps> = ({
  analysis,
  onNavigateToScore,
  onNavigateToMatcher,
  onNavigateToImprovement,
}) => {
  const { analysisPercentages, strengths, areasForImprovement, extracted, overallScore } = analysis;

  const categories = [
    { key: "skills", label: "Skills", value: analysisPercentages.skills, icon: Award, color: "indigo" },
    { key: "education", label: "Education", value: analysisPercentages.education, icon: GraduationCap, color: "blue" },
    { key: "projects", label: "Projects", value: analysisPercentages.projects, icon: Layers, color: "violet" },
    { key: "experience", label: "Experience", value: analysisPercentages.experience, icon: Briefcase, color: "amber" },
    { key: "formatting", label: "Formatting", value: analysisPercentages.formatting, icon: FileCheck2, color: "emerald" },
    { key: "keywords", label: "Keywords", value: analysisPercentages.keywords, icon: Target, color: "teal" },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "indigo": return { bar: "bg-indigo-600", text: "text-indigo-700", bg: "bg-indigo-50" };
      case "blue": return { bar: "bg-blue-600", text: "text-blue-700", bg: "bg-blue-50" };
      case "violet": return { bar: "bg-violet-600", text: "text-violet-700", bg: "bg-violet-50" };
      case "amber": return { bar: "bg-amber-600", text: "text-amber-700", bg: "bg-amber-50" };
      case "emerald": return { bar: "bg-emerald-600", text: "text-emerald-700", bg: "bg-emerald-50" };
      case "teal": return { bar: "bg-teal-600", text: "text-teal-700", bg: "bg-teal-50" };
      default: return { bar: "bg-indigo-600", text: "text-indigo-700", bg: "bg-indigo-50" };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Intelligent Screening Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Resume Analysis Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Evaluated for candidate: <span className="font-semibold text-slate-900">{extracted.contactInfo.name}</span> ({extracted.fileName})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Overall Score</p>
            <p className="text-2xl font-extrabold text-indigo-600 font-display">{overallScore}/100</p>
          </div>
          <button
            id="view-full-score-breakdown-btn"
            onClick={onNavigateToScore}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Score Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category Results Table / Cards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">
              Resume Analysis By Category
            </h2>
            <p className="text-xs text-slate-500">
              Quantitative screening percentages across six critical ATS dimensions.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            6 Dimensions Audited
          </span>
        </div>

        {/* Structured Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4">Progress Visual</th>
                <th className="py-3 px-4 text-right">Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const colors = getColorClasses(cat.color);
                const assessment = cat.value >= 85 ? "Excellent" : cat.value >= 75 ? "Proficient" : "Needs Polish";
                const badgeColor = cat.value >= 85 
                  ? "bg-emerald-100 text-emerald-800" 
                  : cat.value >= 75 
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-amber-100 text-amber-800";

                return (
                  <tr key={cat.key} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-800 flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="capitalize">{cat.label}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                      {cat.value}%
                    </td>
                    <td className="py-3.5 px-4 w-1/3">
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                          style={{ width: `${cat.value}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColor}`}>
                        {assessment}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strengths and Areas for Improvement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Strengths
                </h3>
                <p className="text-xs text-slate-500">Key advantages identified in this resume</p>
              </div>
            </div>

            <ul className="space-y-3">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
              ✓ Ready for ATS keyword indexing
            </span>
          </div>
        </div>

        {/* Areas for Improvement Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Areas for Improvement
                </h3>
                <p className="text-xs text-slate-500">Actionable recommendations to raise your ATS score</p>
              </div>
            </div>

            <ul className="space-y-3">
              {areasForImprovement.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    !
                  </div>
                  <span className="leading-relaxed">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Fix these in the Improvement Studio:
            </span>
            <button
              id="goto-improve-section-btn"
              onClick={onNavigateToImprovement}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Improve My Resume</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
