import { getBookById } from '@/lib/firebase/books'

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const book = await getBookById(id)

  if (!book) {
    return <div>책을 찾을 수 없습니다.</div>
  }

  return (
    <div>
      {book && (
        <div>
          <section className='flex flex-col gap-5 items-center'>
            <h3>제목: {book?.title}</h3>
            <p>
              저자: {book.authors[0]} {book.authors.length > 1 && '그 외'}
            </p>
            <img src={book?.thumbnail} alt={`${book?.title} 표지`} />
            <div className='w-[450px] flex flex-col gap-3'>
              <p>책 소개</p>
              <div className='w-full h-[280px] border-2 resize-none rounded-md p-2'>
                {book.contents}
              </div>
              <div>수량 : {book.quantity}권</div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default DetailPage
