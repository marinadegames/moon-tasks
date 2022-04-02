// imports
import {v1} from "uuid";
import {AddToDoListAC, AddToDOListAT, RemoveToDoListAC, SetTodolistsAC, SetTodolistsAT} from "./toDoListsReducer";
import {TaskPriorities, TaskStatuses, todolistsAPI} from "../api/todolist-api";
import {rootReducerType} from "./store";
import {setErrorAppAC, setStatusAppAC} from "./appReducer";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

// types
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type TasksActionType =
    AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | EditTaskTitleActionType
    | AddToDOListAT
    | SetTodolistsAT
    | SetTasksActionType

type AddTaskActionType = {
    type: 'ADD_TASK'
    newTitle: string
    toDoListId: string
}
type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    id: string
    toDoListId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    toDoListID: string
    status: number
}
type EditTaskTitleActionType = {
    type: 'EDIT_TASK_TITLE'
    ToDoListId: string
    tId: string
    title: string
}
export type SetTasksActionType = {
    type: 'SET_TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
// Initial State
const initialStateTasks: TaskStateType = {}

// reducer
const slice = createSlice({
    name: 'tasks',
    initialState: initialStateTasks,
    reducers: {
        RemoveTaskAC(state, action: PayloadAction<{ id: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) tasks.splice(index, 1)
        },
        AddTaskAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            state[action.payload.todolistId].push({
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: action.payload.todolistId,
                order: 0,
                addedDate: 'string',
            })
        },
        EditTaskTitleAC(state, action: PayloadAction<{ id: string, title: string, todolistId: string, status: number }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            const task = {
                id: action.payload.id,
                title: action.payload.title,
                todoListId: action.payload.todolistId,
                status: action.payload.status
            }
            if (index > -1) {
                tasks[index] = {...tasks[index], ...task,}
            }
        },
        ChangeTaskStatusAC(state, action: PayloadAction<{ id: string, status: number, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks[index] = {...tasks[index], status: action.payload.status,}
            }
        },
        SetTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder => {
        builder.addCase(AddToDoListAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(RemoveToDoListAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(SetTodolistsAC, (state, action) => {
            const copyState = {...state}
            action.payload.todolists.forEach(td => copyState[td.id] = [])
            return copyState
        });
    }),
})
export const tasksReducer = slice.reducer
export const {RemoveTaskAC, AddTaskAC, EditTaskTitleAC, ChangeTaskStatusAC, SetTasksAC} = slice.actions

// thunks
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAppAC({status: 'loading'}))
        const resp = await todolistsAPI.getTasks(todolistId)
        if (resp.data.items.length !== 0) {
            dispatch(SetTasksAC({todolistId: todolistId, tasks: resp.data.items}))
            dispatch(setStatusAppAC({status: 'idle'}))
        }
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setStatusAppAC({status: 'idle'}))
    }
}
export const addTasksTC = (todolistId: string, newTitle: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAppAC({status: 'loading'}))
        const resp = await todolistsAPI.createTask(todolistId, newTitle)
        if (resp.data.resultCode === 0) {
            dispatch(AddTaskAC({title: newTitle, todolistId: todolistId}))
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
export const deleteTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAppAC({status: 'loading'}))
        const resp = await todolistsAPI.deleteTask(todolistId, taskId)
        console.log(resp)
        if (resp.data.resultCode === 0) {
            dispatch(RemoveTaskAC({id: taskId, todolistId}))
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
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => async (dispatch: Dispatch, getState: () => rootReducerType) => {
    dispatch(setStatusAppAC({status: 'loading'}))
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    if (task) {
        try {
            const resp = await todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
            dispatch(ChangeTaskStatusAC({id: taskId, todolistId, status}))
            console.log(resp)
            dispatch(setStatusAppAC({status: 'idle'}))
        } catch (e) {
            console.warn(e)
        }
    }
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, newTitle: string) => async (
    dispatch: Dispatch,
    getState: () => rootReducerType
) => {
    dispatch(setStatusAppAC({status: 'loading'}))
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    if (task) {
        try {
            const resp = await todolistsAPI.updateTask(todolistId, taskId, {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
            dispatch(EditTaskTitleAC({todolistId, id: taskId, title: newTitle, status: 0}))
            console.log(resp)
            dispatch(setStatusAppAC({status: 'idle'}))
        } catch (e) {
            console.warn(e)
        }
    }

}
