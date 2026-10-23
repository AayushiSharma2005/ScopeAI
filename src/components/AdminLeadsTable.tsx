"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StatusSelect from "./StatusSelect";
import { formatDate, formatMoney } from "@/lib/format";
import type { Status } from "@/lib/schema";

export interface SerializedLead {
  id: string;
  createdAt: string;
  status: Status;
  lead: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message?: string;
    createdAt: string;
  };
  proposal: {
    projectName: string;
    costMin: number;
    costMax: number;
    currency: string;
  };
  idea: string;
}

export default function AdminLeadsTable({ initialLeads }: { initialLeads: SerializedLead[] }) {
  const [leads, setLeads] = useState<SerializedLead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const filteredLeads = useMemo(() => {
    return leads.filter((item) => {
      // Status filter
      if (selectedStatus !== "All" && item.status !== selectedStatus) {
        return false;
      }
      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = item.lead.name.toLowerCase().includes(q);
        const matchesEmail = item.lead.email.toLowerCase().includes(q);
        const matchesCompany = (item.lead.company || "").toLowerCase().includes(q);
        const matchesProject = item.proposal.projectName.toLowerCase().includes(q);
        return matchesName || matchesEmail || matchesCompany || matchesProject;
      }
      return true;
    });
  }, [leads, search, selectedStatus]);

  function exportToCsv() {
    if (filteredLeads.length === 0) return;

    const headers = [
      "Date",
      "Client Name",
      "Email",
      "Company",
      "Phone",
      "Project Name",
      "Min Cost",
      "Max Cost",
      "Currency",
      "Pipeline Status",
      "Client Note",
    ];

    const rows = filteredLeads.map((item) => [
      `"${new Date(item.lead.createdAt).toISOString()}"`,
      `"${item.lead.name.replace(/"/g, '""')}"`,
      `"${item.lead.email.replace(/"/g, '""')}"`,
      `"${(item.lead.company || "").replace(/"/g, '""')}"`,
      `"${(item.lead.phone || "").replace(/"/g, '""')}"`,
      `"${item.proposal.projectName.replace(/"/g, '""')}"`,
      item.proposal.costMin,
      item.proposal.costMax,
      `"${item.proposal.currency}"`,
      `"${item.status}"`,
      `"${(item.lead.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `scopeai-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const statusCounts = useMemo(() => {
    return {
      All: leads.length,
      New: leads.filter((l) => l.status === "New").length,
      Contacted: leads.filter((l) => l.status === "Contacted").length,
      Won: leads.filter((l) => l.status === "Won").length,
      Lost: leads.filter((l) => l.status === "Lost").length,
    };
  }, [leads]);

  return (
    <div className="card-enterprise overflow-hidden">
      {/* Controls Bar: Search, Filters & CSV Export */}
      <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Consultation Inquiries ({filteredLeads.length} of {leads.length})
          </h2>
          <p className="text-xs text-slate-500">Filter, search, and export lead telemetry</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search leads, email, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 pl-8 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none w-56 sm:w-64"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          {/* Export to CSV Button */}
          <button
            type="button"
            onClick={exportToCsv}
            disabled={filteredLeads.length === 0}
            className="btn-secondary !text-xs !py-1.5 !px-3 font-semibold flex items-center gap-1.5"
            title="Download CSV report of current leads"
          >
            <svg className="h-3.5 w-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-slate-100 bg-white px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-semibold mr-1">Filter:</span>
        {(["All", "New", "Contacted", "Won", "Lost"] as const).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setSelectedStatus(st)}
            className={`rounded-full px-2.5 py-1 font-semibold transition ${
              selectedStatus === st
                ? "bg-brand-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {st} ({statusCounts[st] || 0})
          </button>
        ))}
      </div>

      {filteredLeads.length === 0 ? (
        <div className="p-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            {leads.length === 0 ? "No Consultation Inquiries Recorded" : "No Leads Match Current Filter"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {leads.length === 0
              ? "Inquiries appear here automatically when a visitor models a proposal in the Scoping Studio and fills out the consultation form."
              : "Try clearing your search term or selecting 'All' in the status filter."}
          </p>
          {leads.length > 0 && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedStatus("All");
              }}
              className="mt-3 text-xs font-semibold text-brand-600 hover:underline"
            >
              Reset Filters
            </button>
          )}
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
              {filteredLeads.map((item) => {
                const initials = item.lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    <td className="whitespace-nowrap text-xs text-slate-500 font-medium">
                      {formatDate(new Date(item.lead.createdAt))}
                    </td>
                    <td>
                      <div className="flex items-start gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                          {initials}
                        </div>
                        <div className="space-y-0.5 text-xs">
                          <p className="font-bold text-slate-900">{item.lead.name}</p>
                          <a className="text-brand-600 hover:underline block" href={`mailto:${item.lead.email}`}>
                            {item.lead.email}
                          </a>
                          {item.lead.company && (
                            <p className="text-slate-500 font-medium">&bull; {item.lead.company}</p>
                          )}
                          {item.lead.phone && (
                            <p className="text-slate-400 font-mono text-[11px]">{item.lead.phone}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="max-w-xs">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-900 text-xs">{item.proposal.projectName}</p>
                        <p className="line-clamp-2 text-xs text-slate-500 leading-relaxed">
                          {item.idea}
                        </p>
                        {item.lead.message && (
                          <div className="mt-1 rounded bg-slate-100/80 p-2 text-[11px] text-slate-700 border border-slate-200/60">
                            <span className="font-semibold text-slate-800">Note:</span> {item.lead.message}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <span className="inline-block font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                        {formatMoney(item.proposal.costMin)} &ndash; {formatMoney(item.proposal.costMax)}
                      </span>
                    </td>
                    <td>
                      <StatusSelect id={item.id} initial={item.status} />
                    </td>
                    <td className="text-center">
                      <Link
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800 hover:underline"
                        href={`/proposal/${item.id}`}
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
  );
}
