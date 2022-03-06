// imports
import axios from "axios";

// types

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
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
type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}


// settings
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '20af6c8d-612b-4369-bc4f-11b94638fe2f'
    }
})


// api
export const todolistApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(newTitle: string) {
        return instance.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', {title: newTitle})
    },
    updateTodolist(todolistId: string, newTitle: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title: newTitle})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    createTask(todolistId: string, newTaskTitle: string) {
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title: newTaskTitle})
    }


}