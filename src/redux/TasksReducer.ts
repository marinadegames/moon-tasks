// imports
import {TaskStateType} from "../App";
import {v1} from "uuid";


// types
type ActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType
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

// Initial State
// ???

// reducer
export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
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

