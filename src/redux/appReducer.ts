// imports


// types
export type InitialStateType = {
    status: StatusesType
    error: string | null
}
export type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionType = setStatusAppActionType | SetErrorAppActionType
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
    error: null
}


// reducer
export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_APP_STATUS":
            return {...state, status: action.status}
        case "SET_APP_ERROR":
            return {...state, error: action.error}
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
