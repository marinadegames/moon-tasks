// imports
import {setErrorAppAC, setNotificationAppAC, setStatusAppAC} from "./appReducer";
import {authAPI, LoginDataType} from "../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// types
type InitStateType = {
    isLoggedIn: boolean
}

// init state
const initState: InitStateType = {
    isLoggedIn: false
}

//tc
export const loginTC = createAsyncThunk(
    'auth/login',
    async (payload: { data: LoginDataType }, {dispatch}) => {
        dispatch(setStatusAppAC({status: 'loading'}))
        try {
            const resp = await authAPI.login(payload.data)
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setStatusAppAC({status: 'succeeded'}))
                dispatch(setNotificationAppAC({notification: 'Login successful!'}))
            } else {
                dispatch(setErrorAppAC({error: 'Error login!'}))
                dispatch(setIsLoggedInAC({value: false}))
            }
        } catch (e) {
            console.error(e)
            dispatch(setErrorAppAC({error: 'Unknown error!'}))
        } finally {
            dispatch(setStatusAppAC({status: 'idle'}))
        }
    })

export const logoutTC = createAsyncThunk(
    'auth/logout',
    async (payload: {}, {dispatch}) => {
        dispatch(setStatusAppAC({status: 'loading'}))
        try {
            const resp = await authAPI.logout()
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setStatusAppAC({status: 'succeeded'}))
                dispatch(setNotificationAppAC({notification: 'Logout successful!'}))
            } else {
                dispatch(setErrorAppAC({error: 'Logout error!'}))
            }
        } catch (e) {
            dispatch(setErrorAppAC({error: 'Logout error!'}))
        } finally {
            dispatch(setStatusAppAC({status: 'idle'}))
        }
    })

export const me = createAsyncThunk(
    'auth/me',
    async (payload: {}, {dispatch}) => {
        dispatch(setStatusAppAC({status: 'loading'}))
        try {
            const resp = await authAPI.logout()
            if (resp.data.resultCode === 0) {
                dispatch(setNotificationAppAC({notification: 'You auth!'}))
            } else {
                dispatch(setErrorAppAC({error: 'Unknown error!'}))
            }
        } catch (e) {
            dispatch(setErrorAppAC({error: 'Unknown error!'}))
        } finally {
            dispatch(setStatusAppAC({status: 'idle'}))
        }
    })


const slice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions

