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
    }),
    overrideExisting: false,
})

export const { useSignupUserMutation } = userApiSlice