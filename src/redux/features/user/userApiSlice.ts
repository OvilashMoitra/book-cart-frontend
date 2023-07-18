import { IUser } from '../../../types/user.interface';
import { bookCartApi } from "../../api/apiSlice"


const userApiSlice = bookCartApi.injectEndpoints({
    endpoints: (build) => ({
        signupUser: build.mutation({
            query: (userCredential: IUser) => ({
                url: "/user/signup",
                method: "POST",
                body: userCredential
            }),
        }),
        getUserInfo: build.query({
            query: (token: string) => ({
                url: "/user/",
                method: "GET",
                headers: { "authorization": token }
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useSignupUserMutation, useGetUserInfoQuery } = userApiSlice