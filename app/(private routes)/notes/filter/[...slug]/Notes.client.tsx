"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api/clientApi";
import type { NotesResponse } from "@/types/note";
import css from "./NotesPage.module.css";

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearch(inputValue);
      setPage(1);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [inputValue]);

  const { data, isLoading, isError, error } = useQuery<NotesResponse>({
    queryKey: ["notes", page, search, tag ?? "all"],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search, tag }),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={setInputValue} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Could not load notes. {(error as Error)?.message}</p>}
      {data && data.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {data && data.notes && data.notes.length === 0 && <p>No notes found.</p>}
    </div>
  );
}
