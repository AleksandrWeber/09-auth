"use client";

export default function NotesFilterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Something went wrong.</h2>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
      <p>{error.message}</p>
    </div>
  );
}
