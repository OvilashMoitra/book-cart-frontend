import { Link } from "react-router-dom";
import { IAddBookResponse } from "../../pages/AddBooks"
import { IBook } from "../../types/book.interface"

const BookCard = ({book}: { book: IBook }) => {
  console.log(book.name);
  return (
    <div className="card w-96 glass">
  <figure><img src={book.imageUrl} alt="car!"/></figure>
  <div className="card-body">
        <h2 className="card-title">Name: {book?.name}</h2>
        <p>Author: {book.author}</p>
        <p>Genre: {book.genre}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Wishlist</button>
          <Link to={`/book/${book._id}`}>
            <button className="btn btn-primary">Read more!</button>
            </Link>
    </div>
  </div>
</div>
  )
}

export default BookCard