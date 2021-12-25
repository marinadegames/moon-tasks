// imports
import React from "react";
import s from './AddTaskForm.module.css'

// assets

// types


//components

export const AddTaskForm = function (props: any) {



    return (
        <div>
            <div className={s.formAddTask}>
                <input className={ props.error ? s.error : ''}
                       value={props.title}
                       placeholder={'add task...'}
                       onKeyPress={props.onKeyPressHandler}
                       onChange={props.onChangeHandler}/>
                <button onClick={props.onClickHandler}
                        className={ props.error ? s.errorBtn : ''}>
                    +
                </button>

            </div>
            {props.error && <small className={s.errorMessage}>Field if required!</small> }
        </div>
    )
}
