import { useState } from "react";
import { Question } from "../types";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle,
  Clock,
  Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuizEngineProps {
  domain: string;
  questions: Question[];
  onSubmitQuiz: (answers: Record<number, number>) => void;
  onBack: () => void;
}

export default function QuizEngine({ domain, questions, onSubmitQuiz, onBack }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = questions[currentIndex];
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    onSubmitQuiz(answers);
  };

  // Progress percentage
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const answeredPercent = Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <div className="mx-auto max-w-3xl space-y-8" id="quiz-engine-container">
      {/* Header and Quit button */}
      <div className="flex items-center justify-between" id="quiz-header-bar">
        <button
          onClick={onBack}
          className="flex items-center space-x-1 px-2 py-1.5 font-sans text-xs font-semibold text-slate-400 hover:text-slate-250 hover:text-slate-250 hover:text-slate-200 transition-colors border-0 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Change Tech Stack</span>
        </button>

        <div className="flex items-center space-x-2 rounded-full bg-slate-800 px-3 py-1 font-mono text-[10px] font-semibold text-slate-300 border border-slate-700/50">
          <Terminal className="h-3 w-3" />
          <span>TOPIC: {domain.toUpperCase()}</span>
        </div>
      </div>

      {/* Progress metrics */}
      <div className="space-y-2" id="quiz-metrics-display">
        <div className="flex items-center justify-between font-sans text-xs text-slate-400">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{answeredPercent}% Answered</span>
        </div>
        
        {/* Progress Bar background */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 flex">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Primary Question Slide Container */}
      <div className="relative overflow-visible rounded-2xl border border-slate-800/80 bg-[#131B2E] p-6 shadow-xl shadow-black/35 md:p-8" id="quiz-question-card">
        <div className="flex items-start space-x-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-950/80 text-xs font-bold text-indigo-400 border border-indigo-800/20">
            Q{currentIndex + 1}
          </div>
          <h3 className="font-sans text-base font-bold text-slate-100 md:text-lg">
            {currentQuestion.text}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="mt-8 space-y-3" id="quiz-options-list">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;
            const optionLetters = ["A", "B", "C", "D"];

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full flex items-center text-left rounded-xl border p-4 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-950/40 text-slate-100 font-semibold ring-2 ring-indigo-500/20 shadow-md shadow-black/20"
                    : "border-slate-800 bg-[#131B2E] text-slate-300 hover:border-slate-700 hover:bg-slate-800/40"
                }`}
                id={`q-option-${idx}`}
              >
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold mr-3.5 transition-colors ${
                  isSelected
                    ? "bg-indigo-600 text-white border-0"
                    : "bg-slate-850 border border-slate-700 text-slate-400"
                }`}>
                  {optionLetters[idx]}
                </div>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation and Submission actions */}
      <div className="flex items-center justify-between" id="quiz-navigation-actions">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-xs font-semibold text-slate-300 shadow-sm hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900/50 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!hasAnsweredCurrent}
            className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none cursor-pointer border-0"
            id="btn-quiz-submit"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Finish & Score</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-950/20 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none cursor-pointer border-0"
            id="btn-quiz-next"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Helpful Hint Panel */}
      <div className="flex items-center justify-between rounded-xl bg-slate-900/50 border border-slate-800/80 p-4 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Clock className="h-3.5 w-3.5 text-slate-500" />
          <span>We recommend reading options carefully. There is only one correct answer.</span>
        </div>
      </div>
    </div>
  );
}
