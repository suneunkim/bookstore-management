import Header from '@/components/Header'
import DeleteBookButton from '@/components/home/book/DeleteBookButton'
import { getBookById } from '@/lib/firebase/books'
import Link from 'next/link'

const DetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const book = await getBookById(id)

  if (!book) {
    return <div>책을 찾을 수 없습니다.</div>
  }

  return (
    <div>
      <section className='flex flex-col gap-5 items-center'>
        <Header />
        <div className='flex gap-2'>
          <h3>제목: {book?.title}</h3>
          <p>
            저자: {book.authors[0]} {book.authors.length > 1 && '그 외'}
          </p>
        </div>
        <img src={book?.thumbnail} alt={`${book?.title} 표지`} />
        <div className='w-[450px] flex flex-col gap-3'>
          <p>책 소개</p>
          <div className='w-full h-[280px] border-2 resize-none rounded-md p-2'>
            {book.contents}
          </div>
          <div>수량 : {book.quantity}권</div>
        </div>
      </section>
      <div className='mt-6 flex justify-center gap-20'>
        <Link
          href={`/books/${id}/edit`}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          수정하기
        </Link>
        <DeleteBookButton />
      </div>
    </div>
  )
}

export default DetailPage
