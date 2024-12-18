'use server'

import { addBook, deleteBook } from '@/lib/firebase/books'
import { BookData } from '@/type'
import { revalidatePath } from 'next/cache'

export const addBookAction = async (book: BookData) => {
  const result = await addBook(book)
  revalidatePath('/')
  return result
}

export const deleteBookAction = async (book: string) => {
  const result = await deleteBook(book)
  revalidatePath('/')
  return result
}
