'use client'

import { ApiBookData, BookData, BookFormData } from '@/type'
import ModalContainer from './ModalContainer'
import addBookAction from '@/app/actions'
import BookForm from '../book/BookForm'

interface Props {
  onClose: () => void
  selectedBook: ApiBookData | null
}

const BookFormModal = ({ onClose, selectedBook }: Props) => {
  if (!selectedBook) {
    return (
      <ModalContainer modal='form' onClick={onClose}>
        <div className='text-center'>선택된 책이 없습니다.</div>
      </ModalContainer>
    )
  }

  const handleSubmit = async (formData: BookFormData) => {
    try {
      const book: BookData = {
        title: selectedBook.title,
        thumbnail: selectedBook.thumbnail,
        authors: formData.authors,
        contents: formData.description,
        quantity: formData.quantity,
      }

      const result = await addBookAction(book)

      if (result.success) {
        alert('책이 등록되었습니다.')
        onClose()
      } else {
        alert('책 등록에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      alert('책 등록 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.')
      console.error('책 등록 중 오류', error)
    }
  }

  return (
    <ModalContainer modal='form' onClick={onClose}>
      <BookForm onSubmit={handleSubmit} book={selectedBook} text='등록하기' />
    </ModalContainer>
  )
}

export default BookFormModal
