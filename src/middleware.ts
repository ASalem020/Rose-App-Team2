import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';

const authPages = [
  '/login',
  '/register',
  '/forgot-password',
];

// All pages are public EXCEPT dashboard and its nested routes
const publicPages = ['/(?!.*checkout)(?!dashboard).*'];

// Protected pages that require authentication
const protectedPages = ['/dashboard', '/dashboard/(.*)'];

const loginToShowPages = ['/checkout', '/checkout/(.*)'];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/login',
    },
  },
);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );

  const authPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${authPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );

  const protectedPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${protectedPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );

  const loginToShowPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${loginToShowPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );

  const isPublicPage = publicPathnameRegex.test(
    req.nextUrl.pathname,
  );
  const isAuthPage = authPathnameRegex.test(
    req.nextUrl.pathname,
  );
  const isProtectedPage = protectedPathnameRegex.test(
    req.nextUrl.pathname,
  );
  const isLoginToShowPage = loginToShowPathnameRegex.test(
    req.nextUrl.pathname,
  );

  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    const redirectUrl = new URL('/', req.nextUrl.origin);
    Object.entries(req.nextUrl.searchParams).forEach(
      ([key, value]) =>
        redirectUrl.searchParams.set(key, value),
    );
    return NextResponse.redirect(redirectUrl);
  }

  // Protected pages: require authentication
  if (isLoginToShowPage) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }

  if (isProtectedPage && !token) {
    const redirectUrl = new URL(
      '/unauthorized',
      req.nextUrl.origin,
    );
    return NextResponse.redirect(redirectUrl);
  }

  // Public pages: just handle i18n routing
  if (isPublicPage) {
    return handleI18nRouting(req);
  }

  // Fallback: require authentication
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (authMiddleware as any)(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
