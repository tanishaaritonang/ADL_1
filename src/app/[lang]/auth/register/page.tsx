'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <SignUp 
        appearance={{
          elements: {
            card: 'shadow-none w-full max-w-md',
          },
        }}
      />
    </div>
  );
}
