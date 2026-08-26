import { cookies } from "next/headers";
import type { AxiosResponse } from "axios";
import api from "./api";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";

export interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

async function withServerCookies() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    headers: {
      Cookie: cookieHeader,
    },
  };
}

export async function fetchNotes(params: FetchNotesParams = {}) {
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

export async function checkSession(): Promise<AxiosResponse> {
  const { headers } = await withServerCookies();
  const response = await api.get("/auth/session", { headers });
  return response;
}
