// imports
import axios from "axios";

// types

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
        return instance.get('todo-lists')
    },
    createTodolist(newTitle: string) {
        return instance.post('todo-lists', {title: newTitle})
    },
    updateTodolist(todolistId: string, newTitle: string) {
        return instance.put(`todo-lists/${todolistId}`, {title: newTitle})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    }


}