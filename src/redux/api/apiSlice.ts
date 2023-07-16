import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const bookCartApi = createApi({
    reducerPath: 'bookCartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/api/v1' }),
    endpoints: (builder) => ({}),
})

