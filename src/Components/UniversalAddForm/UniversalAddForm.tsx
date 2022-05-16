import React, {KeyboardEvent, useState} from "react";
import s from './UniversalAddForm.module.css'

type PropsType = {
    callback: (title: string) => void
    placeholder?: string
    buttonVisibility?: boolean
}

export const UniversalAddForm = ({callback, buttonVisibility, placeholder}: PropsType) => {

    const [text, setText] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: string) => {
        setText(e)
        setError(false)
    }
    const addHandler = () => {
        if (text !== '') {
            callback(text.trim())
            setText('')
        }
        if (text === '') setError(true)
    }

    const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            callback(text.trim())
            setText('')
        }
    }

    return (
        <div>
            <div className={error ? s.inputAdd_error : s.inputAdd}>
                <input type={'text'}
                       value={text}
                       placeholder={placeholder}
                       onKeyPress={(e) => onKeyPressAdd(e)}
                       onChange={(e) => onChangeHandler(e.currentTarget.value)}/>
                {!buttonVisibility
                    ? <button onClick={addHandler}>+</button>
                    : null}

            </div>
            {error && <small className={s.errorMessage}>Title needed!</small>}
        </div>
    )
}