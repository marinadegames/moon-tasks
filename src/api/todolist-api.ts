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
        instance.get('')
    }
}