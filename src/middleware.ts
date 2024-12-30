import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const cookie = request.cookies.get('auth_session')

    const protected_routes = ['home']

    // si no está log
    if (!cookie) {
        // si intenta acceder ruta protegida redirigir a login
        if(protected_routes.includes(request.nextUrl.pathname.split('/')[1])) {
            return NextResponse.rewrite(new URL('/login', request.url))
        }
        return
    }

    if(cookie) {
        // si intenta acceder a login o register redirigir a home
        // si intenta acceder a / redirigir a home
        if(
          request.nextUrl.pathname.split('/')[1] === 'login' ||
          request.nextUrl.pathname.split('/')[1] === 'register' ||
          request.nextUrl.pathname === '/'
        ) {
            return NextResponse.rewrite(new URL('/home', request.url))
        }
        return
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


