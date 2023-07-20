/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {  useEditBookMutation, useGetSingleBookQuery } from '../redux/features/book/bookApiSlice';
import toast from 'react-hot-toast';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import { useState } from 'react';


export type IAddBookResponse = {
    imageUrl: string,
    name: string,
    genre: string,
    publicationYear: number;
    author: string,
    addedBy: string
}

const EditBook = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const {id}=useParams()
  const [editBooks] = useEditBookMutation()
  const { data: book } = useGetSingleBookQuery(id)

  const {
    register,
    handleSubmit,
  } = useForm<IAddBookResponse >()



  const onSubmit: SubmitHandler<IAddBookResponse> = async (data) => {
    const date = new Date(value)
    await editBooks({ data:{ ...data, publicationYear: date.getFullYear() },id })
    toast.success('book added')
    navigate('/books')
  }
  return (
    <div>
      <NavigationBar/>
       <div className='flex items-center h-screen'>
        <form onSubmit={handleSubmit(onSubmit)}  className='md:w-[550px] w-[90vw] rounded-2xl p-10 mx-auto border-black border-solid border-2'>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="name" {...register("name", { required: true })} defaultValue={book?.data?.name} placeholder='book name'/>
          <input onChange={e => setValue(e.target.value)} className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="date" placeholder='publication year' />
          {/* <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text"  {...register("addedBy", { required: true })} placeholder='added by'/> */}
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text" id=""  {...register("genre", { required: true })} defaultValue={book?.data?.genre}  placeholder='genre'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="url"  {...register("imageUrl", { required: true })} defaultValue={book?.data?.imageUrl} placeholder='book image url'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text"  {...register("author", { required: true })} defaultValue={book?.data?.author} placeholder='book author'/>
      <input className='btn btn-sm block mx-auto' type="submit" value="Edit book" />
    </form>
      </div>
      <Footer/>
    </div>
  )
}

export default EditBook