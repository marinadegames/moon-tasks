//imports
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './ToDoList.module.css'
import {v1} from "uuid";
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";
import {log} from "util";

//assets
const deleteIcon = <svg
    className={s.svgDelete}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="1.2rem"
    height="1.2rem">
    <path
        d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"/>
</svg>

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

    //hooks
    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'English', isDone: true},
    ])
    const [filterValue, setFilterValue] = useState('ALL')
    const [error, setError] = useState<string | null>(null)

    //functions
    let filterTasksIsDone = tasks

    if (filterValue === "ACTIVE") {
        filterTasksIsDone = tasks.filter(t => !t.isDone)
    } else if (filterValue === 'COMPLETED') {
        filterTasksIsDone = tasks.filter(t => t.isDone)
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter((t: TypeTask) => id !== t.id))
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
        if (title.trim() !== '') {
            addTask(title)
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            if (title.trim() !== '') {
                addTask(title)
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }
    }
    const changeFilterButtons = (valueFilter: any) => {
        filteredTasks(valueFilter)
    }
    const onClickRemoveTask = (id: string) => {
        removeTask(id)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        let copy = [...tasks]
        setTasks(copy)
    }



    return (
        <div className={s.task}>

            <div className={s.titleBoxTasks}>
                <svg viewBox="0 0 100 80" width="20" height="20">
                    <rect width="100" height="20"/>
                    <rect y="30" width="100" height="20"/>
                    <rect y="60" width="100" height="20"/>
                </svg>
                <h4>{props.title}</h4>
            </div>

            <div className={s.tasksBox}>


                <div className={s.btnsFilters}>
                    <button onClick={() => changeFilterButtons('ALL')}
                            className={filterValue === 'ALL' ? s.btnAllActive : s.btnAll}>ALL</button>
                    <button onClick={() => changeFilterButtons('ACTIVE')}
                            className={filterValue === 'ACTIVE' ? s.btnActiveActive : s.btnActive }>ACTIVE</button>
                    <button onClick={() => changeFilterButtons('COMPLETED')}
                            className={filterValue === 'COMPLETED' ? s.btnCompletedActive : s.btnCompleted}>COMPL
                    </button>
                </div>

                <AddTaskForm
                    onChangeHandler={onChangeHandler}
                    title={title}
                    error={error}
                    onKeyPressHandler={onKeyPressHandler}
                    onClickHandler={onClickHandler}
                />

                <div className={s.tasks}>
                    {filterTasksIsDone.map((t) => {

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked)
                            console.log(t.id, e.currentTarget.checked)
                        }

                        return (
                            <div className={s.tasksBox}
                                 key={t.id}>
                                <div className={s.mainBoxTasks}>
                                    <input type="checkbox"
                                           className={s.customCheckbox}
                                           name="happy"
                                           checked={t.isDone}
                                           onChange={onChangeHandler}
                                    />

                                    <label htmlFor="happy"
                                           className={!t.isDone ? s.textTrue : s.textFalse}>
                                        {t.title}
                                    </label>
                                    <button onClick={() => onClickRemoveTask(t.id)}
                                            className={s.btnRemoveTask}>
                                        {deleteIcon}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>


            </div>

        </div>
    )
}