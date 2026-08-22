import { cookies } from "next/headers";
import api from "./api";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";

async function withServerCookies() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  };
}

export async function fetchNotes(params: Record<string, unknown> = {}) {
  const { headers } = await withServerCookies();

  const response = await api.get<{ notes: Note[]; totalPages: number }>("/notes", {
    params: {
      ...params,
      perPage: params.perPage ?? 12,
    },
    headers,
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { headers } = await withServerCookies();
  const response = await api.get<Note>(`/notes/${id}`, { headers });
  return response.data;
}

export async function getMe(): Promise<User> {
  const { headers } = await withServerCookies();
  const response = await api.get<User>("/users/me", { headers });
  return response.data;
}

export async function checkSession(): Promise<User | null> {
  try {
    const { headers } = await withServerCookies();
    const response = await api.get<User>("/auth/session", { headers });
    return response.data ?? null;
  } catch {
    return null;
  }
}
