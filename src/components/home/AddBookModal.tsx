import { BookData } from '@/type'
import { useEffect, useState } from 'react'
import ModalContainer from './ModalContainer'

interface Props {
  onClose: () => void
  handleSaleButton: (book: BookData) => void
}

const AddBookModal = ({ onClose, handleSaleButton }: Props) => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState<BookData[] | []>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      const searchBooks = async () => {
        setError(null)

        if (query?.length > 0) {
          try {
            const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${query}`, {
              method: 'GET',
              headers: {
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
              },
            })

            if (!response.ok) {
              throw new Error('책 검색에 실패했습니다.')
            }

            const data = await response.json()
            setData(data.documents || [])
          } catch (error) {
            console.error(error)
            setError('책 검색에 실패했습니다. 잠시 후 다시 시도해주세요.')
          }
        }
      }

      searchBooks()
    }, 500)

    // 클린업 함수로 타이머 제거
    return () => clearTimeout(timerId)
  }, [query])

  return (
    <ModalContainer modal='add' onClick={onClose}>
      <div className='flex justify-center w-[60%] mx-auto'>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='책 제목 검색하기'
          className='w-[300px] border rounded-md px-2 h-[30px]'
        />
      </div>

      {/* 도서 API 검색결과 */}
      <div className='grid grid-cols-[200px_200px_200px] gap-3 overflow-y-scroll'>
        {data?.map((book, i) => (
          <div key={i} className='w-[180px] text-center'>
            <div className=' text-sm'>{book?.title}</div>
            {book.thumbnail && (
              <div className='flex justify-center my-4'>
                <img src={book.thumbnail} alt={`${book.title} 표지`} />
              </div>
            )}
            <button className='bg-slate-300 p-2 text-sm' onClick={() => handleSaleButton(book)}>
              판매 등록
            </button>
          </div>
        ))}
        {error && <div className='col-span-3 text-center text-red-500'>{error}</div>}
      </div>

      {query && data.length === 0 && <div className='text-center'>검색 결과가 없습니다.</div>}
    </ModalContainer>
  )
}

export default AddBookModal
