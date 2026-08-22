import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between rounded-full bg-white/80 p-2 shadow-sm ring-1 ring-slate-200 backdrop-blur-sm">
          <span className="px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Auth
          </span>
          <nav className="flex gap-2 text-sm">
            <Link className="rounded-full px-3 py-1.5 text-slate-600 transition hover:bg-slate-100" href="/sign-in">
              Sign in
            </Link>
            <Link className="rounded-full px-3 py-1.5 text-slate-600 transition hover:bg-slate-100" href="/sign-up">
              Sign up
            </Link>
          </nav>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 md:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
