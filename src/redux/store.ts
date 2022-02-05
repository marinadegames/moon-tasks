import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./TasksReducer";
import {toDoListsReducer} from "./toDoListsReducer";

const rootReducer = combineReducers( {
    tasks: tasksReducer,
    toDoList: toDoListsReducer,
})

export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)
// @ts-ignore
window.store=store