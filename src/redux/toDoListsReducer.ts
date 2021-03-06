import {CreateTodolistResponseType, DeleteTodolistResponseType, todolistsAPI, TodolistType, UpdateTodolistResponseType} from "../api/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setErrorAppAC, setNotificationAppAC, setStatusAppAC} from "./appReducer";
import {FilterValuesType} from "../helpers/helpers";
import {call, put} from "redux-saga/effects";

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

export function* fetchTodolistsSaga() {
    yield put(setStatusAppAC({status: 'loading'}))
    const resp: TodolistType[] = yield call(todolistsAPI.getTodolists)
    try {
        yield put(SetTodolistsAC({todolists: resp}))
        yield put(setNotificationAppAC({notification: 'Download successful'}))
    } catch {
        yield put(setErrorAppAC({error: 'Unknown error: fetch todolists failed!'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
}
export function* addTodolistSaga(action: ReturnType<typeof addTodolist>) {
    yield put(setStatusAppAC({status: 'loading'}))
    try {
        const resp: CreateTodolistResponseType = yield call(todolistsAPI.createTodolist, action.newTitle)
        if (resp.resultCode === 0) {
            yield put(AddToDoListAC({todolist: resp.data.item}))
            yield put(setNotificationAppAC({notification: 'Add todolist successful!'}))
        } else {
            if (resp.messages.length) {
                yield put(setErrorAppAC({error: resp.messages[0]}))
            } else {
                yield put(setErrorAppAC({error: 'Unknown error: 123 add new todolist failed!'}))
            }
        }
    } catch (e) {
        yield put(setErrorAppAC({error: 'Unknown error: add new todolist failed!'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
}
export function* removeTodolistSaga(action: ReturnType<typeof removeTodolist>) {
    yield put(setStatusAppAC({status: 'loading'}))
    try {
        const resp: DeleteTodolistResponseType = yield call(todolistsAPI.deleteTodolist, action.payload.todolistId)
        if (resp.resultCode === 0) {
            yield put(RemoveToDoListAC({id: action.payload.todolistId}))
            yield put(setNotificationAppAC({notification: 'Delete todolist successful!'}))
        } else {
            if (resp.messages.length) {
                yield put(setErrorAppAC({error: resp.messages[0]}))
            } else {
                yield put(setErrorAppAC({error: 'Unknown error: remove todolist failed!'}))
            }
        }
    } catch (e) {
        yield put(setErrorAppAC({error: 'Unknown error: remove todolist failed!'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }

}
export function* changeTodolistTitleSaga(action: ReturnType<typeof changeTodolistTitle>) {
    yield put(setStatusAppAC({status: 'loading'}))
    try {
        const resp: UpdateTodolistResponseType = yield call(todolistsAPI.updateTodolist, action.payload.todolistId, action.payload.newTitle)
        if (resp.resultCode === 0) {
            yield put(EditToDoListTitleAC({id: action.payload.todolistId, title: action.payload.newTitle}))
            yield put(setNotificationAppAC({notification: 'Change todolist title successful!'}))
        } else {
            if (resp.messages.length) {
                yield put(setErrorAppAC({error: resp.messages[0]}))
            } else {
                yield put(setErrorAppAC({error: 'Unknown error: change todolist title failed!'}))
            }
        }
    } catch (e) {
        yield put(setErrorAppAC({error: 'Unknown error: change todolist title failed!'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
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

export const fetchTodolists = () => {
    return {
        type: 'TODOLISTS/FETCH_TODOLISTS',
    }
}
export const addTodolist = (newTitle: string) => {
    return {
        type: 'TODOLISTS/CREATE_TODOLIST',
        newTitle: newTitle
    }
}
export const removeTodolist = (payload: { todolistId: string }) => {
    return {
        type: 'TODOLISTS/REMOVE_TODOLIST',
        payload: {
            todolistId: payload.todolistId
        }
    }
}
export const changeTodolistTitle = (payload: { todolistId: string, newTitle: string }) => {
    return {
        type: 'TODOLISTS/CHANGE_TODOLIST_TITLE',
        payload: {
            todolistId: payload.todolistId,
            newTitle: payload.newTitle
        }
    }
}