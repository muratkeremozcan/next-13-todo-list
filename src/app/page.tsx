'use client'
import {useState, useEffect} from 'react'
import {TodoItem} from '@/components/TodoItem'
import Link from 'next/link'
// these have to be imported from elsewhere because they are server actions
import {getTodos, toggleTodo, deleteTodo} from './todoActions.server'

// think of page.tsx as an index file

type Todo = {
  id: string
  title: string
  complete: boolean
}

// To avoid refreshing the page when we delete a todo item,
// we  manage the state of the todos locally using React's state.
// This way, when a todo is deleted, we can remove it from the local state,
// which will cause a re-render and the todo will be removed from the UI.

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    // we use server side code to get the todos, and set them to the state
    // this is so that do not have to manually refresh the UI after adding a new todo
    getTodos().then(fetchedTodos => setTodos(fetchedTodos))
  }, [])

  const handleDeleteTodo = async (id: string) => {
    try {
      // we use the server side code to delete the todo
      await deleteTodo(id)
      // After successful deletion at the server, remove the todo from the local state
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
          data-cy="new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={handleDeleteTodo}
            data-cy={`todo-${todo.title}`}
          />
        ))}
      </ul>
    </>
  )
}

/* 
In traditional React apps, we often use `useQuery` (from libraries like react-query) 
or `useEffect` combined with `fetch` to fetch data from an API. 

However, in Next.js, especially when using the experimental server components feature, 
we have a more direct way to interact with server-side logic.

With Next.js, as long as we are in the app folder and use the `use server` directive,
we can directly call server-side code from our components. 
This means that we can invoke functions like `getTodos` that interact directly with the database 
or perform other server-side operations without making a traditional HTTP request. 

This has several benefits:
1. **Efficiency**: We avoid the overhead of HTTP requests and responses. 
Data fetching becomes more direct and streamlined.
  
2. **Less Code Duplication**: No need to define API endpoints for every server-side action or query. 
The logic is directly imported and used in the client component.
  
3. **Simplified Error Handling**: Errors from the server-side logic can be directly caught and handled in the component,
 without the complexities of handling HTTP status codes.
  
4. **Instant Feedback**: Since we're directly invoking server logic, the feedback loop is tighter. 
We can get instant responses and errors, making the UI feel more responsive.

However, this approach also comes with its considerations. 
Since the boundary between client and server blurs, developers need to be cautious about security implications 
and ensure that only intended code runs on the server.

It's important to note that while this method offers a convenient way to fetch and manipulate data, 
there might be scenarios where traditional API calls are still beneficial, 
especially when dealing with third-party services, caching, 
or when you want a clear separation between frontend and backend logic. 
*/
