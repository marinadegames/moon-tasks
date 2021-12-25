// imports
import React from "react";
import s from './AddTaskForm.module.css'

// assets

// types

//styles

let styleInput = {
    display: 'none',
}
let styleBtnAdd = {
    border: 'none',
    padding: '0.7rem 1rem',
    margin: '0 0 1rem 0',
    borderRadius: '10rem',
    cursor: 'pointer',
    backgroundColor: 'var(--generalColor)',
    color: 'white',
    fontWeight: '800',


}

//components

export const AddTaskForm = function (props: any) {
    return (
        <form className={s.formAddTask}>
            <input style={styleInput}
                // onChange={props.onChangeHandler}
                // value={props.title}
                // className={s.inputAddTask}
                // onKeyPress={props.onKeyPressHandler}
            />
            <button style={styleBtnAdd}
                // onClick={props.onClickHandler}
            >
                + Add task
            </button>
        </form>
    )
}