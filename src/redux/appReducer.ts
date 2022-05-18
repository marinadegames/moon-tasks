import {authAPI, MeResponseType} from "../api/todolist-api";
import {setIsLoggedInAC} from "./authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {call, put} from "redux-saga/effects";

export type InitialStateType = {
    status: StatusesType
    error: string | null
    notification: string | null
    initialized: boolean
    tasksDownloadInitialized: boolean
}
export type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    notification: null,
    initialized: false,
    tasksDownloadInitialized: false
}

// use with saga (test)
export function* initializeAppWorkerSaga() {
    yield put(setStatusAppAC({status: 'loading'}))
    const resp: MeResponseType = yield call(authAPI.me)
    try {
        if (resp.resultCode === 0) {
            yield put(setAppInitializedAC({value: true}))
            yield put(setIsLoggedInAC({value: true}))
            yield put(setStatusAppAC({status: 'idle'}))
        }
    } catch (e) {
        console.error(e)
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
}

export const initializedApp = () => ({type: 'APP/INITIALIZE-APP'})

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
        setTasksDownloadInitialized(state, action: PayloadAction<{ mode: boolean }>) {
            state.tasksDownloadInitialized = action.payload.mode
        },
    }
})
export const appReducer = slice.reducer
export const {setStatusAppAC, setNotificationAppAC, setErrorAppAC, setAppInitializedAC, setTasksDownloadInitialized} = slice.actions


