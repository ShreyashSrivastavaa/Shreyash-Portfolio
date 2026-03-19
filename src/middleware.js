import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');

  // Redirect from old/secondary domain to primary domain
  if (host === 'shreyash.vercel.app') {
    const url = request.nextUrl.clone();
    url.hostname = 'shreyashsrivastava.vercel.app';
    url.port = ''; // Clear port if any
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
