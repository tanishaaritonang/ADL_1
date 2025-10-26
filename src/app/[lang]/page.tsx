'use client'
import { useEffect, useState } from 'react'
import { useSession, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useSupabaseWithClerk } from '@/hooks/useSupabaseWithClerk'

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  // The `useUser()` hook is used to ensure that Clerk has loaded data about the signed in user
  const { user, isLoaded: isUserLoaded } = useUser()
  // The `useSession()` hook is used to get the Clerk session object
  // The session object is used to get the Clerk session token
  const { isLoaded: isSessionLoaded } = useSession()

  const supabaseClient = useSupabaseWithClerk()

  // This `useEffect` will wait for the User object to be loaded before requesting
  // the tasks for the signed in user
  useEffect(() => {
    if (!isUserLoaded || !isSessionLoaded || !supabaseClient) {
      setLoading(false)
      return
    }

    async function loadTasks() {
      setLoading(true)
      const { data, error } = await supabaseClient.from('tasks').select()
      if (!error) setTasks(data)
      setLoading(false)
    }

    loadTasks()
  }, [isUserLoaded, isSessionLoaded, supabaseClient])

  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Insert task into the "tasks" database
    if (supabaseClient) {
      await supabaseClient.from('tasks').insert({
        name,
      })
      window.location.reload()
    }
  }

  // Show loading state while checking authentication
  if (!isUserLoaded || !isSessionLoaded) {
    return (
      <div className="p-8 flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  // Show sign-in prompt if user is not authenticated
  if (!user) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Please sign in to continue</h1>
        <p className="mb-6">Access your tasks by signing in first</p>
        <Link 
          href={`/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'}/auth/login`} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      {loading && <p>Loading...</p>}

      {!loading && tasks.length > 0 && tasks.map((task: any) => <p key={task.id} className="mb-2 p-2 border rounded">{task.name}</p>)}

      {!loading && tasks.length === 0 && <p className="p-2">No tasks found</p>}

      <form onSubmit={createTask} className="mt-6 flex">
        <input
          autoFocus
          type="text"
          name="name"
          placeholder="Enter new task"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border p-2 mr-2 rounded flex-grow"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  )
}