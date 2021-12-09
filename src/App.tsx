//imports
import React from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";


//assets


//components
function App() {

    let tasks1: Array<TaskType> = [
        { id: 1, title: 'HTML&CSS', isDone: true},
        { id: 2, title: 'JS', isDone: true},
        { id: 3, title: 'React', isDone: false},

    ]

    let tasks2: Array<TaskType> = [
        { id: 1, title: 'Terminator', isDone: true},
        { id: 2, title: 'XXX', isDone: false},
        { id: 3, title: 'Godnota ;) ', isDone: true},
    ]

    return (
        <div className="App">
            <div className='Header'>
                <h1>HELLO!</h1>
                <h2>It's my ToDoList project!</h2>
            </div>

            <div className='Main'>
                <ToDoList title='What to learn' tasks={tasks1}/>
                <ToDoList title='Movies' tasks={tasks2}/>

            </div>


        </div>
    );
}


export default App;
