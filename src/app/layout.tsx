import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScopeAI — Enterprise Project Scoping & Proposal Architecture",
  description:
    "Transform product concepts into executive technical blueprints, MVP vs Phase 2 module breakdowns, verified technology stacks, team sizing, and probabilistic cost models in seconds.",
  openGraph: {
    title: "ScopeAI — Automated Software Architecture & Proposal Engine",
    description: "Generate structured, board-ready technical proposals, roadmaps, and investment estimates in seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "solutions@scopeai.io";
  const company = process.env.NEXT_PUBLIC_COMPANY_NAME || "ScopeAI Enterprise Systems";

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        {/* Top Announcement / Compliance Banner */}
        <div className="no-print border-b border-brand-900/10 bg-slate-900 px-4 py-1.5 text-center text-xs font-medium text-slate-300">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ScopeAI 2.4 Enterprise Architecture Engine &bull; Instant Software Scoping &amp; Estimation</span>
          </span>
        </div>

        {/* Corporate Header */}
        <header className="no-print sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
          <div className="container-page flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="group flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-navy-900 text-white shadow-md shadow-brand-500/20">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-bold tracking-tight text-slate-900">Scope<span className="text-brand-600">AI</span></span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 uppercase tracking-wider border border-slate-200">Suite</span>
                  </div>
                </div>
              </Link>

              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <Link href="/" className="transition hover:text-brand-600">Scoping Studio</Link>
                <a href="#capabilities" className="transition hover:text-brand-600">Capabilities</a>
                <a href="#methodology" className="transition hover:text-brand-600">Methodology</a>
                <Link href="/admin" className="transition hover:text-brand-600 flex items-center gap-1">
                  <span>Sales Pipeline</span>
                  <span className="rounded-full bg-brand-50 text-brand-700 text-[10px] px-2 py-0.5 font-bold border border-brand-200/60">CRM</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/admin" className="hidden sm:inline-flex text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100 transition">
                Staff Portal
              </Link>
              <Link href="/" className="btn-primary text-xs !py-2 !px-3.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>New Scope</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Corporate Footer */}
        <footer className="no-print border-t border-slate-200 bg-white pt-12 pb-8 text-sm text-slate-600">
          <div className="container-page">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600 text-white font-bold text-xs">
                    S
                  </div>
                  <span className="font-bold text-slate-900 text-base">ScopeAI</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enterprise-grade project scoping, automated technical architecture modeling, and probabilistic cost engineering for modern software organizations.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Active Zero-Config Ready
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Platform Capabilities</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>Automated Scope Decomposition</li>
                  <li>Multi-Stack Technology Trade-offs</li>
                  <li>Offshore &amp; Nearshore Team Sizing</li>
                  <li>Deliverable Roadmap Schedules</li>
                  <li>Formal PDF Dossier Generation</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Enterprise Standards</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>Strict Zod Schema Sanitization</li>
                  <li>Data Protection &amp; Confidentiality</li>
                  <li>Production Architecture Blueprints</li>
                  <li>Independent Risk Mitigation Plans</li>
                  <li>Dedicated Solution Architect Reviews</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Corporate Contact</h4>
                <p className="text-xs text-slate-500 mb-2">
                  Need a custom enterprise SLA or on-premise scoping deployment?
                </p>
                <a href={`mailto:${email}`} className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline block mb-3">
                  {email}
                </a>
                <span className="inline-block rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500">
                  {company}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <p>&copy; {new Date().getFullYear()} {company}. All rights reserved.</p>
              <p>Estimates and architecture models are advisory projections based on market benchmarks.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
