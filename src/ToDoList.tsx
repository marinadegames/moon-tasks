//imports
import React from "react";
import {FilterType} from "./App";

//assets


//types
type TypeTask = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    tasks: Array<TypeTask>
    removeTask: (id:number) => void
    filteredTasks: (value:FilterType) => void
}

//components
export function ToDoList(props: PropsType) {
    return (
        <div className='task'>
            <hr/>
            <h4>What study:</h4>

            {props.tasks.map((t) => {
                return (
                    <div>
                        <li key={t.id}>
                            <button onClick={() => props.removeTask(t.id)} > X </button>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    </div>
                )
            })}
            <button onClick={ () => props.filteredTasks('ALL') } className='btnAll'>ALL</button>
            <button onClick={ () => props.filteredTasks('ACTIVE') } className='btnActive'>ACTIVE</button>
            <button onClick={ () => props.filteredTasks('COMPLETED')  } className='btnCompleted'>COMPLETED</button>

        </div>
    )
}