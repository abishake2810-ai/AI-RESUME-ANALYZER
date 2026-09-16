import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RefreshCw, 
  Trash2, 
  ArrowRight,
  HelpCircle,
  Copy,
  Check
} from "lucide-react";
import { ChatMessage, ExtractedResumeData } from "../types";

interface AIChatbotModalProps {
  resumeContext?: ExtractedResumeData | null;
  overallScore?: number;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({
  resumeContext,
  overallScore,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      content: `Hello! I am your **Resume AI Assistant**. I have reviewed your profile and I'm ready to help you optimize your resume, prepare for technical interviews, and match target job descriptions. What would you like to work on?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How can I improve my resume?",
    "What skills should I learn for data science?",
    "How should I describe my project?",
    "How do I write a good career objective?",
    "What technical skills are missing from my resume?",
    "How should I prepare for an interview?"
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt) {
      sendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map(m => ({ sender: m.sender, content: m.content })),
          resumeContext: resumeContext ? {
            name: resumeContext.contactInfo.name,
            skills: resumeContext.skills,
            score: overallScore,
            education: resumeContext.education,
            experience: resumeContext.experience,
            projects: resumeContext.projects
          } : null
        })
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        content: data.reply || "I am here to help you refine your resume and prepare for your career opportunities.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        content: "Sorry, I had trouble connecting to the AI model. Please try asking again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "assistant",
        content: `Chat history cleared. What else can I help you improve on your resume today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
          <Bot className="w-3.5 h-3.5" />
          <span>Intelligent Career Assistant</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Resume AI Assistant
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Ask questions about ATS optimization, interview preparation, quantifiable bullet points, and career roadmaps.
        </p>
      </div>

      {/* Resume Context Chip */}
      {resumeContext && (
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Active Resume Context: <strong className="text-slate-900">{resumeContext.contactInfo.name}</strong> • ATS Score: <strong className="text-indigo-600">{overallScore || 82}/100</strong>
            </span>
          </div>
          <button
            onClick={clearChat}
            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Prompts Chips Bar */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Suggested Topics:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendMessage(q)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-xs text-slate-700 font-medium transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
        {/* Messages list */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            const isCopied = copiedId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser 
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-xs" 
                    : "bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200/80"
                }`}>
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>

                  <div className={`mt-2 pt-1 border-t flex items-center justify-between text-[10px] ${
                    isUser ? "border-indigo-500/60 text-indigo-100" : "border-slate-200/60 text-slate-400"
                  }`}>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.content, msg.id)}
                        className="hover:text-slate-600 flex items-center gap-1"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? "Copied" : "Copy"}</span>
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 rounded-tl-none flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="ml-1 text-[11px] font-medium">Assistant is thinking...</span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(inputText);
          }}
          className="p-3 sm:p-4 bg-slate-50/90 border-t border-slate-200 flex items-center gap-2"
        >
          <input
            id="chat-user-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Resume AI Assistant (e.g. How should I describe my project?)..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <button
            id="chat-send-btn"
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
