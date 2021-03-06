import {setErrorAppAC, setNotificationAppAC, setStatusAppAC} from "./appReducer";
import {authAPI, LoginDataType, ResponseType} from "../api/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {call, put} from "redux-saga/effects";

type InitStateType = {
    isLoggedIn: boolean
}

const initState: InitStateType = {
    isLoggedIn: false
}

export function* loginSaga(action: ReturnType<typeof login>) {
    yield put(setStatusAppAC({status: 'loading'}))
    try {
        const resp: ResponseType = yield call(authAPI.login, action.payload.data)
        if (resp.resultCode === 0) {
            yield put(setIsLoggedInAC({value: true}))
            yield put(setStatusAppAC({status: 'succeeded'}))
            yield put(setNotificationAppAC({notification: 'Login successful!'}))
        } else {
            yield put(setErrorAppAC({error: 'Login failed!'}))
            yield put(setIsLoggedInAC({value: false}))
        }
    } catch (e) {
        yield put(setErrorAppAC({error: 'Unknown error: login failed!'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
}

export function* logoutSaga() {
    yield put(setStatusAppAC({status: 'loading'}))
    try {
        const resp: ResponseType = yield call(authAPI.logout)
        if (resp.resultCode === 0) {
            yield put(setIsLoggedInAC({value: false}))
            yield put(setStatusAppAC({status: 'succeeded'}))
            yield put(setNotificationAppAC({notification: 'Logout successful!'}))
        } else {
            yield put(setErrorAppAC({error: 'Logout error!'}))
        }
    } catch (e) {
        yield put(setErrorAppAC({error: 'Logout error!'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
}

export function* meSaga() {
    yield put(setStatusAppAC({status: 'loading'}))
    try {
        const resp: ResponseType = yield call(authAPI.logout)
        if (resp.resultCode === 0) {
            yield put(setNotificationAppAC({notification: 'You auth!'}))
        } else {
            yield put(setErrorAppAC({error: 'Unknown error! (me reducer)'}))
        }
    } catch (e) {
        yield put(setErrorAppAC({error: 'Unknown error! (me reducer)'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
}


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

export const login = (payload: { data: LoginDataType }) => {
    return {
        type: 'AUTH/LOGIN',
        payload: {
            data: payload.data
        }
    }
}
export const logout = () => ({type: 'AUTH/LOGOUT'})
export const me = () => ({type: 'AUTH/ME'})