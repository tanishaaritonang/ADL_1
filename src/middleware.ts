import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { AppConfig } from './config/app-config';
import { updateSession } from './lib/supabase/middleware';

const { locales, defaultLocale } = AppConfig;

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/public(.*)',
  // Add any other public routes here
]);

// Get the preferred locale from the request headers
function getLocale(request: Request): string {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = new URL(request.url);
  
  // Handle locale detection and redirection first
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If locale is not present, redirect to detected locale (but skip Clerk internal paths)
  if (!pathnameHasLocale && !pathname.startsWith('/_clerk')) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // Protect routes that are not public
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
  
  // Update Supabase session after Clerk authentication
  const response = await updateSession(request);
  
  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};