import { BookData } from '@/type'
import React from 'react'

const BookItem = ({ book }: { book: BookData }) => {
  return (
    <div data-cy='book-item' className='w-full text-center flex flex-col justify-center'>
      <div data-cy='book-title' className='text-sm'>
        {book?.title}
      </div>
      {book.thumbnail && (
        <div className='flex justify-center my-4'>
          <img src={book.thumbnail} alt={`${book.title} 표지`} />
        </div>
      )}
    </div>
  )
}

export default BookItem
