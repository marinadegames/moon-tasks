import {combineReducers} from "redux";
import {toDoListsReducer} from "./toDoListsReducer";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {tasksReducer} from "./tasksReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoList: toDoListsReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

// @ts-ignore
window.store = store