import { NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the current user from Clerk
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Get Clerk session token
    const session = await auth();
    const clerkToken = await session.getToken();

    if (!clerkToken) {
      return NextResponse.json({ error: 'No Clerk token available' }, { status: 401 });
    }

    // Create Supabase client with Clerk token
    const supabase = createSupabaseServerClient(clerkToken);

    // Example: Get user data from Supabase
    const { data, error } = await supabase
      .from('profiles') // Assuming you have a profiles table
      .select('*')
      .eq('clerk_user_id', user.id)
      .single();

    if (error) {
      // If user doesn't exist in Supabase, create a profile
      if (error.code === 'PGRST116') {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            clerk_user_id: user.id,
            email: user.emailAddresses[0]?.emailAddress || '',
            full_name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || '',
          }]);

        if (insertError) {
          console.error('Error creating user profile:', insertError);
          return NextResponse.json({ error: 'Error creating user profile' }, { status: 500 });
        }

        // Fetch the newly created profile
        const { data: newData, error: newError } = await supabase
          .from('profiles')
          .select('*')
          .eq('clerk_user_id', user.id)
          .single();

        return NextResponse.json({ 
          user: newData, 
          clerkUser: {
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
          }
        });
      } else {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ error: 'Error fetching user profile' }, { status: 500 });
      }
    }

    return NextResponse.json({ 
      user: data, 
      clerkUser: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      }
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ error: 'Authentication error' }, { status: 500 });
  }
}