import moment from "moment"
import { removeGenre, removeYear, setGenre, setYear } from "../../redux/features/book/bookslice"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { IBook } from "../../types/book.interface"
import { useEffect, useState } from "react"

const BookFilter = ({ books }: { books: IBook[] }) => {
const [yearArr,setYearArr]=useState<number[]>([])
const [genreArr,setGenreArr]=useState<string[]>([])
  useEffect(() => {
    if (books) {
      // unique year
      const yearArr = books.map(book => book.publicationYear)
      const uniqueYearArr = yearArr.filter((value, index) => yearArr.includes(value, index + 1) === false)
      setYearArr(uniqueYearArr)
      // unique genre
      const genreArr = books.map(book => book.genre)
      const uniqueGenreArr = genreArr.filter((value, index) => genreArr.includes(value, index + 1) === false)
      setGenreArr(uniqueGenreArr)
    }
  },[books])
  
  const dispatch = useAppDispatch()
  const { year,genre } = useAppSelector(state => state.bookFilter)
  
  const handleFilterYear = (givenYear: number) => {
    // if (year !== null) {
    //   dispatch(removeYear())
    // } else {
    // }
    dispatch(setYear(givenYear))
  }
  const handleFilterGenre = (givenGenre: string) => {
    // if (genre!== null) {
    //   dispatch(removeGenre())
    // } else {
    // }
    dispatch(setGenre(givenGenre))
  }


  return (
    <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">Filter by Year</h2>
      <div className="card-actions flex">
          {yearArr.map((bookYear) =>
            <button onClick={() => handleFilterYear(bookYear)} className={`btn ${bookYear===year?"btn-success":"btn-primary"}`}>
              {bookYear}
            </button>)
          }
      </div>
    </div>
    <div className="card-body">
      <h2 className="card-title">Filter by Genre</h2>
      <div className="card-actions flex">
          {genreArr.map((bookGenre) => <button onClick={() => handleFilterGenre(bookGenre)} className={`btn ${bookGenre===genre?"btn-success":"btn-primary"}`}
          >{bookGenre}</button>)}
      </div>
    </div>
  </div>
  )
}

export default BookFilter