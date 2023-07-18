import BookCard from '../components/BookCard/BookCard'
import Footer from '../components/Footer/Footer'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import { useGetAllBooksQuery } from '../redux/features/book/bookApiSlice'

const Home = () => {
  const { data } = useGetAllBooksQuery(undefined)
  return (
    <div className='w-[90vw] mx-auto'>
      <NavigationBar />
      <div className='flex flex-wrap gap-10 my-10 w-[90vw] mx-auto justify-center '>

{data?.data.slice(0,10).map((book) => <BookCard book={book} />)}
</div>
      <Footer/>
    </div>
  )
}

export default Home