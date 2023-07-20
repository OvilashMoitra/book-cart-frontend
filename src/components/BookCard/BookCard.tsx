import { Link } from "react-router-dom";
import { IBook } from "../../types/book.interface"
import { useGetUserInfoQuery } from "../../redux/features/user/userApiSlice";
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useSingleUserWishlistQuery } from "../../redux/features/wishlist/wishlistApiSlice";
import { useEffect, useState } from "react";
import { FiBookmark } from 'react-icons/fi'
const BookCard = ({ book }: { book: IBook }) => {
  const [allWishlistBooks, setAllWishlistBooks] = useState<string[]>([])
  const token = localStorage.getItem('token')
  const [addToWishlist] = useAddToWishlistMutation()
  const [removeFromWishlist] = useRemoveFromWishlistMutation()
  const { data: userInfo } = useGetUserInfoQuery(token!)
  const { data: userWishList, isSuccess: wishListFetchSuccuess } = useSingleUserWishlistQuery(userInfo?.data?._id)

  

  useEffect(() => {
    if (wishListFetchSuccuess) {
      console.log(userWishList)
      const wishListBooksId: string[] = userWishList?.data?.map(({ bookId }:{bookId:IBook}) => bookId?._id)
      setAllWishlistBooks(wishListBooksId)
    }
  }, [wishListFetchSuccuess,userWishList])

  const handleAddBook = () => {
    const wishList = { bookId: book._id, userId: userInfo?.data?._id }
    addToWishlist(wishList)
  }
  const handleRemoveBook = () => {
    const wishList = { bookId: book._id, userId: userInfo?.data?._id }
    removeFromWishlist(wishList)
  }
  console.log(allWishlistBooks)
  // console.log("book_id",book?._id);
  // console.log(allWishlistBooks.includes(book?._id));

  return (
    <div className="card w-96 glass">
  <figure><img className="h-[350px]" src={book.imageUrl} alt="car!"/></figure>
  <div className="card-body">
        <div className="flex justify-between">
          <div>
            <h2 className="card-title">Name: {book?.name}</h2>
            {/* <p> id :{book?._id}</p> */}
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <div className="card-actions justify-end">

              {/* <FiBookmark/> */}
              {!allWishlistBooks.includes(book?._id) ?
                <button onClick={handleAddBook} className="btn btn-primary">Wishlist</button>
                :
                <button onClick={handleRemoveBook} className="btn btn-primary">Remove From Wishlist</button>
              }

          <Link to={`/book/${book._id}`}>
            <button className="btn btn-primary">Read more!</button>
            </Link>
            </div>
          </div>
          <div>
            {allWishlistBooks.includes(book?._id) ? <FiBookmark className="text-green-700 font-extrabold text-3xl"/> : null}
          </div>
    </div>
  </div>
</div>
  )
}

export default BookCard