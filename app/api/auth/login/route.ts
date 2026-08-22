import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE } from "@/proxy";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ ok: true, user: { email } }, { status: 200 });

  response.cookies.set(AUTH_COOKIE, "demo-user-token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
