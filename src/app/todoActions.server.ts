'use server'

import {prisma} from '@/db'

export async function getTodos() {
  return await prisma.todo.findMany()
}

export async function toggleTodo(id: string, complete: boolean) {
  return await prisma.todo.update({where: {id}, data: {complete}})
}

export async function deleteTodo(id: string) {
  return await prisma.todo.delete({where: {id}})
}
