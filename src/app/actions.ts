'use server'

import { addBook } from '@/lib/firebase/books'
import { BookData } from '@/type'
import { revalidatePath } from 'next/cache'

const addBookAction = async (book: BookData) => {
  const result = await addBook(book)
  revalidatePath('/')
  return result
}

export default addBookAction
