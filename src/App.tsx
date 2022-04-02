//imports
import React, {memo, useCallback, useEffect} from 'react';
import './App.module.css';
import {Header} from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./redux/store";
import {ErrorMessage} from "./Components/ErrorMessage/ErrorMessage";
import {addTodolistTC} from "./redux/toDoListsReducer";
import {TodolistsList} from "./Components/ToDoList/TodolistsList";
import {Route, Routes} from 'react-router-dom';
import {Login} from "./Components/Login/Login";
import {CircularLoading} from "./Components/CircularLoading/CircularLoading";
import {initializedAppTC} from "./redux/appReducer";

export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'

//components
export const App = memo(() => {

        // select state
        const error = useSelector<rootReducerType, string | null>(state => state.app.error)
        const isInitialized = useSelector<rootReducerType, boolean>(state => state.app.initialized)
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(initializedAppTC())
        }, [dispatch])

        const addToDoList = useCallback((title: string) => {
            dispatch(addTodolistTC(title))
        }, [dispatch])

        if (!isInitialized) return <CircularLoading/>

        //return
        return (
            <div>
                <div>
                    <Header addToDoList={addToDoList}/>
                </div>

                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>


                {error !== null ? <ErrorMessage textError={error} timer={5000}/> : null}
            </div>
        )
    }
)