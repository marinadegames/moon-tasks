import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionType, tasksReducer} from "./tasksReducer";
import {TodolistsActionType, toDoListsReducer} from "./toDoListsReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoList: toDoListsReducer,
    app: appReducer,
    auth: authReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))

// thunk types for all app

//all types action to all app
export type AppActionsType = TodolistsActionType | TasksActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    rootReducerType,
    unknown,
    AppActionsType>

// @ts-ignore
window.store = store