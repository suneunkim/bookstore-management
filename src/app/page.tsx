import BookAddSection from '@/components/home/BookAddSection'
import Header from '@/components/Header'
import BookList from '@/components/home/book/BookList'
import { getBooks } from '@/lib/firebase/books'

interface Props {
  query?: string
  type?: 'title' | 'author'
}

const page = async ({ searchParams }: { searchParams: Promise<Props> }) => {
  const { type, query } = await searchParams

  const books = await getBooks(query, type)

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col justify-center'>
        <Header />
        <BookList books={books} />
        <BookAddSection />
      </div>
    </div>
  )
}

export default page
