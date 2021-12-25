// imports
import React, {useState} from "react";
import s from './AddTaskForm.module.css'
// assets
// types


//components

export const AddTaskForm = function (props: any) {

    //hooks
    let [onOff, setOnOff] = useState(false)

    // functions
    const onClickOpenInput = () => {
        props.setOnOff(true)
    }
    const offClickOpenInput = () => {
        props.setOnOff(false)
    }

    return (
        <div className={s.formAddTask}>
            <input className={s.inputAddTask}
                   value={'hi'}
                   onChange={ () => {} }/>
            <button>+</button>
        </div>
    )
}
