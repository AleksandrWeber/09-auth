import type { ReactNode } from 'react';

export default function NotesFilterLayout({ children }: { children: ReactNode }) {
  return <section className="p-4">{children}</section>;
}
