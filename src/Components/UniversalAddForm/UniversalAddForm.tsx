// import
import React, {KeyboardEvent, useState} from "react";
import s from './UniversalAddForm.module.css'

// types
type PropsType = {
    callback: (title: string) => void
    placeholder?: string
}

// component
export const UniversalAddForm = (props: PropsType) => {

    // local state
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    // functional
    const onChangeHandler = (e: string) => {
        setText(e)
        setError(false)
    }
    const addHandler = () => {
        if (text !== '') {
            props.callback(text.trim())
            setText('')
        }
        if (text === '') setError(true)
    }

    const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.callback(text.trim())
            setText('')
        }
    }

    // return
    return (
        <div>
            <div className={error ? s.inputAdd_error : s.inputAdd}>
                <input type={'text'}
                       value={text}
                       placeholder={props.placeholder}
                       onKeyPress={(e) => onKeyPressAdd(e)}
                       onChange={(e) => onChangeHandler(e.currentTarget.value)}/>
                <button onClick={addHandler}>+</button>
            </div>
            {error && <small className={s.errorMessage}>Title needed!</small>}
        </div>
    )
}