'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignOutButton } from '@/components/SignOutButton';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/[lang]/auth/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  if (loading || status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Protected Dashboard</h1>
        <p className="mb-4">Welcome, {session?.user?.email}!</p>
        <p className="mb-6">You have successfully accessed a protected route.</p>
        <SignOutButton />
      </div>
    </div>
  );
}