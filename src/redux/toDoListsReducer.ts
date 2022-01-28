// imports
import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

// types


type ActionType = RemoveToDoListAT | AddToDOListAT | EditToDoListTitleAT | EditToDoListFilterAT

type RemoveToDoListAT = {
    type: 'REMOVE_TODOLIST'
    id: string
}
type AddToDOListAT = {
    type: 'ADD_TODOLIST'
    id: string
    title: string
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

// reducer
export const ToDoListsReducer = (toDoLists: Array<ToDoListType>, action: ActionType): Array<ToDoListType>=> {

    switch (action.type){

        case 'REMOVE_TODOLIST':
            return toDoLists.filter( tl => tl.id !== action.id)

        case 'ADD_TODOLIST':
            return [...toDoLists, {id: action.id, title: action.title, filter: 'ALL'}]

        case 'EDIT_TODOLIST_TITLE':
            return toDoLists.map(td => td.id === action.id ? {...td, title: action.title} : td)

        case 'EDIT_TODOLIST_FILTER':
            return toDoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return toDoLists

    }
}

export const RemoveToDoListAC = (id: string):RemoveToDoListAT => {
    return {type: 'REMOVE_TODOLIST', id}
}
export const AddToDoListAC = (title: string):AddToDOListAT => {
    let newId = v1()
    return {type: 'ADD_TODOLIST', id: newId, title}
}
export const EditToDoListTitleAC = (id: string, title: string):EditToDoListTitleAT => {
    return {type: 'EDIT_TODOLIST_TITLE', id, title}
}
export const EditToDoListFilterAC = (id: string, filter: FilterValuesType):EditToDoListFilterAT => {
    return {type: 'EDIT_TODOLIST_FILTER', id, filter}
}
