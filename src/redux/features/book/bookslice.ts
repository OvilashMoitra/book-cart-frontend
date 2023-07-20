import { createSlice } from '@reduxjs/toolkit'
import { IBook } from '../../../types/book.interface'

export interface IBookFilter {
    year: number | null,
    genre: string | null
}

const initialState: IBookFilter = {
    year: null,
    genre: null
}

export const bookFilterSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setYear: (state, action) => {
            state.year = action.payload
        },
        removeYear: (state) => {
            state.year = null
        },
        setGenre: (state, action) => {
            state.genre = action.payload
        },
        removeGenre: (state) => {
            state.genre = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { setYear, removeYear, setGenre, removeGenre } = bookFilterSlice.actions

export default bookFilterSlice.reducer