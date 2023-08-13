/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAddBooksMutation } from '../redux/features/book/bookApiSlice';
import toast from 'react-hot-toast';
import { useState } from 'react';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';



export type IAddBookResponse = {
    imageUrl: string,
    name: string,
    genre: string,
  publicationYear?: number;
    author: string,
    addedBy: string
}

const AddBooks = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [addBooks] = useAddBooksMutation()

  const {
    register,
    handleSubmit,
  } = useForm<IAddBookResponse >()



  const onSubmit: SubmitHandler<IAddBookResponse> = async (data) => {
    const date = new Date(value)
  // data.publicationYear = Number(moment(data.publicationYear).format('YYYY'))
    const token = localStorage.getItem('bookcart_token')
    // console.log(date.getFullYear());
    console.log({ ...data, publicationYear: date.getFullYear() });
    await addBooks({ data: { ...data, publicationYear: date.getFullYear() }, token: token! })
    toast.success('book added')
    navigate('/books')
  }
  return (
    <div>
      <NavigationBar />
       <div className='flex items-center h-screen'>
        <form onSubmit={handleSubmit(onSubmit)}  className='md:w-[550px] w-[90vw] rounded-2xl p-10 mx-auto border-black border-solid border-2'>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="name" {...register("name", { required: true })} placeholder='book name'/>
          <input onChange={e => setValue(e.target.value)} className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="date" placeholder='publication year' />
          {/* <div className='block bg-slate-200 w-full p-5 rounded-lg m-3'>
            <p>publication year</p>
            <DatePicker onChange={onChange} value={value} />
          </div> */}
          {/* <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text"  {...register("addedBy", { required: true })} placeholder='added by' /> */}
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text" id=""  {...register("genre", { required: true })}  placeholder='genre'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="url"  {...register("imageUrl", { required: true })} placeholder='book image url'/>
          <input className='block bg-slate-200 w-full p-5 rounded-lg m-3' type="text"  {...register("author", { required: true })} placeholder='book author'/>
          <input className='btn btn-sm block mx-auto' type="submit" value="Add Books" />
    </form>
      </div>
      <Footer />
    </div>
  )
}

export default AddBooks