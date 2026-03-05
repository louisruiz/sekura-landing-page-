import { NextRequest, NextResponse } from 'next/server'

const locales = ['fr', 'en', 'es', 'pt']
const defaultLocale = 'fr'

const localeMap = {
  'fr': 'fr', 'fr-FR': 'fr', 'fr-BE': 'fr', 'fr-CH': 'fr', 'fr-CA': 'fr',
  'en': 'en', 'en-US': 'en', 'en-GB': 'en', 'en-AU': 'en',
  'es': 'es', 'es-ES': 'es', 'es-CO': 'es', 'es-MX': 'es', 'es-AR': 'es',
  'pt': 'pt', 'pt-BR': 'pt', 'pt-PT': 'pt',
}

function getLocale(request) {
  const acceptLang = request.headers.get('accept-language') || ''
  const langs = acceptLang.split(',').map(l => l.split(';')[0].trim())
  for (const lang of langs) {
    if (localeMap[lang]) return localeMap[lang]
    const base = lang.split('-')[0]
    if (localeMap[base]) return localeMap[base]
  }
  return defaultLocale
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/fonts') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return NextResponse.next()

  const locale = getLocale(request)
  if (locale === defaultLocale) return NextResponse.next()

  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(newUrl, { status: 302 })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}