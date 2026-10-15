"use client";

import { useState } from "react";
import { STATUSES } from "@/lib/schema";

const COLORS: Record<string, string> = {
  New: "border-blue-200 bg-blue-50 text-blue-800",
  Contacted: "border-amber-200 bg-amber-50 text-amber-800",
  Won: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Lost: "border-slate-200 bg-slate-100 text-slate-700",
};

export default function StatusSelect({ id, initial }: { id: string; initial: string }) {
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    const prev = value;
    setValue(next);
    setSaving(true);
    setError(false);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setValue(prev);
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        aria-label="Lead status"
        value={value}
        onChange={onChange}
        disabled={saving}
        className={`rounded-full border px-3 py-1 text-xs font-bold cursor-pointer transition focus:ring-2 focus:ring-brand-500/20 focus:outline-none ${COLORS[value] || ""}`}
      >
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      {saving && (
        <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-brand-600 animate-ping" />
      )}
      {error && <span className="ml-1 text-[10px] text-red-600 font-bold">Failed</span>}
    </div>
  );
}
