//imports
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './ToDoList.module.css'
import {v1} from "uuid";
//assets


//types
type TypeTask = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
}
type FilterType = 'ALL' | 'COMPLETED' | 'ACTIVE'

//components
export function ToDoList(props: PropsType) {

    const [title, setTitle] = useState('')

    //hooks
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'English', isDone: false},
    ])
    const [filterValue, setFilterValue] = useState('ALL')

    //functions
    let filterTasksIsDone = tasks
    const removeTask = (id: string) => {
        setTasks(tasks.filter((t: TypeTask) => id !== t.id))
    }

    if (filterValue === "ACTIVE") {
        filterTasksIsDone = tasks.filter(t => !t.isDone)
    } else if (filterValue === 'COMPLETED') {
        filterTasksIsDone = tasks.filter(t => t.isDone)
    }

    const filteredTasks = (value: FilterType) => {
        setFilterValue(value)
    }
    const addTask = (title: string) => {
        const newTitle = {id: v1(), title: title, isDone: false}
        setTasks([newTitle, ...tasks])
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }
    const onClickHandler = () => {
        addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(title)
            setTitle('')
        }
    }
    const changeFilterButtons = (valueFilter: any) => {
        filteredTasks(valueFilter)
    }

    const onClickRemoveTask = (id: string) => {
        removeTask(id)
    }

    return (
        <div className={s.task}>

            <div className={s.titleBoxTasks}>
                <h4>{props.title}</h4>
            </div>

            <div className={s.tasksBox}>
                <form className={s.formAddTask}>
                    <input onChange={onChangeHandler}
                           value={title}
                           className={s.inputAddTask}
                           onKeyPress={onKeyPressHandler}
                    />
                    <button className={s.addBtnTask} onClick={onClickHandler}>
                        +
                    </button>
                </form>

                <div className={s.btnsFilters}>
                    <button onClick={() => changeFilterButtons('ALL')} className={s.btnAll}>ALL</button>
                    <button onClick={() => changeFilterButtons('ACTIVE')} className={s.btnActive}>ACTIVE</button>
                    <button onClick={() => changeFilterButtons('COMPLETED')} className={s.btnCompleted}>COMPL
                    </button>
                </div>

                <div className={s.tasks}>
                    {filterTasksIsDone.map((t) => {
                        return (
                            <div>
                                <li key={t.id}>
                                    <button onClick={() => onClickRemoveTask(t.id)}> X</button>
                                    <input type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                </li>
                            </div>
                        )
                    })}
                </div>


            </div>

        </div>
    )
}