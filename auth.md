# 🔐 Next.js Authentication with Supabase & NextAuth — Deep Dive (Part 2 + Role-Based Access)

> Complete authentication and authorization setup using **Next.js**, **NextAuth**, and **Supabase**, with **role-based protection** and **middleware filtering**.

---

## 📘 Overview

This guide expands on the original tutorial by [Sidharrth Mahadevan](https://medium.com/@sidharrthnix/next-js-authentication-with-supabase-and-nextauth-a-deep-dive-part-2-5fa43563989a), adding:
- Email/password sign-up, sign-in, and sign-out  
- Route protection using middleware  
- **Role-based authentication** (admin, user, etc.)  
- **Middleware filtering** based on roles  

By the end, you’ll have a fully working authentication + authorization system for your Next.js app.

---

## 🏗️ Folder Structure

```
app/
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts
├── (protected)/
│   ├── dashboard/
│   ├── admin/
│   └── profile/
├── auth/
│   ├── signin/
│   ├── signup/
│   └── error/
middleware.ts
.env.local
```

---

## ⚙️ Setup

### 1️⃣ Environment Variables

Add these to your `.env.local`:

```bash
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your_random_secret

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key
```

---

### 2️⃣ Supabase Table Setup

In Supabase, update your `profiles` table to include a **role** column:

| Column | Type | Default | Description |
|--------|------|----------|-------------|
| id | uuid | `auth.uid()` | User ID (linked to auth) |
| email | text |  | User email |
| role | text | `'user'` | `'user'`, `'admin'`, `'moderator'`, etc. |

---

## 🧩 NextAuth Configuration (`route.ts`)

```ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        mode: { label: "Mode", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, mode } = credentials!;
        let user;

        if (mode === "signup") {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { role: "user" } },
          });
          if (error) throw error;
          user = data.user;
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          user = data.user;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user?.id)
          .single();

        return { id: user?.id, email: user?.email, role: profile?.role || "user" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## 🧠 Role-Based Middleware (`middleware.ts`)

```ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;
    const pathname = req.nextUrl.pathname;

    const roleRules = {
      "/admin": ["admin"],
      "/dashboard": ["admin", "user"],
    };

    for (const [path, roles] of Object.entries(roleRules)) {
      if (pathname.startsWith(path)) {
        if (!roles.includes(token?.role)) {
          return NextResponse.redirect(new URL("/auth/error?reason=forbidden", req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"],
};
```

---

## 🧭 Example Usage

```tsx
"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;
  const role = session.user.role;

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      {role === "admin" && <button>Manage Users</button>}
      {role === "user" && <p>You have basic user access.</p>}
    </div>
  );
}
```

---

## 🔒 Testing Scenarios

| Test | Expected Behavior |
|------|--------------------|
| Sign up new user | Creates a Supabase user + default role `user` |
| Sign in as admin | Access `/admin` successfully |
| Sign in as user | Redirected if visiting `/admin`, but `/dashboard` works |
| Sign out | Both Supabase & NextAuth sessions cleared |
| Visit `/dashboard` unauthenticated | Redirects to `/auth/signin` |
| Visit `/admin` as user | Redirects to `/auth/error?reason=forbidden` |

---

## 🧰 Tips & Best Practices

- Fetch user roles from Supabase’s `profiles` table.
- Embed roles in JWT tokens for stateless performance.
- Centralize access rules in middleware for flexibility.
- Use environment variables safely in different stages.
- Test both client and server flows thoroughly.

---

## 🧾 Summary

This setup combines **NextAuth** and **Supabase** into a secure and flexible authentication system supporting:
- Email/password login
- Role-based access control
- Middleware-based route filtering
- JWT session management

You now have a **production-ready authentication and authorization** layer for any Next.js project.
