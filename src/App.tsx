//imports
import React, {memo, useCallback} from 'react';
import './App.module.css';
import {Header} from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./redux/store";
import {ErrorMessage} from "./Components/ErrorMessage/ErrorMessage";
import {addTodolistTC} from "./redux/toDoListsReducer";
import {TodolistsList} from "./Components/ToDoList/TodolistsList";

export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'

//components
export const App = memo(() => {

        // select state
        const error = useSelector<rootReducerType, string | null>(state => state.app.error)
        const dispatch = useDispatch()

        const addToDoList = useCallback((title: string) => {
            dispatch(addTodolistTC(title))
        }, [dispatch])

        //return
        return (
            <div>
                <div>
                    <Header addToDoList={addToDoList}/>
                </div>
                <TodolistsList/>
                {error !== null ? <ErrorMessage textError={error} timer={5000}/> : null}
            </div>
        )
    }
)