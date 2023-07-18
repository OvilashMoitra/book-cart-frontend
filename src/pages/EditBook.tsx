/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {  useEditBookMutation, useGetSingleBookQuery } from '../redux/features/book/bookApiSlice';
import toast from 'react-hot-toast';


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
  const {id}=useParams()
  const [editBooks] = useEditBookMutation()
  const { data: book, isLoading } = useGetSingleBookQuery(id)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAddBookResponse >()



  const onSubmit: SubmitHandler<IAddBookResponse > = async(data) => {
    console.log("book edit",data)
    const token = localStorage.getItem('token')
    // console.log(token);
    await editBooks({ data,id })
    // toast.success('book added')
    // navigate('/books')
  }
  return (
    <div>
       <div className='flex items-center h-screen'>
        <form onSubmit={handleSubmit(onSubmit)}  className='md:w-[550px] w-[90vw] rounded-2xl p-10 mx-auto border-black border-solid border-2'>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="name" {...register("name", { required: true })} defaultValue={book?.data?.name} placeholder='book name'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="date" {...register("publicationYear", { required: true })} defaultValue={book?.data?.publicationYear} placeholder='publication year'/>
          {/* <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text"  {...register("addedBy", { required: true })} placeholder='added by'/> */}
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text" id=""  {...register("genre", { required: true })} defaultValue={book?.data?.genre}  placeholder='genre'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="url"  {...register("imageUrl", { required: true })} defaultValue={book?.data?.imageUrl} placeholder='book image url'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text"  {...register("author", { required: true })} defaultValue={book?.data?.author} placeholder='book author'/>
      <input className='btn btn-sm block mx-auto' type="submit" value="Sign up" />
    </form>
  </div>
    </div>
  )
}

export default EditBook