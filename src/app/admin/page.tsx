import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { proposals } from "@/lib/db";
import LogoutButton from "@/components/LogoutButton";
import AdminLeadsTable, { type SerializedLead } from "@/components/AdminLeadsTable";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Leads | ScopeAI", robots: { index: false } };

export default async function AdminPage() {
  if (!isAdmin()) redirect("/admin/login");

  const col = await proposals();
  const rawLeads = await col.find({ lead: { $exists: true } }).sort({ "lead.createdAt": -1 }).limit(500).toArray();
  const totalProposals = await col.countDocuments();

  const count = (s: string) => rawLeads.filter((l) => l.status === s).length;
  const stats = [
    { label: "Total Scopes Modeled", value: totalProposals, detail: "All generated blueprints", color: "text-slate-900" },
    { label: "Active Inquiries", value: rawLeads.length, detail: "Client consultation leads", color: "text-brand-600" },
    { label: "New Leads", value: count("New"), detail: "Pending triage", color: "text-blue-600" },
    { label: "In Review / Contacted", value: count("Contacted"), detail: "Scoping calls scheduled", color: "text-amber-600" },
    { label: "Won / Contracted", value: count("Won"), detail: "Closed contracts", color: "text-emerald-600" },
  ];

  // Serialize leads for interactive Client Component
  const initialLeads: SerializedLead[] = rawLeads.map((l) => ({
    id: l._id.toString(),
    createdAt: l.createdAt.toISOString(),
    status: l.status,
    lead: {
      name: l.lead!.name,
      email: l.lead!.email,
      company: l.lead!.company,
      phone: l.lead!.phone,
      message: l.lead!.message,
      createdAt: l.lead!.createdAt.toISOString(),
    },
    proposal: {
      projectName: l.proposal.projectName,
      costMin: l.proposal.cost.min,
      costMax: l.proposal.cost.max,
      currency: l.proposal.cost.currency,
    },
    idea: l.input.idea,
  }));

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

      {/* Leads Interactive Table (with Search, Status Filter & CSV Export) */}
      <AdminLeadsTable initialLeads={initialLeads} />
    </div>
  );
}
