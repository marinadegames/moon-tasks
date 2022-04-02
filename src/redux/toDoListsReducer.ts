// imports
import {FilterValuesType} from "../App";
import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
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
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        RemoveToDoListAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state.splice(index, 1)
        },
        AddToDoListAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'ALL'})
        },
        EditToDoListTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        EditToDoListFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        SetTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(td => ({...td, filter: 'ALL'}))
        },
    }
})
export const toDoListsReducer = slice.reducer;
export const {RemoveToDoListAC, AddToDoListAC, EditToDoListTitleAC, EditToDoListFilterAC, SetTodolistsAC} = slice.actions

// thunks
export const fetchTodolistsTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAppAC({status: 'loading'}))
        const resp = await todolistsAPI.getTodolists()
        dispatch(SetTodolistsAC({todolists: resp.data}))
        dispatch(setStatusAppAC({status: 'idle'}))
    } catch (e: any) {
        console.warn(e)
    } finally {
        dispatch(setStatusAppAC({status: 'idle'}))
    }
}
export const addTodolistTC = (newTitle: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAppAC({status: 'loading'}))
        const resp = await todolistsAPI.createTodolist(newTitle)
        if (resp.data.resultCode === 0) {
            dispatch(AddToDoListAC({todolist: resp.data.data.item}))
        } else {
            if (resp.data.messages.length) {
                dispatch(setErrorAppAC({error: resp.data.messages[0]}))
            } else {
                dispatch(setErrorAppAC({error: 'some error'}))
            }
        }

    } catch (e) {
        console.warn(e)
    } finally {
        dispatch(setStatusAppAC({status: 'idle'}))
    }
}
export const removeTodolistTC = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAppAC({status: 'loading'}))
        const resp = await todolistsAPI.deleteTodolist(todolistId)

        if (resp.data.resultCode === 0) {
            dispatch(RemoveToDoListAC({id: todolistId}))
            dispatch(setStatusAppAC({status: 'idle'}))
        } else {
            if (resp.data.messages.length) {
                dispatch(setErrorAppAC({error: resp.data.messages[0]}))
            } else {
                dispatch(setErrorAppAC({error: 'some error'}))
            }
        }
    } catch (e) {
        console.warn(e)
    } finally {
        dispatch(setStatusAppAC({status: 'idle'}))
    }
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAppAC({status: 'loading'}))
        const resp = await todolistsAPI.updateTodolist(todolistId, newTitle)
        if (resp.data.resultCode === 0) {
            dispatch(EditToDoListTitleAC({id: todolistId, title: newTitle}))
            dispatch(setStatusAppAC({status: 'idle'}))
        } else {
            if (resp.data.messages.length) {
                dispatch(setErrorAppAC({error: resp.data.messages[0]}))
            } else {
                dispatch(setErrorAppAC({error: 'some error'}))
            }
        }
    } catch (e) {
        console.warn(e)
    } finally {
        dispatch(setStatusAppAC({status: 'idle'}))
    }

}
