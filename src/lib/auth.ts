import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Env } from '@/config/environtment';
import { supabase } from '@/lib/supabaseClient';
import { authHandlers } from '@/features/auth/handler';

interface CustomUser {
  id: string;
  email: string;
  name: string;
}

interface CustomSession {
  user: {
    id: string;
    email: string;
  };
  expires: string;
}


// ----------------- NextAuth Options -----------------
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
        mode: { label: 'Mode', type: 'text', placeholder: 'signin, signup, or resetpassword' },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        try {
          const { email, password, mode } = credentials!;
          const lowerMode = mode?.toLowerCase();

          if (!email && !password) {
            throw new Error('Password is required for signin or signup');
          }

          const user =
            lowerMode === 'signup'
              ? await authHandlers.handleSignup(email, password)
              : await authHandlers.handleSignIn(email, password);

          return {
            id: user.id,
            email: user.email ?? email,
            name: user.email ?? email,
          };
        } catch (error) {
          console.error('[AUTH] Authorization error:', {
            error,
            email: credentials?.email,
            mode: credentials?.mode,
            timestamp: new Date().toISOString(),
          });
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.lastUpdated = new Date().toISOString();
      }
      return token;
    },
    async session({ session, token }): Promise<CustomSession> {
      return {
        ...session,
        user: {
          id: token.userId as string,
          email: token.email as string,
        },
      };
    },
  },
  pages: {
    signIn: '/[lang]/auth/login',
    error: '/[lang]/auth/error',
  },
  events: {
    async signIn({ user }) {
      console.log('[AUTH] Successful sign-in:', {
        userId: user.id,
        email: user.email,
        timestamp: new Date().toISOString(),
      });
    },
    async signOut({ token }) {
      if (token?.userId) {
        await supabase.auth.signOut();
      }
    },
  },
  secret: Env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};