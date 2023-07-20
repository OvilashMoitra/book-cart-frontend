import { Link, useNavigate } from "react-router-dom"
import { useGetUserInfoQuery } from "../../redux/features/user/userApiSlice"

const NavigationBar = () => {
  const token = localStorage.getItem("token")
  const {data}=useGetUserInfoQuery(token!)
const navigate=useNavigate()
  const handleSingout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="navbar bg-base-300 rounded-2xl p-3">
    <div className="flex-1">
      <Link to={'/'} className="btn btn-ghost normal-case text-xl">Book Cart</Link>
    </div>
    <div className="navbar-center">
        <Link to={'/books'} className="btn btn-ghost normal-case text-xl">All Books</Link>
        <Link to={'/wishlists'} className="btn btn-ghost normal-case text-xl">My wishlist</Link>
        <Link to={'/addBooks'} className="btn btn-ghost normal-case text-xl">Add Books</Link>
    </div>
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </label>
      </div>
        <div className="navbar-center">
        <ul tabIndex={0} className=" mt-3 z-[1] p-5  rounded-box">
          {data?.data?.email?  <button onClick={handleSingout} className="btn btn-xs">Logout</button>:<Link to={'/login'}>Login</Link>}
        </ul>
      </div>
    </div>
  </div>
  )
}

export default NavigationBar