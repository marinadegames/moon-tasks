import React, {useCallback, useEffect} from 'react';
import './App.module.css';
import {Header} from "../Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {Notification} from "../Components/Notification/Notification";
import {TodolistsList} from "../Components/ToDoList/TodolistsList";
import {Route, Routes} from 'react-router-dom';
import {Login} from "../Components/Login/Login";
import {CircularLoading} from "../Components/CircularLoading/CircularLoading";
import {selectIsInitialized, selectNotification, selectStatus} from './selectors';
import {initializedApp} from "../redux/appReducer";
import {addTodolist} from "../redux/toDoListsReducer";

export const App = () => {

    const error = useSelector(selectStatus)
    const notification = useSelector(selectNotification)
    const isInitialized = useSelector(selectIsInitialized)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializedApp())
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        dispatch(addTodolist(title))
    }, [dispatch])

    if (!isInitialized) return <CircularLoading/>

    return (
        <div>
            <div>
                <Header addToDoList={addToDoList}/>
            </div>
            <Routes>
                <Route path={'/'} element={<TodolistsList/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
            {error !== null ? <Notification error={true} textError={error} timer={5000}/> : null}
            {notification !== null && <Notification error={false} textNotification={notification} timer={5000}/>}
        </div>
    )
}
