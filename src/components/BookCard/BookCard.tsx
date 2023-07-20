import { Link } from "react-router-dom";
import { IBook } from "../../types/book.interface"
import { useGetUserInfoQuery } from "../../redux/features/user/userApiSlice";
import { useAddToWishlistMutation, useSingleUserWishlistQuery } from "../../redux/features/wishlist/wishlistApiSlice";
import { useEffect, useState } from "react";
import { FiBookmark } from 'react-icons/fi'
import { IUser } from "../../types/user.interface";
const BookCard = ({ book }: { book: IBook }) => {
  const [allWishlistBooks, setAllWishlistBooks] = useState<string[]>([])
  const token = localStorage.getItem('token')
  const [addToWishlist] = useAddToWishlistMutation()
  const { data: userInfo } = useGetUserInfoQuery(token!)
  const { data: userWishList, isSuccess: wishListFetchSuccuess } = useSingleUserWishlistQuery(userInfo?.data?._id)


  useEffect(() => {
    if (wishListFetchSuccuess) {
      console.log(userWishList)
      const wishListBooksId: string[] = userWishList.data.map(({ bookId, userId }) => bookId._id)
      setAllWishlistBooks(wishListBooksId)
    }
  }, [wishListFetchSuccuess,userWishList])

  const handleAddBook = () => {
    const wishList = { bookId: book._id, userId: userInfo?.data?._id }
    addToWishlist(wishList)
  }
  console.log(allWishlistBooks)
  // console.log("book_id",book?._id);
  // console.log(allWishlistBooks.includes(book?._id));

  return (
    <div className="card w-96 glass">
  <figure><img src={book.imageUrl} alt="car!"/></figure>
  <div className="card-body">
        <div className="flex justify-between">
          <div>
            <h2 className="card-title">Name: {book?.name}</h2>
            <p> id :{book?._id}</p>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <div className="card-actions justify-end">

              {/* <FiBookmark/> */}
              <button onClick={handleAddBook} className="btn btn-primary">Wishlist</button>

          <Link to={`/book/${book._id}`}>
            <button className="btn btn-primary">Read more!</button>
            </Link>
            </div>
          </div>
          <div>
            {allWishlistBooks.includes(book?._id) ? <FiBookmark /> : null}
          </div>
    </div>
  </div>
</div>
  )
}

export default BookCard