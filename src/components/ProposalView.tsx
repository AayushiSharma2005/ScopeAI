import type { Proposal } from "@/lib/schema";
import { formatDate, formatMoney } from "@/lib/format";

export default function ProposalView({ proposal: p, id, createdAt }: { proposal: Proposal; id: string; createdAt: Date }) {
  const mvp = p.modules.filter((m) => m.priority === "MVP");
  const later = p.modules.filter((m) => m.priority !== "MVP");
  const totalFte = p.team.reduce((acc, t) => acc + t.count, 0);

  return (
    <article className="space-y-10">
      {/* Dossier Executive Header */}
      <header className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5 text-xs">
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              SCP-{id.slice(-8).toUpperCase()}
            </span>
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-semibold text-brand-700 border border-brand-200/60">
              Architectural Dossier
            </span>
            <span className="text-slate-400">&bull;</span>
            <span className="font-medium text-slate-500">Generated {formatDate(createdAt)}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-[11px] uppercase font-bold tracking-wider">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Executive Ready &bull; Confidential
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {p.projectName}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Comprehensive solutions architecture blueprint, MVP feature decomposition, technology trade-offs, and estimated delivery economics.
        </p>

        {/* 4 Executive KPI Cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Estimated Investment</p>
            <p className="mt-1 text-xl sm:text-2xl font-black text-slate-900">
              {formatMoney(p.cost.min, p.cost.currency)}
            </p>
            <p className="text-[11px] font-medium text-slate-500">to {formatMoney(p.cost.max, p.cost.currency)}</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">MVP Velocity</p>
            <p className="mt-1 text-xl sm:text-2xl font-black text-brand-600">
              {p.totalDurationWeeks} Weeks
            </p>
            <p className="text-[11px] font-medium text-slate-500">Target Launch Window</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Squad Sizing</p>
            <p className="mt-1 text-xl sm:text-2xl font-black text-slate-900">
              {totalFte} Engineers
            </p>
            <p className="text-[11px] font-medium text-slate-500">Dedicated FTE Resources</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Architecture Modules</p>
            <p className="mt-1 text-xl sm:text-2xl font-black text-slate-900">
              {p.modules.length} Total
            </p>
            <p className="text-[11px] font-medium text-emerald-700">
              {mvp.length} MVP &bull; {later.length} Phase 2
            </p>
          </div>
        </div>
      </header>

      {/* 1. Executive Summary & Strategic Objectives */}
      <section className="card-enterprise p-6 sm:p-8 print-break">
        <h2 className="section-title">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">1</span>
          Executive Summary &amp; Strategic Objectives
        </h2>

        <div className="rounded-xl border-l-4 border-brand-600 bg-brand-50/40 p-4 sm:p-5 text-sm sm:text-base text-slate-700 leading-relaxed">
          {p.summary}
        </div>

        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Primary Engagement Objectives</h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {p.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-200/80 bg-slate-50/60 p-3.5 text-xs text-slate-800">
                <svg className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="leading-relaxed font-medium">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Scope & Functional Modules */}
      <section className="card-enterprise p-6 sm:p-8 print-break">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="section-title !mb-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">2</span>
            Functional Scope &amp; Modular Breakdown
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="badge-mvp">MVP: {mvp.length} Modules</span>
            <span className="badge-phase2">Phase 2: {later.length} Modules</span>
          </div>
        </div>

        <div className="space-y-6">
          {[{ title: "Phase 1 &bull; Minimum Viable Product (MVP)", items: mvp, isMvp: true }, { title: "Phase 2 &bull; Enterprise Scalability &amp; Automation", items: later, isMvp: false }].map(
            (group) =>
              group.items.length > 0 && (
                <div key={group.title} className="overflow-hidden rounded-xl border border-slate-200">
                  <div className={`px-4 py-3 text-xs font-bold flex items-center justify-between ${group.isMvp ? "bg-emerald-50/80 text-emerald-900 border-b border-emerald-100" : "bg-blue-50/80 text-blue-900 border-b border-blue-100"}`}>
                    <span dangerouslySetInnerHTML={{ __html: group.title }} />
                    <span className={group.isMvp ? "badge-mvp" : "badge-phase2"}>
                      {group.items.length} Modules
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table-base">
                      <thead>
                        <tr>
                          <th className="w-1/4">Module Name</th>
                          <th className="w-1/3">Architectural Role</th>
                          <th>Core Feature Deliverables</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((m, i) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="font-bold text-slate-900">
                              <div className="flex items-center gap-2">
                                <span>{m.name}</span>
                                <span className={m.priority === "MVP" ? "badge-mvp" : "badge-phase2"}>
                                  {m.priority}
                                </span>
                              </div>
                            </td>
                            <td className="text-xs leading-relaxed text-slate-600">{m.description}</td>
                            <td>
                              <div className="flex flex-wrap gap-1.5">
                                {m.features.map((f, j) => (
                                  <span key={j} className="inline-block rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700 shadow-2xs">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      {/* 3. Recommended Technology Stack Matrix */}
      <section className="card-enterprise p-6 sm:p-8 print-break">
        <h2 className="section-title">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">3</span>
          Recommended Technology Architecture
        </h2>
        <p className="text-xs text-slate-500 mb-4">Production-grade technologies selected for scalability, security, developer velocity, and low operational overhead.</p>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="w-1/4">Architecture Layer</th>
                  <th className="w-1/3">Selected Technologies</th>
                  <th>Architectural Rationale</th>
                </tr>
              </thead>
              <tbody>
                {p.techStack.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="font-bold text-slate-900">{t.layer}</td>
                    <td>
                      <div className="flex flex-wrap gap-1.5">
                        {t.technologies.map((tech, j) => (
                          <span key={j} className="inline-flex items-center rounded-md bg-brand-50 border border-brand-200/80 px-2.5 py-0.5 text-xs font-semibold text-brand-800">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="text-xs leading-relaxed text-slate-600">{t.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Proposed Squad Allocation */}
      <section className="card-enterprise p-6 sm:p-8 print-break">
        <h2 className="section-title">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">4</span>
          Dedicated Engineering Squad
        </h2>
        <p className="text-xs text-slate-500 mb-4">Dedicated cross-functional squad allocated for the duration of the MVP sprint cycles.</p>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="w-1/3">Role &amp; Seniority</th>
                  <th className="w-24 text-center">Allocation</th>
                  <th>Core Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                {p.team.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="font-bold text-slate-900">{t.role}</td>
                    <td className="text-center">
                      <span className="inline-block rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-800">
                        {t.count} FTE
                      </span>
                    </td>
                    <td className="text-xs leading-relaxed text-slate-600">{t.responsibilities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Phased Delivery Roadmap */}
      <section className="card-enterprise p-6 sm:p-8 print-break">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="section-title !mb-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">5</span>
            Phased Delivery Roadmap &amp; Milestones
          </h2>
          <span className="text-xs font-semibold text-slate-600">
            Total MVP Duration: <strong className="text-slate-900">{p.totalDurationWeeks} weeks</strong>
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="w-1/4">Roadmap Phase</th>
                  <th className="w-32">Sprint Duration</th>
                  <th>Milestone Deliverables</th>
                </tr>
              </thead>
              <tbody>
                {p.timeline.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="font-bold text-slate-900">{t.phase}</td>
                    <td>
                      <span className="badge-neutral font-semibold">
                        {t.duration}
                      </span>
                    </td>
                    <td>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {t.deliverables.map((d, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-600 shrink-0"></span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Estimated Investment & Financial Assumptions */}
      <section className="card-enterprise p-6 sm:p-8 print-break">
        <h2 className="section-title">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">6</span>
          Investment Bounds &amp; Commercial Terms
        </h2>

        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Fixed-Fee Target Estimate (MVP)</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              {formatMoney(p.cost.min, p.cost.currency)} &ndash; {formatMoney(p.cost.max, p.cost.currency)}
            </p>
            <p className="text-xs text-slate-500 mt-1">Exclusively quotes MVP engineering &amp; design deliverables.</p>
          </div>

          <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6 text-xs text-slate-500 space-y-1">
            <p>Indexed to blended standard offshore/nearshore rates</p>
            <p>Milestone-based payment releases (30/40/30)</p>
            <p>Full IP assignment upon completion</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Scope Assumptions &amp; Exclusions</h3>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {p.cost.assumptions.map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-bold text-slate-400 mt-0.5">&bull;</span>
                <span className="leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Risk Analysis & Proactive Mitigations */}
      {p.risks.length > 0 && (
        <section className="card-enterprise p-6 sm:p-8 print-break">
          <h2 className="section-title">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">7</span>
            Risk Analysis &amp; Mitigation Framework
          </h2>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th className="w-1/2">Identified Risk Vector</th>
                    <th>Proactive Mitigation Protocol</th>
                  </tr>
                </thead>
                <tbody>
                  {p.risks.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="font-semibold text-slate-900 text-xs leading-relaxed">
                        <div className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">!</span>
                          <span>{r.risk}</span>
                        </div>
                      </td>
                      <td className="text-xs text-slate-700 leading-relaxed">{r.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 8. Protocol Next Steps */}
      <section className="card-enterprise p-6 sm:p-8 print-break">
        <h2 className="section-title">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">8</span>
          Engagement Protocol &amp; Next Steps
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {p.nextSteps.map((step, i) => (
            <div key={i} className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 relative">
              <span className="text-2xl font-black text-brand-600/30 block mb-1">0{i + 1}</span>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
