import { BeatLoader } from 'react-spinners'
import BookCard from '../components/BookCard/BookCard'
import Footer from '../components/Footer/Footer'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import { useGetAllBooksQuery } from '../redux/features/book/bookApiSlice'

const Home = () => {
  const { data, isLoading } = useGetAllBooksQuery(undefined)
  let pageContent;
  if (isLoading) {
    pageContent = <div className='flex flex-wrap gap-10 my-10 w-[70%] mx-auto justify-center'>
      <BeatLoader color="#36d7b7" />
      <h4 className='text-2xl  font-extrabold'>Loading...</h4>
    </div>
  } else if (!isLoading && data) {
    pageContent = <>
      {data?.data.slice(0, 10).map((book) => <BookCard book={book} />)}
    </>

  }
  return (
    <div className='w-[90vw] mx-auto'>
      <NavigationBar />
      <div className='flex flex-wrap gap-10 my-10 w-[90vw] mx-auto justify-center '>
        {pageContent}
      </div>
      <Footer/>
    </div>
  )
}

export default Home