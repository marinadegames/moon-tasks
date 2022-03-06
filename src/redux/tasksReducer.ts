// imports
import {v1} from "uuid";
import {AddToDOListAT} from "./toDoListsReducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


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

type ActionType =
    AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | EditTaskTitleActionType
    | AddToDOListAT

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
// Initial State
const initialStateTasks: TaskStateType = {}

// reducer
export const tasksReducer = (state: TaskStateType = initialStateTasks, action: ActionType): TaskStateType => {
    switch (action.type) {
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
            copyTasksADDTODO[action.id] = []
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
