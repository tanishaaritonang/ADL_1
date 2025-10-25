'use client';

import { useSession } from 'next-auth/react';
import { SignOutButton } from '@/components/SignOutButton';

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="p-4">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="p-4">Not authenticated. Please sign in.</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="space-y-2">
        <p><span className="font-medium">ID:</span> {session?.user?.id}</p>
        <p><span className="font-medium">Email:</span> {session?.user?.email}</p>
      </div>
      <div className="mt-4">
        <SignOutButton />
      </div>
    </div>
  );
}