// imports
import {FilterValuesType} from "../App";
import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {AppThunk} from "./store";
import {setErrorAppAC, setStatusAppAC} from "./appReducer";

const initialState: Array<TodolistDomainType> = []

// types
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type AddToDOListAT = ReturnType<typeof AddToDoListAC>
export type SetTodolistsAT = ReturnType<typeof SetTodolistsAC>
export type TodolistsActionType =
    | AddToDOListAT
    | SetTodolistsAT
    | ReturnType<typeof RemoveToDoListAC>
    | ReturnType<typeof EditToDoListFilterAC>
    | ReturnType<typeof EditToDoListTitleAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

// REDUCER
export const toDoListsReducer = (toDoLists = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {

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
export const RemoveToDoListAC = (id: string) => ({type: 'REMOVE_TODOLIST', id} as const)
export const AddToDoListAC = (todolist: TodolistType) => ({type: 'ADD_TODOLIST', todolist} as const)
export const EditToDoListTitleAC = (id: string, title: string) => ({type: 'EDIT_TODOLIST_TITLE', id, title} as const)
export const EditToDoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'EDIT_TODOLIST_FILTER',
    id,
    filter
} as const)
export const SetTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET_TODOLISTS", todolists} as const)

// thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAppAC('loading'))
        const resp = await todolistsAPI.getTodolists()
        dispatch(SetTodolistsAC(resp.data))
        dispatch(setStatusAppAC('idle'))
    } catch (e: any) {
        console.warn(e)
    } finally {
        dispatch(setStatusAppAC('idle'))
    }
}
export const addTodolistTC = (newTitle: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAppAC('loading'))
        const resp = await todolistsAPI.createTodolist(newTitle)

        if (resp.data.resultCode === 0) {
            dispatch(AddToDoListAC(resp.data.data.item))
        } else {
            if (resp.data.messages.length) {
                dispatch(setErrorAppAC(resp.data.messages[0]))
            } else {
                dispatch(setErrorAppAC('some error'))
            }
        }

    } catch (e) {
        console.warn(e)
    } finally {
        dispatch(setStatusAppAC('idle'))
    }
}
export const removeTodolistTC = (todolistId: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAppAC('loading'))
        const resp = await todolistsAPI.deleteTodolist(todolistId)

        if (resp.data.resultCode === 0) {
            dispatch(RemoveToDoListAC(todolistId))
            dispatch(setStatusAppAC('idle'))
        } else {
            if (resp.data.messages.length) {
                dispatch(setErrorAppAC(resp.data.messages[0]))
            } else {
                dispatch(setErrorAppAC('some error'))
            }
        }
    } catch (e) {
        console.warn(e)
    } finally {
        dispatch(setStatusAppAC('idle'))
    }
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAppAC('loading'))
        const resp = await todolistsAPI.updateTodolist(todolistId, newTitle)

        if (resp.data.resultCode === 0) {
            dispatch(EditToDoListTitleAC(todolistId, newTitle))
            dispatch(setStatusAppAC('idle'))
        } else {
            if (resp.data.messages.length) {
                dispatch(setErrorAppAC(resp.data.messages[0]))
            } else {
                dispatch(setErrorAppAC('some error'))
            }
        }
    } catch (e) {
        console.warn(e)
    } finally {
        dispatch(setStatusAppAC('idle'))
    }

}
