import { IAddBookResponse } from "../../../pages/AddBooks";
import { IAllBookResponse } from "../../../pages/AllBooks";
import { IBook } from "../../../types/book.interface";
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
        }),
        getAllBooks: builder.query<IAllBookResponse, undefined>({
            query: (param) => ({
                url: "/book",
                // method: "GET",
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                params: param
            })
        }),
        getSingleBook: builder.query({
            query: (id) => ({
                url: `/book/${id}`,
                method: "GET",
            })
        }),
    }),
})

export const { useAddBooksMutation, useGetAllBooksQuery, useGetSingleBookQuery } = bookApiSlice