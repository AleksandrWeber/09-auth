import Link from "next/link";
import css from "./page.module.css";

export default function HomePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>NoteHub</h1>
        <p className={css.description}>
          Explore notes through interactive routes, tags, and modal previews.
        </p>
        <p className={css.description}>
          Open your note collection and filter notes by tag without full page
          reloads.
        </p>
        <Link href="/notes/filter/all" className={css.link}>
          Browse notes
        </Link>
      </div>
    </main>
  );
}
