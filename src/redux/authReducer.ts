// imports
import {setErrorAppAC, setStatusAppAC} from "./appReducer";
import {authAPI, LoginDataType} from "../api/todolist-api";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

// types
type InitStateType = {
    isLoggedIn: boolean
}

// init state
const initState: InitStateType = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions

//tc
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC({status: 'loading'}))
    authAPI.login(data)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setStatusAppAC({status: 'succeeded'}))
                console.log("YOU IS LOGGED!")
            } else {
                dispatch(setErrorAppAC({error: 'ERROR!'}))
                dispatch(setIsLoggedInAC({value: false}))
                console.log('ERROR!!!')
            }
        })
        .finally(() => {
            dispatch(setStatusAppAC({status: 'idle'}))
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC({status: 'loading'}))
    authAPI.logout()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setStatusAppAC({status: 'succeeded'}))
                console.log("logout")
            } else {
                dispatch(setErrorAppAC({error: 'ERROR!'}))
                console.log('ERROR!!!')
            }
        })
        .finally(() => {
            dispatch(setStatusAppAC({status: 'idle'}))
        })
}
export const me = () => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC({status: 'loading'}))
    authAPI.me()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                console.log("logout")
            } else {

                console.log('ERROR!!!')
            }
        })
        .finally(() => {
            dispatch(setStatusAppAC({status: 'idle'}))
        })
}

