import BookAddSection from '@/components/home/BookAddSection'
import Header from '@/components/Header'
import BookList from '@/components/home/book/BookList'
import { getBooks } from '@/firebase'

const page = async () => {
  const books = await getBooks()

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
