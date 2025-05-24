import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Add paths that should be protected
const protectedPaths = [
  "/dashboard",
  "/profile",
  "/orders",
  "/settings",
  "/admin",
]

// Add paths that should be accessible only to non-authenticated users
const authPaths = [
  "/login",
  "/register",
  "/forgot-password",
]

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  // Redirect authenticated users away from auth pages
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users to login
  if (isProtectedPath && !token) {
    const callbackUrl = encodeURIComponent(pathname)
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url))
  }

  // Special handling for admin routes
  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Add the session to the response headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-session", JSON.stringify(token))

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
} 