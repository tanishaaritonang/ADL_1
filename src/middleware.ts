import { NextResponse, type NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { AppConfig } from './config/app-config';

const { locales, defaultLocale } = AppConfig;

// Get the preferred locale from the request headers
function getLocale(request: Request): string {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  
  // Check if the pathname already includes a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Redirect to the URL with the detected locale
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // If it has a locale, continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internal paths and assets
    '/((?!_next|api|auth|favicon.ico).*)', 
  ],
};