// imports
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "./authReducer";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

// types
export type InitialStateType = {
    status: StatusesType
    error: string | null
    initialized: boolean
}
export type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed'

// init
const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    initialized: false
}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatusAppAC(state, action: PayloadAction<{ status: StatusesType }>) {
            state.status = action.payload.status
        },
        setErrorAppAC(state, action: PayloadAction<{ error: string | null}>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.initialized = action.payload.value
        }
    }
})
export const appReducer = slice.reducer
export const {setStatusAppAC, setErrorAppAC, setAppInitializedAC} = slice.actions

// tc
export const initializedAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC({status: 'loading'}))
    authAPI.me()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setAppInitializedAC({value: true}))
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setStatusAppAC({status: 'idle'}))
            }
        })
        .finally(() => {
            dispatch(setAppInitializedAC({value: true}))
            dispatch(setStatusAppAC({status: 'idle'}))
        })

}