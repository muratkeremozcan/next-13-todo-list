'use server'
import {prisma} from '@/db'
import {redirect} from 'next/navigation'

export const getTodos = () => prisma.todo.findMany()

export const toggleTodo = (id: string, complete: boolean) =>
  prisma.todo.update({where: {id}, data: {complete}})

export const deleteTodo = (id: string) => prisma.todo.delete({where: {id}})

export async function createTodo(data: FormData) {
  const title = data.get('title')?.valueOf()
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Invalid Title')
  }

  await prisma.todo.create({data: {title, complete: false}})
  return redirect('/')
}
