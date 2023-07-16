import { IAddBookResponse } from "../../../pages/AddBooks";
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
                headers: {
                    authorization: payload.token
                }
            }),
        })
    }),
})

export const { useAddBooksMutation } = bookApiSlice