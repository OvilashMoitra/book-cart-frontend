import { IAddBookResponse } from "../../../pages/AddBooks";
import { IAllBookResponse } from "../../../pages/AllBooks";
import { bookCartApi } from "../../api/apiSlice";

// const token=

const bookApiSlice = bookCartApi.injectEndpoints({
    endpoints: (builder) => ({
        addBooks: builder.mutation({
            query: (payload: { data: IAddBookResponse, token: string }) => ({
                url: "/book/",
                method: "POST",
                body: payload.data,
                headers: { "authorization": payload.token }
            }),
            invalidatesTags: ['books']

        }),
        getAllBooks: builder.query<IAllBookResponse, undefined>({
            query: (param) => ({
                url: "/book",
                // method: "GET",
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                params: param
            }),
            providesTags: ['books']
        }),
        getSingleBook: builder.query({
            query: (id) => ({
                url: `/book/${id}`,
                method: "GET",
            })
        }),
        editBook: builder.mutation({
            query: ({ data, id }) => ({
                url: `/book/${id}`,
                method: "PUT",
                body: data
            })
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/book/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['books']
        }),
    }),
})

export const { useAddBooksMutation, useGetAllBooksQuery, useGetSingleBookQuery, useDeleteBookMutation, useEditBookMutation } = bookApiSlice