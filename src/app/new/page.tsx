import {prisma} from '@/db'
import {redirect} from 'next/navigation'
import Link from 'next/link'

/*
 * In a traditional React application (without server components like in Next.js):
 * 1. An API endpoint would be set up (e.g., `POST /api/todos`).
 * 2. The React component would send an HTTP POST request to this endpoint upon form submission.
 * 3. The server would process the request, validate the data, and interact with the database to create a new todo.
 * 4. After processing, the server sends back a response (e.g., newly created todo or a success message).
 * 5. The React component handles this response, updating the local state or redirecting the user as necessary.
 *
 * This traditional approach ensures a clear separation of frontend and backend logic, and is suitable for various hosting solutions.
 * However, it can also introduce more boilerplate, additional round trips to the server, and potential latency.
 *
 * With Next.js and its server component feature, some of these steps are streamlined
 * 1. No explicit api endpoints
 * - No need to create explicit API endpoints; server-side functions can be directly called from components.
 * - Automatic handling of data serialization, reducing manual processing (no JSON.stringify or JSON.parse).
 * - Data fetching is optimized and closer to the UI, reducing over-fetching.
 * - Can reduce the number of round trips to the server, as you can perform operations and return updated UI in one go.
 * - Unified error handling without needing to split logic between an API endpoint and client code.
 * - A more integrated development experience blending server and client logic.

 */
async function createTodo(data: FormData) {
  'use server'

  const title = data.get('title')?.valueOf()
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Invalid Title')
  }

  await prisma.todo.create({data: {title, complete: false}})
  return redirect('/')
}

// think of page.tsx as an index file
// routing works via folders

export default function New() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>

      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          data-cy="title"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            data-cy="cancel"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            data-cy="create"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  )
}
