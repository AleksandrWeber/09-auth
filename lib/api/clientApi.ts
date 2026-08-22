import api from "./api";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
}

export interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

export async function fetchNotes(params: FetchNotesParams = {}) {
  const response = await api.get<{ notes: Note[]; totalPages: number }>("/notes", {
    params: {
      ...params,
      perPage: params.perPage ?? 12,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(payload: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function register(payload: AuthRequest): Promise<User> {
  const response = await api.post<User>("/auth/register", payload);
  return response.data;
}

export async function login(payload: AuthRequest): Promise<User> {
  const response = await api.post<User>("/auth/login", payload);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  try {
    const response = await api.get<User>("/auth/session");
    return response.data ?? null;
  } catch {
    return null;
  }
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}

export async function updateMe(payload: UpdateUserPayload): Promise<User> {
  const response = await api.patch<User>("/users/me", payload);
  return response.data;
}
