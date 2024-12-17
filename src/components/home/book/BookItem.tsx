import { BookData } from '@/type'
import React from 'react'

const BookItem = ({ book }: { book: BookData }) => {
  return (
    <div key={book.id} className='w-[180px] text-center'>
      <div className='text-sm'>{book?.title}</div>
      {book.thumbnail && (
        <div className='flex justify-center my-4'>
          <img src={book.thumbnail} alt={`${book.title} 표지`} />
        </div>
      )}
    </div>
  )
}

export default BookItem
