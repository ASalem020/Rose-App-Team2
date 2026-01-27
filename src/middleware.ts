import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';

const authRoutes = ["/login", "/register"];
const publicRoutes = ["/", ...authRoutes];

const handleI18nRouting = createMiddleware(routing);

export default withAuth(
  async function middleware(req: NextRequest) {
    // ^ call i18n middleware first
    const response = handleI18nRouting(req);
  
    // ^ check authentication after i18n routing
    const token = await getToken({ req });
    if (authRoutes.includes(req.nextUrl.pathname) && token) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
    
    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // ^ no authentication required for public routes
        if (publicRoutes.includes(req.nextUrl.pathname)) {
          return true;
        }
        // ^ for other routes, check if token exists
        return token != null;
      }
    },
    pages: {
      signIn: '/login'
    }
  }
);

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
};