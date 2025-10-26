'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <SignIn 
        appearance={{
          elements: {
            card: 'shadow-none w-full max-w-md',
          },
        }}
      />
    </div>
  );
}
