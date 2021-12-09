//imports
import React from "react";


//assets


//types
export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}
export type ToDoListType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: Function,
}


//components
export function ToDoList(props:ToDoListType) {
    return (
        <div className='ToDoList'>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}

                {
                    props.tasks.map(value => {
                        return (
                        <li>
                            <input type="checkbox" checked={value.isDone}/>
                            <span>{value.title}</span>
                            <button className='btnTask'
                                    onClick={ () => {props.removeTask(value.id)} }>
                                x
                            </button>
                        </li>

                        )
                    })
                }



            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}