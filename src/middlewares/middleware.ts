import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes protégées (requièrent une connexion)
const protectedRoutes = ['/dashboard', '/profile', '/contact', '/payment', '/info', '/licences', '/parametres'];

// Routes publiques (redirige vers /dashboard si déjà connecté)
const authRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Récupérer le token Firebase depuis les cookies
  // Firebase stocke la session dans un cookie "__session" en SSR
  // En client-side, on s'appuie sur onAuthStateChanged
  const token = request.cookies.get('__session')?.value;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Rediriger vers /login si route protégée et pas de token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rediriger vers /dashboard si déjà connecté et tente d'accéder à login/register
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/contact/:path*',
    '/payment/:path*',
    '/info/:path*',
    '/licences/:path*',
    '/parametres/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};