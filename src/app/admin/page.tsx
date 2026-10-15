import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { proposals } from "@/lib/db";
import { formatDate, formatMoney } from "@/lib/format";
import StatusSelect from "@/components/StatusSelect";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Leads | ScopeAI", robots: { index: false } };

export default async function AdminPage() {
  if (!isAdmin()) redirect("/admin/login");

  const col = await proposals();
  const leads = await col.find({ lead: { $exists: true } }).sort({ "lead.createdAt": -1 }).limit(500).toArray();
  const totalProposals = await col.countDocuments();

  const count = (s: string) => leads.filter((l) => l.status === s).length;
  const stats = [
    { label: "Total Scopes Modeled", value: totalProposals, detail: "All generated blueprints", color: "text-slate-900" },
    { label: "Active Inquiries", value: leads.length, detail: "Client consultation leads", color: "text-brand-600" },
    { label: "New Leads", value: count("New"), detail: "Pending triage", color: "text-blue-600" },
    { label: "In Review / Contacted", value: count("Contacted"), detail: "Scoping calls scheduled", color: "text-amber-600" },
    { label: "Won / Contracted", value: count("Won"), detail: "Closed contracts", color: "text-emerald-600" },
  ];

  return (
    <div className="container-page py-8 sm:py-12">
      {/* Top Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Sales Pipeline &amp; CRM</h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
              Live Telemetry
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Monitor incoming client scoping requests, manage deal stages, and conduct architectural triage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" className="btn-secondary !text-xs !py-2 !px-3">
            <span>&larr; Studio</span>
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="card-enterprise p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{s.label}</p>
            <p className={`mt-1 text-2xl sm:text-3xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{s.detail}</p>
          </div>
        ))}
      </div>

      {/* Leads Table Container */}
      <div className="card-enterprise overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Consultation Inquiries ({leads.length})</h2>
            <p className="text-xs text-slate-500">Sorted by most recent submission date</p>
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-800">No Consultation Inquiries Recorded</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Inquiries appear here automatically when a visitor models a proposal in the Scoping Studio and fills out the consultation form.
            </p>
            <div className="mt-4">
              <Link href="/" className="btn-primary !text-xs !py-2 !px-4">
                Generate a Sample Proposal
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-base min-w-[900px]">
              <thead>
                <tr>
                  <th className="w-28">Date</th>
                  <th className="w-64">Contact Executive</th>
                  <th>Scoped Venture</th>
                  <th className="w-36">Investment Band</th>
                  <th className="w-36">Pipeline Stage</th>
                  <th className="w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => {
                  const id = l._id.toString();
                  const initials = l.lead!.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={id} className="hover:bg-slate-50/60 transition">
                      <td className="whitespace-nowrap text-xs text-slate-500 font-medium">
                        {formatDate(l.lead!.createdAt)}
                      </td>
                      <td>
                        <div className="flex items-start gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                            {initials}
                          </div>
                          <div className="space-y-0.5 text-xs">
                            <p className="font-bold text-slate-900">{l.lead!.name}</p>
                            <a className="text-brand-600 hover:underline block" href={`mailto:${l.lead!.email}`}>
                              {l.lead!.email}
                            </a>
                            {l.lead!.company && (
                              <p className="text-slate-500 font-medium">&bull; {l.lead!.company}</p>
                            )}
                            {l.lead!.phone && (
                              <p className="text-slate-400 font-mono text-[11px]">{l.lead!.phone}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="max-w-xs">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 text-xs">{l.proposal.projectName}</p>
                          <p className="line-clamp-2 text-xs text-slate-500 leading-relaxed">
                            {l.input.idea}
                          </p>
                          {l.lead!.message && (
                            <div className="mt-1 rounded bg-slate-100/80 p-2 text-[11px] text-slate-700 border border-slate-200/60">
                              <span className="font-semibold text-slate-800">Note:</span> {l.lead!.message}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        <span className="inline-block font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                          {formatMoney(l.proposal.cost.min)} &ndash; {formatMoney(l.proposal.cost.max)}
                        </span>
                      </td>
                      <td>
                        <StatusSelect id={id} initial={l.status} />
                      </td>
                      <td className="text-center">
                        <Link
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800 hover:underline"
                          href={`/proposal/${id}`}
                          target="_blank"
                        >
                          <span>Dossier</span>
                          <span className="text-[10px]">&nearr;</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
