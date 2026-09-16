import React, { useState } from "react";
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  AlertCircle, 
  FileText, 
  Layers, 
  Briefcase, 
  Award, 
  HelpCircle,
  TrendingUp,
  ShieldAlert
} from "lucide-react";
import { ResumeImprovementSuggestion } from "../types";

interface ResumeImprovementSectionProps {
  improvements: ResumeImprovementSuggestion[];
  onAskChatbot: (prompt: string) => void;
}

export const ResumeImprovementSection: React.FC<ResumeImprovementSectionProps> = ({
  improvements,
  onAskChatbot,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "Objective", "Projects", "Skills", "Experience"];

  const filtered = activeCategory === "All"
    ? improvements
    : improvements.filter(i => i.category.toLowerCase() === activeCategory.toLowerCase());

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "objective": return FileText;
      case "projects": return Layers;
      case "skills": return Award;
      case "experience": return Briefcase;
      default: return Sparkles;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Action-Oriented Optimization</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Improve My Resume
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Transform generic duties into measurable accomplishments using action verbs, architectural specifics,
          and quantifiable impact metrics.
        </p>
      </div>

      {/* Accuracy Verification Notice */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-950 text-xs flex items-start gap-3 max-w-4xl mx-auto">
        <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-bold">Important Accuracy Notice:</span> The user should verify that any AI-generated wording, metrics, and technical scopes remain completely truthful and representative of your actual contributions before submitting to employers.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
              activeCategory === cat
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Improvement Cards */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {filtered.map((item) => {
          const Icon = getCategoryIcon(item.category);
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
            >
              {/* Card Top bar */}
              <div className="p-4 sm:px-6 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {item.impact}
                </span>
              </div>

              {/* Before and After Side by Side */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before Box */}
                <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-200/70 relative">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 block mb-1.5">
                    Before (Generic / Weak)
                  </span>
                  <p className="text-xs text-slate-700 font-sans leading-relaxed">
                    "{item.before}"
                  </p>
                </div>

                {/* After Box */}
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                      After (AI-Optimized & Measurable)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.after, item.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-900 font-semibold font-sans leading-relaxed">
                    "{item.after}"
                  </p>
                </div>
              </div>

              {/* Reasoning Footer */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                <p className="text-[11px]">
                  <span className="font-semibold text-slate-800">Why this works:</span> {item.reason}
                </p>
                <button
                  type="button"
                  onClick={() => onAskChatbot(`How can I write more bullet points like this for ${item.category}?`)}
                  className="shrink-0 text-indigo-600 hover:text-indigo-800 font-semibold text-[11px] flex items-center gap-1"
                >
                  <span>Ask Assistant to Generate More</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
