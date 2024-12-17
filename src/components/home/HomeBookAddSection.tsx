'use client'

import { useCallback, useState } from 'react'
import AddBookModal from './AddBookModal'
import { BookData } from '@/type'
import BookFormModal from './BookFormModal'

const HomeBookAddSection = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null)

  const openSearchModal = () => setIsSearchModalOpen(true)
  const closeSearchModal = () => setIsSearchModalOpen(false)

  const handleSaleButton = useCallback((book: BookData) => {
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
      <button onClick={openSearchModal}>책 추가하기</button>

      {isSearchModalOpen && (
        <AddBookModal onClose={closeSearchModal} handleSaleButton={handleSaleButton} />
      )}
      {isFormModalOpen && <BookFormModal onClose={closeFormModal} selectedBook={selectedBook} />}
    </div>
  )
}

export default HomeBookAddSection
