//imports
import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";


//assets


//components
function App() {

    let tasks: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},

    ]

     useState(tasks)

    // let tasks2: Array<TaskType> = [
    //     { id: 1, title: 'Terminator', isDone: true},
    //     { id: 2, title: 'XXX', isDone: false},
    //     { id: 3, title: 'Godnota ;) ', isDone: true},
    // ]

    function removeTask(id: number) {
        tasks = tasks.filter(value => value.id !== id);
    }

    return (
        <div className="App">
            <div className='Header'>
                <h1>HELLO!</h1>
                <h2>It's my ToDoList project!</h2>
            </div>

            <div className='Main'>
                <ToDoList title='What to learn'
                          tasks={tasks}
                          removeTask={removeTask}/>
            </div>
        </div>
    );
}


export default App;
