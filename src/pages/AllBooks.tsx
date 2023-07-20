import { useGetAllBooksQuery } from '../redux/features/book/bookApiSlice'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import Footer from '../components/Footer/Footer'
import BookCard from '../components/BookCard/BookCard'
import { IBook } from '../types/book.interface'
import BookFilter from '../components/BookFilter/BookFilter'
import { useAppSelector } from '../redux/hook'



export type IAllBookResponse = { message: string, code: number, data: IBook[] }


const AllBooks = () => {

  const { genre, year } = useAppSelector(state => state.bookFilter)
  const { data, isLoading, } = useGetAllBooksQuery(undefined)


  if (isLoading) <p>loading...</p>

  data?.data?.filter(book => console.log(book?.publicationYear === year))

  let allBooks;
  if (genre !== null && year === null) {
    allBooks = <div className='flex flex-wrap gap-10 my-10 w-[70%] mx-auto justify-center '>
      {data?.data?.filter(book => book.genre === genre).map((book) => <BookCard book={book} />)}
    </div>
  } else if (genre === null && year !== null) {
    allBooks = <div className='flex flex-wrap gap-10 my-10 w-[70%] mx-auto justify-center '>
      {data?.data?.filter(book => book?.publicationYear === year).map((book) => <BookCard book={book} />)}
    </div>
  } else if (genre !== null && year !== null) {
    allBooks = <div className='flex flex-wrap gap-10 my-10 w-[70%] mx-auto justify-center '>
      {data?.data?.filter(book => book?.publicationYear === year).filter(book => book.genre === genre).map((book) => <BookCard book={book} />)}
    </div>
  } else {
    allBooks = <div className='flex flex-wrap gap-10 my-10 w-[70%] mx-auto justify-center '>
      {data?.data?.map((book) => <BookCard book={book} />)}
    </div>
  }

  return (
    <div>
      <NavigationBar />
      <div className='flex w-[95vw] mx-auto justify-between'>
        {allBooks}
        <div className='w-[25%]'>
          <BookFilter books={data?.data as IBook[]} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AllBooks