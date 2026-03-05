import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if the path starts with a supported language
  const supportedLangs = ['/en', '/es', '/pt']
  const isLangPath = supportedLangs.some(lang => pathname === lang || pathname.startsWith(lang + '/'))
  
  if (isLangPath) {
    // Rewrite to the root page but keep the URL
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/(en|es|pt)/:path*']
}
