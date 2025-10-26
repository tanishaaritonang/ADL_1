import { createClient } from '@supabase/supabase-js';

// This function creates a Supabase client that can be used in server components
// It requires the Clerk session token to be passed in
export const createSupabaseServerClient = (clerkToken?: string) => {
  const options = clerkToken 
    ? {
        global: {
          headers: {
            'Authorization': `Bearer ${clerkToken}`,
          },
        },
      }
    : {};

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    options
  );
};