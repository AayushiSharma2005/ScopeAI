"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BUDGETS, PLATFORMS, TIMELINES } from "@/lib/schema";
import { EXAMPLES } from "@/lib/examples";

const LOADING_STAGES = [
  "Analyzing product brief & functional requirements...",
  "Decomposing architecture into MVP & Phase 2 modules...",
  "Optimizing technology stack & infrastructure layers...",
  "Synthesizing engineering squad sizing & sprint timelines...",
  "Computing probabilistic cost models & risk matrices...",
  "Finalizing executive proposal dossier...",
];

export default function IdeaForm() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [platform, setPlatform] = useState<string>("Web + Mobile");
  const [budget, setBudget] = useState<string>("$25k - $50k");
  const [timeline, setTimeline] = useState<string>("2 - 4 months");
  const [web3, setWeb3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) {
      setStageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev < LOADING_STAGES.length - 1 ? prev + 1 : prev));
    }, 2800);
    return () => clearInterval(interval);
  }, [loading]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, platform, budget, timeline, web3 }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Scope generation failed.");
      router.push(`/proposal/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while modeling the scope.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" aria-busy={loading}>
      {/* Product Specification Box */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="idea" className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700">1</span>
            Product Concept &amp; Architectural Scope
          </label>
          <span className="text-[11px] text-slate-400">
            {idea.length}/2000 characters
          </span>
        </div>

        <textarea
          id="idea"
          required
          minLength={20}
          maxLength={2000}
          rows={5}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your target platform, user workflows, integrations, and core business problem (e.g. A multi-tenant clinical telemetry and patient portal with real-time vitals monitoring and automated billing)."
          className="input font-sans text-sm leading-relaxed"
        />

        {/* Industry Architecture Presets */}
        <div className="mt-3">
          <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>Or load an enterprise benchmark:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => {
                  setIdea(ex.idea);
                  setPlatform(ex.platform);
                  setWeb3(/blockchain/i.test(ex.label));
                }}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-slate-50/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700"
              >
                <span>{ex.label}</span>
                <span className="text-[10px] text-slate-400 group-hover:text-brand-500">&rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Target Engineering Parameters */}
      <div className="border-t border-slate-100 pt-5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-4">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700">2</span>
          Deployment Strategy &amp; Bounds
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Target Platform */}
          <div className="space-y-1.5">
            <label htmlFor="platform" className="text-xs font-semibold text-slate-600">
              Target Architecture
            </label>
            <div className="relative">
              <select
                id="platform"
                className="input pr-8 cursor-pointer"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-1.5">
            <label htmlFor="budget" className="text-xs font-semibold text-slate-600">
              Capital Expenditure Model
            </label>
            <div className="relative">
              <select
                id="budget"
                className="input pr-8 cursor-pointer"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="space-y-1.5">
            <label htmlFor="timeline" className="text-xs font-semibold text-slate-600">
              Target MVP Delivery Horizon
            </label>
            <div className="relative">
              <select
                id="timeline"
                className="input pr-8 cursor-pointer"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              >
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Web3 Specification */}
      <div className="rounded-lg border border-slate-200/90 bg-slate-50/60 p-3.5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={web3}
            onChange={(e) => setWeb3(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Enable Distributed Ledger / Web3 Specification
            </span>
            <span className="text-xs text-slate-500 leading-normal">
              Incorporate smart contract architecture (Solidity/EVM), cryptographic tokenomics, non-custodial wallet sign-in, and audit deliverables.
            </span>
          </div>
        </label>
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800 flex items-center gap-2">
          <svg className="h-4 w-4 shrink-0 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Loading Progress State */}
      {loading && (
        <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-900">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-600 animate-ping"></span>
              {LOADING_STAGES[stageIndex]}
            </span>
            <span className="text-brand-600 font-mono">
              {Math.min(100, Math.round(((stageIndex + 1) / LOADING_STAGES.length) * 100))}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, Math.round(((stageIndex + 1) / LOADING_STAGES.length) * 100))}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 text-center">
            Standard AI &amp; template synthesis takes approximately 10&ndash;20 seconds.
          </p>
        </div>
      )}

      {/* Submission CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={loading || idea.trim().length < 20}
          className="btn-primary w-full sm:w-auto px-6 py-3 text-sm shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Synthesizing Architecture...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>Generate Project Dossier &amp; Proposal</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Verified Zod Schema
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Instant PDF Ready
          </span>
        </div>
      </div>
    </form>
  );
}
