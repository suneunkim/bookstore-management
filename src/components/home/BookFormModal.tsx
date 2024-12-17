'use client'

import { BookData } from '@/type'
import ModalContainer from './ModalContainer'
import { useEffect, useState } from 'react'

interface Props {
  onclose: () => void
  selectedBook: BookData | null
}

const BookFormModal = ({ onclose, selectedBook }: Props) => {
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (selectedBook) {
      setDescription(selectedBook?.contents)
    }
  }, [selectedBook])

  // selectedBook이 없을 경우
  if (!selectedBook) {
    return (
      <ModalContainer modal='form' onClick={onclose}>
        <div className='text-center'>선택된 책이 없습니다.</div>
      </ModalContainer>
    )
  }

  return (
    <ModalContainer modal='form' onClick={onclose}>
      <section className='flex flex-col gap-5 items-center'>
        <h3>제목: {selectedBook?.title}</h3>
        <p>
          저자: {selectedBook?.authors[0]} {selectedBook.authors.length > 1 && '그 외'}
        </p>
        <img src={selectedBook?.thumbnail} alt={`${selectedBook?.title} 표지`} />
        <div className='w-[450px] flex flex-col gap-3'>
          <p>책 소개</p>
          <textarea
            className='w-full h-[280px] border-2 resize-none rounded-md p-2'
            name=''
            id=''
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </section>
    </ModalContainer>
  )
}

export default BookFormModal
