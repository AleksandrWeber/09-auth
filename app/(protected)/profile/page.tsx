"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-800">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-violet-600">Profile</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">My account</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-violet-50 p-4">
            <p className="text-sm text-violet-800/80">Status</p>
            <p className="mt-2 text-xl font-semibold text-violet-900">Authenticated</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">Member</p>
          </div>
        </div>
      </div>
    </main>
  );
}
