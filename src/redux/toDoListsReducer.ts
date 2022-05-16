import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setErrorAppAC, setNotificationAppAC, setStatusAppAC} from "./appReducer";
import {FilterValuesType} from "../helpers/helpers";

const initialState: Array<TodolistDomainType> = []

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

export const fetchTodolistsTC = createAsyncThunk(
    'todolists/fetchTodolists',
    async (payload, {dispatch}) => {
        dispatch(setStatusAppAC({status: 'loading'}))
        try {
            const resp = await todolistsAPI.getTodolists()
            dispatch(SetTodolistsAC({todolists: resp.data}))
            dispatch(setNotificationAppAC({notification: 'Download successful'}))
        } catch {
            dispatch(setErrorAppAC({error: 'Unknown error!'}))
        } finally {
            dispatch(setStatusAppAC({status: 'idle'}))
        }
    }
)

export const addTodolistTC = createAsyncThunk(
    'todolists/addTodolist',
    async (payload: { newTitle: string }, {dispatch}) => {
        dispatch(setStatusAppAC({status: 'loading'}))
        try {
            const resp = await todolistsAPI.createTodolist(payload.newTitle)
            if (resp.data.resultCode === 0) {
                dispatch(AddToDoListAC({todolist: resp.data.data.item}))
                dispatch(setNotificationAppAC({notification: 'Add todolist successful!'}))
            } else {
                if (resp.data.messages.length) {
                    dispatch(setErrorAppAC({error: resp.data.messages[0]}))
                } else {
                    dispatch(setErrorAppAC({error: 'Unknown error!'}))
                }
            }
        } catch (e) {
            dispatch(setErrorAppAC({error: 'Unknown error!'}))
        } finally {
            dispatch(setStatusAppAC({status: 'idle'}))
        }
    }
)

export const removeTodolistTC = createAsyncThunk(
    'todolists/removeTodolist',
    async (payload: { todolistId: string }, {dispatch}) => {
        try {
            dispatch(setStatusAppAC({status: 'loading'}))
            const resp = await todolistsAPI.deleteTodolist(payload.todolistId)
            if (resp.data.resultCode === 0) {
                dispatch(RemoveToDoListAC({id: payload.todolistId}))
                dispatch(setNotificationAppAC({notification: 'Delete todolist successful!'}))
            } else {
                if (resp.data.messages.length) {
                    dispatch(setErrorAppAC({error: resp.data.messages[0]}))
                } else {
                    dispatch(setErrorAppAC({error: 'Unknown error!'}))
                }
            }
        } catch (e) {
            dispatch(setErrorAppAC({error: 'Unknown error!'}))
        } finally {
            dispatch(setStatusAppAC({status: 'idle'}))
        }
    }
)

export const changeTodolistTitleTC = createAsyncThunk(
    'todolists/removeTodolist',
    async (payload: { todolistId: string, newTitle: string }, {dispatch}) => {
        dispatch(setStatusAppAC({status: 'loading'}))
        try {
            const resp = await todolistsAPI.updateTodolist(payload.todolistId, payload.newTitle)
            if (resp.data.resultCode === 0) {
                dispatch(EditToDoListTitleAC({id: payload.todolistId, title: payload.newTitle}))
                dispatch(setNotificationAppAC({notification: 'Change todolist title successful!'}))
            } else {
                if (resp.data.messages.length) {
                    dispatch(setErrorAppAC({error: resp.data.messages[0]}))
                } else {
                    dispatch(setErrorAppAC({error: 'Unknown error!'}))
                }
            }
        } catch (e) {
            dispatch(setErrorAppAC({error: 'Unknown error!'}))
        } finally {
            dispatch(setStatusAppAC({status: 'idle'}))
        }
    }
)

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
