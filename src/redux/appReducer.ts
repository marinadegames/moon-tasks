// imports

import {Dispatch} from "redux"
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "./authReducer";


// types
export type InitialStateType = {
    status: StatusesType
    error: string | null
    initialized: boolean
}
export type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionType = setStatusAppActionType | SetErrorAppActionType | ReturnType<typeof setAppInitializedAC>
export type setStatusAppActionType = {
    type: 'SET_APP_STATUS'
    status: StatusesType
}
export type SetErrorAppActionType = {
    type: 'SET_APP_ERROR'
    error: string | null
}


// init state
const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    initialized: false
}


// reducer
export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_APP_STATUS":
            return {...state, status: action.status}
        case "SET_APP_ERROR":
            return {...state, error: action.error}
        case "SET_APP_INITIALIZED":
            return {...state, initialized: action.value}
        default:
            return state
    }
}


// AC
export const setStatusAppAC = (status: StatusesType): setStatusAppActionType => ({
    type: 'SET_APP_STATUS',
    status
} as const)
export const setErrorAppAC = (error: string | null): SetErrorAppActionType => ({type: 'SET_APP_ERROR', error} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'SET_APP_INITIALIZED', value} as const)


// tc
export const initializedAppTC = () => (dispatch: Dispatch<any>) => {
    dispatch(setStatusAppAC('loading'))
    authAPI.me()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setAppInitializedAC(true))
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAppAC('idle'))
            } else {

            }
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
            dispatch(setStatusAppAC('idle'))
        })

}