//imports
import React from 'react';
import './App.module.css';
import {ToDoList} from "./Components/ToDoList/ToDoList";
import {Header} from "./Components/Header/Header";
import s from './App.module.css'
//assets

//types

//components
export function App() {

    // use state принимает - инилизационный state
    // возвращает массив
    // первый желемнет массива - state
    // function, с помощью которой мы будет это мменять


    return (
        <div>
            <div>
                <Header />
            </div>

            <div className={s.toDoLists}>
                <ToDoList title={'What study:'}/>
                <ToDoList title={'What study:'}/>
            </div>

        </div>
    )
}



