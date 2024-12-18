'use client'

import { useCallback, useState } from 'react'
import AddBookModal from './modal/AddBookModal'
import { ApiBookData } from '@/type'
import BookFormModal from './modal/BookFormModal'

const BookAddSection = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<ApiBookData | null>(null)

  const openSearchModal = () => setIsSearchModalOpen(true)
  const closeSearchModal = () => setIsSearchModalOpen(false)

  const handleSaleButton = useCallback((book: ApiBookData) => {
    setSelectedBook(book)
    setIsSearchModalOpen(false)
    setIsFormModalOpen(true)
  }, [])

  const closeFormModal = () => {
    setIsFormModalOpen(false)
    setSelectedBook(null)
  }

  return (
    <div>
      <button data-cy='add-book-button' onClick={openSearchModal}>
        책 추가하기
      </button>

      {isSearchModalOpen && (
        <AddBookModal onClose={closeSearchModal} handleSaleButton={handleSaleButton} />
      )}
      {isFormModalOpen && <BookFormModal onClose={closeFormModal} selectedBook={selectedBook} />}
    </div>
  )
}

export default BookAddSection
