import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBook } from '../../../types/book.interface'

export interface CounterState {
    bookCollection: IBook[]
}

const initialState: CounterState = {
    bookCollection: [],
}

export const counterSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {

    },
})

// Action creators are generated for each case reducer function
export const { } = bookSlice.actions

export default bookSlice.reducer