import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { proposals, toObjectId } from "@/lib/db";
import ProposalView from "@/components/ProposalView";
import LeadForm from "@/components/LeadForm";
import PrintButton from "@/components/PrintButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Project Proposal | ScopeAI", robots: { index: false } };

export default async function ProposalPage({ params }: { params: { id: string } }) {
  const oid = toObjectId(params.id);
  if (!oid) notFound();

  const col = await proposals();
  const doc = await col.findOne({ _id: oid });
  if (!doc) notFound();

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "solutions@scopeai.io";

  return (
    <div className="container-page py-8 sm:py-12">
      {/* Top Action & Navigation Bar */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 transition"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Scoping Studio / New Architecture</span>
        </a>

        <PrintButton />
      </div>

      {doc.source === "demo" && (
        <div className="no-print mb-8 rounded-xl border border-amber-200/90 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-200 text-amber-900 font-bold text-[11px]">
            &bull;
          </span>
          <div className="space-y-0.5">
            <p className="font-bold text-amber-950">Engineered via Intelligent Domain Modeling (Demo Mode)</p>
            <p className="text-amber-800 leading-relaxed">
              This scope was synthesized via ScopeAI's verified domain benchmark engine. To enable natural-language LLM synthesis, configure your Anthropic or OpenAI API key in your environment.
            </p>
          </div>
        </div>
      )}

      {/* Main Dossier Presentation */}
      <ProposalView proposal={doc.proposal} id={params.id} createdAt={doc.createdAt} />

      {/* Executive Consultation Booking Section */}
      <section className="no-print mt-12 card-enterprise p-6 sm:p-10 border-brand-200/60 bg-gradient-to-br from-white via-slate-50 to-brand-50/20">
        <div className="max-w-2xl mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold text-brand-700 uppercase tracking-wider border border-brand-200/60 mb-2">
            Engagement Kickoff
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Schedule an Architectural Review with our Solutions Team
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Review technical feasibility, lock in sprint velocity, and receive a binding statement of work (SOW) tailored to your organization.
          </p>
        </div>

        {doc.lead ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-5 text-xs text-emerald-900 flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
              &check;
            </div>
            <div>
              <p className="font-bold text-emerald-950">Consultation Scheduled</p>
              <p className="text-emerald-800">
                Your details were submitted on this proposal. A senior solutions architect will contact you at <strong>{doc.lead.email}</strong>.
              </p>
            </div>
          </div>
        ) : (
          <LeadForm proposalId={params.id} contactEmail={contactEmail} />
        )}
      </section>
    </div>
  );
}
