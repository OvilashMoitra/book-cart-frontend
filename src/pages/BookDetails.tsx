import React from 'react'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import Footer from '../components/Footer/Footer'
import { useGetSingleBookQuery } from '../redux/features/book/bookApiSlice'
import { useParams } from 'react-router-dom'
import { useGetUserInfoQuery } from '../redux/features/user/userApiSlice'

const BookDetails = () => {

  const { id } = useParams()
  const token=localStorage.getItem("token")
  const { data: book, isLoading } = useGetSingleBookQuery(id)
  const {data:userInfo,isLoading:userLoading}=useGetUserInfoQuery(token!)
  if(isLoading || userLoading)<p>loading......</p>
console.log(userInfo);
  return (
    <div>
      <NavigationBar />
      <div className='w-[90vw] mx-auto bg-slate-50 rounded-3xl p-20 my-10'>
        <div className='flex justify-center items-center'>
        <img className='w-[500px] rounded-xl p-5' src={book?.data.imageUrl} alt="" />
          <div className='border-2 border-black border-solid p-20 rounded-3xl'>
          <h2 className="card-title">Name: {book?.name}</h2>
        <p>Author: {book?.data.author}</p>
            <p>Genre: {book?.data.genre}</p>
            {userInfo?.data?._id===book?.addedBy?<div>
              <button>Edit Book</button>
              <button>Delete book</button>
            </div>:null}
            
        </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}

export default BookDetails