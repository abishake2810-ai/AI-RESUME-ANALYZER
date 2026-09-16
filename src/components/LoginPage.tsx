import React, { useState } from "react";
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  ShieldCheck, 
  Zap,
  GraduationCap
} from "lucide-react";
import { UserProfile } from "../types";

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onClose?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetRole, setTargetRole] = useState("Software Developer");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    if (isRegister && !name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const userProfile: UserProfile = {
        id: `user-${Date.now()}`,
        name: isRegister ? name : (email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Student Candidate"),
        email: email,
        targetRole: targetRole,
        createdAt: new Date().toISOString()
      };

      try {
        localStorage.setItem("ai_resume_user", JSON.stringify(userProfile));
      } catch (e) {
        console.error("Storage error:", e);
      }

      setLoading(false);
      onLoginSuccess(userProfile);
    }, 400);
  };

  const handleQuickDemoStudent = () => {
    const demoUser: UserProfile = {
      id: "demo-student-01",
      name: "Alex Morgan",
      email: "alex.morgan@university.edu",
      targetRole: "Python Developer & ML Intern",
      createdAt: new Date().toISOString()
    };
    try {
      localStorage.setItem("ai_resume_user", JSON.stringify(demoUser));
    } catch (e) {}
    onLoginSuccess(demoUser);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-50 to-indigo-50/40">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 p-6 text-white text-center relative">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center mb-3 border border-white/20">
            <Sparkles className="w-6 h-6 text-indigo-100" />
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight">
            {isRegister ? "Create Your Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-indigo-100/90 mt-1 max-w-xs mx-auto">
            {isRegister 
              ? "Join AI Resume Analyzer to track your resume score, match job descriptions, and access AI career guidance."
              : "Sign in to access your analyzed resumes, ATS scores, and personalized career recommendations."}
          </p>
        </div>

        {/* Quick Demo Access banner */}
        <div className="px-6 pt-5 pb-1">
          <button
            id="demo-student-login-btn"
            type="button"
            onClick={handleQuickDemoStudent}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-50/90 hover:bg-indigo-100/90 border border-indigo-200 text-indigo-900 transition-all duration-150 group"
          >
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <p className="text-xs font-bold">1-Click Demo Student Access</p>
                <p className="text-[11px] text-indigo-700">Explore with pre-loaded sample resume</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              or continue with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3.5">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <span className="font-semibold">Notice:</span> {errorMsg}
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="register-name-input"
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="login-email-input"
                type="email"
                placeholder="student@example.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="login-password-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Career Role
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <select
                id="target-role-select"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Software Developer">Software Developer (Python, Java, Web)</option>
                <option value="Data Analyst">Data Analyst (Python, SQL, BI)</option>
                <option value="Machine Learning Intern">Machine Learning Intern / AI Engineer</option>
                <option value="Cloud & DevOps">Cloud & DevOps Associate</option>
                <option value="Frontend Engineer">Frontend Engineer (React, TypeScript)</option>
              </select>
            </div>
          </div>

          <button
            id="login-submit-button"
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isRegister ? "Create Account & Continue" : "Sign In to Resume Analyzer"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          {/* Toggle between register and login */}
          <div className="text-center pt-2">
            <button
              id="toggle-auth-mode-button"
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMsg("");
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {isRegister
                ? "Already have an account? Sign In"
                : "Need an account? Register as student or job seeker"}
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure Student Credentials</span>
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>College AI Project Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
