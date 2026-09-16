import React, { useState, useRef } from "react";
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  FolderGit2, 
  FileCheck2,
  RefreshCw,
  Copy,
  Check
} from "lucide-react";
import { ExtractedResumeData, FullResumeAnalysis } from "../types";

interface ResumeUploadSectionProps {
  onAnalyze: (resumeText: string, fileName: string, jobDescription?: string) => Promise<void>;
  isAnalyzing: boolean;
  analysisResult: FullResumeAnalysis | null;
  onNavigateToAnalysis: () => void;
  onNavigateToScore: () => void;
  onLoadSample: (sampleId: string) => void;
}

export const ResumeUploadSection: React.FC<ResumeUploadSectionProps> = ({
  onAnalyze,
  isAnalyzing,
  analysisResult,
  onNavigateToAnalysis,
  onNavigateToScore,
  onLoadSample,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>(
    "Looking for a Python developer with knowledge of Python, SQL, Machine Learning, Git and Data Analysis."
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const [inputMode, setInputMode] = useState<"file" | "text">("file");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    setErrorMessage("");
    setSelectedFile(file);

    // Read text from plain text files directly
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResumeText((e.target?.result as string) || "");
      };
      reader.readAsText(file);
    } else {
      // For PDF/DOC/DOCX files, read as text fallback or prepare descriptive text
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result as string) || "";
        // Clean non-printable characters for standard ASCII / UTF text in docs
        const sanitized = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ");
        if (sanitized.length > 50) {
          setResumeText(sanitized);
        } else {
          // If binary representation is too dense, load smart simulated text or notify
          setResumeText(`[Document: ${file.name} | Size: ${(file.size / 1024).toFixed(1)} KB]
Resume document uploaded successfully. Click Analyze Resume to initiate AI extraction of skills, education, and experience.`);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyzeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    let textToAnalyze = resumeText.trim();
    const fileName = selectedFile?.name || "Uploaded_Resume.pdf";

    if (!textToAnalyze) {
      setErrorMessage("Please upload a resume file (PDF, DOC, DOCX) or paste your resume content.");
      return;
    }

    try {
      await onAnalyze(textToAnalyze, fileName, jobDescription);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to analyze resume. Please try again.");
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const extracted = analysisResult?.extracted;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Resume Ingestion & Parsing</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Upload Your Resume
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Upload your resume in PDF, DOC, DOCX format or paste the text. The AI will extract all candidate
          details, skills, and projects automatically.
        </p>
      </div>

      {/* Upload and Target JD Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
          {/* Mode Switcher */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInputMode("file")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  inputMode === "file"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Choose File (PDF/DOC/DOCX)
              </button>
              <button
                type="button"
                onClick={() => setInputMode("text")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  inputMode === "text"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Paste Resume Text
              </button>
            </div>

            {/* Quick Sample Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 hidden sm:inline">Demo:</span>
              <button
                id="upload-sample-python-btn"
                type="button"
                onClick={() => onLoadSample("python-ml")}
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded"
              >
                Python & ML
              </button>
              <button
                id="upload-sample-fullstack-btn"
                type="button"
                onClick={() => onLoadSample("fullstack-web")}
                className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-2 py-1 rounded"
              >
                Full Stack
              </button>
            </div>
          </div>

          <form onSubmit={handleAnalyzeSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {inputMode === "file" ? (
              <div>
                {/* Drag and Drop Box */}
                <div
                  id="resume-drop-zone"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-150 ${
                    isDragOver
                      ? "border-indigo-500 bg-indigo-50/60 scale-[1.01]"
                      : selectedFile
                      ? "border-emerald-300 bg-emerald-50/30"
                      : "border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />

                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mx-auto mb-3 text-indigo-600">
                    <UploadCloud className="w-6 h-6" />
                  </div>

                  {selectedFile ? (
                    <div>
                      <p className="text-xs font-bold text-slate-900 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{selectedFile.name}</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {(selectedFile.size / 1024).toFixed(1)} KB • Ready to extract
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="mt-2 text-xs font-medium text-indigo-600 hover:underline"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-bold text-slate-800 font-display">
                        Click to Choose File or drag and drop
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Supports PDF, DOC, DOCX, TXT (up to 15MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Paste Resume Content
                </label>
                <textarea
                  id="paste-resume-textarea"
                  rows={8}
                  placeholder="Paste your complete resume text here (including contact details, skills, education, and experience)..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono bg-slate-50/50"
                />
              </div>
            )}

            {/* Target Job Description field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Job Description (for matching & missing skills analysis)
              </label>
              <textarea
                id="target-jd-textarea"
                rows={3}
                placeholder="e.g. Looking for a Python developer with knowledge of Python, SQL, Machine Learning, Git and Data Analysis."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Tip: Enter the job requirement you want the AI to evaluate your resume against.
              </p>
            </div>

            {/* Submit button */}
            <button
              id="analyze-resume-submit-btn"
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 group"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-200" />
                  <span>AI is Extracting & Screening Resume...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze Resume</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Extraction Overview Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
              <span>Extracted Resume Information</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {extracted 
                ? `Extracted data from ${extracted.fileName}` 
                : "Upload or select a sample resume to preview extracted fields in real-time."}
            </p>

            {extracted ? (
              <div className="mt-4 space-y-4 text-xs">
                {/* Contact Card */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <p className="font-bold text-slate-900 text-sm">{extracted.contactInfo.name}</p>
                  <div className="mt-2 space-y-1 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{extracted.contactInfo.email}</span>
                    </div>
                    {extracted.contactInfo.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{extracted.contactInfo.phone}</span>
                      </div>
                    )}
                    {extracted.contactInfo.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{extracted.contactInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technical Skills Preview */}
                <div>
                  <span className="font-semibold text-slate-700 block mb-1.5">
                    Extracted Technical Skills ({extracted.skills.technical.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {extracted.skills.technical.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-medium text-[11px] border border-indigo-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education Preview */}
                {extracted.education.length > 0 && (
                  <div>
                    <span className="font-semibold text-slate-700 block mb-1.5">Education:</span>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                      <p className="font-semibold text-slate-900">{extracted.education[0].degree}</p>
                      <p className="text-[11px] text-slate-500">
                        {extracted.education[0].institution} • {extracted.education[0].year}
                      </p>
                      {extracted.education[0].scoreOrGpa && (
                        <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          GPA: {extracted.education[0].scoreOrGpa}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick Next Steps */}
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    id="goto-analysis-dashboard-btn"
                    onClick={onNavigateToAnalysis}
                    className="w-full py-2 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center justify-between"
                  >
                    <span>View AI Analysis Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id="goto-score-view-btn"
                    onClick={onNavigateToScore}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition-colors flex items-center justify-between"
                  >
                    <span>Check Resume Score ({analysisResult?.overallScore || 82}/100)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 py-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No resume analyzed yet.</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Upload a file or click one of the instant samples above to begin.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
