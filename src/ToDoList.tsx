//imports
import React, {useState} from "react";
import s from './ToDoList.module.css'
//assets


//types
type TypeTask = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
}
type FilterType = 'ALL' | 'COMPLETED' | 'ACTIVE'

//components
export function ToDoList(props: PropsType) {

    //hooks
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'English', isDone: false},
    ])
    const [filterValue, setFilterValue] = useState('ALL')

    debugger
    //functions
    let filterTasksIsDone = tasks

    const removeTask = (id: number) => {
        setTasks(tasks.filter((t:TypeTask) => id !== t.id))
    }

    if (filterValue === "ACTIVE"){
        filterTasksIsDone = tasks.filter(t => !t.isDone)
    }else if (filterValue === 'COMPLETED'){
        filterTasksIsDone = tasks.filter(t => t.isDone)
    }

    const filteredTasks = (value:FilterType) => {
        setFilterValue(value)
    }

    return (
        <div className={s.task} >
            <hr/>
            <h4>{props.title}</h4>

            {filterTasksIsDone.map((t) => {
                return (
                    <div>
                        <li key={t.id}>
                            <button onClick={() => removeTask(t.id)} > X </button>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    </div>
                )
            })}
            <button onClick={ () => filteredTasks('ALL') } className={s.btnAll}>ALL</button>
            <button onClick={ () => filteredTasks('ACTIVE') } className={s.btnActive}>ACTIVE</button>
            <button onClick={ () => filteredTasks('COMPLETED')  } className={s.btnCompleted}>COMPLETED</button>

        </div>
    )
}