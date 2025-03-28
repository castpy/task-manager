import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(
    `${process.env.NEXT_PUBLIC_COOKIE_NAME}`
  )?.value;

  const protectedRoutes = ["/board"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (token && pathname === process.env.NEXT_PUBLIC_APP_URL) {
    return NextResponse.redirect(new URL("/board", request.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data/.*|.*\\.(?:png|jpg|jpeg|svg|gif|ico|webp|json)$).*)",
  ],
};
