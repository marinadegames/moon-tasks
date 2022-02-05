// imports
import {v1} from "uuid";
import {toDoListId1, toDoListId2} from "./toDoListsReducer";


// types
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type ActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | EditTaskTitleActionType
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
    toDoListID:  string
    isDone: boolean
}
type EditTaskTitleActionType = {
    type: 'EDIT_TASK_TITLE'
    ToDoListId: string
    tId: string
    title: string
}
// Initial State
const initialStateTasks: TaskStateType = {
    [toDoListId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'English', isDone: true},
    ],
    [toDoListId2]: [
        {id: v1(), title: 'Milk', isDone: false},
        {id: v1(), title: 'Juice', isDone: false},
        {id: v1(), title: 'Meat', isDone: true},
    ],
}

// reducer
export const tasksReducer = (state: TaskStateType = initialStateTasks, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "ADD_TASK":
            const copyTasksADD = {...state}
            copyTasksADD[action.toDoListId] = [{id: v1(), title: action.newTitle, isDone: false}, ...state[action.toDoListId]]
            return copyTasksADD
        case "REMOVE_TASK":
            const copyTasksREMOVE = {...state}
            copyTasksREMOVE[action.toDoListId] = state[action.toDoListId].filter(tl => tl.id !== action.id)
            return copyTasksREMOVE
        case "CHANGE_TASK_STATUS":
            return {...state, [action.toDoListID]: state[action.toDoListID].map(m => m.id === action.taskId ? {...m, isDone: action.isDone} : m)}
        case "EDIT_TASK_TITLE":
            return {...state, [action.ToDoListId]: state[action.ToDoListId].map(t => t.id === action.tId ? {...t, title: action.title} : t)}
        default: return state
    }
}


// AC
export const AddTaskAC = (newTitle: string, toDoListId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', newTitle, toDoListId } as const
}
export const RemoveTaskAC = (id: string, toDoListId: string) => {
    return {type: 'REMOVE_TASK', id, toDoListId} as const
}
export const ChangeTaskStatusAC = (taskId: string, toDoListID: string, isDone: boolean) => {
    return {type: 'CHANGE_TASK_STATUS', taskId, toDoListID, isDone} as const
}
export const EditTaskTitleAC = (ToDoListId: string, tId: string, title: string) => {
    return {type: 'EDIT_TASK_TITLE', ToDoListId, tId, title} as const
}
