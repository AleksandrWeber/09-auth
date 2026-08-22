import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">Auth demo</p>
        <h1 className="mt-4 text-4xl font-bold">Secure access flow</h1>
        <p className="mt-4 text-base text-slate-300">
          Public pages stay open, while protected pages require an active session cookie.
        </p>
        <p className="mt-3 text-sm text-slate-400">
          Use the demo sign-in or sign-up flow to access the private profile area.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/sign-in"
            className="rounded-full bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full border border-white/15 px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/5"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
