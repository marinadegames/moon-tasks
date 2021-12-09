//imports
import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

//assets


//components
function App() {
    return (
        <div className="App">
            <div className='Header'>
                <h1>HELLO!</h1>
                <h2>It's my ToDoList project!</h2>
            </div>

            <div className='Main'>
                <ToDoList title='What to learn'/>
                <ToDoList title='Movies'/>
                <ToDoList title='Songs'/>

            </div>


        </div>
    );
}


export default App;
