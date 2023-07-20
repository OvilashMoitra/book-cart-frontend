import NavigationBar from '../components/NavigationBar/NavigationBar'
import Footer from '../components/Footer/Footer'
import { useDeleteBookMutation, useGetSingleBookQuery } from '../redux/features/book/bookApiSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetUserInfoQuery } from '../redux/features/user/userApiSlice'
import swal from 'sweetalert'

const BookDetails = () => {
const navigate=useNavigate()
  const { id } = useParams()
  const token=localStorage.getItem("token")
  const { data: book, isLoading } = useGetSingleBookQuery(id)
  const { data: userInfo, isLoading: userLoading } = useGetUserInfoQuery(token!)
  const [deleteBook]=useDeleteBookMutation()
  if (isLoading || userLoading) <p>loading......</p>
  
  const handleBookDelete = async(bookId:string) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this book?",
      icon: "warning",
      dangerMode: true,
    });
     
    if (willDelete) {
      swal("Deleted!", "Your book has been deleted!", "success");
    }
    console.log(bookId);
    await deleteBook(bookId)
navigate('/books')
  }

  return (
    <div>
      <NavigationBar />
      <div className='w-[90vw] mx-auto bg-slate-50 rounded-3xl p-20 my-10'>
        <div className='flex justify-center items-center'>
        <img className='w-[500px] rounded-xl p-5' src={book?.data.imageUrl} alt="" />
          <div className='border-2 border-black border-solid p-20 rounded-3xl'>
          <h2 className="card-title">Name: {book?.name}</h2>
        <p>Author: {book?.data?.author}</p>
            <p>Genre: {book?.data?.genre}</p>
            {userInfo?.data?._id === book?.data?.addedBy ? <div className='my-4 flex justify-end'>
            <Link to={`/editBook/${book?.data?._id}`}>
                <button className='btn  btn-warning'>Edit Book</button>
                </Link>
              <button onClick={()=> handleBookDelete(book?.data?._id)}  className='btn btn-error'>Delete book</button>
            </div>:null}
            
        </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}

export default BookDetails