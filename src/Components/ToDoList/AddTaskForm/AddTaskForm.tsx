// imports
import React from "react";
import s from './AddTaskForm.module.css'

// assets

// types


//components

export const AddTaskForm = function (props: any) {

    return (
        <div className={s.formAddTask}>
            <input className={s.inputAddTask}
                   value={props.title}
                   placeholder={'add task...'}
                   onKeyPress={props.onKeyPressHandler}
                   onChange={props.onChangeHandler}/>
            <button onClick={props.onClickHandler}>+</button>
        </div>
    )
}
