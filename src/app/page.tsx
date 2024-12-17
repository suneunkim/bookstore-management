import BookAddSection from '@/components/home/BookAddSection'
import Header from '@/components/Header'
import BookList from '@/components/home/book/BookList'

const page = async () => {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col justify-center'>
        <Header />
        <BookList />
        <BookAddSection />
      </div>
    </div>
  )
}

export default page
