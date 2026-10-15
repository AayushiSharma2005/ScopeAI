"use client";

import { useState } from "react";

export default function LeadForm({ proposalId, contactEmail }: { proposalId: string; contactEmail: string }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("sending");
    try {
      const res = await fetch(`/api/proposals/${proposalId}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while booking consultation.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-6 text-emerald-900 shadow-sm" role="status">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-sm">
            &check;
          </div>
          <h3 className="text-base font-bold text-emerald-950">Consultation Request Confirmed</h3>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed mb-3">
          Thank you, <strong>{form.name}</strong>. An enterprise solutions architect has received your dossier (#SCP-{proposalId.slice(-8).toUpperCase()}) and will reach out to <strong>{form.email}</strong> within 1 business day.
        </p>
        <p className="text-xs text-emerald-700">
          Direct executive inquiries: <a className="underline font-semibold" href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Executive / Lead Name *</label>
          <input
            id="name"
            required
            className="input"
            placeholder="e.g. Sarah Jenkins"
            value={form.name}
            onChange={set("name")}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="label">Corporate Work Email *</label>
          <input
            id="email"
            type="email"
            required
            className="input"
            placeholder="s.jenkins@company.com"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="company" className="label">Company / Venture Name</label>
          <input
            id="company"
            className="input"
            placeholder="e.g. Acme Health Corp"
            value={form.company}
            onChange={set("company")}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="phone" className="label">Direct Contact Phone</label>
          <input
            id="phone"
            className="input"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={set("phone")}
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label">Target Timeline or Integration Notes</label>
        <textarea
          id="message"
          rows={3}
          className="input"
          placeholder="Any specific technical compliance requirements, existing tech stacks, or targeted launch dates..."
          value={form.message}
          onChange={set("message")}
        />
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-800 flex items-center gap-2">
          <span>&bull;</span>
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-primary w-full sm:w-auto px-6 py-2.5 text-xs shadow-md shadow-brand-500/20"
        >
          {state === "sending" ? "Dispatching Architectural Briefing..." : "Schedule Technical Scoping Call"}
        </button>

        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Non-disclosure protected &bull; Direct technical response
        </p>
      </div>
    </form>
  );
}
