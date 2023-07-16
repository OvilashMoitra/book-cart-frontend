import { configureStore } from "@reduxjs/toolkit";
import { bookCartApi } from "./api/apiSlice";


export const store = configureStore({
    reducer: {
        [bookCartApi.reducerPath]: bookCartApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookCartApi.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch