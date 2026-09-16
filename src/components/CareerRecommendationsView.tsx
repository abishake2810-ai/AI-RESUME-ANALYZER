import React from "react";
import { 
  Compass, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  Info,
  Layers
} from "lucide-react";
import { CareerRecommendation } from "../types";

interface CareerRecommendationsViewProps {
  recommendations: CareerRecommendation[];
  candidateName: string;
  onSelectRoleForMatching: (roleTitle: string) => void;
  onAskChatbotAboutRole: (roleTitle: string) => void;
}

export const CareerRecommendationsView: React.FC<CareerRecommendationsViewProps> = ({
  recommendations,
  candidateName,
  onSelectRoleForMatching,
  onAskChatbotAboutRole,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Intelligent Career Pathway</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          AI Career Recommendations
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Target career roles mapped directly to candidate <span className="font-semibold text-slate-900">{candidateName}</span>'s
          current skill profile and transferable competencies.
        </p>
      </div>

      {/* Prominent Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs flex items-start gap-3 max-w-4xl mx-auto">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-bold">Career Advisory Notice:</span> The system presents these job-role suggestions as algorithmic recommendations based on your resume's technical and soft skills, rather than guarantees about employment or hiring outcomes.
        </p>
      </div>

      {/* Recommended Roles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {rec.role}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {rec.description}
                  </p>
                </div>
                <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {rec.matchPercentage}% Match
                </span>
              </div>

              {/* Badges: Salary and Market Demand */}
              <div className="flex flex-wrap gap-2 my-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <DollarSign className="w-3 h-3" />
                  <span>{rec.salaryRange}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <TrendingUp className="w-3 h-3" />
                  <span>{rec.demandLevel}</span>
                </span>
              </div>

              {/* Skills breakdown */}
              <div className="space-y-2 mt-4 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block mb-1">
                    Your Matching Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.matchingSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium text-[11px] border border-emerald-200"
                      >
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-700 block mb-1">
                    Recommended to Learn Next:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.requiredSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200"
                      >
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onAskChatbotAboutRole(rec.role)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI About This Role</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectRoleForMatching(rec.role)}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center gap-1"
              >
                <span>Match In JD Tool</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
