// imports
import {FilterValuesType} from "../App";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

// types
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type ActionType = RemoveToDoListAT | AddToDOListAT | EditToDoListTitleAT | EditToDoListFilterAT | SetTodolistsAT

type RemoveToDoListAT = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddToDOListAT = {
    type: 'ADD_TODOLIST'
    todolist: TodolistType
}
type EditToDoListTitleAT = {
    type: 'EDIT_TODOLIST_TITLE'
    id: string
    title: string
}
type EditToDoListFilterAT = {
    type: 'EDIT_TODOLIST_FILTER'
    id: string
    filter: FilterValuesType
}
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type SetTodolistsAT = {
    type: 'SET_TODOLISTS'
    todolists: Array<TodolistType>
}

// REDUCER
export const toDoListsReducer = (toDoLists = initialState, action: ActionType): Array<TodolistDomainType> => {

    switch (action.type) {
        case "SET_TODOLISTS":
            return action.todolists.map(td => ({...td, filter: 'ALL'}))
        case 'REMOVE_TODOLIST':
            return toDoLists.filter(tl => tl.id !== action.id)

        case 'ADD_TODOLIST':
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'ALL'}
            return [newTodolist, ...toDoLists]
        case 'EDIT_TODOLIST_TITLE':
            return toDoLists.map(td => td.id === action.id ? {...td, title: action.title} : td)

        case 'EDIT_TODOLIST_FILTER':
            return toDoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return toDoLists

    }
}

// ACTION CREATORS
export const RemoveToDoListAC = (id: string): RemoveToDoListAT => {
    return {type: 'REMOVE_TODOLIST', id}
}
export const AddToDoListAC = (todolist: TodolistType): AddToDOListAT => {
    return {type: 'ADD_TODOLIST', todolist}
}
export const EditToDoListTitleAC = (id: string, title: string): EditToDoListTitleAT => {
    return {type: 'EDIT_TODOLIST_TITLE', id, title}
}
export const EditToDoListFilterAC = (id: string, filter: FilterValuesType): EditToDoListFilterAT => {
    return {type: 'EDIT_TODOLIST_FILTER', id, filter}
}
export const SetTodolistsAC = (todolists: Array<TodolistType>):SetTodolistsAT => {
    return {type: "SET_TODOLISTS", todolists}
}

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodolists()
            .then(resp => {
                dispatch(SetTodolistsAC(resp.data))
            })
    }
}

