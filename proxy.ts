import { NextRequest, NextResponse } from "next/server";

export const AUTH_COOKIE = "auth_session";

const PUBLIC_PATHS = ["/", "/sign-in", "/sign-up"];

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname) || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const isPrivateRoute = pathname === "/profile" || pathname.startsWith("/profile/");
  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";

  if (isPrivateRoute && !token) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/sign-in";
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && token) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/profile";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
