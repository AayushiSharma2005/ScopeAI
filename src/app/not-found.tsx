import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-20 text-center">
      <div className="card-enterprise max-w-md mx-auto p-8 shadow-sm">
        <span className="text-4xl font-extrabold text-slate-300 block mb-2">404</span>
        <h1 className="text-2xl font-bold text-slate-900">Proposal or Page Not Found</h1>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          The architectural proposal reference or document you requested does not exist or has expired.
        </p>
        <div className="mt-6">
          <Link href="/" className="btn-primary !text-xs !py-2.5 !px-5">
            Return to Scoping Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
