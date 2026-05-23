import { useEffect, useState } from "react";
import { GitHubRepository, AssessmentResult, SkillTier } from "../types";
import { 
  GitFork, 
  Star, 
  ExternalLink, 
  MessageSquare, 
  BookOpen, 
  CornerDownRight, 
  Compass, 
  AlertTriangle, 
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  FileCode,
  CheckCircle2
} from "lucide-react";

interface RepositorySuggestionProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export default function RepositorySuggestion({ result, onRestart }: RepositorySuggestionProps) {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Guide Steps definition for making first PR
  const contributionSteps = [
    { title: "Fork the Repository", desc: "Click 'Fork' on GitHub to create a copied sandbox instance inside your own user namespace." },
    { title: "Clone and Branch", desc: `git clone your URL. Create a feature branch: git checkout -b fix/issue-name` },
    { title: "Write & Verify Code", desc: "Follow package instructions, check compiler errors, and compose targeted unit tests to verify stability." },
    { title: "Push & Pull Request", desc: "Push to your fork, open the pull request back to original master, and request maintainer feedback!" }
  ];

  useEffect(() => {
    async function fetchMatchedIssues() {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const response = await fetch("/api/github-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            techStack: result.domain, 
            difficulty: result.tier 
          })
        });

        if (!response.ok) {
          throw new Error("Failed to receive matched recommendations from backend gateway.");
        }

        const data: GitHubRepository[] = await response.json();
        setRepositories(data);
      } catch (err: any) {
        console.error("Error fetching repository matches:", err);
        setErrorMsg("Could not query live GitHub records. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMatchedIssues();
  }, [result.domain, result.tier]);

  const getTierHeading = (tier: SkillTier) => {
    switch (tier) {
      case "easy": return "First Contributions & Documentation";
      case "medium": return "Functional Features & Logics Fixes";
      case "hard": return "High Priority Enhancements & Structural Debugging";
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10" id="repo-suggestions-dashboard">
      
      {/* Search status bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6" id="repo-status-header">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center rounded-full bg-indigo-950/40 px-2.5 py-0.5 font-sans text-xs font-semibold text-indigo-400 border border-indigo-900/40">
              Tech Stack: {result.domain}
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-950/40 px-2.5 py-0.5 font-sans text-xs font-semibold text-emerald-400 border border-emerald-900/40">
              Assessed Level: {result.tier.toUpperCase()}
            </span>
          </div>
          <h2 className="font-sans text-xl font-extrabold tracking-tight text-slate-100 md:text-2xl mt-1.5">
            Suggested Projects: {getTierHeading(result.tier)}
          </h2>
        </div>

        <button
          onClick={onRestart}
          className="flex items-center justify-center space-x-1.5 rounded-xl border border-slate-800 bg-[#131B2E] px-4 py-2 text-xs font-bold text-slate-300 shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Select Different Language</span>
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3" id="main-suggestions-grid">
        
        {/* Left 2 Cols: Repository Cards list */}
        <div className="lg:col-span-2 space-y-6" id="matched-repositories-column">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-[#131B2E] rounded-2xl border border-slate-800 shadow-2xl shadow-black/30" id="repo-loading-screen">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-indigo-500" />
              <p className="mt-4 font-sans text-xs font-bold text-slate-200">
                Finding dynamic repositories...
              </p>
              <p className="mt-1 text-[10px] text-slate-500 font-mono">
                Matching labels & indexing open GitHub issues
              </p>
            </div>
          ) : errorMsg ? (
            <div className="rounded-2xl border border-rose-950 bg-[#1E1120] p-6 text-center" id="repo-error-screen">
              <AlertTriangle className="mx-auto h-8 w-8 text-rose-500" />
              <h4 className="font-sans text-sm font-bold text-slate-100 mt-2">Could not retrieve repositories</h4>
              <p className="text-xs text-rose-400 mt-1">{errorMsg}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700"
              >
                Retry Request
              </button>
            </div>
          ) : repositories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-[#131B2E] border border-slate-800 border-dashed rounded-2xl" id="repo-empty-screen">
              <Compass className="h-10 w-10 text-slate-600" />
              <p className="mt-3 text-sm text-slate-400">No active repositories matched this query.</p>
            </div>
          ) : (
            <div className="space-y-6" id="repositories-list">
              {repositories.map((repo) => (
                <article 
                  key={repo.id}
                  style={{ contentVisibility: "auto" }}
                  className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#131B2E] shadow-sm hover:border-slate-705 hover:border-slate-755 hover:border-slate-700 transition-all"
                >
                  {/* Repo Header */}
                  <div className="border-b border-b-slate-800 p-5 md:p-6 bg-slate-950/45">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={repo.ownerAvatarUrl} 
                          alt={repo.ownerName}
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 rounded-xl border border-slate-850 border-slate-800 shadow-sm"
                        />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-sans text-xs text-slate-400 font-semibold">{repo.ownerName}</span>
                            <span className="text-slate-600">/</span>
                          </div>
                          <h3 className="font-sans text-base font-bold text-slate-100 flex items-center">
                            <a 
                              href={repo.url} 
                              target="_blank" 
                              referrerPolicy="no-referrer"
                              className="hover:text-indigo-400 hover:underline flex items-center"
                            >
                              {repo.name}
                              <ExternalLink className="ml-1 h-3.5 w-3.5 text-slate-600 shrink-0" />
                            </a>
                          </h3>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-3 font-mono text-xs text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          <span>{repo.starsCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="h-3.5 w-3.5 text-blue-400" />
                          <span>{repo.forksCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 font-sans text-xs leading-relaxed text-slate-400">
                      {repo.description}
                    </p>

                    <div className="mt-4 inline-flex rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300 font-semibold uppercase border border-slate-700/50">
                      LANG: {repo.language}
                    </div>
                  </div>

                  {/* Repo Issues matching */}
                  <div className="p-5 md:p-6 space-y-4">
                    <h4 className="font-sans text-xs font-black tracking-wider text-slate-500 uppercase">
                      Open matched issues:
                    </h4>

                    <div className="divide-y divide-slate-800/80" id="issues-list">
                      {repo.issues.map((issue) => (
                        <div key={issue.id} className="py-4.5 first:pt-0 last:pb-0 group/issue flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                              <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                              <span className="font-mono text-[9px] text-slate-500">
                                {new Date(issue.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <h5 className="font-sans text-xs font-bold leading-relaxed text-slate-200 group-hover/issue:text-indigo-400">
                              <a 
                                href={issue.url} 
                                target="_blank" 
                                referrerPolicy="no-referrer"
                                className="hover:underline flex items-start gap-1"
                              >
                                {issue.title}
                              </a>
                            </h5>

                            {/* Labels inside issue */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {issue.labels.slice(0, 3).map((l, id) => (
                                <span key={id} className="rounded bg-indigo-950/50 border border-indigo-900/30 px-1.5 py-0.5 font-mono text-[9px] font-medium text-indigo-300">
                                  {l}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 shrink-0 self-center">
                            {issue.commentsCount > 0 && (
                              <div className="flex items-center space-x-1 font-mono text-[10px] text-slate-500">
                                <MessageSquare className="h-3 w-3" />
                                <span>{issue.commentsCount}</span>
                              </div>
                            )}

                            <a 
                              href={issue.url} 
                              target="_blank" 
                              referrerPolicy="no-referrer"
                              className="flex items-center justify-center h-8 w-8 rounded-lg bg-indigo-950/50 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer border border-indigo-900/25"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Contributor Guidelines Widget */}
        <aside className="space-y-6" id="contributor-guide-column">
          
          {/* PR Pipeline Helper Card */}
          <div className="rounded-2xl border border-slate-800 bg-[#131B2E] p-5 shadow-xl shadow-black/20" id="guide-steps-card">
            <h3 className="font-sans text-sm font-bold text-slate-200 flex items-center pb-4 border-b border-slate-800">
              <BookOpen className="h-4.5 w-4.5 text-indigo-400 mr-2" />
              Pipeline: Your First Pull Request
            </h3>

            <div className="mt-5 space-y-5" id="pipeline-steps-list">
              {contributionSteps.map((step, idx) => (
                <div key={idx} className="flex space-x-3 shrink-0">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-950 text-[#818CF8] font-mono text-[10px] font-bold text-indigo-400 border border-indigo-900/40">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans text-xs font-bold text-slate-200">
                      {step.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 rounded-xl bg-slate-950/65 border border-slate-800 p-3.5 text-center text-[10px] text-slate-400">
              <span className="font-mono font-semibold uppercase text-indigo-400">Pro Contributor Guideline</span>
              <p className="leading-relaxed mt-1">Always read the repository's CONTRIBUTING.md file before submitting changes to match styles!</p>
            </div>
          </div>

          {/* Secure Routing notice */}
          <div className="rounded-2xl border border-dashed border-slate-800 p-5 bg-slate-900/30 text-xs" id="api-status-card">
            <div className="flex items-start space-x-2 text-slate-400 leading-relaxed">
              <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-200">Service API Proxy Active</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Queries are routed through a fully secure, server-side Express backend mapping system logic. Your credentials and secrets stay hidden during transmission.
                </p>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
