// imports
import {v1} from "uuid";
import {AddToDOListAT, SetTodolistsAT} from "./toDoListsReducer";
import {TaskPriorities, TaskStatuses, todolistApi} from "../api/todolist-api";
import {AppThunk, rootReducerType} from "./store";
import {setStatusAppAC} from "./appReducer";

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
export const tasksReducer = (state: TaskStateType = initialStateTasks, action: TasksActionType): TaskStateType => {
    switch (action.type) {
        case "SET_TODOLISTS":
            const copyState = {...state}
            action.todolists.forEach(td => copyState[td.id] = [])
            return copyState
        case "ADD_TASK":
            const copyTasksADD = {...state}
            copyTasksADD[action.toDoListId] = [{
                id: v1(),
                title: action.newTitle,
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: action.toDoListId,
                order: 0,
                addedDate: 'string',

            }, ...state[action.toDoListId]]
            return copyTasksADD
        case 'ADD_TODOLIST':
            const copyTasksADDTODO = {...state}
            copyTasksADDTODO[action.todolist.id] = []
            return copyTasksADDTODO
        case "REMOVE_TASK":
            const copyTasksREMOVE = {...state}
            copyTasksREMOVE[action.toDoListId] = state[action.toDoListId].filter(tl => tl.id !== action.id)
            return copyTasksREMOVE
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(m => m.id === action.taskId ? {
                    ...m,
                    status: action.status
                } : m)
            }
        case "EDIT_TASK_TITLE":
            return {
                ...state,
                [action.ToDoListId]: state[action.ToDoListId].map(t => t.id === action.tId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "SET_TASKS":
            const copyState2 = {...state}
            copyState2[action.todolistId] = action.tasks
            return copyState2
        default:
            return state
    }
}


// AC
export const AddTaskAC = (newTitle: string, toDoListId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', newTitle, toDoListId} as const
}
export const RemoveTaskAC = (id: string, toDoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', id, toDoListId} as const
}
export const ChangeTaskStatusAC = (taskId: string, toDoListID: string, status: number): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, toDoListID, status} as const
}
export const EditTaskTitleAC = (ToDoListId: string, tId: string, title: string): EditTaskTitleActionType => {
    return {type: 'EDIT_TASK_TITLE', ToDoListId, tId, title} as const
}
export const SetTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: "SET_TASKS", todolistId, tasks} as const
}

// thunks

export const fetchTasksTC = (todolistId: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAppAC('loading'))
        const resp = await todolistApi.getTasks(todolistId)
        if (resp.data.items.length !== 0) {
            dispatch(SetTasksAC(todolistId, resp.data.items))
            dispatch(setStatusAppAC('idle'))
        }
    } catch (e) {
        console.warn(e)
    }
}


export const addTasksTC = (todolistId: string, newTitle: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAppAC('loading'))
        const resp = todolistApi.createTask(todolistId, newTitle)
        dispatch(AddTaskAC(newTitle, todolistId))
        console.log(resp)
        dispatch(setStatusAppAC('idle'))
    } catch (e) {
        console.warn(e)
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAppAC('loading'))
        const resp = await todolistApi.deleteTask(todolistId, taskId)
        dispatch(RemoveTaskAC(taskId, todolistId))
        console.log(resp)
        dispatch(setStatusAppAC('idle'))
    } catch (e) {
        console.warn(e)
    }
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses): AppThunk => async (
    dispatch: any,
    getState: () => rootReducerType
) => {
    dispatch(setStatusAppAC('loading'))
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })

    if (task) {
        try {
            const resp = await todolistApi.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
            dispatch(ChangeTaskStatusAC(taskId, todolistId, status))
            console.log(resp)
            dispatch(setStatusAppAC('idle'))
        } catch (e) {
            console.warn(e)
        }
    }
}

export const changeTaskTitleTC = (todolistId: string, taskId: string, newTitle: string): AppThunk => async (
    dispatch: any,
    getState: () => rootReducerType
) => {
    dispatch(setStatusAppAC('loading'))
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    if (task) {
        try {
            const resp = await todolistApi.updateTask(todolistId, taskId, {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status

            })
            dispatch(EditTaskTitleAC(todolistId, taskId, newTitle))
            console.log(resp)
            dispatch(setStatusAppAC('idle'))
        } catch (e) {
            console.warn(e)
        }
    }

}
