import { cookies } from "next/headers";

export const AUTH_COOKIE = "auth_session";

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value ?? null;
}

export async function isAuthenticated() {
  return Boolean(await getAuthToken());
}
