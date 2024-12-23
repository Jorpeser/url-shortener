import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const cookie = request.cookies.get('auth_session')

    const protected_routes = ['home']

    // Habrá mejor forma de hacer esto
    if (!cookie && protected_routes.includes(request.nextUrl.pathname.split('/')[1])) {
        return NextResponse.rewrite(new URL('/login', request.url))
    }
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
    ]
  }


