// imports
import axios from "axios";


// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
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
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type UpdateTaskModelType = {
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
        'API-KEY': '20af6c8d-612b-4369-bc4f-11b94638fe2f',
    },
})


// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CreateTodolistResponseType>('todo-lists', {title: title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`)
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