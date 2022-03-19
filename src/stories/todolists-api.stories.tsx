import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
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
        todolistsAPI.createTodolist(newTitle)
            .then(resp => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "c78734ae-c857-48f3-b612-c251c8dc2ee4"
        todolistsAPI.deleteTodolist(todolistId)
            .then(resp => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "c78734ae-c857-48f3-b612-c251c8dc2ee4"
        const newTitle = 'UPDATED TITLE!!!'
        todolistsAPI.updateTodolist(todolistId, newTitle)
            .then(resp => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
