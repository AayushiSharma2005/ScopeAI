import IdeaForm from "@/components/IdeaForm";
import { aiProvider } from "@/lib/ai";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const provider = aiProvider();
  const isDemo = provider === "demo";

  return (
    <div className="relative overflow-hidden">
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="container-page pt-10 pb-12 sm:pt-14 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-sm mb-6">
          <span className="flex h-2 w-2 rounded-full bg-brand-600"></span>
          <span>Next-Generation Solutions Architecture &bull; Enterprise Scoping Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Turn Product Visions into <span className="bg-gradient-to-r from-brand-600 via-brand-700 to-navy-900 bg-clip-text text-transparent">Executive Proposals</span> in Seconds
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
          Automate technical scoping, decompose MVP vs Phase 2 modules, evaluate production tech stacks, and generate formal investment models ready for board review.
        </p>

        {/* Enterprise KPI Metrics Bar */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">$140M+</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Software Scopes Modeled</p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">&lt; 30s</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Automated Generation Time</p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">100%</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Zod Schema Validated</p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">PDF Ready</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Printable Executive Dossiers</p>
          </div>
        </div>
      </section>

      {/* Main Interactive Scoping Terminal Section */}
      <section className="container-page pb-20">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Main Scoping Form Console */}
          <div className="lg:col-span-8">
            <div className="card-enterprise overflow-hidden border-slate-200 shadow-float">
              {/* Terminal Window Header */}
              <div className="border-b border-slate-100 bg-slate-50/90 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                  <span className="ml-2 text-xs font-semibold text-slate-700 tracking-wide">
                    ScopeAI Architecture Studio &bull; Specification Input
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {isDemo ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 border border-amber-200/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Intelligent Domain Engine (Zero-Config Active)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 border border-emerald-200/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Live AI Provider ({provider.toUpperCase()})
                    </span>
                  )}
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 sm:p-8">
                <IdeaForm />
              </div>
            </div>

            {/* Zero-Config Note */}
            {isDemo && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-white/80 p-4 text-xs text-slate-600 flex items-start gap-3 shadow-sm">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-100 text-brand-700 font-bold text-[10px]">
                  i
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-slate-800">
                    Running in Zero-Config Architecture Engine Mode
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    Proposals, timelines, tech stacks, and budgets are dynamically engineered using built-in software architecture templates. No MongoDB or Anthropic API setup is required to test the entire client experience.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Executive Deliverables & Standards */}
          <aside className="lg:col-span-4 space-y-6">
            {/* What the Proposal Dossier Includes */}
            <div className="card-enterprise p-6">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <svg className="h-5 w-5 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Executive Dossier Contents</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">Every generated proposal contains 8 formal engineering deliverables:</p>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-brand-600 mt-0.5">01</span>
                  <div>
                    <p className="font-semibold text-slate-800">Executive Summary &amp; Objectives</p>
                    <p className="text-slate-500 text-[11px]">Strategic alignment and business outcomes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-brand-600 mt-0.5">02</span>
                  <div>
                    <p className="font-semibold text-slate-800">MVP vs Phase 2 Module Scoping</p>
                    <p className="text-slate-500 text-[11px]">Strict prioritization to prevent scope creep.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-brand-600 mt-0.5">03</span>
                  <div>
                    <p className="font-semibold text-slate-800">Verified Technology Architecture</p>
                    <p className="text-slate-500 text-[11px]">Web, Mobile, Cloud &amp; DB layers with rationales.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-brand-600 mt-0.5">04</span>
                  <div>
                    <p className="font-semibold text-slate-800">Team Composition &amp; FTE Allocation</p>
                    <p className="text-slate-500 text-[11px]">PM, UI/UX, Engineers, QA role breakdown.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-brand-600 mt-0.5">05</span>
                  <div>
                    <p className="font-semibold text-slate-800">Delivery Roadmap &amp; Durations</p>
                    <p className="text-slate-500 text-[11px]">Phased timeline with milestone deliverables.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-brand-600 mt-0.5">06</span>
                  <div>
                    <p className="font-semibold text-slate-800">Investment Bounds &amp; Risk Matrix</p>
                    <p className="text-slate-500 text-[11px]">USD estimate ranges, assumptions, mitigations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Pipeline CTA Card */}
            <div className="rounded-xl border border-brand-200 bg-gradient-to-br from-brand-900 to-slate-900 p-6 text-white shadow-card">
              <div className="flex items-center justify-between mb-3">
                <span className="rounded-full bg-brand-500/20 text-brand-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-brand-500/30">
                  Internal Tooling
                </span>
                <span className="text-xs text-slate-300">Sales Ops</span>
              </div>
              <h4 className="text-base font-bold mb-1">Lead Management Portal</h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Track incoming scoping inquiries, update deal stages (New, Contacted, Won, Lost), and review client proposals in one central CRM.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
              >
                <span>Launch Admin Pipeline</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="border-t border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Enterprise Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Engineered for Enterprise Product Teams &amp; Digital Agencies
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Eliminate manual scoping overhead. ScopeAI converts qualitative user briefs into hardened architectural blueprints with deterministic financial bands.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="card-enterprise p-6 hover:shadow-card-hover transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold mb-4">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">MVP Scope Decomposition</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically segregates core baseline capabilities from secondary Phase 2 enhancements, giving executives a clear budget floor to validate their venture.
              </p>
            </div>

            <div className="card-enterprise p-6 hover:shadow-card-hover transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 font-bold mb-4">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Predictive Cost Bounds</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Utilizes real-world offshore and nearshore engineering blended rates to calculate minimum and maximum investment bounds based on required role-weeks.
              </p>
            </div>

            <div className="card-enterprise p-6 hover:shadow-card-hover transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 font-bold mb-4">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Technical Risk Mitigation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Highlights architectural bottlenecks, third-party dependency hazards, and regulatory friction upfront before writing a single line of code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="border-t border-slate-200/80 bg-slate-50 py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Standard Operating Protocol</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              From Concept to Kickoff in 4 Structured Steps
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card-enterprise p-5 relative">
              <span className="text-3xl font-extrabold text-slate-200">01</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">Describe Requirements</h4>
              <p className="text-xs text-slate-500">Provide product vision, preferred platform, timeline targets and budget parameters.</p>
            </div>

            <div className="card-enterprise p-5 relative">
              <span className="text-3xl font-extrabold text-slate-200">02</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">Architecture Synthesis</h4>
              <p className="text-xs text-slate-500">Zod-validated AI engine synthesizes full-stack engineering layers and squad composition.</p>
            </div>

            <div className="card-enterprise p-5 relative">
              <span className="text-3xl font-extrabold text-slate-200">03</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">Review &amp; Export</h4>
              <p className="text-xs text-slate-500">Inspect interactive tables, download clean executive PDF dossier, or share proposal link.</p>
            </div>

            <div className="card-enterprise p-5 relative">
              <span className="text-3xl font-extrabold text-slate-200">04</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">Solutions Consultation</h4>
              <p className="text-xs text-slate-500">Request formal engagement to refine backlog and sign off on fixed-fee statement of work.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
