import React, { useState } from "react";
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Database,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle
} from "lucide-react";
import { motion } from "motion/react";

interface DomainSelectionProps {
  onSelectDomain: (domain: string) => void;
  isLoading: boolean;
}

interface CuratedDomain {
  id: string;
  name: string;
  tagline: string;
  icon: any;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  popularity: string;
}

export default function DomainSelection({ onSelectDomain, isLoading }: DomainSelectionProps) {
  const [customDomain, setCustomDomain] = useState("");
  const [selectedCuratedId, setSelectedCuratedId] = useState<string | null>(null);

  const curatedDomains: CuratedDomain[] = [
    {
      id: "react",
      name: "React & Web Frontend",
      tagline: "Component states, hooks, routing, dynamic UI rendering, and bundle optimization.",
      icon: Code2,
      color: "bg-teal-500",
      bgColor: "bg-teal-950/40",
      textColor: "text-teal-400 border border-teal-850/20",
      borderColor: "border-teal-900/30",
      popularity: "Highly Active"
    },
    {
      id: "python",
      name: "Python Foundations",
      tagline: "Standard algorithms, PEP-8 formatting, decorators, requests pipelines & asynchronous scopes.",
      icon: Terminal,
      color: "bg-amber-500",
      bgColor: "bg-amber-950/40",
      textColor: "text-amber-400 border border-amber-855/20",
      borderColor: "border-amber-900/30",
      popularity: "Primary Language"
    },
    {
      id: "machine_learning",
      name: "Machine Learning & AI",
      tagline: "Tensor analytics, model evaluation metrics, sklearn matrices, and PyTorch tensors.",
      icon: Cpu,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-950/40",
      textColor: "text-indigo-400 border border-indigo-855/20",
      borderColor: "border-indigo-900/30",
      popularity: "Hot Field"
    },
    {
      id: "go",
      name: "Go (Golang) Systems",
      tagline: "Goroutines structure, channels synchronization, interface composition, and standard packages.",
      icon: Database,
      color: "bg-sky-500",
      bgColor: "bg-sky-950/40",
      textColor: "text-sky-400 border border-sky-855/20",
      borderColor: "border-sky-900/30",
      popularity: "Cloud Native"
    },
    {
      id: "node",
      name: "Node.js Backend",
      tagline: "Express middlewares, event stream pipelines, filesystem operations, and HTTP client responses.",
      icon: Layers,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-950/40",
      textColor: "text-emerald-400 border border-emerald-855/20",
      borderColor: "border-emerald-900/30",
      popularity: "High Demand"
    },
    {
      id: "rust",
      name: "Rust System Programming",
      tagline: "Borrow checker rules, memory safety guidelines, lifetimes, Cargo modules, and safe concurrency.",
      icon: Sparkles,
      color: "bg-orange-500",
      bgColor: "bg-orange-950/40",
      textColor: "text-orange-400 border border-orange-855/20",
      borderColor: "border-orange-900/30",
      popularity: "High Performance"
    }
  ];

  const handleCuratedClick = (domain: CuratedDomain) => {
    setSelectedCuratedId(domain.id);
    setCustomDomain("");
    onSelectDomain(domain.name);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customDomain.trim()) {
      setSelectedCuratedId(null);
      onSelectDomain(customDomain.trim());
    }
  };

  return (
    <div className="space-y-8" id="domain-selection-container">
      {/* Intro Hero Message */}
      <div className="text-center" id="domains-intro-banner">
        <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-100 md:text-4xl">
          Where would you like to contribute?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-400">
          GitStart tests your core technical mechanics under our custom educational quiz, then immediately matches your level with live open issues on GitHub.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2" id="curated-domains-grid">
        {curatedDomains.map((domain, idx) => {
          const Icon = domain.icon;
          const isSelected = selectedCuratedId === domain.id;

          return (
            <motion.button
              key={domain.id}
              onClick={() => handleCuratedClick(domain)}
              disabled={isLoading}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`group relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 hover:shadow-lg disabled:opacity-60 cursor-pointer ${
                isSelected
                  ? "border-indigo-500 bg-indigo-950/20 ring-2 ring-indigo-500/20 shadow-md shadow-black/40"
                  : "border-slate-800 bg-[#131B2E] shadow-sm hover:border-slate-700"
              }`}
              style={{ contentVisibility: "auto" }}
              id={`curated-domain-${domain.id}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${domain.bgColor} ${domain.textColor} transition-transform group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    {domain.popularity}
                  </span>
                </div>
                <h3 className="mt-4 font-sans text-base font-bold text-slate-100">
                  {domain.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {domain.tagline}
                </p>
              </div>

              <div className="mt-5 flex items-center text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Start Quiz Challenge</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Custom Technology Input Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="rounded-2xl border border-dashed border-slate-800 bg-[#131B2E]/40 p-6 md:p-8"
        id="custom-technology-panel"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="font-sans text-base font-bold text-slate-100 flex items-center">
              <Sparkles className="h-4 w-4 text-indigo-400 mr-2" />
              Exploring a different tech stack?
            </h3>
            <p className="text-xs text-slate-400 max-w-lg">
              Enter any framework, tool, or programming language (e.g. Svelte, Flutter, Kotlin, C++, SQL). Gemini will dynamically generate a calibrated quiz on the spot!
            </p>
          </div>

          <form onSubmit={handleCustomSubmit} className="flex-1 max-w-md w-full flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="e.g. Docker, TypeScript, Django..."
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-medium text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-950/45"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !customDomain.trim()}
              className="flex items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 cursor-pointer border-0"
            >
              <span>Challenge</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </motion.div>

      {/* Important instructions panel */}
      <div className="flex items-start space-x-3 rounded-xl bg-indigo-950/20 p-4 border border-indigo-900/40" id="quiz-notice-panel">
        <HelpCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-200 font-sans leading-relaxed">
          <p className="font-semibold text-indigo-300">How the assessment operates:</p>
          <ul className="list-disc leading-relaxed pl-4 mt-1 space-y-1 text-slate-400">
            <li>Serving 5 questions mapping tech principles and developer guidelines.</li>
            <li>No hard deadlines, each question has an extensive feedback summary card generated afterwards to optimize your knowledge.</li>
            <li>Once completed, you will receive a community rating and direct access to live matched GitHub repository issues instantly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
