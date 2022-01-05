// imports
import React, {useState} from "react";
import s from './Header.module.css'

// types
type HeaderPropsType = {}

// components

export function Header(props: any) {

    const [toDoListTitle, setToDoListTitle] = useState<string>('')

    const onChangeHandler = (e:string) => {
        setToDoListTitle(e)
    }
    const addToDoList = () => {
        if (toDoListTitle !== ''){
            props.addToDoList(toDoListTitle.trim())
            setToDoListTitle('')
        }
    }

    return (
        <div>
            <div className={s.header}>
                <h1>Hello!</h1>
                <h2>It's my toDo list project!</h2>
            </div>

            <div className={s.addTaskBox}>
                <h4>Add a new task list:</h4>
                <div className={s.inputAddToDoList}>
                    <input type={'text'}
                           value={toDoListTitle}
                           onChange={(e) => onChangeHandler(e.currentTarget.value) }/>
                    <button onClick={addToDoList}>+</button>
                </div>
            </div>
        </div>

    )
}

