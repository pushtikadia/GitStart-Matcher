import { Question, SkillTier, SkillDetails, AssessmentResult } from "../types";
import { 
  Award, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RefreshCw,
  Info
} from "lucide-react";
import { motion } from "motion/react";

interface DifficultyEvaluationProps {
  questions: Question[];
  userAnswers: Record<number, number>;
  onProceed: (result: AssessmentResult) => void;
  onRetake: () => void;
  domain: string;
}

const tierDetails: Record<SkillTier, SkillDetails> = {
  easy: {
    title: "Aspiring Contributor",
    badge: "Novice Match",
    color: "from-teal-500 to-emerald-600",
    borderColor: "border-teal-900/40",
    textColor: "text-teal-400 font-semibold",
    bgColor: "bg-teal-950/25",
    range: "0% - 40%",
    description: "Welcome to your open-source journey! You have a solid grasp of basic developer logic. Starting with early open tasks is a phenomenal way to build confidence, learn project structures, and earn your first GitHub commits.",
    issueLabels: ["good first issue", "easy-fix", "documentation"],
    contributorProfile: "Perfect for learning workflow pipelines, documentation updates, spelling fixes, and simple layout overrides."
  },
  medium: {
    title: "Intermediate Craftsman",
    badge: "Competent Explorer",
    color: "from-indigo-500 to-blue-600",
    borderColor: "border-indigo-900/40",
    textColor: "text-indigo-400 font-semibold",
    bgColor: "bg-indigo-950/25",
    range: "41% - 75%",
    description: "Fantastic job! You possess very strong procedural logic and developer instincts. You are perfectly equipped to tackle functional logic bugs, integrate helper files, and write supportive module code.",
    issueLabels: ["help wanted", "hacktoberfest", "medium"],
    contributorProfile: "Suited for intermediate algorithmic bugs, simple route optimizations, unit tests creation, and adding standard filters."
  },
  hard: {
    title: "Veteran Architect",
    badge: "Elite Contributor",
    color: "from-purple-500 to-indigo-750",
    borderColor: "border-purple-900/40",
    textColor: "text-purple-400 font-semibold",
    bgColor: "bg-purple-950/25",
    range: "76% - 100%",
    description: "Incredible technical mastery! You scored at an outstanding expert level. Maintainers will love your help on core performance metrics, high-concurrency loops, database structures, and feature additions.",
    issueLabels: ["enhancement", "bug", "high priority"],
    contributorProfile: "Perfect for severe error debugging, database schema optimizations, advanced client refactoring, and brand new sub-components."
  }
};

export default function DifficultyEvaluation({ 
  questions, 
  userAnswers, 
  onProceed, 
  onRetake, 
  domain 
}: DifficultyEvaluationProps) {
  
  // Calculate Score
  let correctCount = 0;
  questions.forEach(q => {
    if (userAnswers[q.id] === q.correctOptionIndex) {
      correctCount++;
    }
  });

  const totalQuestions = questions.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // Determine Tier
  let tier: SkillTier = "easy";
  if (scorePercent > 40 && scorePercent <= 75) {
    tier = "medium";
  } else if (scorePercent > 75) {
    tier = "hard";
  }

  const details = tierDetails[tier];

  const handleProceedClick = () => {
    onProceed({
      scorePercent,
      correctCount,
      totalQuestions,
      tier,
      domain,
      completedAt: new Date().toISOString()
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-10" id="evaluation-container">
      
      {/* Visual Badge Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#131B2E] shadow-2xl shadow-black/40" id="badge-score-card">
        <div className={`bg-gradient-to-r ${details.color} px-6 py-12 text-center text-white md:px-10`} id="badge-gradient-bar">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white mb-4"
          >
            <Award className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="font-sans text-2xl font-black uppercase tracking-wider text-white/95 text-xs mt-1 md:text-sm">
            {details.badge}
          </h2>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight md:text-5xl mt-2">
            {details.title}
          </h1>
          <div className="mt-4 inline-flex items-center rounded-full bg-white/15 px-4 py-1 font-mono text-xs font-bold text-white">
            Score: {scorePercent}% ({correctCount}/{totalQuestions} Correct)
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-8" id="evaluation-guidance-content">
          <div className="space-y-3">
            <h3 className="font-sans text-lg font-bold text-slate-100">
              Your Contributor Roadmap
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              {details.description}
            </p>
          </div>

          {/* Tier breakdown specs */}
          <div className="grid gap-4 sm:grid-cols-2" id="tier-specs-grid">
            <div className={`rounded-2xl border p-4 ${details.borderColor} ${details.bgColor}`}>
              <span className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Targeted Issue Labels
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {details.issueLabels.map((l, idx) => (
                  <span key={idx} className="rounded-md bg-slate-950 border border-slate-800/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-300">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl border p-4 ${details.borderColor} ${details.bgColor}`}>
              <span className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Contribution Scope Mapping
              </span>
              <p className="mt-2.5 leading-relaxed text-slate-300 font-sans text-xs">
                {details.contributorProfile}
              </p>
            </div>
          </div>

          {/* Primary Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800" id="evaluation-action-buttons">
            <button
              onClick={handleProceedClick}
              className="flex flex-1 items-center justify-center space-x-2 rounded-2xl bg-indigo-600 px-6 py-4.5 text-xs font-bold text-white shadow-lg shadow-indigo-950/50 hover:bg-indigo-500 hover:-translate-y-0.5 transition-all cursor-pointer border-0"
              id="btn-find-projects"
            >
              <span>Explore Tailored Repository Matches</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onRetake}
              className="flex items-center justify-center space-x-1.5 rounded-2xl border border-slate-800 bg-slate-900/50 px-6 py-4.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry / Choose Tech Stack</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Explanation Answers section */}
      <div className="space-y-4" id="educational-review-section">
        <h3 className="font-sans text-lg font-extrabold text-slate-100 flex items-center px-1">
          <BookOpen className="h-5 w-5 text-indigo-400 mr-2" />
          Technical Review & Learnings
        </h3>

        <div className="space-y-4" id="questions-explanation-accordion">
          {questions.map((q, idx) => {
            const userAnswerIndex = userAnswers[q.id];
            const isCorrect = userAnswerIndex === q.correctOptionIndex;

            return (
              <div 
                key={q.id}
                className={`rounded-2xl border p-5 transition-all bg-[#131B2E] ${
                  isCorrect 
                    ? "border-emerald-950/60 hover:border-emerald-900/40" 
                    : "border-rose-950/60 hover:border-rose-900/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-sans text-xs font-bold text-slate-500">
                        QUESTION {idx + 1}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-950 px-2 py-0.5 font-sans text-[10px] font-semibold text-emerald-400 border border-emerald-900/40">
                          <CheckCircle2 className="mr-1 h-3 w-3 shrink-0" />
                          Correct answer
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-rose-950 px-2 py-0.5 font-sans text-[10px] font-semibold text-rose-400 border border-rose-900/40">
                          <XCircle className="mr-1 h-3 w-3 shrink-0" />
                          Review point
                        </span>
                      )}
                    </div>
                    <h4 className="font-sans text-sm font-bold text-slate-100 mt-2.5">
                      {q.text}
                    </h4>
                  </div>
                </div>

                {/* Selected vs Correct option mapping */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 flex flex-col gap-3">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <span className="font-mono text-[9px] font-bold text-slate-500 uppercase">Your Selection</span>
                        <div className={`mt-1 font-medium ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                          {q.options[userAnswerIndex]}
                        </div>
                      </div>
                      {!isCorrect && (
                        <div>
                          <span className="font-mono text-[9px] font-bold text-slate-500 uppercase">Correct Answer</span>
                          <div className="mt-1 font-medium text-emerald-400">
                            {q.options[q.correctOptionIndex]}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 border-t border-slate-800 pt-2 text-slate-300 leading-relaxed font-sans text-xs">
                      <div className="flex items-start space-x-1.5 text-slate-300">
                        <Info className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
