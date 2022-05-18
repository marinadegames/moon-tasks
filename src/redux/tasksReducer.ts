import {v1} from "uuid";
import {AddToDoListAC, AddToDOListAT, RemoveToDoListAC, SetTodolistsAC, SetTodolistsAT} from "./toDoListsReducer";
import {GetTasksResponseType, ResponseType, TaskPriorities, TaskStatuses, todolistsAPI} from "../api/todolist-api";
import {AppRootStateType} from "./store";
import {setErrorAppAC, setNotificationAppAC, setStatusAppAC} from "./appReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {call, put} from "redux-saga/effects";

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

const initialStateTasks: TaskStateType = {}

// sagas
export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setStatusAppAC({status: 'loading'}))

    try {
        const resp: GetTasksResponseType = yield call(todolistsAPI.getTasks, action.todolistId)

        const tasks = resp.items
        if (resp.items.length !== 0) {
            yield put(SetTasksAC({todolistId: action.todolistId, tasks}))
            yield put(setNotificationAppAC({notification: 'Download successful'}))
        }
    } catch (e) {
        yield put(setErrorAppAC({error: 'Unknown error: fail for fetch tasks!'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
}

export function* addTasksSaga(action: ReturnType<typeof addTask>) {
    yield put(setStatusAppAC({status: 'loading'}))
    try {
        const resp: ResponseType = yield call(todolistsAPI.createTask, action.payload.todolistId, action.payload.newTitle)
        if (resp.resultCode === 0) {
            yield put(AddTaskAC({title: action.payload.newTitle, todolistId: action.payload.todolistId}))
            yield put(setNotificationAppAC({notification: 'Add new task successful!'}))
        } else {
            if (resp.messages.length) {
                yield put(setErrorAppAC({error: resp.messages[0]}))
            } else {
                yield put(setErrorAppAC({error: 'Unknown error: fail add task!'}))
            }
        }
    } catch (e) {
        yield put(setErrorAppAC({error: 'Unknown error: fail add task!'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
}

export function* deleteTaskSaga(action: ReturnType<typeof deleteTask>) {
    yield put(setStatusAppAC({status: 'loading'}))
    try {
        const resp: ResponseType = yield call(todolistsAPI.deleteTask, action.payload.todolistId, action.payload.taskId)
        if (resp.resultCode === 0) {
            yield put(RemoveTaskAC({id: action.payload.taskId, todolistId: action.payload.todolistId}))
            yield put(setNotificationAppAC({notification: 'Delete task successful!'}))
        } else {
            if (resp.messages.length) {
                yield put(setErrorAppAC({error: resp.messages[0]}))
            } else {
                yield put(setErrorAppAC({error: 'Unknown error: delete task fail!'}))
            }
        }
    } catch (e) {
        yield put(setErrorAppAC({error: 'Unknown error: delete task fail!'}))
    } finally {
        yield put(setStatusAppAC({status: 'idle'}))
    }
}


export const updateTaskStatusTC = createAsyncThunk(
    'tasks/updateTaskStatus',
    async (payload: { taskId: string, todolistId: string, status: TaskStatuses }, {dispatch, getState}) => {
        dispatch(setStatusAppAC({status: 'loading'}))
        const allTasksFromState = getState() as AppRootStateType
        const tasksForCurrentTodolist = allTasksFromState.tasks[payload.todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === payload.taskId
        })
        if (task) {
            try {
                await todolistsAPI.updateTask(payload.todolistId, payload.taskId, {
                    title: task.title,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    status: payload.status
                })
                dispatch(ChangeTaskStatusAC({id: payload.taskId, todolistId: payload.todolistId, status: payload.status}))
                dispatch(setNotificationAppAC({notification: 'Task status updated!'}))
            } catch (e) {
                dispatch(setErrorAppAC({error: 'Unknown error!'}))
            } finally {
                dispatch(setStatusAppAC({status: 'idle'}))
            }
        }
    })

export const changeTaskTitleTC = createAsyncThunk(
    'tasks/changeTaskTitle',
    async (payload: { todolistId: string, taskId: string, newTitle: string }, {dispatch, getState}) => {
        dispatch(setStatusAppAC({status: 'loading'}))
        const allTasksFromState = getState() as AppRootStateType;
        const tasksForCurrentTodolist = allTasksFromState.tasks[payload.todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === payload.taskId
        })
        if (task) {
            try {
                await todolistsAPI.updateTask(payload.todolistId, payload.taskId, {
                    title: payload.newTitle,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    status: task.status
                })
                dispatch(EditTaskTitleAC({todolistId: payload.todolistId, id: payload.taskId, title: payload.newTitle, status: 0}))
                dispatch(setNotificationAppAC({notification: 'Task title updated!'}))
            } catch (e) {
                dispatch(setErrorAppAC({error: 'Unknown error!'}))
            } finally {
                dispatch(setStatusAppAC({status: 'idle'}))
            }
        }
    })


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
            state[action.payload.todolistId].unshift({
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

export const fetchTasks = (todolistId: string) => ({type: 'TASKS/FETCH_TASKS', todolistId})
export const addTask = (payload: { todolistId: string, newTitle: string }) => {
    return {
        type: 'TASKS/ADD_TASK',
        payload: {
            todolistId: payload.todolistId,
            newTitle: payload.newTitle
        }
    }
}
export const deleteTask = (payload: { todolistId: string, taskId: string }) => {
    return {
        type: 'TASKS/DELETE_TASK',
        payload: {
            todolistId: payload.todolistId,
            taskId: payload.taskId
        }
    }
}

