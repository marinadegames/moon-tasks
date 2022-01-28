// imports
import React, {KeyboardEvent, useState} from "react";
import s from './Header.module.css'
import moonPurple from '../assets/moon-logo-purple.png'

// types
type HeaderPropsType = {
    addToDoList: (title: string) => void
}

// components

export function Header(props: HeaderPropsType) {

    const [toDoListTitle, setToDoListTitle] = useState<string>('')

    const onChangeHandler = (e: string) => {
        setToDoListTitle(e)
    }
    const addToDoList = () => {
        if (toDoListTitle !== '') {
            props.addToDoList(toDoListTitle.trim())
            setToDoListTitle('')
        }
    }

    const onKeyPressAddToDoList = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addToDoList(toDoListTitle.trim())
            setToDoListTitle('')
        }
    }

    return (
        <div>
            <div className={s.header}>
                <img src={moonPurple}
                     alt={'moonPurple'}
                     className={s.moonLogo}/>
                <h1>MOON tasks</h1>
                <div className={s.addTaskBox}>
                    <h4>Add a new task list:</h4>
                    <div className={s.inputAddToDoList}>
                        <input type={'text'}
                               value={toDoListTitle}
                               onKeyPress={ (e) => onKeyPressAddToDoList(e) }
                               onChange={(e) => onChangeHandler(e.currentTarget.value)}/>
                        <button onClick={addToDoList}>+</button>
                    </div>

                </div>


            </div>


        </div>

    )
}

