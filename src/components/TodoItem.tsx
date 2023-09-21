'use client'

export type TodoItemProps = {
  id: string
  title: string
  complete: boolean
  toggleTodo: (id: string, complete: boolean) => void
  deleteTodo: (id: string) => void
}

export function TodoItem({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  return (
    <li className="flex gap-1 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={e => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
      >
        {title}
      </label>
      <button
        onClick={() => deleteTodo(id)}
        className="text-red-500 hover:text-red-700"
      >
        - delete
      </button>
    </li>
  )
}
