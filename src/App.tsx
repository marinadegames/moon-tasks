//imports
import React, {useState} from 'react';
import './App.module.css';
import {ToDoList} from "./Components/ToDoList/ToDoList";
import {Header} from "./Components/Header/Header";
import s from './App.module.css'
import {v1} from "uuid";
//assets

//types

//components
export function App() {

    // use state принимает - иниц. state
    // возвращает массив
    // первый элемент массива - state
    // function, с помощью которой мы будем это менять

    let toDoListId1 = v1()
    let toDoListId2 = v1()

    let toDoLists = [
        {id: v1(), title: "What's study",},
        {id: v1(), title: "What to buy"},
    ]

    let [allTasks, setAllTasks] = useState({
        [toDoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'English', isDone: true},
        ],
        [toDoListId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Juice', isDone: false},
            {id: v1(), title: 'Meat', isDone: true},
        ],
    })

    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className={s.toDoLists}>
                {toDoLists.map((v) => {
                    return (
                        <ToDoList key={v.id}
                                  title={v.title}/>
                    )
                })}
            </div>
        </div>
    )
}



