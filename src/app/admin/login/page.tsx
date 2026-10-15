"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Sign-in failed.");
      setLoading(false);
    }
  }

  return (
    <div className="container-page flex justify-center py-16 sm:py-24">
      <div className="w-full max-w-md">
        <form onSubmit={onSubmit} className="card-enterprise p-8 space-y-5 border-slate-200 shadow-float">
          <div className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-navy-900 text-white shadow-md shadow-brand-500/20">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Sales Portal</h1>
            <p className="text-xs text-slate-500 mt-1">
              Authorized access to ScopeAI proposal pipeline &amp; lead telemetry.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="pw" className="label !mb-0">Access Secret Key</label>
              <button
                type="button"
                onClick={() => setPassword("admin123")}
                className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 underline"
              >
                Use default (admin123)
              </button>
            </div>
            <input
              id="pw"
              type="password"
              required
              autoFocus
              placeholder="Enter admin password..."
              className="input font-mono text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-800 flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            className="btn-primary w-full py-2.5 text-xs shadow-md shadow-brand-500/20 font-bold"
            disabled={loading}
          >
            {loading ? "Authenticating Session..." : "Sign in to Dashboard"}
          </button>

          <div className="pt-2 text-center border-t border-slate-100">
            <span className="text-[11px] text-slate-400">
              Secured with HMAC cryptographic cookie validation
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
