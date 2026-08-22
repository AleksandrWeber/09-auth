import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6 text-slate-800">
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-sky-600 px-4 py-2 font-medium text-white">
          Go home
        </Link>
      </div>
    </main>
  );
}
