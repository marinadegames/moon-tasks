// imports
import React, {ChangeEvent, KeyboardEvent} from "react";
import s from './AddTaskForm.module.css'

// assets

// types
type PropsAddTaskForm = {
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    title: string
    error: any
    onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>) => void
    addTask: () => void
    setTaskTitle: (taskTitle:string) => void
    taskTitle: string
}

//components

export const AddTaskForm = function (props: PropsAddTaskForm) {

    return (
        <div>
            <div className={s.formAddTask}>
                <input className={props.error ? s.error : ''}
                       value={props.taskTitle}
                       placeholder={'add task...'}
                       onKeyPress={props.onKeyPressHandler}
                       onChange={props.onChangeHandler}/>
                <button onClick={props.addTask}
                        className={props.error ? s.errorBtn : ''}>
                    +
                </button>

            </div>
            {props.error && <small className={s.errorMessage}>Field if required!</small>}
        </div>
    )
}
