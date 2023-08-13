import { Link, useNavigate } from "react-router-dom"
import { useGetUserInfoQuery } from "../../redux/features/user/userApiSlice"

const NavigationBar = () => {
  const token = localStorage.getItem("bookcart_token")
  const {data,isLoading}=useGetUserInfoQuery(token!)
const navigate=useNavigate()
  const handleSingout = () => {
    localStorage.removeItem('bookcart_token')
    navigate('/login')
  }

  return (
    <div className="navbar bg-base-300 rounded-2xl p-3">
    <div className="flex-1">
      <Link to={'/'} className="btn btn-ghost normal-case text-xl">Book Cart</Link>
    </div>
    <div className="navbar-center">
        <Link to={'/books'} className="btn btn-ghost normal-case text-xl">All Books</Link>
        {token? <><Link to={'/wishlists'} className="btn btn-ghost normal-case text-xl">My wishlist</Link>
        <Link to={'/addBooks'} className="btn btn-ghost normal-case text-xl">Add Books</Link></>:null}
       
    </div>
    <div className="flex-none">
        <div className="navbar-center">
        <ul tabIndex={0} className=" mt-3 z-[1] p-5  rounded-box">
          {data?.data?.email && !isLoading?  <button onClick={handleSingout} className="btn btn-xs">Logout</button>:<Link to={'/login'}>Login</Link>}
        </ul>
      </div>
    </div>
  </div>
  )
}

export default NavigationBar