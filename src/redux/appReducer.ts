// imports
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "./authReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// types
export type InitialStateType = {
    status: StatusesType
    error: string | null
    notification: string | null
    initialized: boolean
}
export type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed'

// init
const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    notification: null,
    initialized: false,
}

// tc
export const initializedAppTC = createAsyncThunk(
    'app/initializedApp',
    async (payload: {}, {dispatch}) => {
        dispatch(setStatusAppAC({status: 'loading'}))
        try {
            const resp = await authAPI.me()
            if (resp.data.resultCode === 0) {
                dispatch(setAppInitializedAC({value: true}))
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setStatusAppAC({status: 'idle'}))
            }
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setAppInitializedAC({value: true}))
            dispatch(setStatusAppAC({status: 'idle'}))
        }
    })

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatusAppAC(state, action: PayloadAction<{ status: StatusesType }>) {
            state.status = action.payload.status
        },
        setErrorAppAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setNotificationAppAC(state, action: PayloadAction<{ notification: string | null }>) {
            state.notification = action.payload.notification
        },
        setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.initialized = action.payload.value
        },
    }
})
export const appReducer = slice.reducer
export const {setStatusAppAC,setNotificationAppAC, setErrorAppAC, setAppInitializedAC} = slice.actions


