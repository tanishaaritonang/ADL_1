'use client';

import { useEffect, useState } from 'react';
import { useUser, useSession } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';

export const useSupabaseWithClerk = () => {
  const [supabaseClient, setSupabaseClient] = useState<any>(null);
  const { session } = useSession();
  const { user } = useUser();

  useEffect(() => {
    if (!session || !user) return;

    const initializeSupabaseClient = async () => {
      const token = await session.getToken();
      
      const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      );
      
      setSupabaseClient(client);
    };

    initializeSupabaseClient();
  }, [session, user]);

  return supabaseClient;
};