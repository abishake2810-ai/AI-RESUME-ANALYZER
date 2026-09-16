import React, { useState } from "react";
import { 
  Target, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  BookOpen, 
  AlertTriangle,
  Lightbulb,
  Check,
  Search
} from "lucide-react";
import { JobMatchResult } from "../types";

interface JobMatcherSectionProps {
  jobMatch: JobMatchResult;
  onRunMatch: (jobDescriptionText: string) => Promise<void>;
  isMatching: boolean;
  onNavigateToGuidance: () => void;
  onNavigateToImprovement: () => void;
}

export const JobMatcherSection: React.FC<JobMatcherSectionProps> = ({
  jobMatch,
  onRunMatch,
  isMatching,
  onNavigateToGuidance,
  onNavigateToImprovement,
}) => {
  const [jobDescription, setJobDescription] = useState(
    jobMatch.jobDescription || 
    "Looking for a Python developer with knowledge of Python, SQL, Machine Learning, Git and Data Analysis."
  );

  const samplePresets = [
    {
      title: "Python Developer",
      text: "Looking for a Python developer with knowledge of Python, SQL, Machine Learning, Git and Data Analysis."
    },
    {
      title: "Data Analyst",
      text: "Seeking a Data Analyst proficient in SQL, Python, Pandas, Tableau/Power BI, statistical modeling, and data reporting."
    },
    {
      title: "Full Stack Engineer",
      text: "Looking for a Full Stack Engineer with strong React, TypeScript, Node.js, REST APIs, Docker, and PostgreSQL experience."
    },
    {
      title: "Machine Learning Intern",
      text: "Hiring a Machine Learning Intern with Python, PyTorch/TensorFlow, Scikit-Learn, data wrangling, model evaluation, and Git."
    }
  ];

  const handlePresetSelect = (presetText: string) => {
    setJobDescription(presetText);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    await onRunMatch(jobDescription);
  };

  const { matchPercentage, skillsComparison, missingSkills, recommendedSkills, feedbackNotes } = jobMatch;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Semantic ATS Alignment</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Job Description Matcher
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Paste any job posting to compare your extracted resume skills, calculate your exact match percentage,
          and discover missing critical keywords.
        </p>
      </div>

      {/* Input and Presets Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Target Job Description
          </label>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400">Quick Templates:</span>
            {samplePresets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(p.text)}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-[11px] font-medium text-slate-600 transition-colors"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            id="job-matcher-textarea"
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste complete job description requirements here..."
            className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-sans"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Evaluates keyword proximity, skill depth, and technical prerequisites.
            </span>
            <button
              id="recompare-job-btn"
              type="submit"
              disabled={isMatching}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              {isMatching ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Comparing Requirements...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Compare Resume with Job</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Match Percentage Hero */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs text-center space-y-4">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Match Percentage
          </span>

          <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-tr from-indigo-50 to-violet-50 border-4 border-indigo-600/20 flex flex-col items-center justify-center relative">
            <span className="text-4xl font-extrabold text-indigo-700 font-display">
              {matchPercentage}%
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">
              Alignment
            </span>
          </div>

          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              matchPercentage >= 75 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            }`}>
              {matchPercentage >= 75 ? "High Probability ATS Match" : "Skill Gap Detected"}
            </span>
            <p className="text-xs text-slate-500 mt-2">
              Based on candidate skills versus employer mandatory requirements.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              id="matcher-careers-btn"
              onClick={onNavigateToGuidance}
              className="w-full py-2 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Career Recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Skills Comparison Table */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Resume Skills Comparison</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifies which prerequisite skills were verified in your resume and which are absent.
            </p>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {skillsComparison.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                    item.found ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  }`}>
                    {item.found ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-sm">{item.skill}</span>
                    {item.notes && (
                      <p className="text-[11px] text-slate-400">{item.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    item.found 
                      ? "bg-emerald-100 text-emerald-800" 
                      : "bg-rose-100 text-rose-800"
                  }`}>
                    {item.found ? "Found ✅" : "Missing ❌"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Missing Skills and Recommended Skills Sub-grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            {/* Missing Skills */}
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                  Missing Skills
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.length > 0 ? (
                  missingSkills.map((sk, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white border border-rose-300 text-rose-800 font-semibold text-[11px]"
                    >
                      {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-rose-700">None detected! Full skill coverage.</span>
                )}
              </div>
              <p className="text-[11px] text-rose-700 mt-2">
                Recruiters filter out candidates lacking these core technologies.
              </p>
            </div>

            {/* Recommended Skills */}
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  Recommended Skills
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recommendedSkills.map((sk, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white border border-indigo-300 text-indigo-800 font-semibold text-[11px]"
                  >
                    {sk}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-indigo-700 mt-2">
                Learning these will position you in the top 10% of applicants for this role.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
