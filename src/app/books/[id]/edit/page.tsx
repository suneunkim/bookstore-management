'use client'

import BookForm from '@/components/home/book/BookForm'
import { getBookById, updateBook } from '@/lib/firebase/books'
import { BookData, BookFormData } from '@/type'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditPage = () => {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<BookData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true)
      try {
        const fetchedBook = await getBookById(id)
        if (!fetchedBook) {
          setErrorMessage('책을 찾을 수 없습니다')
          return
        }
        setBook(fetchedBook)
      } catch (error) {
        console.error(error)
        setErrorMessage('책 정보를 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const handleSubmit = async (formData: BookFormData) => {
    try {
      const result = await updateBook(id, {
        contents: formData.description,
        quantity: formData.quantity,
      })

      if (result.success) {
        router.push(`/books/${id}`)
      } else {
        alert('수정에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('Update error:', error)
      alert('수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  if (!id) return <div>잘못된 접근입니다.</div>

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      {isLoading && <div>로딩 중...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      {!isLoading && !errorMessage && book && (
        <>
          <h4>등록한 책 수정하기</h4>
          <BookForm onSubmit={handleSubmit} book={book} text='수정하기' />
        </>
      )}
    </div>
  )
}

export default EditPage
