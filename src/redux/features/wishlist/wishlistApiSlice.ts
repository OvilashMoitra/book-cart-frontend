import { IAddBookResponse } from '../../../pages/AddBooks';
import { bookCartApi } from './../../api/apiSlice';

export type IWishListPayload = {
    bookId: string,
    userId: string
}

const bookApiSlice = bookCartApi.injectEndpoints({
    endpoints: (builder) => ({
        addToWishlist: builder.mutation({
            query: (wishlist: IWishListPayload) => ({
                url: "/wishlist",
                method: "POST",
                body: wishlist
            }),
            invalidatesTags: ['wishlists']
        }),
        removeFromWishlist: builder.mutation({
            query: (wishlist: IWishListPayload) => ({
                url: "/wishlist",
                method: "DELETE",
                body: wishlist
            }),
            invalidatesTags: ['wishlists']
        }),
        singleUserWishlist: builder.query({
            query: (id) => ({
                url: `/wishlist/${id}`,
                method: "GET",
            }),
            providesTags: ['wishlists']
        }),

    }),
})

export const { useAddToWishlistMutation, useSingleUserWishlistQuery, useRemoveFromWishlistMutation } = bookApiSlice