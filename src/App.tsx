//imports
import React, {memo, useCallback, useEffect} from 'react';
import './App.module.css';
import {Header} from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./redux/store";
import {Notification} from "./Components/Notification/Notification";
import {addTodolistTC} from "./redux/toDoListsReducer";
import {TodolistsList} from "./Components/ToDoList/TodolistsList";
import {Route, Routes} from 'react-router-dom';
import {Login} from "./Components/Login/Login";
import {CircularLoading} from "./Components/CircularLoading/CircularLoading";
import {initializedAppTC} from "./redux/appReducer";

export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'

//components
export const App = memo(() => {

        const error = useSelector<rootReducerType, string | null>(state => state.app.error)
        const notification = useSelector<rootReducerType, string | null>(state => state.app.notification)
        const isInitialized = useSelector<rootReducerType, boolean>(state => state.app.initialized)
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(initializedAppTC({}))
        }, [dispatch])

        const addToDoList = useCallback((title: string) => {
            dispatch(addTodolistTC({newTitle: title}))
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
)