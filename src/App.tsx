import { useState, useEffect } from "react";
import { Question, AssessmentResult } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Code, Cpu, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

import Header from "./components/Header";
import DomainSelection from "./components/DomainSelection";
import QuizEngine from "./components/QuizEngine";
import DifficultyEvaluation from "./components/DifficultyEvaluation";
import RepositorySuggestion from "./components/RepositorySuggestion";

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Loading and Error states
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState<boolean>(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [loadingPhaseIndex, setLoadingPhaseIndex] = useState<number>(0);

  // Rotating terminal loader messages for excellent visual feedback
  const loaderPhases = [
    "Spinning server-side Node proxy context...",
    "Querying Gemini models API gateway...",
    "Analyzing critical syntax paradigms for: technology-stack...",
    "Calibrating progressively challenging multiple-choice nodes...",
    "Generating deep educational explanations and correct indexes...",
    "Injecting verified JSON response schema blocks...",
    "Done! Rendering distraction-free question matrix..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGeneratingQuiz) {
      interval = setInterval(() => {
        setLoadingPhaseIndex((prev) => (prev < loaderPhases.length - 1 ? prev + 1 : prev));
      }, 900);
    } else {
      setLoadingPhaseIndex(0);
    }
    return () => clearInterval(interval);
  }, [isGeneratingQuiz]);

  const handleSelectDomain = async (domainName: string) => {
    setSelectedDomain(domainName);
    setIsGeneratingQuiz(true);
    setQuizError(null);
    setQuestions([]);
    setUserAnswers({});
    setAssessmentResult(null);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domainName }),
      });

      if (!response.ok) {
        throw new Error("HTTP connection error, could not generate standard quiz questions.");
      }

      const data = await response.json();
      
      if (!data.questions || data.questions.length === 0) {
        throw new Error("Missing structural questions inside backend payload mapping.");
      }

      setQuestions(data.questions);
      setCurrentStep(2); // Jump to Quiz step
    } catch (err: any) {
      console.error("Quiz fetch failed:", err);
      setQuizError(err.message || "Failed to load skills challenge. Please try again.");
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleSubmitQuiz = (answers: Record<number, number>) => {
    setUserAnswers(answers);
    setCurrentStep(3); // Jump to Evaluation step
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProceedToSuggestions = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setCurrentStep(4); // Jump to Suggestions dashboard
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFlow = () => {
    setCurrentStep(1);
    setSelectedDomain("");
    setQuestions([]);
    setUserAnswers({});
    setAssessmentResult(null);
    setQuizError(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200" id="app-root-container">
      {/* Visual Header */}
      <Header currentStep={currentStep} />

      {/* Main app space */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14" id="app-main-view">
        <AnimatePresence mode="wait">
          
          {/* Transition state: Generating custom Quiz */}
          {isGeneratingQuiz && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mx-auto max-w-lg rounded-2xl border border-slate-800 bg-[#131B2E] p-6 shadow-2xl shadow-black/40 text-center"
              id="fullscreen-quiz-loader"
            >
              <div className="flex justify-center space-x-2">
                <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
                <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]" />
                <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-300" />
              </div>

              <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950/50 text-indigo-400 mx-auto border border-indigo-800/40">
                <Sparkles className="h-6 w-6 animate-pulse" />
              </div>

              <h3 className="font-sans text-base font-bold text-slate-100 mt-5">
                Generating Tailored Skill Quiz
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Custom assessment matrices for: <span className="font-bold text-indigo-400">{selectedDomain}</span>
              </p>

              {/* Animated Shell Logs */}
              <div className="mt-8 rounded-xl bg-slate-950 p-4 font-mono text-left text-[10px] text-indigo-300 border border-slate-800 shadow-inner" id="terminal-loader-box">
                <div className="flex items-center space-x-2 border-b border-slate-800/85 pb-2 mb-2 text-slate-500">
                  <div className="h-2 w-2 rounded-full bg-rose-500" />
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[9px] uppercase tracking-wider font-bold pl-2">VIRTUAL SIMULATOR SHELL</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-emerald-400">root@gitstart:~# fetch --aimodule --topic="{selectedDomain.toLowerCase().replace(/\s+/g, '-')}"</p>
                  <p className="text-slate-500">&gt; Status: OK, API Handshake secure.</p>
                  <p className="text-indigo-400 animate-pulse">&gt; {loaderPhases[loadingPhaseIndex]}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Transition state: Quiz Generation Error */}
          {!isGeneratingQuiz && quizError && (
            <motion.div
              key="quiz-error"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-md rounded-2xl border border-rose-950/40 bg-[#1E1120] p-6 shadow-xl shadow-black/50 text-center"
              id="quiz-error-boundary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/50 text-rose-400 mx-auto border border-rose-800/30">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-sans text-base font-bold text-slate-100 mt-4">Quiz Initialization Failed</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{quizError}</p>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleSelectDomain(selectedDomain)}
                  className="flex flex-1 items-center justify-center space-x-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 cursor-pointer border-0"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retry Connection</span>
                </button>
                <button
                  onClick={handleResetFlow}
                  className="flex flex-1 items-center justify-center rounded-xl border border-slate-700 bg-[#131B2E] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  <span>Select Stack</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Main Screens routing */}
          {!isGeneratingQuiz && !quizError && (
            <div id="active-step-view-block">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <DomainSelection 
                    onSelectDomain={handleSelectDomain}
                    isLoading={isGeneratingQuiz}
                  />
                </motion.div>
              )}

              {currentStep === 2 && questions.length > 0 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <QuizEngine
                    domain={selectedDomain}
                    questions={questions}
                    onSubmitQuiz={handleSubmitQuiz}
                    onBack={handleResetFlow}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.3 }}
                >
                  <DifficultyEvaluation
                    questions={questions}
                    userAnswers={userAnswers}
                    onProceed={handleProceedToSuggestions}
                    onRetake={handleResetFlow}
                    domain={selectedDomain}
                  />
                </motion.div>
              )}

              {currentStep === 4 && assessmentResult && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <RepositorySuggestion
                    result={assessmentResult}
                    onRestart={handleResetFlow}
                  />
                </motion.div>
              )}
            </div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
