import BookCard from "../components/BookCard/BookCard"
import Footer from "../components/Footer/Footer"
import NavigationBar from "../components/NavigationBar/NavigationBar"
import { useGetUserInfoQuery } from "../redux/features/user/userApiSlice"
import { IWishListPayload, useRemoveFromWishlistMutation, useSingleUserWishlistQuery } from "../redux/features/wishlist/wishlistApiSlice"
import { IBook } from "../types/book.interface"

const Wishlists = () => {
    const token = localStorage.getItem('token')
    const { data: userInfo } = useGetUserInfoQuery(token!)
    const { data: wishlists } = useSingleUserWishlistQuery(userInfo?.data?._id)
    const [removeFromWishList] = useRemoveFromWishlistMutation()

    const handleRemoveWishlist = (bookId: string) => {

        const bookWishlist: IWishListPayload = {
            bookId: bookId,
            userId: userInfo?.data?._id
        }
        removeFromWishList(bookWishlist)

    }

    return (
        <div>
            <NavigationBar />
            <div className="overflow-x-auto w-[80vw] mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Publication Year</th>
                            <th>Author</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlists?.data?.map(({ bookId, userId }) => <tr>
                            <td>
                                {bookId?.name}
                            </td>
                            <td>
                                {bookId?.publicationYear}
                            </td>
                            <td>{bookId?.author}</td>
                            <th>
                                <button
                                    className="btn btn-error btn-xs"
                                    onClick={() => handleRemoveWishlist(bookId?._id)}
                                >Remove
                                </button>
                            </th>
                        </tr>)}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Publication year</th>
                            <th>Author</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
            <Footer />
        </div>
    )
}

export default Wishlists