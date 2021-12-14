//imports
import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

//assets

//types
export type FilterType = 'ALL' | 'COMPLETED' | 'ACTIVE'
//components
export function App() {
    debugger


    // use state принимает - инилизационный state
    // возвращает массив
    // первый желемнет массива - state
    // function, с помощью которой мы будет это мменять

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'English', isDone: false},
    ])

    const [filterValue, setFilterValue] = useState('ALL')


    const removeTask = (id: number) => {
        setTasks(tasks.filter((t) => id !== t.id))
    }


    let filterTasks = tasks

    if (filterValue === "ACTIVE"){
        filterTasks = tasks.filter(t => t.isDone)
    }else if (filterValue === 'COMPLETED'){
        filterTasks = tasks.filter(t => !t.isDone)
    }

    const filteredTasks = (value:FilterType) => {
        debugger
        setFilterValue(value)
    }

    return (
        <div>
            <h1>Hello!</h1>
            <h2>It's my toDo list project!</h2>

            <ToDoList tasks={filterTasks}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}
            />
        </div>
    )
}

export function App2(){
    return(
        <div>
            tasks 2
        </div>
    )
}


