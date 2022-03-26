// imports
import {Dispatch} from "redux"
import {setErrorAppAC, setStatusAppAC} from "./appReducer";
import {authAPI, LoginDataType} from "../api/todolist-api";


// init state
const initState: InitStateType = {
    isLoggedIn: false
}

// reducer
export const authReducer = (state = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "login/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// ac
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET_IS_LOGGED_IN', value})

//tc
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<any>) => {
    dispatch(setStatusAppAC('loading'))
    authAPI.login(data)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAppAC('succeeded'))
                console.log("YOU IS LOGGED!")
            } else {
                dispatch(setErrorAppAC('ERROR!'))
                dispatch(setIsLoggedInAC(false))
                console.log('ERROR!!!')
            }
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'))
        })
}
export const logoutTC = () => (dispatch: Dispatch<any>) => {
    dispatch(setStatusAppAC('loading'))
    authAPI.logout()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatusAppAC('succeeded'))
                console.log("logout")
            } else {
                dispatch(setErrorAppAC('ERROR!'))
                console.log('ERROR!!!')
            }
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'))
        })
}

export const me = () => (dispatch: Dispatch<any>) => {
    dispatch(setStatusAppAC('loading'))
    authAPI.me()
        .then(resp => {
            if (resp.data.resultCode === 0) {

                console.log("logout")
            } else {

                console.log('ERROR!!!')
            }
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'))
        })
}

// types
type InitStateType = {
    isLoggedIn: boolean
}
type ActionsType = ReturnType<typeof setIsLoggedInAC>