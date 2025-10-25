import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/[lang]/auth/login',
  },
});

export const config = {
  matcher: ['/((?!api|_next|auth|favicon.ico).*)'],
};