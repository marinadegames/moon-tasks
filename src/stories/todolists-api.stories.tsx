import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then(resp => {
                setState(resp.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTitle = 'NEW TITLE!!!'
        todolistApi.createTodolist(newTitle)
            .then(resp => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "012bbdcc-ac87-4205-9755-6e14b6686b01"
        todolistApi.deleteTodolist(todolistId)
            .then(resp => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "012bbdcc-ac87-4205-9755-6e14b6686b01"
        const newTitle = 'UPDATED TITLE!!!'
        todolistApi.updateTodolist(todolistId, newTitle)
            .then(resp => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
