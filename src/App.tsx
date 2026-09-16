import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { ResumeUploadSection } from "./components/ResumeUploadSection";
import { AIAnalysisDashboard } from "./components/AIAnalysisDashboard";
import { ResumeScoreView } from "./components/ResumeScoreView";
import { JobMatcherSection } from "./components/JobMatcherSection";
import { CareerRecommendationsView } from "./components/CareerRecommendationsView";
import { ResumeImprovementSection } from "./components/ResumeImprovementSection";
import { AIChatbotModal } from "./components/AIChatbotModal";
import { LoginPage } from "./components/LoginPage";
import { CollegeReportModal } from "./components/CollegeReportModal";
import { FullResumeAnalysis, UserProfile } from "./types";
import { 
  Sparkles, 
  GraduationCap, 
  FileCheck2, 
  Heart,
  ArrowRight,
  ShieldCheck,
  Bot
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [analysisResult, setAnalysisResult] = useState<FullResumeAnalysis | null>(null);

  // Restore user session or demo user
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("ai_resume_user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to restore user session:", e);
    }
  }, []);

  // Pre-load default sample resume so all screens are immediately interactive
  useEffect(() => {
    loadSampleResume("python-ml", false);
  }, []);

  const loadSampleResume = async (sampleId: string, navigate: boolean = true) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/sample-resumes");
      const data = await response.json();
      const sample = data.samples?.find((s: any) => s.id === sampleId) || data.samples?.[0];
      
      if (sample) {
        const analyzeRes = await fetch("/api/analyze-resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText: sample.content,
            fileName: `${sample.name.replace(/\s+/g, "_")}.pdf`,
            jobDescription: "Looking for a Python developer with knowledge of Python, SQL, Machine Learning, Git and Data Analysis."
          })
        });

        if (analyzeRes.ok) {
          const result = await analyzeRes.json();
          setAnalysisResult(result);
          if (navigate) {
            setActiveTab("upload");
          }
        }
      }
    } catch (err) {
      console.error("Sample load error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeResume = async (resumeText: string, fileName: string, jobDescription?: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          fileName,
          jobDescription
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to analyze resume.");
      }

      const result: FullResumeAnalysis = await response.json();
      setAnalysisResult(result);
      setActiveTab("analysis");
    } catch (err: any) {
      console.error("Analysis submission error:", err);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunMatch = async (jobDescriptionText: string) => {
    if (!analysisResult) return;
    setIsMatching(true);
    try {
      const response = await fetch("/api/match-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeSkills: analysisResult.extracted.skills.technical,
          resumeText: analysisResult.extracted.summary,
          jobDescription: jobDescriptionText
        })
      });

      if (response.ok) {
        const matchData = await response.json();
        setAnalysisResult({
          ...analysisResult,
          jobMatch: matchData
        });
      }
    } catch (err) {
      console.error("Match error:", err);
    } finally {
      setIsMatching(false);
    }
  };

  const handleAskChatbotAboutRole = (roleTitle: string) => {
    setChatInitialPrompt(`How can I prepare for a ${roleTitle} role based on my current resume and technical skills?`);
    setActiveTab("chatbot");
  };

  const handleSelectRoleForMatching = (roleTitle: string) => {
    handleRunMatch(`Looking for a qualified ${roleTitle} with hands-on skills, practical projects, and collaboration experience.`);
    setActiveTab("matcher");
  };

  const handleLogout = () => {
    localStorage.removeItem("ai_resume_user");
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === "login") {
            setShowLoginModal(true);
          } else {
            setActiveTab(tab);
          }
        }}
        currentUser={currentUser}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onOpenReport={() => setShowReportModal(true)}
        hasAnalyzedResume={!!analysisResult}
        score={analysisResult?.overallScore}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === "home" && (
          <HomePage
            onAnalyzeClick={() => setActiveTab("upload")}
            onCheckScoreClick={() => setActiveTab("score")}
            onLoadSampleResume={(sampleId) => loadSampleResume(sampleId, true)}
            onOpenReport={() => setShowReportModal(true)}
          />
        )}

        {activeTab === "upload" && (
          <ResumeUploadSection
            onAnalyze={handleAnalyzeResume}
            isAnalyzing={isAnalyzing}
            analysisResult={analysisResult}
            onNavigateToAnalysis={() => setActiveTab("analysis")}
            onNavigateToScore={() => setActiveTab("score")}
            onLoadSample={(sampleId) => loadSampleResume(sampleId, false)}
          />
        )}

        {activeTab === "analysis" && analysisResult && (
          <AIAnalysisDashboard
            analysis={analysisResult}
            onNavigateToScore={() => setActiveTab("score")}
            onNavigateToMatcher={() => setActiveTab("matcher")}
            onNavigateToImprovement={() => setActiveTab("improve")}
          />
        )}

        {activeTab === "score" && analysisResult && (
          <ResumeScoreView
            score={analysisResult.overallScore}
            breakdown={analysisResult.scoreBreakdown}
            candidateName={analysisResult.extracted.contactInfo.name}
            onNavigateToMatcher={() => setActiveTab("matcher")}
            onNavigateToImprovement={() => setActiveTab("improve")}
          />
        )}

        {activeTab === "matcher" && analysisResult && (
          <JobMatcherSection
            jobMatch={analysisResult.jobMatch}
            onRunMatch={handleRunMatch}
            isMatching={isMatching}
            onNavigateToGuidance={() => setActiveTab("careers")}
            onNavigateToImprovement={() => setActiveTab("improve")}
          />
        )}

        {activeTab === "careers" && analysisResult && (
          <CareerRecommendationsView
            recommendations={analysisResult.careerRecommendations}
            candidateName={analysisResult.extracted.contactInfo.name}
            onSelectRoleForMatching={handleSelectRoleForMatching}
            onAskChatbotAboutRole={handleAskChatbotAboutRole}
          />
        )}

        {activeTab === "improve" && analysisResult && (
          <ResumeImprovementSection
            improvements={analysisResult.improvements}
            onAskChatbot={(prompt) => {
              setChatInitialPrompt(prompt);
              setActiveTab("chatbot");
            }}
          />
        )}

        {activeTab === "chatbot" && (
          <AIChatbotModal
            resumeContext={analysisResult?.extracted}
            overallScore={analysisResult?.overallScore}
            initialPrompt={chatInitialPrompt}
            onClearInitialPrompt={() => setChatInitialPrompt(undefined)}
          />
        )}
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg hover:bg-slate-700"
            >
              ✕
            </button>
            <LoginPage
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setShowLoginModal(false);
              }}
              onClose={() => setShowLoginModal(false)}
            />
          </div>
        </div>
      )}

      {/* College Project Report Modal */}
      <CollegeReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />

      {/* Floating Chatbot Launcher button when not on chatbot tab */}
      {activeTab !== "chatbot" && (
        <button
          id="floating-chatbot-launcher"
          onClick={() => setActiveTab("chatbot")}
          className="fixed bottom-5 right-5 z-40 px-4 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-300 flex items-center gap-2 text-xs font-bold transition-transform hover:scale-105"
        >
          <Bot className="w-4 h-4 text-amber-300" />
          <span>Resume AI Assistant</span>
        </button>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">
              AI Resume Analyzer
            </span>
            <span className="text-slate-400">•</span>
            <span>AI Powered Resume Analysis and Career Guidance System</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowReportModal(true)}
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              College Project Report
            </button>
            <span>•</span>
            <span>Gemini 3.8 Flash Engine</span>
            <span>•</span>
            <span className="text-slate-400">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
