import { Terminal, Lightbulb, Compass, Award, ExternalLink } from "lucide-react";

interface HeaderProps {
  currentStep: number;
}

export default function Header({ currentStep }: HeaderProps) {
  const steps = [
    { number: 1, label: "Tech Stack", icon: Compass },
    { number: 2, label: "Assessment", icon: Lightbulb },
    { number: 3, label: "Skill Badge", icon: Award },
    { number: 4, label: "Repo Matching", icon: Terminal },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F19]/80 backdrop-blur-md" id="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo and branding */}
        <div className="flex items-center space-x-3" id="app-branding">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-950/40">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-sans font-bold tracking-tight text-slate-100 text-sm sm:text-base">
              GitStart Matcher
            </h1>
            <p className="font-mono text-[10px] text-indigo-400 tracking-wider uppercase font-semibold">
              Open-Source Bridge
            </p>
          </div>
        </div>

        {/* Status Indicators (Anti-Larping: humble, literal human steps, no systems metrics) */}
        <nav className="hidden md:block" id="app-nav-steps">
          <ol className="flex items-center space-x-4">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;

              return (
                <li key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-indigo-950/50 text-indigo-300 font-semibold border border-indigo-800/30"
                        : isCompleted
                        ? "text-emerald-400 font-semibold"
                        : "text-slate-500"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : isCompleted
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800/40"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {step.number}
                    </span>
                    <StepIcon className="h-3.5 w-3.5" />
                    <span>{step.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="mx-2 h-px w-6 bg-slate-800" />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Minimal actions */}
        <div className="flex items-center space-x-3" id="app-top-actions">
          <a
            href="https://github.com/trending"
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-1.5 font-sans text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
          >
            <span>GitHub Trending</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
