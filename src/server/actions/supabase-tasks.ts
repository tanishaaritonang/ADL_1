'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { currentUser, auth } from '@clerk/nextjs/server';

export async function getTasks() {
  try {
    // Get the current user from Clerk
    const user = await currentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get Clerk session token
    const session = await auth();
    const clerkToken = await session.getToken();

    if (!clerkToken) {
      throw new Error('No Clerk token available');
    }

    // Create Supabase client with Clerk token
    const supabase = createSupabaseServerClient(clerkToken);

    // Get user's tasks
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id); // Assuming tasks are linked to user via user_id

    if (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Error fetching tasks');
    }

    return data;
  } catch (error) {
    console.error('Server action error:', error);
    throw new Error('Server action error');
  }
}

export async function createTask(taskData: { name: string; description?: string }) {
  try {
    // Get the current user from Clerk
    const user = await currentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get Clerk session token
    const session = await auth();
    const clerkToken = await session.getToken();

    if (!clerkToken) {
      throw new Error('No Clerk token available');
    }

    // Create Supabase client with Clerk token
    const supabase = createSupabaseServerClient(clerkToken);

    // Insert the task
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        name: taskData.name,
        description: taskData.description,
        user_id: user.id, // Link task to user
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating task:', error);
      throw new Error('Error creating task');
    }

    return data;
  } catch (error) {
    console.error('Server action error:', error);
    throw new Error('Server action error');
  }
}