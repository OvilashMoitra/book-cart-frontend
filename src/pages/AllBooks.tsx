import React from 'react'
import { useGetAllBooksQuery } from '../redux/features/book/bookApiSlice'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import Footer from '../components/Footer/Footer'
import BookCard from '../components/BookCard/BookCard'
import { IBook } from '../types/book.interface'
import { IAddBookResponse } from './AddBooks'

export type IAllBookResponse = { message: string, code: number, data: IBook[] }


const AllBooks = () => {
  const { data, isLoading } = useGetAllBooksQuery(undefined)
  if (isLoading) <p>loading...</p>
  console.log()
  return (
    <div>
      <NavigationBar />
      <div className='flex flex-wrap gap-10 my-10 w-[90vw] mx-auto justify-center '>

      {data?.data.map((book) => <BookCard book={book} />)}
      </div>
      <Footer />
    </div>
  )
}

export default AllBooks