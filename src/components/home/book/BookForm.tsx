'use client'

import { ApiBookData, BookData, BookFormData } from '@/type'
import { useEffect, useState } from 'react'

interface BookFormProps {
  onSubmit: (formData: BookFormData) => Promise<void>
  book: ApiBookData | BookData
  text: string
}

const BookForm = ({ onSubmit, book, text }: BookFormProps) => {
  const authors = book?.authors?.length ? book.authors : ['알 수 없음']
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (book) {
      setDescription(book.contents)
      setQuantity('quantity' in book ? book.quantity : 1)
    }
  }, [book])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({ description, quantity, authors })
  }

  return (
    <section className='flex flex-col gap-5 items-center'>
      <h3>제목: {book?.title}</h3>
      <p>
        저자: {authors[0]} {authors.length > 1 && '그 외'}
      </p>
      <img src={book?.thumbnail} alt={`${book?.title} 표지`} />
      <form onSubmit={handleSubmit} className='w-[450px] flex flex-col gap-3'>
        <p>책 소개</p>
        <textarea
          className='w-full h-[280px] border-2 resize-none rounded-md p-2'
          name=''
          id=''
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type='number'
          min='1'
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value)
            // NaN 방지 및 최소값 1 보장
            setQuantity(isNaN(value) || value < 1 ? 1 : value)
          }}
          className='w-16 p-2 border rounded text-center'
          required
        />
        <button>{text}</button>
      </form>
    </section>
  )
}

export default BookForm
