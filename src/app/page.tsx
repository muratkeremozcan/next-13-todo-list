'use client'
import {useState, useEffect} from 'react'
import {TodoItem} from '@/components/TodoItem'
import Link from 'next/link'
// these have to be imported from elsewhere because they are server actions
import {getTodos, toggleTodo, deleteTodo} from './todoActions.server'

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
    getTodos().then(fetchedTodos => setTodos(fetchedTodos))
  }, [])

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id)
      // After successful deletion, remove the todo from the local state
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
            data-cy={`todo-${todo.id}`}
          />
        ))}
      </ul>
    </>
  )
}
