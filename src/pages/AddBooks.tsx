/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAddBooksMutation } from '../redux/features/book/bookApiSlice';
import toast from 'react-hot-toast';


export type IAddBookResponse = {
    imageUrl: string,
    name: string,
    genre: string,
    publicationYear: number;
    author: string,
    addedBy: string
}

const AddBooks = () => {
  const navigate = useNavigate();
  const [addBooks] = useAddBooksMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAddBookResponse >()



  const onSubmit: SubmitHandler<IAddBookResponse > = async(data) => {
    console.log(data)
    const token = localStorage.getItem('token')
    console.log(token);
    await addBooks({ data,token:token! })
    toast.success('book added')
    navigate('/books')
  }
  return (
    <div>
       <div className='flex items-center h-screen'>
        <form onSubmit={handleSubmit(onSubmit)}  className='md:w-[550px] w-[90vw] rounded-2xl p-10 mx-auto border-black border-solid border-2'>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="name" {...register("name", { required: true })} placeholder='book name'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="date" {...register("publicationYear", { required: true })} placeholder='publication year'/>
          {/* <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text"  {...register("addedBy", { required: true })} placeholder='added by'/> */}
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text" id=""  {...register("genre", { required: true })}  placeholder='genre'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="url"  {...register("imageUrl", { required: true })} placeholder='book image url'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text"  {...register("author", { required: true })} placeholder='book author'/>
      <input className='btn btn-sm block mx-auto' type="submit" value="Sign up" />
    </form>
  </div>
    </div>
  )
}

export default AddBooks