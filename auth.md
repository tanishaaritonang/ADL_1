# 🧩 NextAuth + Supabase + Next.js Example

This README contains all the code from the guide  
**“Simplifying Next.js Authentication and Internationalization with NextAuth and NextIntl.”**

---

## 'route.ts'

```ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '@client/lib/env';
import { supabase } from '@client/lib/supabaseClient';

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

// ----------------- Auth Handlers -----------------
const authHandlers = {
  async handleSignup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${config.NEXTAUTH_URL}`,
      },
    });

    if (error) {
      console.error('[AUTH] Signup error:', error);
      throw new Error(error.message);
    }

    if (!data.user?.id) {
      throw new Error('Signup successful. Please check your email for confirmation.');
    }

    return data.user;
  },

  async handleSignIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[AUTH] Signin error:', error);
      throw new Error(error.message);
    }

    if (!data.user?.id) {
      throw new Error('Invalid credentials');
    }

    return data.user;
  },

  async handleResetPassword(email: string) {
    // We'll implement this in Part 3
  },
};

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
          const { email, password, mode } = credentials;
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
    signIn: '/auth/signin',
    error: '/auth/error',
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
  secret: config.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

// ----------------- Handlers -----------------
const handleAuth = async (req: Request, res: Response) => {
  try {
    return await NextAuth(authOptions)(req, res);
  } catch (error) {
    console.error('[AUTH] Unexpected error:', error);
    throw error;
  }
};

export const GET = handleAuth;
export const POST = handleAuth;
'RegisterPage.tsx'
tsx
Copy code
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email,
        password,
        mode: 'signup',
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('An unexpected error occurred 😥');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create an Account</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
'SignInPage.tsx'
tsx
Copy code
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email,
        password,
        mode: 'signin',
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('Unexpected error occurred 🤕');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
}
'SignOutButton.tsx'
tsx
Copy code
'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
'middleware.ts'
ts
Copy code
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: ['/protected/:path*'],
};
'ProtectedPage.tsx'
tsx
Copy code
'use client';

import { useSession } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => '/auth/signin',
  });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return <p>Welcome, {session?.user?.email}!</p>;
}
