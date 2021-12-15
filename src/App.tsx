//imports
import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

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
            <h1>Hello!</h1>
            <h2>It's my toDo list project!</h2>

            <ToDoList title={'What study:'}
            />
        </div>
    )
}



