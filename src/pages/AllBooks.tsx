import React from 'react'
import { useGetAllBooksQuery } from '../redux/features/book/bookApiSlice'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import Footer from '../components/Footer/Footer'
import BookCard from '../components/BookCard/BookCard'


const AllBooks = () => {
  const { data, isLoading } = useGetAllBooksQuery(undefined)
  if (isLoading) <p>loading...</p>
  console.log(data.data)
  return (
    <div>
      <NavigationBar />
      {data.data?.map(book => <BookCard />)}
      <Footer />
    </div>
  )
}

export default AllBooks