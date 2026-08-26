import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";

interface NotesFilterPageProps {
  params: Promise<{ slug?: string[] }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: NotesFilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] ?? "all";
  const title =
    tag === "all"
      ? "All notes | NoteHub"
      : `Notes filtered by ${tag} | NoteHub`;
  const description =
    tag === "all"
      ? "Browse all notes in NoteHub."
      : `Browse notes filtered by ${tag} in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function NotesFilterPage({
  params,
}: NotesFilterPageProps) {
  const { slug } = await params;
  const activeTag = slug?.[0] && slug[0] !== "all" ? slug[0] : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", activeTag ?? "all"],
    queryFn: () =>
      fetchNotes({ page: 1, perPage: 12, search: "", tag: activeTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={activeTag ?? "all"} tag={activeTag} />
    </HydrationBoundary>
  );
}
