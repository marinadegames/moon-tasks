// imports
import {setErrorAppAC, setStatusAppAC} from "./appReducer";
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
                console.log("YOU IS LOGGED!")
            } else {
                dispatch(setErrorAppAC({error: 'ERROR!'}))
                dispatch(setIsLoggedInAC({value: false}))
                console.log('ERROR!!!')
            }
        } catch (e) {
            console.error(e)
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
                console.log("logout")
            } else {
                dispatch(setErrorAppAC({error: 'ERROR!'}))
                console.log('ERROR!!!')
            }
        } catch (e) {
            console.error(e)
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
                console.log("logout")
            } else {
                console.log('ERROR!!!')
            }
        } catch (e) {
            console.error(e)
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
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions

