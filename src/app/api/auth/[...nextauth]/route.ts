import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth/next';

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
