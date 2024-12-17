'use client'

import { BookData } from '@/type'
import ModalContainer from './ModalContainer'
import { useEffect, useState } from 'react'
import { addBook } from '@/firebase'
interface Props {
  onClose: () => void
  selectedBook: BookData | null
}

const BookFormModal = ({ onClose, selectedBook }: Props) => {
  const authors = selectedBook?.authors?.length ? selectedBook.authors : ['알 수 없음']
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (selectedBook) {
      setDescription(selectedBook?.contents)
    }
  }, [selectedBook])

  // selectedBook이 없을 경우
  if (!selectedBook) {
    return (
      <ModalContainer modal='form' onClick={onClose}>
        <div className='text-center'>선택된 책이 없습니다.</div>
      </ModalContainer>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBook) return
    const book: BookData & { quantity: number } = {
      title: selectedBook.title,
      authors: authors,
      contents: description,
      thumbnail: selectedBook.thumbnail,
      quantity: quantity,
    }
    try {
      const result = await addBook(book)

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
      <section className='flex flex-col gap-5 items-center'>
        <h3>제목: {selectedBook?.title}</h3>
        <p>
          저자: {authors[0]} {authors.length > 1 && '그 외'}
        </p>
        <img src={selectedBook?.thumbnail} alt={`${selectedBook?.title} 표지`} />
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
          />
          <button>등록하기</button>
        </form>
      </section>
    </ModalContainer>
  )
}

export default BookFormModal
