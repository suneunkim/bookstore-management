'use client'

import { useMemo, useState } from 'react'
import BookItem from './BookItem'
import { BookData } from '@/type'
import calculatePageRange from '@/utils/calculatePageRange'

const BookList = ({ books }: { books: BookData[] }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(books.length / pageSize)
  const PAGES_PER_VIEW = 5 // 페이지네이션으로 보여줄 번호 개수

  const { startPage, endPage } = calculatePageRange(currentPage, totalPages, PAGES_PER_VIEW)

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return books.slice(startIndex, startIndex + pageSize)
  }, [books, currentPage])

  const handlePageArrow = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPage(Math.max(startPage - PAGES_PER_VIEW, 1))
    } else {
      setCurrentPage(Math.min(endPage + 1, totalPages))
    }
  }

  const handlePageClick = (pageNum: number) => {
    if (pageNum >= startPage && pageNum <= endPage) {
      setCurrentPage(pageNum)
    }
  }

  return (
    <div>
      <div className='grid grid-cols-[200px_200px] md:grid-cols-[200px_200px_200px] justify-center my-10 gap-10'>
        {books?.length === 0 && <div>아직 등록된 책이 없습니다.</div>}
        {paginatedBooks?.map((book) => (
          <div key={book.id}>
            <BookItem book={book} />
            <div>저자 : {book.authors.join(', ')}</div>
            <div>수량 : {book.quantity}</div>
          </div>
        ))}
      </div>
      {books.length > 0 && (
        <section className='flex gap-4 mt-4 justify-center'>
          <button onClick={() => handlePageArrow('prev')} disabled={startPage === 1}>
            이전
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
            (pageNum) => (
              <button
                onClick={() => handlePageClick(pageNum)}
                className={`
              ${currentPage === pageNum ? 'text-blue-500' : ''}
              `}
                key={pageNum}
              >
                {pageNum}
              </button>
            )
          )}
          <button onClick={() => handlePageArrow('next')} disabled={endPage === totalPages}>
            다음
          </button>
        </section>
      )}
    </div>
  )
}

export default BookList
