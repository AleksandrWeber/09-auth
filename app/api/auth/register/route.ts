import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE } from "@/proxy";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email, and password are required." },
      { status: 400 },
    );
  }

  const response = NextResponse.json(
    { ok: true, user: { name, email } },
    { status: 201 },
  );

  response.cookies.set(AUTH_COOKIE, "demo-user-token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
