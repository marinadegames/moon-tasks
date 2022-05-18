// imports
import axios from "axios";


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
        return instance.get<Array<TodolistType>>('todo-lists').then(resp => resp.data)
    },
    createTodolist(title: string) {
        return instance.post<CreateTodolistResponseType>('todo-lists', {title: title}).then(resp => resp.data)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`).then(resp => resp.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`).then(resp => resp.data)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model).then(resp => resp.data)
    },
    createTask(todolistId: string, newTaskTitle: string) {
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title: newTaskTitle}).then(resp => resp.data)
    }

}


export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
    },
    me() {
        return instance.get<MeResponseType>('auth/me').then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType<{ id: number, email: string, login: string }>>('auth/login')
    }
}


// types
export type MeResponseType = ResponseType<{
    id: number
    email: string
    login: string
}>

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string

}
export type TodolistType = {
    id: string
    title: string
    addedDate?: string
    order: number
}
export type CreateTodolistResponseType = {
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
export type GetTasksResponseType = {
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
export type ResponseType<D = {}> = {
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