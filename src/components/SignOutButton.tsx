'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/[lang]/auth/login' });
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
}