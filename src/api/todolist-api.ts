// imports
import axios from "axios";

// types

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
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
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodolist(newTitle: string) {
        return instance.post<BaseResponseType<{ item: TodoType }>>('todo-lists', {title: newTitle})
    },
    updateTodolist(todolistId: string, newTitle: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title: newTitle})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    }


}