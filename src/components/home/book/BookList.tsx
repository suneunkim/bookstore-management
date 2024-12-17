import { getBooks } from '@/firebase'
import BookItem from './BookItem'

const BookList = async () => {
  const books = await getBooks()
  console.log(books)
  return (
    <div className='grid grid-cols-[200px_200px] justify-center my-10'>
      {books.map((book) => (
        <BookItem book={book} />
      ))}
    </div>
  )
}

export default BookList
